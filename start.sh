#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
echo "Starting Vite frontend on http://localhost:5173 ..."
cd "$ROOT/frontend" && npm run dev
