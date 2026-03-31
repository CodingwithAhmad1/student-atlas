#!/usr/bin/env python3
"""Student Atlas Content Management MCP Server.

Provides tools for external users to manage visa/immigration guidance
content for the Student Atlas application. Requires password authentication.

Run:
    python server.py                    # SSE transport on port 8765
    python server.py --transport stdio  # stdio transport (for local Claude Code)
"""

import json
import os
import re
import subprocess
import sys
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from mcp.server.fastmcp import FastMCP

# ── Load environment ──
load_dotenv(Path(__file__).parent / ".env")

# ── Configuration ──
BASE_DIR = Path(__file__).parent.parent / "frontend" / "src"
DATA_DIR = BASE_DIR / "data"
PASSWORD = os.environ.get("CONTENT_MCP_PASSWORD", "")

# Per-connection auth state (safe for single-user SSE server)
_authenticated = False

# ── Server setup ──
mcp = FastMCP(
    "student-atlas-content",
    instructions=(
        "Student Atlas Content Management Server.\n\n"
        "You MUST call 'authenticate' with the correct password before "
        "using any other tools.\n\n"
        "The content system has three layers:\n"
        "1. Base content (data/sections/*.ts) — nationality-agnostic\n"
        "2. Profiles (data/profiles/*.ts) — shared visa path content\n"
        "3. Nationality overlays (data/nationalities/*.ts) — per-nationality callouts\n\n"
        "When adding a nationality, check existing profiles first to avoid duplication.\n\n"
        "For a complete workflow guide, call: read_content_file('CONTENT-GUIDE.md')"
    ),
)


# ── Helpers ──────────────────────────────────────────────────────


def require_auth():
    if not _authenticated:
        raise ValueError(
            "Not authenticated. Call 'authenticate' with the correct password first."
        )


def safe_path(relative: str) -> Path:
    """Resolve within DATA_DIR; prevent traversal."""
    resolved = (DATA_DIR / relative).resolve()
    data_resolved = DATA_DIR.resolve()
    if not str(resolved).startswith(str(data_resolved)):
        raise ValueError("Path must stay within the data directory.")
    return resolved


SECTION_FILES = {
    "visit": "tourist-visa.ts",
    "student": "student-visa.ts",
    "work": "work-visa.ts",
    "residency": "residency-pathway.ts",
}

PROTECTED_FILES = {"types.ts", "merge-content.ts", "sections/index.ts"}


def json_to_ts(obj: object, indent: int = 0) -> str:
    """Convert a Python/JSON object to TypeScript literal syntax."""
    pad = "  " * indent
    inner = "  " * (indent + 1)

    if isinstance(obj, dict):
        if not obj:
            return "{}"
        items = []
        for k, v in obj.items():
            # Use unquoted keys if valid JS identifiers, else quoted
            if re.match(r"^[a-zA-Z_$][a-zA-Z0-9_$]*$", str(k)):
                items.append(f"{inner}{k}: {json_to_ts(v, indent + 1)},")
            else:
                items.append(f'{inner}"{k}": {json_to_ts(v, indent + 1)},')
        return "{\n" + "\n".join(items) + f"\n{pad}}}"

    if isinstance(obj, list):
        if not obj:
            return "[]"
        # For simple string lists, keep compact
        if all(isinstance(x, str) for x in obj):
            items_str = ", ".join(f'"{x}"' for x in obj)
            if len(items_str) < 80:
                return f"[{items_str}]"
        items = [f"{inner}{json_to_ts(v, indent + 1)}," for v in obj]
        return "[\n" + "\n".join(items) + f"\n{pad}]"

    if isinstance(obj, str):
        # Escape for TS string
        escaped = obj.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")
        return f'"{escaped}"'

    if isinstance(obj, bool):
        return "true" if obj else "false"

    if isinstance(obj, (int, float)):
        return str(obj)

    return str(obj)


# ── Authentication ───────────────────────────────────────────────


@mcp.tool()
def authenticate(password: str) -> str:
    """Authenticate to the content management system.

    Must be called before any other tool. Requires the 10-character
    alphanumeric password.

    Args:
        password: The authentication password (10 characters, letters and digits).

    Returns:
        Success or failure message.
    """
    global _authenticated
    if not PASSWORD:
        return "Error: Server password not configured. Set CONTENT_MCP_PASSWORD in .env."
    if password == PASSWORD:
        _authenticated = True
        return "Authenticated successfully. You may now use all content management tools."
    return "Authentication failed. Incorrect password."


# ── Reading & Navigation ────────────────────────────────────────


