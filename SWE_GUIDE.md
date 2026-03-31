# Student Atlas - Engineering Guide

**Audience:** Software engineers working on this codebase
**Last updated:** March 30, 2026

---

## What This App Does

Student Atlas helps international students navigate US and UK immigration. Three pages, three capabilities:

1. **Home (`/`)** - Structured visa reference data (student visas + long-term pathways)
2. **News (`/news`)** - Auto-aggregated immigration news from 20+ RSS sources
3. **Chatbot (`/chatbot`)** - AI-generated visa guidance via Google Gemini

---

## Architecture Overview

```
Flask app (app.py, ~1870 lines)
├── SQLAlchemy ORM → SQLite (instance/student_atlas.db)
├── Background daemon thread → RSS fetcher (30-min cycle)
├── Google Gemini API → Chatbot responses
├── Jinja2 templates → Server-rendered HTML
└── Vanilla JS + CSS → Frontend interactivity
```

Single-file Flask app. No blueprints, no async, no build step. Templates use Jinja2 with a custom `render_citations` filter. The background news worker runs as a daemon thread inside the same process.

---

## Project Structure

```
Student Atlas/
├── app.py                  # All routes, business logic, news pipeline, seed data
├── models.py               # 4 SQLAlchemy models
├── requirements.txt        # Python deps
├── .env                    # GEMINI_API_KEY, FLASK_ENV, DEBUG
├── instance/
│   └── student_atlas.db    # SQLite (auto-created on first run)
├── static/
│   ├── base.css            # Full design system (~30KB)
│   ├── dropdown.css        # Custom dropdown component styles
│   └── dropdown.js         # Searchable dropdown with keyboard nav (~11KB)
└── templates/
    ├── base.html           # Layout: sticky nav, footer, flash messages
    ├── index.html           # Home page
    ├── news.html           # News feed with auto-refresh
    └── chatbot.html        # AI chatbot form + response
```

---

## Data Model

### `StudentVisaInfo`
Primary student visa for each target country. 2 seeded rows (F-1, UK Student Route).

| Column | Type | Notes |
|--------|------|-------|
| `target_country` | String(64) | Indexed. "United States" or "United Kingdom" |
| `visa_name` | String(128) | e.g., "F-1 Student Visa" |
| `overview` | Text | Supports `[1]`-style citation markers |
| `legal_summary` | Text | |
| `compliance_steps` | Text | Numbered steps, rendered as ordered list |
| `requirements_checklist` | Text | Bullet points |
| `sources` | Text | Bibliography, rendered as footnote links |
| `freshness` | String(16) | `"STALE"` or `"REVIEW_SOON"` |
| `last_verified` | Date | |

### `LongTermImmigration`
Post-graduation pathways. 6 seeded rows (3 US, 3 UK), grouped by `category`.

| Column | Type | Notes |
|--------|------|-------|
| `target_country` | String(64) | Indexed |
| `category` | String(64) | Indexed. `"Work Visas"`, `"Residency"`, `"Citizenship"` |
| `title` | String(256) | |
| `description` | Text | |
| `key_requirements` | Text | |
| `compliance_steps` | Text | |
| `sources` | Text | |
| `freshness` / `last_verified` | | Same as above |

### `NewsUpdate`
Cached RSS articles. Auto-pruned to 200 most recent.

| Column | Type | Notes |
|--------|------|-------|
| `source` | String(128) | Indexed. RSS feed name |
| `title` | String(512) | HTML-stripped before storage |
| `link` | String(512) | **Unique constraint** (dedup key) |
| `summary` | Text | First 800 chars of article body |
| `published_at` | DateTime | Indexed. From RSS feed |
| `region_focus` | String(64) | Indexed. `"United States"`, `"United Kingdom"`, or `"General"` |
| `mentioned_countries` | String(2048) | Comma-delimited: `",India,Pakistan,"` |
| `mentioned_regions` | String(1024) | Comma-delimited: `",South Asia,"` |

### `AppStatus`
Simple key-value store. Currently tracks `news_last_refreshed`.

---

