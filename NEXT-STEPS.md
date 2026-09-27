# Student Atlas — Status & Next Steps

_Last updated: 2026-09-27. Context for future sessions — see `CLAUDE.md`,
`monitoring/README.md` and `frontend/src/data/CONTENT-GUIDE.md`._

## Status

- The monitor runs every 12 hours on GitHub Actions and is **detection-only**
  (no API key, no PRs). Changes become alerts, one open alert per source page.
- Review happens in a Claude session through the content MCP server
  (`list_alerts → get_alert → apply_edits → resolve_alert`, then commit + push).
  The first full review is done: all 21 alerts resolved (4 approved,
  17 dismissed), and a dry run of the watcher is quiet.
- The Activity tab is read-only (Changes and Sources views).
- Fees were verified on 2026-09-27: UK against GOV.UK; Australia from
  secondary sources, because Home Affairs blocks automated fetches.
- Supported nationalities: UAE, Pakistan, India, China, United Kingdom,
  United States, Australia.

## Checklist

- [ ] Spot-check the Australian fees on immi.homeaffairs.gov.au (500, 600, 485,
      482, 189/190/186, citizenship) — `visa-facts.ts` and `sections/*.ts`
- [ ] Review new alerts as they arrive (Activity tab → open items)
- [ ] If/when the site is deployed: host must rebuild on pushes to `main`
      (monitoring data is bundled at build time)

## Standing notes

- Sources marked "Not monitorable" in `frontend/src/data/source-overrides.ts`
  (travel.state.gov, ceac, ukvcas, uaecabinet, fmjfee block bots or serve only
  error pages; i94 is JS-only) need an occasional manual check.
- Watch items from the review: the H-1B $100,000 payment guidance (vacated by a
  court, June 2026; may be appealed) and the F-1 Duration of Status rule
  (blocked by a preliminary injunction, 14 Sep 2026).
- The UK Graduate Route drops to 18 months for applications from 1 Jan 2027 —
  the content already says so; revisit the wording after that date.
- Local quirk: privatehealth.gov.au doesn't resolve on this Mac's DNS, and
  dol.gov sometimes blocks local fetches; both work in CI.