@mcp.tool()
def get_content_overview() -> str:
    """Get a complete overview of sections, nationalities, and profiles.

    Call this first to understand the content structure before making changes.

    Returns:
        Formatted overview of the entire content system.
    """
    require_auth()

    lines: list[str] = ["# Student Atlas Content Overview\n"]

    # ── Sections ──
    lines.append("## Sections (base content)\n")
    sections_dir = DATA_DIR / "sections"
    if sections_dir.exists():
        for f in sorted(sections_dir.glob("*.ts")):
            if f.name == "index.ts":
                continue
            content = f.read_text()
            slug_m = re.search(r'slug:\s*"([^"]+)"', content)
            title_m = re.search(r'title:\s*"([^"]+)"', content)
            slug = slug_m.group(1) if slug_m else f.stem
            title = title_m.group(1) if title_m else f.stem
            # sub-sections: find slug/title pairs after the first one
            ss_matches = re.findall(
                r'\{\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)"', content
            )
            lines.append(f"### {title}  (slug: `{slug}`,  file: `sections/{f.name}`)")
            for ss_slug, ss_title in ss_matches:
                if ss_slug == slug:
                    continue
                lines.append(f"  - `{ss_slug}` — {ss_title}")
            lines.append("")

    # ── Profiles ──
    lines.append("## Profiles (shared visa path content)\n")
    profiles_dir = DATA_DIR / "profiles"
    if profiles_dir.exists():
        for f in sorted(profiles_dir.glob("*.ts")):
            content = f.read_text()
            export_m = re.search(r"export const (\w+)", content)
            export_name = export_m.group(1) if export_m else f.stem
            keys = re.findall(r'"([^"]+)":\s*\[', content)
            ids = re.findall(r'id:\s*"([^"]+)"', content)
            lines.append(
                f"  - `profiles/{f.name}`  export: `{export_name}`  "
                f"subsections: {keys}  block-IDs: {ids}"
            )
    lines.append("")

    # ── Nationalities ──
    lines.append("## Nationalities (overlay files)\n")
    nat_dir = DATA_DIR / "nationalities"
    registered: set[str] = set()
    if nat_dir.exists():
        reg_file = nat_dir / "registry.ts"
        if reg_file.exists():
            reg_content = reg_file.read_text()
            entries = re.findall(r'name:\s*"([^"]+)",\s*slug:\s*"([^"]+)"', reg_content)
            for name, slug in entries:
                registered.add(slug)
                callout_count = 0
                nat_file = nat_dir / f"{slug}.ts"
                if nat_file.exists():
                    callout_count = len(
                        re.findall(r"afterBlockId:", nat_file.read_text())
                    )
                lines.append(
                    f"  - **{name}** (slug: `{slug}`, "
                    f"file: `nationalities/{slug}.ts`, "
                    f"callouts: {callout_count})"
                )
        for f in sorted(nat_dir.glob("*.ts")):
            if f.name in ("registry.ts", "index.ts"):
                continue
            if f.stem not in registered:
                lines.append(f"  - `nationalities/{f.name}` (NOT in registry)")
    lines.append("")

    # ── Countries ──
    lines.append("## Destination Countries\n")
    lines.append("  - US — United States")
    lines.append("  - UK — United Kingdom")
    lines.append("  - AU — Australia")

    return "\n".join(lines)


@mcp.tool()
def read_content_file(relative_path: str) -> str:
    """Read any file in the data directory.

    Args:
        relative_path: Path relative to frontend/src/data/
            Examples: "nationalities/pakistan.ts", "sections/tourist-visa.ts",
            "profiles/tourist-visa-uk-eta.ts", "types.ts", "nationalities/registry.ts"

    Returns:
        Complete file content, or an error listing available files.
    """
    require_auth()
    path = safe_path(relative_path)
    if not path.exists():
        parent = path.parent
        available = sorted(f.name for f in parent.iterdir() if f.is_file()) if parent.exists() else []
        return f"File not found: {relative_path}\nAvailable in {parent.name}/: {available}"
    return path.read_text()


@mcp.tool()
def search_content(query: str, file_pattern: str = "*.ts") -> str:
    """Search across content files for text or regex patterns.

    Args:
        query: Text or regex pattern to search for (case-insensitive).
        file_pattern: Glob pattern, e.g. "nationalities/*.ts" to narrow scope.

    Returns:
        Matching lines with file paths and line numbers.
    """
    require_auth()
    try:
        pattern = re.compile(query, re.IGNORECASE)
    except re.error as e:
        return f"Invalid regex: {e}"

    results: list[str] = []
    for f in sorted(DATA_DIR.rglob(file_pattern)):
        if not f.is_file():
            continue
        rel = f.relative_to(DATA_DIR)
        try:
            for i, line in enumerate(f.read_text().splitlines(), 1):
                if pattern.search(line):
                    results.append(f"{rel}:{i}  {line.strip()}")
        except Exception:
            continue

    if not results:
        return f"No matches for '{query}' in {file_pattern}"
    if len(results) > 60:
        return "\n".join(results[:60]) + f"\n\n... and {len(results) - 60} more matches"
    return "\n".join(results)


@mcp.tool()
def get_block_ids(
    section_slug: str,
    subsection_slug: str = "",
    country: str = "",
) -> str:
    """Get block IDs available for callout targeting.

    Every callout's afterBlockId must reference one of these IDs.

    Args:
        section_slug: e.g. "visit", "student", "work", "residency"
        subsection_slug: Optional filter, e.g. "entry-requirement", "documents"
        country: Optional filter — "US", "UK", or "AU". Empty for all.

    Returns:
        List of block IDs with their block types.
    """
    require_auth()

    filename = SECTION_FILES.get(section_slug)
    if not filename:
        return f"Unknown section '{section_slug}'. Valid: {list(SECTION_FILES.keys())}"
    filepath = DATA_DIR / "sections" / filename
    if not filepath.exists():
        return f"File not found: sections/{filename}"

    content = filepath.read_text()
    id_pat = re.compile(
        r'id:\s*"([^"]+)",\s*\n\s*block:\s*\{\s*\n?\s*type:\s*"([^"]+)"',
        re.MULTILINE,
    )

    # If subsection_slug given, narrow to that subsection's range
    search_content = content
    if subsection_slug:
        ss_pat = re.compile(
            r'slug:\s*"' + re.escape(subsection_slug) + r'"', re.MULTILINE
        )
        ss_match = ss_pat.search(content)
        if ss_match:
            start = ss_match.start()
            # Find next subsection or end of file
            next_ss = re.search(r'\bslug:\s*"[^"]+"', content[ss_match.end():])
            end = (ss_match.end() + next_ss.start()) if next_ss else len(content)
            search_content = content[start:end]
        else:
            return f"Subsection '{subsection_slug}' not found in {filename}."

    blocks = [{"id": m.group(1), "type": m.group(2)} for m in id_pat.finditer(search_content)]

    if not blocks:
        return f"No block IDs found in {filename}" + (f" / {subsection_slug}" if subsection_slug else "") + "."

    if country:
        prefix = country.lower() + "-"
        blocks = [b for b in blocks if b["id"].startswith(prefix) or b["id"].startswith("dual-") or b["id"].startswith("cross-")]

    header = f"Block IDs in {section_slug}"
    if subsection_slug:
        header += f" / {subsection_slug}"
    if country:
        header += f" / {country}"
    header += f" ({filename}):\n"
    return header + "\n".join(f"  - `{b['id']}` ({b['type']})" for b in blocks)


