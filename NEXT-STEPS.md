# Student Atlas — Status & Next Steps

_Last updated: 2026-09-27. Context for future sessions — see `monitoring/README.md`
and `frontend/src/data/CONTENT-GUIDE.md`._

## Status

- The monitor runs every 12 hours on GitHub Actions and is **detection-only**:
  no API key, no PRs. Changes become alerts (one open alert per source page).
- Review happens in a Claude session through the content MCP server
  (`list_alerts → get_alert → apply_edits → resolve_alert`, then commit + push).
- The Activity tab is read-only (Changes and Sources views).
- Fees were verified on 2026-09-27: UK against GOV.UK; Australia from
  secondary sources, because Home Affairs blocks automated fetches.
- The first review is done: UK Standard Visitor fee £115 → £135 (approved).

## Checklist

- [ ] Copy `mcp-content-server/.mcp.json.example` to `Student Atlas/.mcp.json`
      (and `pip install -r mcp-content-server/requirements.txt`)
- [ ] Spot-check the Australian fees on immi.homeaffairs.gov.au (500, 600, 485,
      482, 189/190/186, citizenship)
- [ ] Work through the remaining open alerts
- [ ] If/when the site is deployed: host must rebuild on pushes to `main`

## Standing notes

- Sources marked "Not monitorable" in `frontend/src/data/source-overrides.ts`
  (travel.state.gov, ceac, ukvcas and uaecabinet block bots; i94 is JS-only)
  need an occasional manual check.
- The UK Graduate Route drops to 18 months for applications from 1 Jan 2027 —
  the content already says so; revisit the wording after that date.
- Local quirk: privatehealth.gov.au doesn't resolve on this Mac's DNS; works in CI.
