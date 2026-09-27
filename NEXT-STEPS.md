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
- Supported nationalities (branch `atlas-expansion`): the 100 most populous
  (UN mid-2023), all on the trait model with every column derived from its
  source page on 2026-09-27. Tier C and the new Tier A/B rows carry generated
  content only so far; hand-written extras come next (see below).
  Earlier errors the traits caught: the UAE is not on Australia's ETA list,
  India is a UK visa national, Romania is not a VWP country (designation
  rescinded 2025), and China, India and Vietnam can get the Australian 462
  only through its ballot.

## Checklist

- [ ] Expansion to 100 nationalities: design and decisions in
      `EXPANSION-PLAN.md`. Phase 0 (audit, `AUDIT-2026-09.md`) and Phase 1
      (trait layer, checker, watcher, MCP tools, the 7 migrated) done
      2026-09-27 on branch `atlas-expansion`. Phase 2 step 1–2 done the
      same day: all 100 registered with complete trait rows. Remaining
      Phase 2 work is listed below.
- [ ] First monitor run after the branch lands: expect one `change` alert per
      Home Affairs page (about 12) because the watcher now reads the page
      body from the embedded JSON instead of just the alert banners. Review
      them once and dismiss as the new baseline.

- [ ] Review new alerts as they arrive (Activity tab → open items)
- [ ] If/when the site is deployed: host must rebuild on pushes to `main`
      (monitoring data is bundled at build time)

## Phase 2 — remaining work

State on 2026-09-27: 100 nationalities × 17 traits, 0 stale, build green.
Work in the `atlas-expansion` worktree. Open the Claude session in the
worktree (or call `mcp-content-server` functions from the shell): the
`.mcp.json` server edits the checkout it was launched from.

**Needs Ahmad in a real browser** (travel.state.gov serves a bot check to
every automated client, including the browser pane; do not work around it):

1. **E-2 treaty countries** —
   https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/fees/treaty.html.
   New rows carry no E-2 value yet (only E-3/H-1B1/TN from USCIS pages);
   Pakistan, UK and Australia have E-2 from Phase 1, also never checked
   against this page. Give Claude the list of top-100 countries marked E-2
   and it will `set_trait_column("usNationalityWorkVisas", …)`.
2. **Diversity Visa ineligible list** — the DV instructions page. Current
   values follow the DV-2026 list as quoted in search results (Bangladesh,
   Brazil, Canada, China, Colombia, Cuba, Dominican Republic, Haiti, Honduras,
   India, Mexico, Nigeria, Pakistan, Philippines, South Korea, UK, Venezuela,
   Vietnam ineligible). Confirm, and re-check when DV-2027 instructions
   appear.
3. **Visa Bulletin** — confirm the employment-based chart still has separate
   columns only for China, India, Mexico and the Philippines (India/China
   `severe`, Mexico/Philippines `moderate`).

**Claude can do:**

- **Dual nationality, second pass (64 `unknown`).** The research fan-out
  (9 agents) found official English home-government pages for 29 of the 93
  new nationalities (36 of 100 with the original 7);
  the rest failed on D3 (English-only), bot-blocked or dead government sites,
  or an exhausted web-search budget. Unknown: afghanistan, algeria, angola,
  azerbaijan, bangladesh, belarus, benin, bolivia, brazil, burkina-faso,
  burundi, cambodia, cameroon, chad, chile, cuba, dominican-republic,
  dr-congo, ecuador, ethiopia, france, ghana, greece, guatemala, guinea,
  haiti, honduras, indonesia, iran, israel, ivory-coast, jordan, kazakhstan,
  madagascar, malawi, mali, morocco, mozambique, myanmar, niger, north-korea,
  peru, portugal, romania, russia, rwanda, saudi-arabia, senegal, somalia,
  south-africa, south-sudan, spain, sudan, syria, tajikistan, thailand, togo,
  tunisia, turkey, ukraine, uzbekistan, venezuela, vietnam, yemen.
  Several have an official page in French, Spanish or Portuguese that
  settles the question (France, Senegal, Chile, Guatemala, Portugal); D3
  as written excludes them. **Decision for Ahmad:** allow official
  non-English pages (cited with an "in French" note), or keep English-only.
  South Africa: the DIRCO retention page predates the 2025 Constitutional
  Court ruling on automatic loss — needs a current Home Affairs page.
- **Tier B hand callouts** (35 nationalities, 2–4 cited callouts each), then
  **Tier A** (25, up to ~10 each), batches of 10 per plan §6. The deferred
  traits (V5 US visa services in country, V6 reciprocity, V7 visa bond, S5
  SEVIS payment) become cited hand callouts there. Drafting fans out to
  subagents (one overlay file each); citations and writes stay serial.
- `npx tsx scripts/show-generated.mts <slug>` (in `frontend/`) prints a
  nationality's generated content for spot checks.

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