@mcp.tool()
def get_profile_block_ids(profile_file: str) -> str:
    """Get block IDs from a profile file.

    When a nationality uses a profile, callouts target the profile's
    block IDs instead of the base content IDs.

    Args:
        profile_file: e.g. "tourist-visa-uk-eta.ts"

    Returns:
        Block IDs grouped by subsection key.
    """
    require_auth()
    filepath = DATA_DIR / "profiles" / profile_file
    if not filepath.exists():
        available = sorted(f.name for f in (DATA_DIR / "profiles").glob("*.ts"))
        return f"Not found: {profile_file}\nAvailable: {available}"

    content = filepath.read_text()
    id_pat = re.compile(
        r'id:\s*"([^"]+)",\s*\n\s*block:\s*\{\s*\n?\s*type:\s*"([^"]+)"',
        re.MULTILINE,
    )
    keys = re.findall(r'"([^"]+)":\s*\[', content)
    ids = [(m.group(1), m.group(2)) for m in id_pat.finditer(content)]

    out = f"Profile: {profile_file}\nSubsection keys: {keys}\n\nBlock IDs:\n"
    out += "\n".join(f"  - `{bid}` ({btype})" for bid, btype in ids) if ids else "  (none)"
    return out


@mcp.tool()
def get_nationality_summary(slug: str) -> str:
    """Get a structured summary of a nationality's overlay.

    Shows profile usage, callout anchors, and file size without dumping
    the entire file.

    Args:
        slug: e.g. "uae", "pakistan", "india"

    Returns:
        Structured summary.
    """
    require_auth()
    filepath = DATA_DIR / "nationalities" / f"{slug}.ts"
    if not filepath.exists():
        available = sorted(
            f.stem
            for f in (DATA_DIR / "nationalities").glob("*.ts")
            if f.stem != "registry"
        )
        return f"{slug}.ts not found. Available: {available}"

    content = filepath.read_text()
    imports = re.findall(r"import .+", content)
    profile_usages = re.findall(r"profile:\s*(\w+)\[\"([^\"]+)\"\]", content)
    callout_ids = re.findall(r'afterBlockId:\s*"([^"]+)"', content)

    parts = [f"# Nationality: {slug}\n"]

    parts.append("## Imports")
    for imp in imports:
        parts.append(f"  {imp}")

    parts.append("\n## Profile usages")
    if profile_usages:
        for var, key in profile_usages:
            parts.append(f'  - {var}["{key}"]')
    else:
        parts.append("  (none — uses base content for all countries)")

    parts.append(f"\n## Callout anchors ({len(callout_ids)} total)")
    for cid in callout_ids:
        parts.append(f"  - `{cid}`")

    parts.append(
        f"\n## File\n  {len(content):,} characters, "
        f"{len(content.splitlines())} lines"
    )
    return "\n".join(parts)


@mcp.tool()
def compare_nationalities(slug_a: str, slug_b: str) -> str:
    """Compare two nationalities' overlay structures side by side.

    Useful when creating a nationality similar to an existing one.

    Args:
        slug_a: First nationality slug.
        slug_b: Second nationality slug.

    Returns:
        Comparison showing profiles, callout counts, and anchors.
    """
    require_auth()
    nat_dir = DATA_DIR / "nationalities"

    def analyse(slug: str) -> dict:
        f = nat_dir / f"{slug}.ts"
        if not f.exists():
            return {"error": f"{slug}.ts not found"}
        c = f.read_text()
        return {
            "profiles": re.findall(r"import \{ (\w+) \}", c),
            "callout_ids": re.findall(r'afterBlockId:\s*"([^"]+)"', c),
            "lines": len(c.splitlines()),
        }

    a, b = analyse(slug_a), analyse(slug_b)
    if "error" in a:
        return a["error"]
    if "error" in b:
        return b["error"]

    pa, pb = set(a["profiles"]), set(b["profiles"])
    ca, cb = set(a["callout_ids"]), set(b["callout_ids"])

    return (
        f"# {slug_a} vs {slug_b}\n\n"
        f"## {slug_a}\n"
        f"  Profiles: {a['profiles']}\n"
        f"  Callouts: {len(a['callout_ids'])}  |  Lines: {a['lines']}\n"
        f"  Anchors: {a['callout_ids']}\n\n"
        f"## {slug_b}\n"
        f"  Profiles: {b['profiles']}\n"
        f"  Callouts: {len(b['callout_ids'])}  |  Lines: {b['lines']}\n"
        f"  Anchors: {b['callout_ids']}\n\n"
        f"## Differences\n"
        f"  Profiles only in {slug_a}: {pa - pb or 'none'}\n"
        f"  Profiles only in {slug_b}: {pb - pa or 'none'}\n"
        f"  Anchors only in {slug_a}: {ca - cb or 'none'}\n"
        f"  Anchors only in {slug_b}: {cb - ca or 'none'}\n"
        f"  Shared anchors: {ca & cb or 'none'}"
    )


