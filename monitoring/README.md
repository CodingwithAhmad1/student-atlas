# Student Atlas — Source Monitoring Pipeline

Watches every government URL cited by the guide, detects real content changes,
has Claude draft the matching content edit, and routes each draft through human
review before anything goes live. Git is the only datastore.

## How it works

1. **Detect** — `.github/workflows/student-atlas-monitor.yml` runs every 12
   hours (and on demand via *Run workflow*). `src/run.ts` fetches all source
   URLs from `frontend/src/data/citations.ts` (deduplicated by URL),
   normalizes the HTML to stable text (`src/normalize.ts`), hashes it, and
   compares against the committed snapshot in `snapshots/`.
   `immi.homeaffairs.gov.au` pages are JS-rendered, so their page-specific
   alert entries are extracted from the site's embedded JSON instead.
2. **Draft** — on a non-noise change, `src/claude.ts` sends the diff plus every
   content block citing that source to `claude-sonnet-5`, which classifies the
   change and proposes exact text-level edits. Drafts are validated in code
   (only cited files, unique verbatim match, `[CITE]`/`[TERM]` markers
   preserved), applied, gated on `tsc --noEmit` + `vite build`, and opened as a
   PR labeled `student-atlas-alert` (`src/github.ts`). The alert record lands
   in `frontend/src/data/monitoring/alerts/` and renders in the app's
   **Activity** tab.
3. **Review** — Approve/Reject buttons in the Activity tab (admin mode)
   squash-merge or close the PR via the GitHub API.
   `.github/workflows/student-atlas-alert-close.yml` then writes the final
   status back to the alert record. Nothing merges without a human click.

## State layout

| Path | Contents |
| --- | --- |
| `snapshots/<source>.txt` | Latest normalized page text (history lives in git) |
| `state/source-status.json` | Per-source health (mirrored to `frontend/src/data/monitoring/status.json`) |
| `frontend/src/data/monitoring/alerts/*.json` | One record per alert, bundled into the app at build time |
| `archive/` | Alert records rotated out of the bundle (newest ~200 stay bundled) |

Statuses: `pending` (awaiting analysis; retried next run) → `dismissed`
(noise), `review` (PR open), `approved` / `rejected` (PR merged / closed),
`manual` (needs a human — no safe auto-edit, repeated fetch failures, or a
draft that failed validation), `error`.

## Setup

- **Actions secret** `ANTHROPIC_API_KEY` — used only by the drafting step.
  `GITHUB_TOKEN` covers branches/PRs (its pushes don't retrigger workflows,
  and state commits carry `[skip ci]`).
- **Admin mode** in the Activity tab: create a fine-grained GitHub PAT scoped
  to this repo with *Contents* and *Pull requests* read/write and a short
  expiry; paste it into the Admin popover. It is stored in localStorage and
  sent only to api.github.com.
- **Deploys**: monitoring data is bundled at build time, so the hosted site
  must rebuild on pushes to `main` that touch `Student Atlas/` for new
  activity (including approved edits) to appear.
- Budget: ~2 runs/day × a few minutes fits easily in the private-repo GitHub
  Actions free tier (2,000 min/month).

## Running locally

```bash
cd "Student Atlas/monitoring"
npm ci
npx tsx src/run.ts --dry-run --no-llm      # sweep every source, write nothing
npx tsx src/run.ts --source gov.uk/student-visa --no-llm
npx tsx src/run.ts --source <id> --fixture fixtures/page.html --no-pr
npm run check                              # typecheck
```

`--dry-run` writes nothing; `--no-llm` records changes as `pending` without
drafting; `--no-pr` drafts but stops before opening a PR (`ANTHROPIC_API_KEY`
must be set unless `--no-llm`); `--fixture` replaces the network fetch with a
saved HTML file (requires `--source`).

## Known limitations

- Sources marked `skipReason` in `frontend/src/data/source-overrides.ts`
  cannot be monitored: `travel.state.gov` / `ceac.state.gov` / `ukvcas.co.uk` /
  `uaecabinet.ae` block automated clients, and `cbp.gov/i94` /
  `ustraveldocs.com` are JavaScript apps with no static text. They are shown
  honestly as "Not monitorable" in the monitoring log — check them by hand now
  and then. (Headless-browser rendering was evaluated and is blocked by the
  same bot protection; we deliberately do not escalate against it.)
- The LLM edits prose blocks only. Numeric facts in `visa-facts.ts` (TL;DR
  cards) are called out in the draft rationale but must be edited by hand.
- A `manual` alert means exactly that — the Activity tab shows what to check.
