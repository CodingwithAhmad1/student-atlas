# Student Atlas — Source Monitoring Pipeline

Watches every government URL cited by the guide and records real content
changes as alerts. Changes are then reviewed by a person in a Claude session
through the content MCP server (`../mcp-content-server`), which applies any
needed content edit and records the outcome. Git is the only datastore.

## How it works

1. **Detect** — `.github/workflows/student-atlas-monitor.yml` runs every 12
   hours (and on demand via *Run workflow*). `src/run.ts` fetches every page in
   `frontend/src/data/source-registry.ts` (citations grouped by URL),
   normalizes the HTML to stable text (`src/normalize.ts`), and compares it
   with the page's **reviewed baseline** in `snapshots/`.
   `immi.homeaffairs.gov.au` pages are JS-rendered, so their page-specific
   alert entries are extracted from the site's embedded JSON instead.
2. **Record** — a substantive difference opens one `pending` alert per source
   in `frontend/src/data/monitoring/alerts/`. While it stays open, later runs
   update the same alert with the cumulative diff (baseline → current), so
   there is never more than one open alert per page.
3. **Review** (MCP) — `list_alerts` → `get_alert` (diff plus every passage
   citing the source) → `apply_edit` (exact-string, build-checked) →
   `resolve_alert` (`approved` or `dismissed`, with a note). Commit and push.
4. **Advance** — on the next run, a page whose text matches a resolved alert
   becomes the new baseline. If the page changed again after review, the
   baseline stays put and a fresh alert shows everything since the last
   review, so nothing slips through.

Noise never reaches a reviewer: lines matching `NOISE_LINE_PATTERNS`, pure
reorderings, and per-source `stripSelectors` (`source-overrides.ts`) are
ignored, and an open alert whose remaining difference becomes noise — or whose
page reverts — is auto-dismissed. A source failing 3 checks in a row raises a
`manual` "unreachable" alert, auto-dismissed once it responds again.

## State layout

| Path | Contents |
| --- | --- |
| `snapshots/<source>.txt` | Reviewed baseline text per page (history lives in git) |
| `frontend/src/data/monitoring/status.json` | Per-source health, bundled into the app |
| `frontend/src/data/monitoring/alerts/*.json` | One record per alert, bundled into the app |
| `archive/` | Resolved alerts rotated out of the bundle (newest ~200 stay bundled) |

Statuses: `pending` (awaiting review), `manual` (needs a human outside the
content, e.g. an unreachable source), `approved` (content updated),
`dismissed` (no change needed, or auto-resolved noise).

## Setup

- No secrets: the workflow only needs its default `GITHUB_TOKEN` to commit
  state (commits carry `[skip ci]`).
- **Deploys**: monitoring data is bundled at build time, so the hosted site
  must rebuild on pushes to `main` that touch `Student Atlas/` for new
  activity (and reviewed edits) to appear.
- Budget: ~2 runs/day × under a minute fits easily in the private-repo GitHub
  Actions free tier.

## Running locally

```bash
cd "Student Atlas/monitoring"
npm ci
npx tsx src/run.ts --dry-run                       # sweep every source, write nothing
npx tsx src/run.ts --source gov.uk/student-visa    # check one source for real
npx tsx src/run.ts --source gov.uk/standard-visitor-visa --fixture fixtures/gov-uk-standard-visitor.html
npm run check                                      # typecheck
```

`--dry-run` writes nothing; `--fixture` replaces the network fetch with a saved
HTML file (requires `--source`, and always implies `--dry-run`).

## Known limitations

- Sources marked `skipReason` in `frontend/src/data/source-overrides.ts`
  cannot be monitored: `travel.state.gov` / `ceac.state.gov` / `ukvcas.co.uk` /
  `uaecabinet.ae` / `ae.usembassy.gov` block automated clients, and
  `cbp.gov/i94` / `ustraveldocs.com` are JavaScript apps with no static text.
  They are shown honestly as "Not monitorable" in the monitoring log — check
  them by hand now and then. (Headless-browser rendering was evaluated and is
  blocked by the same bot protection; we deliberately do not escalate against
  it.)
- Numeric facts in `frontend/src/data/visa-facts.ts` (TL;DR cards) carry no
  `[CITE]` markers, so `get_alert` cannot link them to a source — check them
  by hand when a fee or threshold changes.
- A page that changes again between review and the next run is re-alerted
  with the combined diff (safe, occasionally repetitive).