@mcp.tool()
def list_available_profiles() -> str:
    """List all profile files with exports, block IDs, and which nationalities use them.

    Returns:
        Detailed listing of every profile.
    """
    require_auth()
    profiles_dir = DATA_DIR / "profiles"
    if not profiles_dir.exists():
        return "No profiles directory."

    parts: list[str] = ["# Available Profiles\n"]
    for f in sorted(profiles_dir.glob("*.ts")):
        content = f.read_text()
        export_m = re.search(r"export const (\w+)", content)
        export_name = export_m.group(1) if export_m else "?"
        keys = re.findall(r'"([^"]+)":\s*\[', content)
        ids = re.findall(r'id:\s*"([^"]+)"', content)

        users: list[str] = []
        nat_dir = DATA_DIR / "nationalities"
        if nat_dir.exists():
            for nf in nat_dir.glob("*.ts"):
                if nf.name == "registry.ts":
                    continue
                if export_name in nf.read_text():
                    users.append(nf.stem)

        parts.append(
            f"### {f.name}\n"
            f"  Export: `{export_name}`\n"
            f"  Subsections: {keys}\n"
            f"  Block IDs: {ids}\n"
            f"  Used by: {users or '(none)'}\n"
        )

    return "\n".join(parts) if len(parts) > 1 else "No profile files found."


# ── Templates & Guidance ────────────────────────────────────────


@mcp.tool()
def get_content_schema() -> str:
    """Get the content block types, file structure rules, and workflow guide.

    Returns:
        Complete documentation on how content is structured.
    """
    require_auth()
    return """\
# Content Block Types

## paragraph
{ "type": "paragraph", "text": "Markdown text. **Bold**, *italic*. Use [CITE: id] for citations." }

## heading
{ "type": "heading", "level": 3, "text": "Heading text" }
Levels: 2 (major), 3 (sub), 4 (minor)

## key-value-list
{ "type": "key-value-list", "items": [{ "label": "Fee", "value": "$185" }] }

## bullet-list
{ "type": "bullet-list", "items": ["Item one", "Item two"] }

## ordered-list
{ "type": "ordered-list", "items": ["First", "Second"] }

## step
{ "type": "step", "number": 1, "title": "Title", "body": "Description" }

---

# Overlay Structure (nationality files)

```
NationalityOverlay = {
  [sectionSlug]: {
    [subsectionSlug]: {
      [Country]: {              // "US" | "UK" | "AU"
        profile?: blocks[],     // replaces base content entirely
        callouts: [{
          afterBlockId: "id",   // anchors to a base or profile block
          blocks: ContentBlock[]
        }]
      },
      _crossCutting: {          // for dual-nationality etc.
        callouts: [...]
      }
    }
  }
}
```

# Adding a Nationality
1. Call list_available_profiles() — check if existing profiles cover the visa path
2. Call create_nationality(name, slug, ...) — creates file + registry entry
3. Call get_block_ids() for each section to find callout anchors
4. Read the template file, add callouts, write it back with write_content_file()
5. Call validate_content() to check for TypeScript errors
"""


@mcp.tool()
def get_nationality_template(
    name: str,
    slug: str,
    uses_uk_eta: bool = False,
    uses_au_eta: bool = False,
) -> str:
    """Generate a TypeScript template for a new nationality overlay.

    Args:
        name: Full name (e.g. "Bangladesh").
        slug: URL-safe slug (e.g. "bangladesh").
        uses_uk_eta: True if this nationality uses UK ETA.
        uses_au_eta: True if this nationality uses AU ETA (Subclass 601).

    Returns:
        Complete .ts file content ready for customisation.
    """
    require_auth()

    imports = ['import type { NationalityOverlay } from "../types";']
    if uses_uk_eta:
        imports.append(
            'import { touristVisaUkEta } from "../profiles/tourist-visa-uk-eta";'
        )
    if uses_au_eta:
        imports.append(
            'import { touristVisaAuEta } from "../profiles/tourist-visa-au-eta";'
        )

    uk_ep = (
        'profile: touristVisaUkEta["entry-requirement"],\n        '
        if uses_uk_eta
        else ""
    )
    uk_ap = (
        'profile: touristVisaUkEta["how-to-apply"],\n        '
        if uses_uk_eta
        else ""
    )
    au_ep = (
        'profile: touristVisaAuEta["entry-requirement"],\n        '
        if uses_au_eta
        else ""
    )
    au_ap = (
        'profile: touristVisaAuEta["how-to-apply"],\n        '
        if uses_au_eta
        else ""
    )

    return f"""\
{chr(10).join(imports)}

const overlay: NationalityOverlay = {{
  // ── Tourist visa ──────────────────────────────────────────────
  visit: {{
    "entry-requirement": {{
      US: {{
        callouts: [
          // Use get_block_ids("visit", "entry-requirement", "US") to see anchors
        ],
      }},
      UK: {{
        {uk_ep}callouts: [
          // {"Target UK ETA profile block IDs" if uses_uk_eta else "Target UK SVV base block IDs"}
        ],
      }},
      AU: {{
        {au_ep}callouts: [
          // {"Target AU ETA profile block IDs" if uses_au_eta else "Target AU 600 base block IDs"}
        ],
      }},
    }},
    "how-to-apply": {{
      US: {{ callouts: [] }},
      UK: {{ {uk_ap}callouts: [] }},
      AU: {{ {au_ap}callouts: [] }},
    }},
  }},

  // ── Student visa ──────────────────────────────────────────────
  student: {{
    overview: {{
      US: {{ callouts: [] }},
      UK: {{ callouts: [] }},
      AU: {{ callouts: [] }},
    }},
    documents: {{
      US: {{ callouts: [] }},
      UK: {{ callouts: [] }},
      AU: {{ callouts: [] }},
    }},
    "application-process": {{
      US: {{ callouts: [] }},
      UK: {{ callouts: [] }},
      AU: {{ callouts: [] }},
    }},
    "after-arrival": {{
      US: {{ callouts: [] }},
      UK: {{ callouts: [] }},
      AU: {{ callouts: [] }},
    }},
  }},

  // ── Work visa ─────────────────────────────────────────────────
  work: {{
    "post-study-work": {{
      US: {{ callouts: [] }},
      UK: {{ callouts: [] }},
      AU: {{ callouts: [] }},
    }},
    "getting-sponsored": {{
      US: {{ callouts: [] }},
      UK: {{ callouts: [] }},
      AU: {{ callouts: [] }},
    }},
  }},

  // ── Residency ─────────────────────────────────────────────────
  residency: {{
    "permanent-residency": {{
      US: {{ callouts: [] }},
      UK: {{ callouts: [] }},
      AU: {{ callouts: [] }},
    }},
    "dual-nationality": {{
      _crossCutting: {{
        callouts: [
          // {name}'s dual nationality stance
          // Use get_block_ids("residency", "dual-nationality") to see anchors
        ],
      }},
    }},
  }},
}};

export default overlay;
"""


