# Student Atlas

Personalised visa and immigration guidance for international students. Users select their nationality and destination countries to receive tailored information on tourist visas, student visas, work visas, and residency pathways.

## Project Structure

```
Student Atlas/
├── HANDBOOK.md         # Structure, check-ups, manual tasks, launch checklist
├── frontend/           # React + TypeScript + Vite (main app — static content from data files)
├── monitoring/         # Source-change watcher, detection only (see monitoring/README.md)
├── mcp-content-server/ # MCP server: alert review + content editing
└── archive/            # Retired Flask app, unused backend, old docs (see archive/README.md)
```

## Frontend

React 19, TypeScript, Vite 8, Tailwind CSS 4, shadcn/ui. The app is a static SPA; visa content is compiled from TypeScript modules under `frontend/src/data/`.

```bash
cd frontend
npm install
npm run dev
npm run build          # content check + type-check + production build
npm run check:content  # citations, glossary terms, callout anchors, profiles
```

### Content System

Four layers, merged for the reader's nationality:

1. **Traits** (`src/data/traits/`) — a 100 × 20 table of nationality facts, each column read from one official list page, plus the rules that turn it into generated callouts and profile swaps
2. **Base content** (`src/data/sections/`) — nationality-agnostic visa info
3. **Profiles** (`src/data/profiles/`) — alternative content blocks (ETA, ESTA, eVisitor, domestic)
4. **Nationality overlays** (`src/data/nationalities/`) — hand-written, cited callouts per nationality

See `src/data/CONTENT-GUIDE.md` for the content workflow and `HANDBOOK.md` for the whole system.

### Supported nationalities

The 100 most populous nationalities (UN mid-2023), in three depth tiers; every
one has the full 19-trait row. See `HANDBOOK.md` for how the content, checks
and manual reviews fit together.

## Source Monitoring & Activity Feed

A GitHub Actions cron (every 12 hours) watches every cited government page and
records substantive changes as alerts (one open alert per page). Alerts are
reviewed in a Claude session through the content MCP server: see the change next
to every passage citing that source, apply any needed edit (type-checked), and
record the outcome. Everything shows on the app's **Activity** tab. State
(snapshots, alerts, source health) is committed to the repo — there is no
database and no secrets. Details: [`monitoring/README.md`](monitoring/README.md).

Because monitoring data is bundled at build time, the deployed site must
rebuild on pushes to `main` for new activity to appear.

## MCP Content Server

Python FastMCP server (`mcp-content-server/`) for alert review and content
editing. Locally, connect Claude Code over stdio — copy
`mcp-content-server/.mcp.json.example` to `Student Atlas/.mcp.json`. For remote
clients, `./start.sh` serves SSE on `127.0.0.1:8765` (password in
`mcp-content-server/.env`).

```bash
cd mcp-content-server
pip install -r requirements.txt
python3 -m unittest discover tests   # tool tests (uses the real TypeScript compiler)
```

See `frontend/src/data/CONTENT-GUIDE.md` for the review workflow and tool reference.

## Quick Start

```bash
# From the project root — starts the Vite dev server only
npm start
```

This runs the frontend at `http://localhost:5173`.

## Branding

The application uses a compass pin logo — a map location pin containing an 8-point compass rose with gold intercardinal accents and a red north needle. The sidebar features a vertical/horizontal lines toggle for collapsing navigation.
