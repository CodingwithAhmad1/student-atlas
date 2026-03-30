# Student Atlas - Product Document

**Prepared for:** Head of Product
**Date:** March 26, 2026
**Version:** 1.0

---

## 1. Product Overview

Student Atlas is a web application that helps international students navigate immigration pathways to the **United States** and **United Kingdom**. It consolidates visa regulations, real-time immigration news, and AI-powered guidance into a single platform, replacing fragmented government websites and costly consultations with an accessible, self-service tool.

### Problem Statement

International students face a fragmented, high-stakes immigration landscape. Visa types, compliance steps, post-graduation work options, and pathways to residency or citizenship are spread across dozens of government portals, legal blogs, and outdated forum posts. Misinformation is common and mistakes are costly.

### Solution

Student Atlas provides three core capabilities in one interface:

1. **Structured visa reference data** - Curated, at-a-glance breakdowns of student visas and long-term immigration options
2. **Aggregated immigration news** - Real-time feed from 20 authoritative sources, filtered by relevance
3. **AI-powered personal guidance** - Conversational visa breakdowns tailored to a student's origin and destination country

---

## 2. Target Users

- International students researching study-abroad destinations (US or UK)
- Current visa holders exploring post-graduation pathways (work visas, residency, citizenship)
- University international student offices seeking a reference tool
- Immigration advisors looking for a quick-reference platform

---

## 3. Application Structure

The application is organized into three pages, each serving a distinct user need.

### 3.1 Home Page (`/`)

**Purpose:** Primary reference hub for visa information and long-term immigration pathways.

**Key sections:**

| Section | Description |
|---|---|
| **Hero** | Branded landing with tagline and navigation shortcuts to News and Chatbot |
| **Destination Selector** | Dropdown to toggle between US and UK content; auto-submits on change |
| **Student Visa Card** | Displays the primary student visa for the selected country (F-1 for US, Student Route for UK) with overview, legal summary, and numbered compliance steps |
| **Long-Term Immigration** | Cards organized by category - Work Visas, Residency, Citizenship - each with title, description, and expandable requirements checklist |
| **Quick Links** | Three info cards linking to News, Chatbot, and a "Coming Soon" tailored information feature |

**Pre-loaded data (seeded on first run):**

- **US:** F-1 Student Visa, H-1B Specialty Occupation, Green Card, US Citizenship
- **UK:** Student Route, Skilled Worker Visa, Indefinite Leave to Remain (ILR), British Citizenship

---

### 3.2 News Page (`/news`)

**Purpose:** Real-time immigration news feed with filtering and auto-refresh.

**Key sections:**

| Section | Description |
|---|---|
| **Filter Panel** | Destination country dropdown + free-text country filter with autocomplete suggestions (18 countries) |
| **News Feed** | Paginated list (20 per page) of immigration-relevant articles with source label, title (links to original), summary, region badge, and publish date |
| **Info Box** | Explains the aggregation sources and refresh cadence |

**Notable features:**

- **20 RSS sources** including USCIS, UK Home Office, BBC, CNN, Reuters, The Guardian, NPR, Associated Press, and immigration-specific outlets (The PIE News, Migration Policy Institute, Immigration Impact)
- **Keyword filtering** - Articles must match at least one of 20 immigration keywords (e.g., "visa", "f-1", "opt", "h-1b", "green card", "citizenship") to be stored
- **Auto-refresh** - JavaScript fetches updated content every 15 minutes without requiring a page reload; DOM elements update in place
- **Region tagging** - Each article is automatically classified as "United States", "United Kingdom", or "General" based on content analysis
- **Auto-pruning** - Database retains only the 200 most recent articles, preventing unbounded growth

---

### 3.3 Chatbot Page (`/chatbot`)

**Purpose:** AI-generated, personalized visa guidance based on origin and destination.

**User flow:**

1. User enters their **country of origin** (free text with autocomplete) and selects a **destination** (US or UK)
2. Server validates inputs (character restrictions, origin != destination)
3. Request is sent to **Google Gemini AI** (`gemini-pro` model) with a structured prompt
4. Response is rendered inline with parsed formatting (numbered headings, bullet lists, paragraphs)

**AI response covers six areas:**

1. Visa requirements and types available
2. Key documentation needed
3. Timeline and processing
4. Cost estimates
5. Pathways to longer-term stay (work, residency, citizenship)
6. Country-specific considerations for the student's nationality

