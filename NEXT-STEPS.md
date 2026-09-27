# Student Atlas — Status & Next Steps

_Last updated: 2026-09-27. Context for future sessions — see `monitoring/README.md`
and `frontend/src/data/CONTENT-GUIDE.md`._

## Status

- The monitor runs every 12 hours on GitHub Actions and is **detection-only**:
  no API key, no PRs. Changes become alerts (one open alert per source page).
- Review happens in a Claude session through the content MCP server
  (`list_alerts → get_alert → apply_edits → resolve_alert`, then commit + push).
- The Activity tab is read-only.

## Checklist

- [ ] Copy `mcp-content-server/.mcp.json.example` to `Student Atlas/.mcp.json`
      (and `pip install -r mcp-content-server/requirements.txt`)
- [ ] First review: the £115 → £135 UK Standard Visitor fee alert
      (`sections/tourist-visa.ts` lines ~78, 88, 283 and `visa-facts.ts`)
- [ ] Work through the remaining open alerts
- [ ] If/when the site is deployed: host must rebuild on pushes to `main`

## Standing notes

- Sources marked "Not monitorable" in `frontend/src/data/source-overrides.ts`
  (travel.state.gov, ceac, ukvcas, uaecabinet, ae.usembassy.gov block bots;
  i94 + ustraveldocs are JS-only) need an occasional manual check.
- Local quirk: privatehealth.gov.au doesn't resolve on this Mac's DNS; works in CI.
