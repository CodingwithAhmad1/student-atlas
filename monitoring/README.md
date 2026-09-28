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
   `immi.homeaffairs.gov.au` pages are JS-rendered; their body text (eligible
   passport lists, fees, step guides) and page-specific alert entries are
   extracted from the JSON "page schema" the site embeds in a hidden form
   field (`extractHomeAffairs` in `src/normalize.ts`).
2. **Record** — a substantive difference opens one `pending` alert per source
   in `frontend/src/data/monitoring/alerts/`. While it stays open, later runs
   update the same alert with the cumulative diff (baseline → current), so
   there is never more than one open alert per page. The page text the alert
   shows is kept alongside the baseline as `snapshots/<source>.candidate.txt`.
3. **Review** (MCP) — `list_alerts` → `get_alert` (diff plus every passage
   citing the source) → `apply_edit` (exact-string, build-checked) →
   `resolve_alert` (`approved` or `dismissed`, with a note). Commit and push.
   A weekly Claude cloud routine does the same on its own and opens a PR for
   Ahmad to merge (`REVIEW-POLICY.md`, `review-routine-prompt.md`).
4. **Advance** — on the next run after an alert is resolved, its candidate
   text (exactly what the reviewer saw) becomes the new baseline. If the page
   changed again after review, a fresh alert shows only what changed since
   that review, so nothing slips through and nothing is reviewed twice. This
   does not depend on alert hashes, so changing the normalizer cannot make an
   already-reviewed page look new. (Stored text is also re-cleaned on read.)

**Trait columns.** Pages listed in `frontend/src/data/traits/trait-sources.ts`
(category `eligibility` in the Activity tab) feed the nationality trait table;
an alert on one of them shows the affected columns and is reviewed with
`check_trait_column` / `set_trait_column`. Columns whose source blocks
automated clients are `manual`: the watcher raises a `stale-check` alert
(status `manual`, kind `stale-check`) once the oldest value in the column is
past the column's `manualIntervalDays`, and closes it when the dates are
refreshed.

Noise never reaches a reviewer: lines matching `NOISE_LINE_PATTERNS`, pure
reorderings, and per-source `stripSelectors` (`source-overrides.ts`) are
ignored, and an open alert whose remaining difference becomes noise — or whose
page reverts — is auto-dismissed. A source failing 3 checks in a row raises a
`manual` "unreachable" alert, auto-dismissed once it responds again. A short
maintenance or error notice ("currently unavailable", "unable to redirect
you") counts as a failed check, not as the page's content.

## State layout

| Path | Contents |
| --- | --- |
| `snapshots/<source>.txt` | Reviewed baseline text per page (history lives in git) |
| `snapshots/<source>.candidate.txt` | Page text an open alert is asking about; promoted to baseline once resolved |
| `frontend/src/data/monitoring/status.json` | Per-source health, bundled into the app |
| `frontend/src/data/monitoring/alerts/*.json` | One record per alert, bundled into the app |
| `archive/` | Resolved alerts rotated out of the bundle (newest ~200 stay bundled) |

Statuses: `pending` (awaiting review), `manual` (needs a human outside the
content: an unreachable source or a stale manual trait column), `approved`
(content updated), `dismissed` (no change needed, or auto-resolved noise).
Kinds: `change`, `unreachable`, `stale-check`.

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
npx tsx src/page-text.ts https://www.gov.uk/...    # print a page as the watcher sees it
npx tsx src/churn-check.ts                         # fetch every source twice; list pages that change between loads
```

`--dry-run` writes nothing; `--fixture` replaces the network fetch with a saved
HTML file (requires `--source`, and always implies `--dry-run`).

**PDF sources.** Cited PDFs (laws, gazettes) are compared on their extracted
text (`src/pdf.ts`, using unpdf), so a re-export of the same document does not
alert and diffs stay readable. A scanned PDF has no text layer: its baseline is
a one-line note with the file's SHA-256, so any new version of the file alerts
and the reviewer opens the PDF to see what changed.

## Known limitations

- Sources marked `skipReason` in `frontend/src/data/source-overrides.ts`
  cannot be monitored: `travel.state.gov` / `ceac.state.gov` / `ukvcas.co.uk` /
  `uaecabinet.ae` / `legifrance.gouv.fr` / `pravo.by` block automated clients,
  and `cbp.gov/i94` and `u.ae` are JavaScript apps with no static text.
  They are shown honestly as "Not monitorable" in the Activity page's Sources view — check
  them by hand now and then. (Headless-browser rendering was evaluated and is
  blocked by the same bot protection; we deliberately do not escalate against
  it.)
- Numeric facts in `frontend/src/data/visa-facts.ts` (TL;DR cards) carry no
  `[CITE]` markers, so `get_alert` cannot link them to a source — check them
  by hand when a fee or threshold changes.
- A page that changes again between review and the next run is re-alerted
  with the combined diff (safe, occasionally repetitive).
