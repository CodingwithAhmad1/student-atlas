# Student Atlas

Personalised visa and immigration guidance for international students. Users select their nationality and destination countries to receive tailored information on tourist visas, student visas, work visas, and residency pathways.

## Project Structure

```
Student Atlas/
├── frontend/           # React + TypeScript + Vite (main app — static content from data files)
├── monitoring/         # Source-change watcher + LLM drafting pipeline (see monitoring/README.md)
├── backend/            # SQLAlchemy schema + DB wiring (reference; no runtime API)
├── mcp-content-server/ # MCP server for external content management
├── docs/               # Product document, content specification
└── archive/            # Legacy Flask app + retired Supabase schema (preserved for reference)
```

## Frontend

React 19, TypeScript, Vite 8, Tailwind CSS 4, shadcn/ui. The app is a static SPA; visa content is compiled from TypeScript modules under `frontend/src/data/`.

```bash
cd frontend
npm install
npm run dev
```

### Content System

Three-layer overlay architecture for scalable multi-nationality content:

1. **Base content** (`src/data/sections/`) — nationality-agnostic visa info
2. **Profiles** (`src/data/profiles/`) — reusable alternative visa paths (ETA, VWP, domestic)
3. **Nationality overlays** (`src/data/nationalities/`) — per-nationality callouts and profile references

See `src/data/CONTENT-GUIDE.md` for the full content management workflow.

### Currently supported nationalities

UAE, Pakistan, India, China, United Kingdom

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

## Database schema (reference)

SQLAlchemy models and async session setup live under `backend/` (`models.py`, `database.py`, `requirements.txt`) for schema reference and optional tooling. There is **no** FastAPI runtime in this repo; the published site does not require a hosted application backend.

## Quick Start

```bash
# From the project root — starts the Vite dev server only
npm start
```

This runs the frontend at `http://localhost:5173`.

## Branding

The application uses a compass pin logo — a map location pin containing an 8-point compass rose with gold intercardinal accents and a red north needle. The sidebar features a vertical/horizontal lines toggle for collapsing navigation.