## Routes

### `GET /`
Renders home page with visa info for the selected `target` country (query param, defaults to "United States"). Queries `StudentVisaInfo` and `LongTermImmigration` by `target_country`.

### `GET /news`
Paginated news feed. Query params:
- `target` - Filter by destination country
- `country_filter` - Filter by home country (matches `mentioned_countries` or falls back to title/summary text search)
- `page` - Page number (20 items per page via `NEWS_PER_PAGE`)

Filtering logic: articles where `region_focus == target OR region_focus == "General"`. Country filter uses the `COUNTRY_VARIANTS` dict to resolve aliases and associated regions.

### `GET /chatbot`
Renders the chatbot form.

### `POST /chatbot`
Validates `origin` and `destination` inputs, builds a structured prompt, calls Gemini API, returns formatted response inline. Input validation: regex `^[a-zA-Z\s\-]+$`, length limits, origin != destination.

### Error handlers
Custom pages for 404, 500, 429.

---

## News Pipeline

The core data pipeline. Runs in a background daemon thread started by `start_background_worker()`.

### Fetch cycle
1. Every 30 minutes (`NEWS_FETCH_INTERVAL`), parse all RSS feeds via `feedparser`
2. For each article, run through keyword relevance filter
3. Classify `region_focus` (US/UK/General) based on content
4. Detect mentioned countries (195+ with variants) and regions (14 world regions)
5. Strip HTML, truncate summary to 800 chars
6. Insert into DB (skip duplicates via unique `link` constraint)
7. Prune to 200 most recent articles
8. On error: retry in 5 minutes (`NEWS_FETCH_ERROR_BACKOFF`)

### Keyword filtering (three-tier)
- **STRONG signals** (~48 patterns): Unambiguous terms like "immigration", "f-1", "h-1b", "green card". Single match qualifies.
- **CONTEXT signals** (~8): Ambiguous alone ("visa", "students", "opt"). Need a SUPPORTING signal.
- **SUPPORTING signals** (~18): Confirm context keywords ("embassy", "consulate", "university").
- **NEGATIVE keywords** (~13): Reject weak matches ("cricket", "visa inc", "student loan").

Country-specific RSS sources (Dawn, NDTV, Khaleej Times, etc.) use lenient filtering - lower keyword threshold.

### Region detection
14 world regions (Gulf, South Asia, Sub-Saharan Africa, etc.) with member country lists and keyword patterns. Pre-compiled regex with word boundaries.

### Frontend auto-refresh
`news.html` has JS that fetches the page every 15 minutes and swaps `.news-list` and `#last-updated` DOM elements in-place without a full reload.

---

## Chatbot / Gemini Integration

**Model:** `gemini-2.0-flash`
**Status:** Currently returns "AI assistant is temporarily unavailable" (disabled in code).

When active, the flow is:
1. Escape user inputs via `markupsafe.escape()`
2. Build structured prompt asking for 6 categories of visa information
3. Call `model.generate_content(prompt)`
4. Parse response into formatted HTML (numbered headings, bullets, paragraphs)

Error handling catches `BlockedPromptException`, `StopCandidateException`, and generic exceptions - all return user-friendly messages with no internal details.

---

## Database Migrations

Four migration functions run on every app startup (inside `create_app()`). Each checks if a column exists before adding it via raw `ALTER TABLE`. This is a manual migration system - no Alembic.

- `_migrate_add_mentioned_countries()` - Adds `mentioned_countries` to `NewsUpdate`
- `_migrate_add_mentioned_regions()` - Adds `mentioned_regions` to `NewsUpdate`
- `_migrate_student_visa_info_v2()` - Adds `requirements_checklist`, `sources`, `freshness`, `last_verified`
- `_migrate_long_term_immigration_v2()` - Adds `compliance_steps`, `sources`, `freshness`, `last_verified`

---

## Security