**Safeguards:**

- User inputs are escaped before embedding in the AI prompt (prevents prompt injection)
- AI safety filter and incomplete-response errors are caught and shown as user-friendly messages
- Footer disclaimer: *"This information is generated by AI and should be verified with official sources"*

---

## 4. Notable Features

### 4.1 Background News Worker

A daemon thread runs continuously alongside the application:

- Fetches all 20 RSS feeds every **30 minutes** (5-minute backoff on errors)
- Deduplicates articles by URL before storage
- Sanitizes HTML from feed content to prevent XSS
- Commits in a single transaction with automatic rollback on failure

### 4.2 Security Posture

The application implements multiple layers of security uncommon in early-stage products:

- **Input validation** on all user-facing fields (regex, length limits, parameterized SQL)
- **Security headers** on every response (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`)
- **Session hardening** (`HttpOnly`, `SameSite=Lax`)
- **HTML sanitization** on all RSS content before storage and display
- **Secret key management** via environment variables (auto-generated 256-bit fallback)
- **Error handling** with safe messages (no internal details leaked to users)

### 4.3 Responsive Design

- Mobile-first CSS with breakpoints at 768px and 480px
- Navigation collapses to hamburger menu on mobile
- Grid layouts reflow to single-column on small screens
- Inter font family with full weight range (300-800)

### 4.4 Animation & Polish

- Staggered fade-in-up animations on page load
- Pulsing indicator on hero badge
- Typing indicator animation on news loading state
- Hover transitions on cards (lift + shadow)

---

## 5. Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python / Flask |
| Database | SQLite (file-based, auto-created) |
| ORM | SQLAlchemy |
| AI | Google Gemini API (`gemini-pro`) |
| News Ingestion | feedparser (RSS/Atom) |
| Frontend | Jinja2 templates, custom CSS, vanilla JavaScript |
| Typography | Inter (Google Fonts) |

---

## 6. Data Model

Four database tables:

| Table | Purpose | Records |
|---|---|---|
| `StudentVisaInfo` | Primary student visa details (F-1, Student Route) | 2 (seeded) |
| `LongTermImmigration` | Work visa, residency, citizenship pathways | 6 (seeded) |
| `NewsUpdate` | Cached RSS articles (deduplicated, pruned to 200 max) | Dynamic |
| `AppStatus` | Key-value metadata (e.g., last refresh timestamp) | Dynamic |

---

## 7. Configuration & Environment

| Variable | Required | Purpose |
|---|---|---|
| `GEMINI_API_KEY` | Yes (for chatbot) | Google Gemini API authentication |
| `FLASK_SECRET_KEY` | No | Session signing (auto-generated if absent) |
| `FLASK_ENV` | No | Flask environment mode |
| `DEBUG` | No | Debug mode toggle |

---

## 8. Current Limitations

| Limitation | Impact | Mitigation |
|---|---|---|
| US and UK only | No support for other destination countries | Hardcoded; would require data + model expansion |
| SQLite database | Not suitable for high concurrency (>100 users) | Adequate for current scale; PostgreSQL migration path exists |
| Synchronous request handling | Chatbot requests block during Gemini API calls | Acceptable at current traffic; async framework upgrade possible |
| No user accounts | No saved preferences or session history | "Coming Soon" tailored information feature hints at this |
| No explicit rate limiting | Chatbot could be abused | Relies on Gemini API quotas; server-side rate limiting recommended before launch |
| AI hallucination risk | Chatbot may provide outdated or incorrect information | Disclaimer present; human review layer recommended for production |

---

## 9. Roadmap Indicators

Based on UI elements and architecture, the following features appear planned:

1. **"Tailored Information" (Coming Soon card on Home page)** - Likely origin-specific guidance beyond the chatbot
2. **Expanded country support** - Architecture supports adding countries to `TARGET_COUNTRIES`
3. **Pagination UI** - Backend pagination is implemented but not yet exposed in the news page template
4. **User accounts / preferences** - Natural next step given the personalization direction

---

## 10. Legal & Compliance

- All pages include a footer disclaimer: *"Regulatory data is informational only and not legal advice"*
- Chatbot responses carry an additional AI-generated content disclaimer
- The `.env` file containing the API key is excluded from version control
- RSS feed User-Agent string identifies the application: `StudentAtlas/1.0`
