# Student Atlas — Status & Next Steps

_Last updated: 2026-09-28. Context for future sessions — see `CLAUDE.md`,
`EXPANSION-PLAN.md`, `monitoring/README.md` and
`frontend/src/data/CONTENT-GUIDE.md`._

## Status

- **Expansion to the 100 most populous nationalities is complete on branch
  `atlas-expansion`** (not yet merged; Ahmad pushes). Phases 0–3 of
  `EXPANSION-PLAN.md` are done: 100 nationalities × 19 traits, every column
  derived from its source page (2026-09-27/28); 53 Tier B and 196 Tier A cited
  hand callouts (plus 14 from a Tier B retry); 93 of 100 dual-nationality rows
  cited to home-government pages (8 of them from archived copies).
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

- Israel has only practical (uncited, asterisked) callouts: check IDF status
  before leaving, and ask Bituach Leumi about insurance rights abroad. Every
  Israeli government site (gov.il, embassies.gov.il, btl.gov.il) refuses
  automated clients, so nothing more specific could be cited.

### Dual nationality: could not be retrieved or confirmed (7 of 100)

Four research passes (2026-09-27/28). These rows stay `unknown`, and readers
see the generic "not yet verified" line.

| Country | What was tried | Why it is still unknown |
|---|---|---|
| Afghanistan | 2000 Citizenship Law read in Official Gazette 792 (archived from moj.gov.af); MoJ renunciation page (archived 2026) | Art. 7 bars dual citizenship, but no official source says the current authorities apply this law; the MoJ says all laws are under Sharia review. |
| Burkina Faso | an.bf register of laws, an.bf news, jobf.gov.bf, ecertificat-nationalite.gov.bf | The 2025 family code (loi 012-2025/ALT) replaced the old rule; no official copy is online (jobf.gov.bf is a paid portal and returned 502). |
| Chad | presidence.td, journalofficiel.td, archives | The 1962 nationality ordinance is only on the official gazette site, which shows a Cloudflare bot check; not bypassed, and no archived copy exists. |
| Israel | gov.il and embassies.gov.il (live and archived), Knesset PDF | Live pages refuse automated clients; archived pages only describe the renunciation procedure; the Knesset PDF is a scan of the 1952 original. |
| Myanmar | mlis.gov.mm (live and archived), embassies in London, Kuala Lumpur, Washington | The legal database refuses connections and its archived pages never captured the law text; no embassy page states s.16 of the 1982 law. |
| Niger | gouv.ne, assemblee.ne, sgg.gouv.ne, diplomatie.gouv.ne, archives | No official copy of loi 2014-60; the Foreign Ministry page predates it, so it cannot support either verdict. |
| North Korea | — | No official DPRK publication of the nationality law exists online. |

### Dual nationality: cited from archived copies (label ends in "(archived copy)*")

Burundi, Cambodia, Guatemala, Iran, Ivory Coast, South Sudan, Sudan and Syria
were read from Internet Archive copies of official pages (live pages offline
or blocked). Each has a `skipReason`; once a year, check whether the official
page is back and cite it instead. Caveats: Ivory Coast is the 1961 text (the
2004, 2005 and 2013 amendments could not be read; none is reported to change
art. 48); Syria's decree is kept in force by the 2025 Constitutional
Declaration (art. 51); Iran and Syria are `restricted` because a foreign
nationality taken without permission is not recognised and carries penalties.
- `usTaxTreatyStudent` (added 2026-09-28) is read from IRS Publication 901's
  "Students and Apprentices" list: 41 of our nationalities `available`,
  Russia `suspended` (since 16 August 2024). The C.I.S. entry stands for the
  countries still under the US-USSR treaty (Azerbaijan, Belarus, Tajikistan,
  Uzbekistan among ours), so `check_trait_column` reports them as not
  mentioned; keep them `available` while Publication 901 says the treaty
  applies.

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
