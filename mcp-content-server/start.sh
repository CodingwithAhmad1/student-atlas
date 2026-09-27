#!/bin/bash
# Start the Student Atlas content MCP server over SSE (for remote MCP clients).
# Binds 127.0.0.1:8765 by default; pass --host 0.0.0.0 to expose it on the network.
# Requires CONTENT_MCP_PASSWORD in mcp-content-server/.env; clients call `authenticate` first.
#
# For local Claude Code use stdio instead — see .mcp.json.example.

cd "$(dirname "$0")"
exec python3 server.py "$@"
