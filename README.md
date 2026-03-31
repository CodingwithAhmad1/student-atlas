# Student Atlas

Visa and immigration guidance for parents of international students, covering the US, UK, and Australia.

## Project Structure

```
Student Atlas/
├── frontend/          # React + TypeScript + Vite (main app)
├── backend/           # FastAPI backend (minimal stub)
├── mcp-content-server/# MCP server for external content management
├── docs/              # Product document, content specification
└── archive/           # Legacy Flask app files (preserved for reference)
```

## Frontend

React 19, TypeScript, Vite 8, Tailwind CSS 4, shadcn/ui.

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

## Backend

FastAPI stub — currently minimal. The frontend serves most content statically from TypeScript data files.

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