| Layer | Implementation |
|-------|---------------|
| Input validation | `_sanitize_text_input()`, regex checks, length limits (100/200 chars) |
| SQL injection | SQLAlchemy parameterized queries throughout |
| XSS | `strip_html_tags()` on all RSS content before storage; `markupsafe.escape()` on chatbot inputs |
| Headers | `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin` |
| Sessions | `HttpOnly`, `SameSite=Lax` cookies |
| Secrets | `.env` file, auto-generated 256-bit hex fallback for `SECRET_KEY` |
| Error pages | No internal details leaked; DB rollback on 500 |

---

## Frontend

### Design system (`base.css`)
- **Colors:** Slate neutrals, teal primary accent, semantic status colors (green/amber/red)
- **Typography:** Inter (Google Fonts), weights 300-800, antialiased
- **Spacing:** CSS custom properties for radii (8-20px), shadows (xs-xl), transitions (0.15-0.35s)
- **Layout:** Max-width 1140px container, flex column body
- **Responsive:** Breakpoints at 768px (tablet) and 480px (mobile). Nav collapses to hamburger.

### Custom dropdown (`dropdown.js`)
Reusable component configured via `data-*` attributes:
- `data-searchable="true"` - Text input with filtering
- `data-auto-submit="true"` - Submit form on selection
- `data-required="true"` - Validation on submit

Supports keyboard navigation (arrows, enter, escape), type-ahead search, ARIA attributes.

### Animations
- Staggered fade-in-up on page load
- Pulsing hero badge
- Typing indicator on news loading
- Card hover lift + shadow transitions

---

## Configuration

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `GEMINI_API_KEY` | Yes (for chatbot) | - | Gemini API auth |
| `FLASK_SECRET_KEY` | No | Auto-generated 256-bit hex | Session signing |
| `FLASK_ENV` | No | `development` | Flask environment |
| `DEBUG` | No | `True` | Debug mode |
| `DATABASE_URL` | No | SQLite (`instance/student_atlas.db`) | PostgreSQL migration path |

### App constants (in `app.py`)
| Constant | Value | Purpose |
|----------|-------|---------|
| `TARGET_COUNTRIES` | `["United States", "United Kingdom"]` | Supported destinations |
| `MAX_NEWS_ITEMS` | 500 | Fetch cap before pruning |
| `NEWS_PER_PAGE` | 20 | Pagination size |
| `NEWS_FETCH_INTERVAL` | 1800s (30 min) | RSS fetch cycle |
| `NEWS_FETCH_ERROR_BACKOFF` | 300s (5 min) | Retry delay on error |
| `MAX_COUNTRY_NAME_LEN` | 100 | Input validation |
| `MAX_FILTER_LEN` | 200 | Input validation |

---

## Running Locally

```bash
pip install -r requirements.txt
# Set GEMINI_API_KEY in .env
python app.py
# → http://localhost:5001
```

The database auto-creates and seeds on first run. The news worker starts automatically (skipped during Werkzeug debug reloader's parent process).

---

## Known Limitations

| Issue | Detail |
|-------|--------|
| US/UK only | `TARGET_COUNTRIES` is hardcoded; adding a country requires new seed data |
| SQLite | Single-writer, not suitable for >100 concurrent users. `DATABASE_URL` env var switches to PostgreSQL |
| Synchronous chatbot | Gemini API call blocks the request thread |
| No user accounts | No saved preferences, history, or personalization |
| No rate limiting | Chatbot endpoint has no server-side throttling (relies on Gemini API quotas) |
| No Alembic | Migrations are manual `ALTER TABLE` checks on startup |
| Monolith `app.py` | All logic in one ~1870-line file; no blueprints |
| Gemini disabled | Chatbot currently returns a static unavailable message |

---

## Seed Data Summary

Seeded on first run if tables are empty:

**Student Visas (2):**
- US: F-1 Student Visa (SEVIS, I-20, DS-160 flow)
- UK: Student Route (CAS, SELT, IHS surcharge)

**Long-Term Pathways (6):**
- US: H-1B → Green Card → Citizenship
- UK: Skilled Worker → ILR → British Citizenship

Each entry includes overview, requirements checklist, numbered compliance steps, source citations, and freshness status. All verified as of March 26, 2026.