# ── Writing & Modification ──────────────────────────────────────


@mcp.tool()
def create_nationality(
    name: str,
    slug: str,
    uses_uk_eta: bool = False,
    uses_au_eta: bool = False,
) -> str:
    """Create a new nationality with overlay file and registry entry.

    Creates nationalities/{slug}.ts from template and adds to registry.ts.

    Args:
        name: Full name matching the dropdown (e.g. "Bangladesh").
        slug: URL slug (e.g. "bangladesh").
        uses_uk_eta: Whether to import the UK ETA profile.
        uses_au_eta: Whether to import the AU ETA profile.

    Returns:
        Summary of created files and next steps.
    """
    require_auth()

    nat_dir = DATA_DIR / "nationalities"
    filepath = nat_dir / f"{slug}.ts"
    registry = nat_dir / "registry.ts"

    if filepath.exists():
        return f"Error: nationalities/{slug}.ts already exists."

    # Write the nationality file
    template = get_nationality_template(name, slug, uses_uk_eta, uses_au_eta)
    filepath.write_text(template)

    # Update registry
    if registry.exists():
        reg_content = registry.read_text()
        if f'slug: "{slug}"' in reg_content:
            return (
                f"Warning: '{slug}' already in registry. "
                f"File created at nationalities/{slug}.ts"
            )
        entry = (
            f'  {{\n'
            f'    name: "{name}",\n'
            f'    slug: "{slug}",\n'
            f'    load: () => import("./{slug}"),\n'
            f"  }},"
        )
        reg_content = reg_content.replace("];", f"{entry}\n];")
        registry.write_text(reg_content)

    return (
        f"Created nationality: {name} ({slug})\n\n"
        f"Files:\n"
        f"  + nationalities/{slug}.ts (template with empty callouts)\n"
        f"  ~ nationalities/registry.ts (entry added)\n\n"
        f"Next steps:\n"
        f"  1. get_block_ids() — find anchor points for callouts\n"
        f"  2. read_content_file('nationalities/{slug}.ts') — see the template\n"
        f"  3. Edit callouts, then write_content_file() to save\n"
        f"  4. validate_content() — check for TypeScript errors\n"
        f"  5. Add '{name}' to the nationality dropdown if not already there"
    )


@mcp.tool()
def write_content_file(relative_path: str, content: str) -> str:
    """Write or overwrite a content file.

    IMPORTANT: This replaces the entire file. Always read_content_file()
    first, modify, then write the full file back.

    Args:
        relative_path: Path relative to frontend/src/data/
        content: Complete file content to write.

    Returns:
        Confirmation with character count.
    """
    require_auth()

    if relative_path in PROTECTED_FILES:
        return f"Error: {relative_path} is a protected infrastructure file."
    if not (relative_path.endswith(".ts") or relative_path.endswith(".md")):
        return "Error: Only .ts and .md files may be written."

    path = safe_path(relative_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content)
    return f"Written: {relative_path} ({len(content):,} characters, {len(content.splitlines())} lines)"


@mcp.tool()
def delete_nationality(slug: str) -> str:
    """Remove a nationality file and its registry entry.

    Args:
        slug: The nationality slug to remove.

    Returns:
        Confirmation or error.
    """
    require_auth()

    nat_dir = DATA_DIR / "nationalities"
    filepath = nat_dir / f"{slug}.ts"
    registry = nat_dir / "registry.ts"

    if not filepath.exists():
        return f"Error: nationalities/{slug}.ts not found."

    line_count = len(filepath.read_text().splitlines())

    # Remove from registry
    if registry.exists():
        reg = registry.read_text()
        # Remove the { name: ..., slug: "...", load: ... }, block
        reg = re.sub(
            r"\s*\{\s*name:\s*\"[^\"]*\",\s*slug:\s*\""
            + re.escape(slug)
            + r"\".*?\},?\n?",
            "\n",
            reg,
            flags=re.DOTALL,
        )
        registry.write_text(reg)

    filepath.unlink()
    return (
        f"Deleted '{slug}' ({line_count} lines)\n"
        f"  - nationalities/{slug}.ts\n"
        f"  - Registry entry removed"
    )


@mcp.tool()
def validate_content() -> str:
    """Run TypeScript type-checking on all content files.

    Returns:
        'Passed' or a list of type errors.
    """
    require_auth()

    frontend_dir = BASE_DIR.parent  # frontend/
    try:
        result = subprocess.run(
            ["npx", "tsc", "--noEmit"],
            cwd=str(frontend_dir),
            capture_output=True,
            text=True,
            timeout=60,
        )
    except FileNotFoundError:
        return "Error: npx/tsc not found. Is Node.js installed?"
    except subprocess.TimeoutExpired:
        return "Error: TypeScript check timed out (60 s)."

    if result.returncode == 0:
        return "TypeScript validation passed — no errors."

    output = (result.stdout + result.stderr).strip()
    lines = output.splitlines()
    if len(lines) > 40:
        return "\n".join(lines[:40]) + f"\n\n... and {len(lines) - 40} more lines"
    return f"TypeScript errors:\n{output}"


