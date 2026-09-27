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
- Fees were verified on 2026-09-27: UK against GOV.UK; Australia against
  immi.homeaffairs.gov.au (500, 600, 485, 482, 189/190/186 and the CSIT all
  match). The Subclass 482 content now uses its current name, Skills in Demand.
- Supported nationalities: UAE, Pakistan, India, China, United Kingdom,
  United States, Australia — all on the trait model (`trait_coverage()`).
  Two long-standing errors were caught by the traits: the UAE is not on
  Australia's ETA list (Visitor 600 applies) and India is a UK visa national
  (Standard Visitor, not ETA).

## Checklist

- [ ] Expansion to 100 nationalities: design and decisions in
      `EXPANSION-PLAN.md`. Phase 0 (audit, `AUDIT-2026-09.md`) and Phase 1
      (trait layer, checker, watcher, MCP tools, the 7 migrated) done
      2026-09-27 on branch `atlas-expansion`. Next: Phase 2 — populate the
      traits table column-first for the 100 (see plan §7).
- [ ] First monitor run after the branch lands: expect one `change` alert per
      Home Affairs page (about 12) because the watcher now reads the page
      body from the embedded JSON instead of just the alert banners. Review
      them once and dismiss as the new baseline.

- [ ] Review new alerts as they arrive (Activity tab → open items)
- [ ] If/when the site is deployed: host must rebuild on pushes to `main`
      (monitoring data is bundled at build time)

## Phase 2 kickoff (next session)

Work in the `atlas-expansion` worktree (`../Zim-Side-Quests-atlas-expansion`);
`npm ci` is done there for frontend/ and monitoring/.

**Tooling caveat:** `.mcp.json` launches the content server from whichever
checkout the session opened, and the server edits the tree it was launched
from. A session opened on `main` therefore has MCP tools that (a) edit the
wrong tree and (b) predate Phase 1. Either open the session in the worktree,
or call the worktree's server from the shell:
`cd mcp-content-server && python3 -c "import traits; print(traits.coverage())"`.

**Concurrency:** research fans out (subagents return JSON: dual-nationality
verdicts with fetched government URLs; later, overlay drafts); writes stay
serial in one session because every nationality lands in the same four files.

Order of work:

1. `trait_coverage()` to see the 7 rows; `get_content_schema()` for the tool
   flow.
2. Column-first for all 100 (Appendix A of the plan): for each monitored
   column run `check_trait_column(trait)` against the live page, decide the
   value for every one of the 100 names, and collect them; manual columns
   (E-2 treaty list, 417/462, Visa Bulletin, DV, dual nationality) from a real
   browser. Add dual-nationality citations with `add_citations` where an
   official English page exists; otherwise `"unknown"`.
3. Register the 93 new nationalities with `create_nationality(name, slug,
   label, tier, traits_json)` (labels and tiers in Appendix A), Tier C first.
   Each call type-checks; batch commits of ~10 with `npm run build` and a
   watcher `--dry-run` in the message.
4. Then Tier B (2–4 cited callouts each) and Tier A (up to ~10) in batches of
   10 per session, per the plan §6.

Deferred traits (V5 US visa services in-country, V6 reciprocity, V7 visa bond
pilot, S5 SEVIS payment restrictions) become cited hand callouts for the
nationalities they affect during the Tier A/B passes.

## Standing notes

- Fees change every 1 July (Australia) and usually April (UK). Re-check the
  `visa-facts.ts` cards then — they have no citations, so the monitor won't flag them.
- Home Affairs fee amounts render client-side; a page's "Cost" can look blank
  in plain fetches. Check fees in a real browser.
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
