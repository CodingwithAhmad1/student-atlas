#!/bin/bash
set -e

# Kill background jobs on exit
trap 'kill $(jobs -p) 2>/dev/null' EXIT

echo "Starting FastAPI backend on http://localhost:8000 ..."
# Limit autoreload scope to backend code to avoid watching frontend/node_modules.
uvicorn backend.main:app --reload --reload-dir backend &

echo "Starting Vite frontend on http://localhost:5173 ..."
cd frontend && npm run dev