@mcp.tool()
def add_nationality_to_dropdown(name: str) -> str:
    """Add a nationality to the countries dropdown list (countries.ts).

    Also checks the nationality registry status.

    Args:
        name: Full country name exactly as it should appear (e.g. "China", "United Kingdom").

    Returns:
        Status of what was added/found.
    """
    require_auth()

    results: list[str] = []

    # Check registry
    reg_file = DATA_DIR / "nationalities" / "registry.ts"
    in_registry = False
    if reg_file.exists():
        if f'name: "{name}"' in reg_file.read_text():
            in_registry = True
            results.append(f"Registry: '{name}' is registered.")
        else:
            results.append(f"Registry: '{name}' NOT registered. Use create_nationality() first.")

    # Check and add to countries.ts
    countries_file = DATA_DIR / "countries.ts"
    if countries_file.exists():
        content = countries_file.read_text()
        if f'"{name}"' in content:
            results.append(f"Dropdown: '{name}' already in countries.ts.")
        else:
            # Add in alphabetical order
            # Find all existing country names
            existing = re.findall(r'"([^"]+)"', content)
            existing.append(name)
            existing.sort()

            # Rebuild the array
            items = ",\n  ".join(f'"{c}"' for c in existing)
            new_content = re.sub(
                r'\[[\s\S]*\]',
                f'[\n  {items},\n]',
                content,
                count=1,
            )
            countries_file.write_text(new_content)
            results.append(f"Dropdown: Added '{name}' to countries.ts (alphabetical order).")
    else:
        results.append("Warning: countries.ts not found.")

    return "\n".join(results)


# ── Targeted Content Editing ────────────────────────────────────


@mcp.tool()
def add_callout(
    slug: str,
    section_slug: str,
    subsection_slug: str,
    country: str,
    after_block_id: str,
    blocks: str,
) -> str:
    """Add a callout to a nationality overlay without rewriting the full file.

    This is the primary tool for adding content to nationality overlays.
    Each callout is inserted after a specific block in the base/profile content.

    Args:
        slug: Nationality slug (e.g. "pakistan", "china").
        section_slug: e.g. "visit", "student", "work", "residency".
        subsection_slug: e.g. "entry-requirement", "documents", "dual-nationality".
        country: "US", "UK", "AU", or "_crossCutting".
        after_block_id: Block ID to insert after (from get_block_ids or get_profile_block_ids).
        blocks: JSON array of IdentifiedBlock objects. Each object has:
            - "id" (optional): block ID string
            - "block": { "type": "paragraph"|"heading"|"bullet-list"|..., ...props }
            Example: [{"id": "cn-us-note", "block": {"type": "paragraph", "text": "Chinese nationals..."}}]

    Returns:
        Confirmation or error.
    """
    require_auth()

    try:
        blocks_data = json.loads(blocks)
    except json.JSONDecodeError as e:
        return f"Invalid JSON in blocks: {e}"

    if not isinstance(blocks_data, list) or not blocks_data:
        return "blocks must be a non-empty JSON array."

    filepath = DATA_DIR / "nationalities" / f"{slug}.ts"
    if not filepath.exists():
        return f"Error: nationalities/{slug}.ts not found. Create it first with create_nationality()."

    content = filepath.read_text()

    # Build the callout TS code
    callout_blocks_ts = []
    for b in blocks_data:
        callout_blocks_ts.append(json_to_ts(b, 5))

    callout_ts = (
        f"          {{\n"
        f'            afterBlockId: "{after_block_id}",\n'
        f"            blocks: [\n"
        + "\n".join(f"              {bt}," for bt in callout_blocks_ts)
        + "\n"
        f"            ],\n"
        f"          }}"
    )

    # Find the right location: section > subsection > country > callouts array
    # Strategy: find the country/crossCutting key, then find its callouts array
    if country == "_crossCutting":
        # Pattern: _crossCutting: { callouts: [
        loc_pattern = (
            r'("' + re.escape(subsection_slug) + r'":\s*\{[^}]*?'
            r'_crossCutting:\s*\{[^}]*?callouts:\s*\[)'
        )
    else:
        # Pattern: subsection > country > callouts
        # We need to find the right section context first
        loc_pattern = (
            r'("' + re.escape(subsection_slug) + r'":\s*\{[^}]*?'
            + re.escape(country) + r':\s*\{[^}]*?callouts:\s*\[)'
        )

    # Use a more robust approach: find section, then subsection, then country
    # Step 1: find section block
    section_pat = re.compile(
        r'(?:^|\n)\s*(?://[^\n]*\n\s*)?' + re.escape(section_slug) + r'\s*:\s*\{',
        re.MULTILINE,
    )
    section_match = section_pat.search(content)
    if not section_match:
        return f"Error: section '{section_slug}' not found in {slug}.ts"

    # Step 2: find subsection within section
    search_from = section_match.end()
    subsection_pat = re.compile(
        r'(?:"' + re.escape(subsection_slug) + r'"|\b' + re.escape(subsection_slug) + r')\s*:\s*\{',
    )
    sub_match = subsection_pat.search(content, search_from)
    if not sub_match:
        return f"Error: subsection '{subsection_slug}' not found under section '{section_slug}'"

    # Step 3: find country/crossCutting within subsection
    search_from2 = sub_match.end()
    if country == "_crossCutting":
        country_pat = re.compile(r'_crossCutting:\s*\{')
    else:
        country_pat = re.compile(re.escape(country) + r':\s*\{')
    country_match = country_pat.search(content, search_from2)
    if not country_match:
        return f"Error: country '{country}' not found under '{section_slug}/{subsection_slug}'"

    # Step 4: find the callouts array
    search_from3 = country_match.end()
    callouts_pat = re.compile(r'callouts:\s*\[')
    callouts_match = callouts_pat.search(content, search_from3)
    if not callouts_match:
        return f"Error: callouts array not found for {section_slug}/{subsection_slug}/{country}"

    # Step 5: find the closing bracket of the callouts array
    insert_pos = callouts_match.end()

    # Check if the array is empty (just whitespace/comments before ])
    after_bracket = content[insert_pos:]
    empty_match = re.match(r'\s*(?://[^\n]*\n\s*)*\]', after_bracket)

    if empty_match:
        # Empty array — insert the callout
        new_content = (
            content[:insert_pos]
            + "\n" + callout_ts + ",\n        "
            + content[insert_pos + empty_match.end() - 1:]  # keep the ]
        )
    else:
        # Array has existing callouts — append before closing ]
        # Find the matching ] for this array
        bracket_depth = 1
        pos = insert_pos
        while pos < len(content) and bracket_depth > 0:
            if content[pos] == '[':
                bracket_depth += 1
            elif content[pos] == ']':
                bracket_depth -= 1
            pos += 1
        close_pos = pos - 1  # position of the ]

        before = content[:close_pos].rstrip().rstrip(",")
        new_content = (
            before
            + ",\n" + callout_ts + ",\n        "
            + content[close_pos:]
        )

    filepath.write_text(new_content)
    block_ids = [b.get("id", "(anonymous)") for b in blocks_data]
    return (
        f"Added callout to {slug}/{section_slug}/{subsection_slug}/{country}\n"
        f"  afterBlockId: {after_block_id}\n"
        f"  blocks: {block_ids}\n"
        f"  File updated: nationalities/{slug}.ts"
    )


