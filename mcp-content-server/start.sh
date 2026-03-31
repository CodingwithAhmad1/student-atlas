#!/bin/bash
# Start the Student Atlas Content MCP Server (SSE mode for external access)
# Default port: 8765. Override with --port <number>
#
# External users connect their MCP client to: http://<your-ip>:8765/sse
# Password: set CONTENT_MCP_PASSWORD in .env

cd "$(dirname "$0")"
python3 server.py "$@"
