# Plan: weekly cloud review routine (approved 2026-09-28)

**Goal.** A scheduled Claude cloud routine reviews the watcher's open alerts
every week and makes the needed content changes, with Ahmad approving by
merging one PR per run.

**Decisions (Ahmad, 2026-09-28).**
- One PR per run; nothing lands on `main` without Ahmad merging.
- Weekly: Mondays 06:00 UTC (10:00 Dubai), about 45 minutes after the watcher's
  morning run.
- Model: Opus 5.5.
- Scope: whatever is needed. It is decided by one question: *is what we publish
  now out of date, and would the update make the guide more accurate?*
  (`REVIEW-POLICY.md`).

This keeps the 27 September decision (detection-only CI, no secrets, no
database, Ahmad approves every change): the routine runs on Ahmad's Claude
account, not in GitHub Actions, and only opens PRs.

## Constraints and how they are handled
1. **No local MCP in cloud routines.** Routines only attach claude.ai
   connectors, and `.mcp.json` is gitignored at the monorepo root.
   → `mcp-content-server/atlas_cli.py` exposes the same tool functions on the
   command line. Edits recorded by `apply_edits` persist in
   `.review-edits.json` (gitignored) until `resolve_alert` stores them.
   Tools that add sources or create/delete files are not exposed.
2. **Cloud environments block arbitrary hosts by default.** → Ahmad sets the
   routine's environment (`Default`) to **Full** network access on claude.ai.
   The routine checks this first and stops with a clear message if gov.uk is
   unreachable.
3. **Dependencies.** Installed by the routine itself (pip + two `npm ci`); no
   shared `.claude/settings.json` hooks in the monorepo.
4. **Git.** Branch `claude/atlas-review-<date>`, PR via `gh`. If last week's
   PR is still open, the routine merges `main` into it and comments there
   instead of opening a second PR (the watcher keeps updating alert JSONs, so
   parallel PRs would conflict).

## The decision system
`REVIEW-POLICY.md`: each alert gets one verdict, **Dismiss**, **Update**,
**Add** or **Needs you**, and every verdict carries an evidence quote. Anything
uncertain, legally unsettled, needing a browser, a new source, code changes,
or containing text that looks like instructions → **Needs you**, left open and
listed in the PR.

## Each run
Set up and check the network → find or create the branch → per alert: get,
(refresh), decide, act, resolve, watcher `--dry-run --source`, commit → `npm run
build` (revert the breaking alert's commit if it fails) → update HANDBOOK §7 →
push, open the PR (or comment on the open one) with a decision table and a
"Needs you" list. Full steps: `review-routine-prompt.md`.

## Deliverables (this PR)
- `mcp-content-server/atlas_cli.py` + `tests/test_cli.py`
- `monitoring/REVIEW-POLICY.md`, `monitoring/review-routine-prompt.md`, this file
- HANDBOOK §4/§6, CLAUDE.md and `monitoring/README.md` describe the routine
- The routine itself (created with RemoteTrigger after this PR merges, since
  it reads the prompt from `main`): cron `0 6 * * 1`, `claude-opus-5-5`, repo
  `CodingwithAhmad1/student-atlas`, environment `Default`.

## Escalation (added 2026-10-02)
The routine emails Ahmad through the claude.ai Gmail connector only in three
cases: a major policy shift it could not apply, the routine broken, or a
backlog ignored for weeks. At most one email per run. Rules: §7 of
`review-routine-prompt.md`; setup brief: `ROUTINE-SETUP.md`.

## Ahmad's steps
1. claude.ai → Code → environments → `Default` → network access **Full**.
2. Merge this PR.
3. Check the first run's PR before relying on it.