@mcp.tool()
def update_callout(slug: str, block_id: str, new_block: str) -> str:
    """Update an existing callout block by its ID.

    Finds the block with the given ID in the nationality file and replaces
    its block content.

    Args:
        slug: Nationality slug (e.g. "pakistan").
        block_id: The ID of the block to update.
        new_block: JSON object for the new block content.
            Example: {"type": "paragraph", "text": "Updated text here..."}

    Returns:
        Confirmation or error.
    """
    require_auth()

    try:
        block_data = json.loads(new_block)
    except json.JSONDecodeError as e:
        return f"Invalid JSON: {e}"

    filepath = DATA_DIR / "nationalities" / f"{slug}.ts"
    if not filepath.exists():
        return f"Error: nationalities/{slug}.ts not found."

    content = filepath.read_text()

    # Find the block by ID and replace the block: { ... } content
    # Pattern: { id: "block_id", block: { type: "...", ... } }
    # We need to find the id, then replace the block object
    id_pat = re.compile(r'id:\s*"' + re.escape(block_id) + r'"')
    id_match = id_pat.search(content)
    if not id_match:
        return f"Error: block ID '{block_id}' not found in {slug}.ts"

    # Find the block: { ... } after this id
    block_start_pat = re.compile(r'block:\s*\{', re.MULTILINE)
    block_start = block_start_pat.search(content, id_match.end())
    if not block_start:
        return f"Error: no block content found after id '{block_id}'"

    # Find matching closing brace
    brace_depth = 1
    pos = block_start.end()
    while pos < len(content) and brace_depth > 0:
        if content[pos] == '{':
            brace_depth += 1
        elif content[pos] == '}':
            brace_depth -= 1
        pos += 1

    # Replace the block content
    # Determine indentation
    line_start = content.rfind('\n', 0, block_start.start()) + 1
    base_indent = len(content[line_start:block_start.start()]) - len(content[line_start:block_start.start()].lstrip())
    block_ts = json_to_ts(block_data, base_indent // 2 + 1)
    new_content = content[:block_start.start()] + "block: " + block_ts + content[pos:]

    filepath.write_text(new_content)
    return (
        f"Updated block '{block_id}' in {slug}.ts\n"
        f"  New type: {block_data.get('type', '?')}"
    )


@mcp.tool()
def remove_callout(slug: str, block_id: str) -> str:
    """Remove a callout block by its ID from a nationality overlay.

    Removes the entire callout entry (afterBlockId + blocks) that contains
    the specified block ID.

    Args:
        slug: Nationality slug.
        block_id: The ID of a block within the callout to remove.

    Returns:
        Confirmation or error.
    """
    require_auth()

    filepath = DATA_DIR / "nationalities" / f"{slug}.ts"
    if not filepath.exists():
        return f"Error: nationalities/{slug}.ts not found."

    content = filepath.read_text()

    # Find the block ID
    id_pat = re.compile(r'id:\s*"' + re.escape(block_id) + r'"')
    id_match = id_pat.search(content)
    if not id_match:
        return f"Error: block ID '{block_id}' not found in {slug}.ts"

    # Walk backwards to find the containing callout object's opening {
    # Look for the afterBlockId that precedes this block
    before = content[:id_match.start()]
    callout_start_pat = re.compile(r'\{\s*\n\s*afterBlockId:', re.MULTILINE)
    starts = list(callout_start_pat.finditer(before))
    if not starts:
        return f"Error: could not find containing callout for block '{block_id}'"
    callout_start = starts[-1].start()

    # Find the matching closing brace for this callout object
    brace_depth = 0
    pos = callout_start
    while pos < len(content):
        if content[pos] == '{':
            brace_depth += 1
        elif content[pos] == '}':
            brace_depth -= 1
            if brace_depth == 0:
                pos += 1
                break
        pos += 1

    # Include trailing comma and whitespace
    while pos < len(content) and content[pos] in (',', ' ', '\n'):
        pos += 1

    # Remove the callout
    new_content = content[:callout_start] + content[pos:]
    filepath.write_text(new_content)

    return f"Removed callout containing block '{block_id}' from {slug}.ts"


@mcp.tool()
def add_citations(citations_json: str) -> str:
    """Add new citations to citations.ts without rewriting the full file.

    Args:
        citations_json: JSON object of new citations.
            Format: {"citation-id": {"url": "https://...", "label": "Description"}, ...}
            Example: {"uscis.gov/china-note": {"url": "https://uscis.gov/china", "label": "USCIS China Info"}}

    Returns:
        Confirmation with added citation IDs.
    """
    require_auth()

    try:
        new_citations = json.loads(citations_json)
    except json.JSONDecodeError as e:
        return f"Invalid JSON: {e}"

    if not isinstance(new_citations, dict):
        return "citations_json must be a JSON object {id: {url, label}, ...}"

    filepath = DATA_DIR / "citations.ts"
    if not filepath.exists():
        return "Error: citations.ts not found."

    content = filepath.read_text()

    # Build TS entries
    entries = []
    for cit_id, cit_data in new_citations.items():
        url = cit_data.get("url", "")
        label = cit_data.get("label", "")
        entries.append(
            f'  "{cit_id}": {{\n'
            f'    url: "{url}",\n'
            f'    label: "{label}",\n'
            f"  }},"
        )

    insert_block = "\n".join(entries)

    # Find the closing }; of the citations record
    # Insert before the last };
    close_match = re.search(r'\n\};?\s*$', content)
    if not close_match:
        return "Error: could not find end of citations record."

    new_content = (
        content[:close_match.start()]
        + "\n" + insert_block + "\n"
        + content[close_match.start():]
    )

    filepath.write_text(new_content)
    return f"Added {len(new_citations)} citation(s): {list(new_citations.keys())}"


@mcp.tool()
def set_profile(
    slug: str,
    section_slug: str,
    subsection_slug: str,
    country: str,
    profile_expression: str,
) -> str:
    """Set or update a profile on a nationality overlay entry.

    Profiles replace the base content entirely for that country+subsection.

    Args:
        slug: Nationality slug (e.g. "uk").
        section_slug: e.g. "visit", "student".
        subsection_slug: e.g. "entry-requirement", "overview".
        country: "US", "UK", or "AU".
        profile_expression: TypeScript expression for the profile.
            Examples:
              'touristVisaUkEta["entry-requirement"]'
              'touristVisaAuEta["how-to-apply"]'
              'domesticUkVisit["entry-requirement"]'
            Pass empty string "" to remove an existing profile.

    Returns:
        Confirmation or error.
    """
    require_auth()

    filepath = DATA_DIR / "nationalities" / f"{slug}.ts"
    if not filepath.exists():
        return f"Error: nationalities/{slug}.ts not found."

    content = filepath.read_text()

    # Find section > subsection > country
    section_pat = re.compile(
        r'(?:^|\n)\s*(?://[^\n]*\n\s*)?' + re.escape(section_slug) + r'\s*:\s*\{',
        re.MULTILINE,
    )
    section_match = section_pat.search(content)
    if not section_match:
        return f"Error: section '{section_slug}' not found."

    subsection_pat = re.compile(
        r'(?:"' + re.escape(subsection_slug) + r'"|\b' + re.escape(subsection_slug) + r')\s*:\s*\{',
    )
    sub_match = subsection_pat.search(content, section_match.end())
    if not sub_match:
        return f"Error: subsection '{subsection_slug}' not found."

    country_pat = re.compile(re.escape(country) + r':\s*\{')
    country_match = country_pat.search(content, sub_match.end())
    if not country_match:
        return f"Error: country '{country}' not found."

    country_pos = country_match.end()

    # Check if profile already exists
    # Look for "profile:" before "callouts:" in this country block
    callouts_match = re.search(r'callouts:\s*\[', content[country_pos:])
    if not callouts_match:
        return f"Error: no callouts array found for {country}."

    region = content[country_pos:country_pos + callouts_match.start()]
    existing_profile = re.search(r'profile:\s*.+,?\n', region)

    if profile_expression:
        profile_line = f"\n        profile: {profile_expression},\n        "
        if existing_profile:
            # Replace existing
            abs_start = country_pos + existing_profile.start()
            abs_end = country_pos + existing_profile.end()
            new_content = content[:abs_start] + profile_line + content[abs_end:]
        else:
            # Insert before callouts
            insert_at = country_pos
            new_content = content[:insert_at] + profile_line + content[insert_at:]
    else:
        # Remove profile
        if existing_profile:
            abs_start = country_pos + existing_profile.start()
            abs_end = country_pos + existing_profile.end()
            new_content = content[:abs_start] + content[abs_end:]
        else:
            return f"No profile set for {country} — nothing to remove."

    filepath.write_text(new_content)
    action = "Set" if profile_expression else "Removed"
    return f"{action} profile on {slug}/{section_slug}/{subsection_slug}/{country}: {profile_expression or '(removed)'}"




if __name__ == "__main__":
    transport = "sse"
    port = 8765
    if "--transport" in sys.argv:
        idx = sys.argv.index("--transport")
        if idx + 1 < len(sys.argv):
            transport = sys.argv[idx + 1]
    if "--port" in sys.argv:
        idx = sys.argv.index("--port")
        if idx + 1 < len(sys.argv):
            port = int(sys.argv[idx + 1])

    if transport == "stdio":
        mcp.run(transport="stdio")
    else:
        mcp.run(transport="sse", host="0.0.0.0", port=port)
