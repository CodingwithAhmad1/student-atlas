#!/bin/bash
set -e

# Kill background jobs on exit
trap 'kill $(jobs -p) 2>/dev/null' EXIT

echo "Starting FastAPI backend on http://localhost:8000 ..."
uvicorn backend.main:app --reload &

echo "Starting Vite frontend on http://localhost:5173 ..."
cd frontend && npm run dev
