# Student Atlas — Monitoring Pipeline: Status & Next Steps

_Last updated: 2026-08-20. Context for future sessions — see `monitoring/README.md` for full pipeline docs._

## Status

Committed and pushed — `c1ba20a` on `main`, 107 files (the pipeline, Activity tab, workflows, baseline snapshots, and the Supabase archive move). Parliament App changes were left untouched and uncommitted.

The 12-hourly schedule is now live on GitHub. Two things before the first run can draft anything:

1. **Add the `ANTHROPIC_API_KEY` secret** (repo → Settings → Secrets and variables → Actions). Until it exists, runs will still detect and log changes, but drafting fails gracefully — alerts just stay `pending` with the error recorded and retry next run.
2. **Create the admin PAT** (fine-grained, this repo only, Contents + Pull requests read/write) and paste it into the Activity tab's Admin popover when you want in-app Approve/Reject.

Then trigger the workflow manually (Actions → "Student Atlas source monitor" → Run workflow) — once the secret is in place, the first run should draft the pending **£115 → £135 UK Standard Visitor fee** correction as a PR you can approve from the Activity tab.

## Checklist

- [ ] `ANTHROPIC_API_KEY` added as Actions secret
- [ ] Fine-grained PAT created and pasted into Activity tab Admin popover
- [ ] First `workflow_dispatch` run watched; £135 fee PR drafted
- [ ] Fee PR reviewed and approved from `/activity` (verifies the close-sync workflow)
- [ ] If/when the site is deployed: host must rebuild on pushes to `main` (feed data is bundled at build time)

## Standing notes

- A genuine pending alert exists: gov.uk Standard Visitor visa fee £115 → £135 (site content is stale until its PR merges).
- 8 sources are marked "Not monitorable" in `frontend/src/data/source-overrides.ts` (travel.state.gov ×5-ish, ceac, ukvcas, uaecabinet block bots; i94 + ustraveldocs are JS-only) — check those by hand occasionally.
- Visual check of `/activity` was never done in-browser (`npm run dev` → /activity).
- Local quirk: privatehealth.gov.au doesn't resolve on this Mac's DNS; works in CI.
