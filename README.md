# Student Atlas

Personalised visa and immigration guidance for international students. Users select their nationality and destination countries to receive tailored information on tourist visas, student visas, work visas, and residency pathways.

## Project Structure

```
Student Atlas/
├── frontend/           # React + TypeScript + Vite (main app — static content from data files)
├── backend/            # SQLAlchemy schema + DB wiring (reference; no runtime API)
├── mcp-content-server/ # MCP server for external content management
├── docs/               # Product document, content specification
└── archive/            # Legacy Flask app files (preserved for reference)
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

## MCP Content Server

Python FastMCP server with 21 tools for managing content without direct code access.

```bash
cd mcp-content-server
pip install -r requirements.txt
./start.sh  # SSE mode on port 8765
```

See `frontend/src/data/CONTENT-GUIDE.md` for tool reference.

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
