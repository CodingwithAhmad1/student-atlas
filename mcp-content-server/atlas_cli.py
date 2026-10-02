#!/usr/bin/env python3
"""Command-line access to the content server's review tools.

For sessions that cannot attach the MCP server (the weekly cloud review
routine, see ../monitoring/REVIEW-POLICY.md). Each command calls the same
function the MCP tool does, with stdio semantics (no password).

    python3 atlas_cli.py list                         # commands and their arguments
    python3 atlas_cli.py list_alerts
    python3 atlas_cli.py get_alert --alert_id 20260928-1144--dfe-lk-faqs
    python3 atlas_cli.py apply_edits --edits @/tmp/edits.json --alert_id ...
    python3 atlas_cli.py resolve_alert --alert_id ... --outcome approved --note "..."

A value starting with "@" is read from that file (handy for JSON with quotes).
List/dict/int/bool arguments are parsed from their text form.

Edits recorded by apply_edits are kept in .review-edits.json (gitignored) until
resolve_alert records them in the alert, since every command is a new process.
"""

from __future__ import annotations

import inspect
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import server  # noqa: E402

STATE_FILE = HERE / ".review-edits.json"

# Review and read-only tools. Tools that create or delete files, or add sources
# (create_nationality, write_content_file, delete_nationality, add_citations),
# are deliberately not exposed: the routine may not add new sources.
COMMANDS = (
    "list_alerts", "get_alert", "refresh_alert", "apply_edits", "resolve_alert",
    "check_trait_column", "set_trait_column", "set_trait", "trait_coverage",
    "search_content", "read_content_file", "get_block_ids", "get_profile_block_ids",
    "get_nationality_summary", "add_callout", "remove_callout", "validate_content",
)


def _params(fn) -> list[inspect.Parameter]:
    return [p for p in inspect.signature(fn).parameters.values() if p.name != "ctx"]


def _convert(raw: str, annotation: object) -> object:
    if raw.startswith("@"):
        raw = Path(raw[1:]).read_text()
    kind = str(annotation)
    if kind.startswith(("list", "dict")):
        return json.loads(raw)
    if kind == "int":
        return int(raw)
    if kind == "bool":
        return raw.strip().lower() in ("1", "true", "yes")
    return raw


def parse_args(fn, argv: list[str]) -> dict[str, object]:
    params = {p.name: p for p in _params(fn)}
    kwargs: dict[str, object] = {}
    i = 0
    while i < len(argv):
        flag = argv[i]
        name = flag[2:].replace("-", "_") if flag.startswith("--") else ""
        if name not in params:
            raise SystemExit(f"Unknown argument {flag!r}; expected one of: " + ", ".join(f"--{n}" for n in params))
        if i + 1 >= len(argv):
            raise SystemExit(f"Missing value for {flag}")
        kwargs[name] = _convert(argv[i + 1], params[name].annotation)
        i += 2
    missing = [n for n, p in params.items() if p.default is inspect.Parameter.empty and n not in kwargs]
    if missing:
        raise SystemExit("Missing required argument(s): " + ", ".join(f"--{n}" for n in missing))
    return kwargs


def _load_state() -> None:
    if STATE_FILE.exists():
        server._review_edits.update(json.loads(STATE_FILE.read_text()))


def _save_state() -> None:
    if server._review_edits:
        STATE_FILE.write_text(json.dumps(server._review_edits, indent=2, ensure_ascii=False))
    elif STATE_FILE.exists():
        STATE_FILE.unlink()


def usage() -> str:
    lines = ["Commands:"]
    for name in COMMANDS:
        fn = getattr(server, name)
        args = " ".join(
            f"--{p.name} <{p.annotation}>" if p.default is inspect.Parameter.empty else f"[--{p.name} <{p.annotation}>]"
            for p in _params(fn)
        )
        lines.append(f"  {name} {args}".rstrip())
    return "\n".join(lines)


def run(argv: list[str]) -> str:
    if not argv or argv[0] in ("list", "help", "-h", "--help"):
        return usage()
    name = argv[0]
    if name not in COMMANDS:
        raise SystemExit(f"Unknown command {name!r}.\n{usage()}")
    fn = getattr(server, name)
    kwargs = parse_args(fn, argv[1:])
    server._auth_required = False  # stdio semantics: the caller already has file access
    _load_state()
    try:
        return fn(ctx=None, **kwargs)
    finally:
        _save_state()


def main() -> None:
    out = run(sys.argv[1:])
    print(out)
    if isinstance(out, str) and out.startswith("Error"):
        sys.exit(1)


if __name__ == "__main__":
    main()
