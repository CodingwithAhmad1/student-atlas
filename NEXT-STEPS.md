# Student Atlas — Status & Next Steps

_Last updated: 2026-09-28. Context for future sessions — see `CLAUDE.md`,
`EXPANSION-PLAN.md`, `monitoring/README.md` and
`frontend/src/data/CONTENT-GUIDE.md`._

## Status

- **Expansion to the 100 most populous nationalities is complete on branch
  `atlas-expansion`** (not yet merged; Ahmad pushes). Phases 0–3 of
  `EXPANSION-PLAN.md` are done: 100 nationalities × 18 traits, every column
  derived from its source page (2026-09-27/28); 53 Tier B and 196 Tier A cited
  hand callouts (plus 14 from a Tier B retry); 85 of 100 dual-nationality rows
  cited to home-government pages.
- The monitor runs every 12 hours on GitHub Actions and is **detection-only**.
  It now watches about 275 sources (was 55). A full dry run on 2026-09-28:
  202 new sources snapshot cleanly, 2 churning gov.br pages fixed, 2 u.ae
  pages marked not monitorable. kdmid.ru and cne.ao (never reachable from
  automated clients) are now skipped too.
- Review happens in a Claude session through the content MCP server. For a
  list page, review the trait column (`check_trait_column` → `set_trait_column`).
- The Activity tab shows, on each alert, where the page is used: base content,
  which trait columns it feeds, and which nationalities' content cites it.

## After the branch lands

- [x] First full watcher run done on the branch before merging (2026-09-28):
      296 sources snapshot; the 12 Home Affairs alerts from the new extractor
      were checked (text only added, nothing removed) and dismissed, and the
      full page text is the new baseline.
- [ ] minesup.gov.cm (Cameroon equivalence communiqué) timed out at merge
      time; CI records its first snapshot when the host is back. If it raises
      an unreachable alert, give it a `skipReason`.
- [ ] If/when the site is deployed: host must rebuild on pushes to `main`.

## Open checks

**Needs Ahmad in a real browser** (travel.state.gov and usembassy.gov serve a
bot check to every automated client, including the browser pane; never work
around it):

1. **E-2 treaty countries** —
   https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/fees/treaty.html.
   Only Pakistan, UK and Australia carry E-2 (from Phase 1, never checked
   against this page). Give Claude the list of top-100 countries marked E-2
   and it will `set_trait_column("usNationalityWorkVisas", …)`.
2. **Diversity Visa ineligible list** — values follow the DV-2026 list as
   quoted in search results. Confirm, and re-check when DV-2027 instructions
   appear.
3. **Visa Bulletin** — confirm separate employment-based columns only for
   China, India (`severe`), Mexico and the Philippines (`moderate`).
4. **US embassy leads** — Russians directed to US posts in Warsaw or Astana;
   which countries are in the (now permanent) US visa bond programme
   (reported: Algeria, Tunisia, Ethiopia, Uganda, Cambodia, Senegal). Senegal
   and Venezuela are confirmed on their embassy pages and have hand callouts;
   once the full list is read on travel.state.gov, turn it into a trait.
   Caracas: operations resumed 30 March 2026, consular services "eventual"
   (Venezuela callout; recheck).
5. **Content checks** — China's two Australian callouts (Chinese ImmiAccount,
   Frequent Traveller stream); Indonesia's PILN rule reportedly equating a
   non-Honours Australian bachelor's with Diploma Tiga; Bangladesh Bank
   guidelines cited are the 2018 edition.

**Claude can do:**

- Dual nationality: 15 still `unknown` after three passes (afghanistan,
  burkina-faso, burundi, cambodia, chad, guatemala, iran, israel, ivory-coast,
  myanmar, niger, north-korea, south-sudan, sudan, syria). Most have no
  reachable official text; leads: Cambodia's 2025 amendment to the Law on
  Nationality, Burkina Faso's 2025 code (loi 012-2025/ALT), Niger's loi
  2014-60, Guatemala's Ley de Nacionalidad (minex.gob.gt, 403 to automated
  clients), Israel's Population Authority and embassy pages (gov.il 403).
- Israel has no hand callouts: every Israeli government page refused
  automated clients (IDF deferral for students abroad, National Insurance
  status for students abroad are the leads).
- Candidate trait: US tax-treaty student exemptions (IRS Publication 901
  lists about 50 countries with student articles). Seen for Israel and
  Uzbekistan in the retry; not added as hand callouts because it is a list.

## Review calendar

| When | What | How |
|---|---|---|
| Every 12 h (automatic) | ~275 monitored sources | Activity tab → open alerts |
| Monthly | Visa Bulletin backlog column | Browser; `set_trait_column` (stale-check alert at 90 days) |
| Every 180 days | E-2 treaty list; Working Holiday 417/462 lists | Browser; stale-check alert raises it |
| Every 365 days | DV ineligible list (new instructions ~October); dual nationality rows | Browser / home-government pages |
| April | UK fee changes | GOV.UK fee table; `visa-facts.ts` by hand |
| 1 July | Australian fee changes | Home Affairs in a browser; `visa-facts.ts` by hand |
| October | US fiscal year: fees, DV cycle | Alerts + browser |
| Ad hoc | US proclamations, UK visa brake reviews | Alerts on whitehouse.gov / gov.uk visa brake |
| 1 Jan 2027 | UK Graduate Route drops to 18 months | Revisit wording |
| After adding citations | Churn check | `npx tsx src/churn-check.ts` in `monitoring/` |

## Standing notes

- Fees change every 1 July (Australia) and usually April (UK). Re-check the
  `visa-facts.ts` cards then — they have no citations, so the monitor won't flag them.
- Home Affairs fee amounts render client-side; a page's "Cost" can look blank
  in plain fetches. Check fees in a real browser.
- Sources marked "Not monitorable" in `frontend/src/data/source-overrides.ts`
  (travel.state.gov, ceac, ukvcas, uaecabinet, fmjfee, legifrance, pravo.by,
  CSCSE and several home-government pages block bots or serve only error
  pages; i94 and u.ae are JS-only) need an occasional manual check.
- Watch items from the review: the H-1B $100,000 payment guidance (vacated by a
  court, June 2026; may be appealed) and the F-1 Duration of Status rule
  (blocked by a preliminary injunction, 14 Sep 2026).
- The UK Graduate Route drops to 18 months for applications from 1 Jan 2027 —
  the content already says so; revisit the wording after that date.
- Local quirk: privatehealth.gov.au (and sometimes portal.ahu.go.id) doesn't
  resolve on this Mac's DNS, and dol.gov sometimes blocks local fetches; all
  work in CI.
- Cited PDFs are compared on their extracted text; scanned PDFs (no text
  layer) on a hash of the file, so any new version alerts and needs opening.
- Pages the watcher skips (`skipReason`) need a look by hand once a year:
  travel.state.gov, *.usembassy.gov, state.gov, u.ae, cne.ao (incomplete TLS
  chain), kdmid.ru (times out), consulado.pe, adilet.zan.kz (JavaScript only)
  and the others listed on the Activity tab as not monitorable.
