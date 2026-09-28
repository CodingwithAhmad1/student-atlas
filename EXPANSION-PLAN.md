# Student Atlas — Expansion plan: 100 nationalities, one review framework

_Drafted 2026-09-27; decisions taken the same day (§9). Execution notes
belong in `NEXT-STEPS.md`; this file is the design._

## 1. Goal

Support the 100 most populous nationalities (UN mid-2023 estimates, list in
Appendix A) as origin countries for the three existing destinations (US, UK,
AU), and make the review framework strong enough that every nationality's
content is (a) sourced, (b) monitored or on a dated manual-check schedule, and
(c) verifiable at a glance in the build and in the Activity tab.

Destinations stay at three. Adding a destination is a separate project.

## 2. Where we are (verified 2026-09-27)

- 7 nationalities, each a hand-written overlay file of ~26 callouts
  (`frontend/src/data/nationalities/*.ts`, ~375 lines each). 3 of the 7 in the
  top 100 are the destinations themselves.
- The overlays are almost entirely **uncited**: 3 `[CITE]` markers across all
  7 files, versus 86 in the base sections. They contain volatile or
  unverifiable claims (consulate wait times in months, "higher assessment
  level", "priority £500", INR conversions, "digital identity scheme").
  Several are already stale: Australia replaced Assessment Levels with
  evidence levels and GTE with the Genuine Student requirement in 2024.
- The base content is nationality-agnostic and well cited (55 monitored
  sources, 11 of them "not monitorable" because the host blocks bots).
- The monitor is detection-only, one open alert per page, review via MCP
  (`list_alerts → get_alert → apply_edits → resolve_alert`).
- The nationality dropdown already lists ~195 countries. Any name not in the
  registry silently shows base content with no notice.
- The MCP `create_nationality` template takes three booleans (`uses_uk_eta`,
  `uses_au_eta`, `uses_us_vwp`) and produces an empty callout skeleton.

**Why the current model does not scale:** 100 × 26 hand-written, uncited
paragraphs is ~2,600 claims nobody can verify, and a change to one government
eligibility list (say the UK visa-national list) would have to be found and
fixed in up to 100 files by hand. The framework must flip so that
nationality-dependent facts live in *one table per fact*, each column tied to
*one source page*, and prose is generated from the table.

## 3. Core design: a trait layer under the overlays

Add a fourth layer, **Layer 0: nationality traits**, beneath the existing
three (base → profiles → overlays).

```
traits (one row per nationality, one column per fact, one source per column)
   └─ rules (trait → profile choice + templated, cited callouts)
        └─ hand-written overlay (Tier A/B extras, each callout cited)
             └─ merge-content (unchanged rendering)
```

- Every nationality gets **complete coverage** of every trait. Depth of
  hand-written prose varies by tier (§6), coverage does not.
- Every trait column names its **source citation** and a **verifiedAt** date.
  When that source alerts, the reviewer re-derives the whole column, not 100
  files.
- Generated callouts carry the column's `[CITE]`, so `get_alert` links them
  the same way it links base prose today.
- The current three template booleans become derived values
  (`ukVisaNational === false` ⇒ UK ETA profile, etc.).

### 3.1 Trait inventory

Values are per nationality unless noted. "Src" is the page the column cites;
"Mon" is whether the watcher can fetch it (✔ verified reachable today,
✖ blocked, ? not yet checked, JS = Home Affairs JSON extraction).

| # | Trait | Type | Drives | Src | Mon |
|---|---|---|---|---|---|
| V1 | `ukVisaNational` | bool | UK visit: Standard Visitor vs ETA profile | GOV.UK Appendix Visitor: Visa national list (115 entries) | ✔ |
| V2 | `ukEtaFee` (global) | money | UK ETA card | GOV.UK ETA guidance (£20 as of today) | ✔ |
| V3 | `usVwp` | bool | US visit: ESTA profile | dhs.gov/visa-waiver-program (42-country table, incl. Taiwan/UK conditions) | ✔ |
| V4 | `usEntryRestriction` | none/partial/full + date | US visit + student + work callout (partial = B, F, M, J suspended, i.e. every visa this guide covers) | Proclamation 10998 (16 Dec 2025, in force 1 Jan 2026): whitehouse.gov fact sheet and cbp.gov bulletin both fetch; federalregister.gov bot-checks | ✔ |
| V5 | `usVisaServicesInCountry` | yes/no/limited + designated post | US visit + student: where to apply | travel.state.gov ✖; per-post usembassy.gov pages | partial |
| V6 | `usReciprocity` | validity/entries/fee for B and F | US visit/student key-value | travel.state.gov reciprocity ✖ | manual |
| V7 | `usVisaBondPilot` | bool + amount | US visit callout | travel.state.gov ✖ | manual |
| V8 | `auVisitorStream` | eta601 / evisitor651 / visitor600 | AU visit profile | immi 601 and 651 pages: passport lists are in the embedded site JSON (confirmed in raw HTML) but the normalizer only extracts alert entries — extend it in Phase 1 | JS+ |
| V9 | `auBiometricsRequired` | bool | AU visit/student apply steps | immi help-support/meeting-our-requirements/biometrics (country table in embedded JSON) | JS+ |
| V10 | `auHealthExamLikely` | bool | AU visit/student callout | immi health/what-health-examinations-you-need (table in embedded JSON) | JS+ |
| S1 | `ukDifferentialEvidence` | bool | UK student documents callout (applies when applying from home country) | Appendix Student ST 22.1 (60 countries + HK/Macau/Taiwan/BNO) | ✔ |
| S2 | `ukTbTestRequired` | bool | UK student + long visit callout (applies by *residence*, phrase as "if applying from") | GOV.UK TB test country list | ✔ |
| S3 | `ukMajorityEnglish` | bool | UK student English requirement | Appendix English Language (18 countries) | ✔ |
| S4 | `auEnglishExempt` | bool | AU student English requirement | immi help-support/meeting-our-requirements/english-language (embedded JSON) | JS+ |
| S5 | `usSevisPaymentRestricted` | bool | US student: I-901 payment from sanctioned countries | ice.gov/sevis/i901 | ✔ |
| W1 | `usNationalityWorkVisas` | set: E-3, H-1B1, TN, E-2 | US work callout | uscis.gov E-3, TN and E-2 pages fetch; no USCIS H-1B1 page found (cite the E-3/H-1B page or mark H-1B1 manual) | ✔ |
| W2 | `ukYouthMobility` | none / 18–30 / 18–35 / ballot / India YPS | UK work callout | GOV.UK youth-mobility/eligibility (list fetched: AU/CA/NZ/KR 18–35; JP, UY, Andorra, Iceland, Monaco, San Marino 18–30; HK/Taiwan ballot; India → Young Professionals) | ✔ |
| W3 | `auWorkingHoliday` | none / 417 / 462 | AU work callout | immi work-holiday-417 and work-holiday-462 pages fetch, but the 462 country list was not found in the raw HTML — locate the eligible-countries sub-page in Phase 1 | JS? |
| R1 | `usVisaBulletinBacklog` | none / moderate / severe | US residency callout | Visa Bulletin ✖ | manual |
| R2 | `usDiversityVisaEligible` | bool | US residency callout | DV instructions (travel.state.gov, HTTP 403 confirmed) | manual |
| R3 | `dualNationalityAtHome` | allowed / restricted / prohibited / unknown | Residency → citizenship, cross-cutting | Home-country law page (see decision D3) | mostly ✖ |
| X1 | `sanctionsRegime` | none / partial / comprehensive | Cross-cutting callout (payments, embassy access) | ofac.treasury.gov programme list and GOV.UK OFSI regime collection both fetch | ✔ |
| X2 | `demonym` / display name | string | Headings, PDF cover | none (editorial) | – |

Global (not per nationality) facts that already exist (fees, IHS, SEVIS)
stay in the base content and `visa-facts.ts`.

Deliberately **not** traits: consulate wait times (volatile, unmonitorable —
link to the official wait-time tool instead), refusal-rate commentary
(no official source), and local-currency conversions (exchange-rate
dependent). The audit in Phase 0 removes these from existing overlays.

### 3.2 Data model changes (`frontend/src/data`)

- `nationality-traits.ts` — `Record<slug, NationalityTraits>`; each trait
  value is `{ value, verifiedAt }`. `unknown` is a legal value during
  population but fails the build once a nationality is registered.
- `trait-sources.ts` — one entry per column: `{ trait, citationId,
  verifiedAt, checkKind: "monitored" | "manual", manualIntervalDays?,
  note }`.
- `trait-rules.ts` — pure functions `(traits, sections) → NationalityOverlay`
  producing profile selections and templated callouts (text lives here,
  `[CITE]` included). Generated callouts render *before* hand-written ones
  for the same anchor.
- `nationalities/<slug>.ts` — hand-written extras only. The registry entry
  gains `tier: "A" | "B" | "C"` and `reviewedAt`. A hand callout may carry
  `practical: true` (D2): it then contains no `[CITE]`, and the renderer and
  the PDF append an asterisk to it plus a small-print note at the end of the
  page: "* Practical guidance from experience, not from an official source."
  The checker rejects a practical callout that contains a currency amount,
  a duration in days/weeks/months, a date, or a percentage.
- `merge-content.ts` — one new function that merges generated + hand
  overlays; rendering and PDF unchanged.
- `countries.ts` — unchanged spelling is the canonical display name (all 100
  top-100 names already exist in the file; use "Congo (Democratic Republic)",
  "Czech Republic", "Ivory Coast", "Turkey", "East Timor" as spelled there).
- Unsupported nationality: render a visible notice ("no nationality-specific
  guidance yet; base rules shown") instead of silently showing base content.

### 3.3 Checker changes (`frontend/scripts/check-content.ts`)

New hard errors:
- registered nationality missing a traits row, or any trait `unknown`;
- trait column without a `citationId` that exists in `citations.ts`;
- hand-written callout with no `[CITE]` and no `practical: true` flag, or a
  `practical` callout containing a number, fee, date or duration (D2);
- generated callout whose anchor is missing (same as today);
- `verifiedAt` older than `manualIntervalDays` for a manual column
  (warning by default, error with `--strict` in CI on the monitor schedule).

New output: a coverage matrix summary (nationalities × traits, counts of
verified / stale / unknown) printed on every build.

### 3.4 Monitoring changes (`monitoring/`, `source-registry.ts`)

- Add the list-page sources from §3.1 (~20 pages). Expected total ≈ 75–80
  sources; at 4 concurrent / 1 per host this stays well inside the 20-minute
  job.
- New source category `eligibility` in `classify-source.ts`, filters and
  labels; the Activity tab's Sources view groups them.
- `MonitoredSource` gains `affectsTraits: string[]` (derived from
  `trait-sources.ts`) so alerts say which columns and how many nationalities
  they touch.
- Home Affairs list pages: confirm the embedded-JSON extraction includes the
  eligible-passport tables; if not, extend `normalize.ts` for those pages or
  cite the "eligible passports" sub-page.
- New alert kind `stale-manual-check`: the watcher raises a `manual` alert
  when a manual column's `verifiedAt` exceeds its interval (reciprocity,
  visa bulletin, bond pilot, DV, dual nationality). Resolving it updates
  `verifiedAt`. This closes the biggest gap: unmonitorable sources currently
  rely on someone remembering.

### 3.5 MCP server changes (`mcp-content-server/`)

- `set_trait(slug, trait, value, verified_at)` and
  `set_trait_column(trait, values_json, verified_at)`.
- `check_trait_column(trait)` — fetches the column's source page, extracts
  country names (GOV.UK lists are plain text and parse cleanly), diffs
  against the table, and reports proposed flips. Never writes; the reviewer
  applies via `set_trait_column`. This is the tool that makes a list-page
  alert a five-minute job.
- `trait_coverage(slug?)` — matrix view; `get_nationality_summary` shows
  traits + generated callouts + hand callouts.
- `get_alert` — also lists trait columns citing the alert's source and the
  nationalities whose values would change.
- `create_nationality` — takes `tier` and a traits row instead of the three
  booleans; template emits no empty callout skeleton.
- Tests: column parser fixtures for each GOV.UK list, rule-engine snapshot
  per tier, round-trip `set_trait_column` → build.

## 4. Review framework

Five mechanisms, each with an owner and a trigger.

| Mechanism | Trigger | What happens | Enforced by |
|---|---|---|---|
| Column review | Alert on a list page | `check_trait_column` → `set_trait_column` → `resolve_alert` | MCP + watcher |
| Manual-check schedule | `verifiedAt` past interval | `stale-manual-check` alert; reviewer checks in a real browser, updates `verifiedAt` | watcher + checker |
| Hand-callout sourcing | Every build | No uncited hand callout; no volatile numbers | `check-content.ts` |
| Nationality review record | Each batch | `reviewedAt` per nationality; batch commit includes a dry-run monitor log | CLAUDE.md rule + PR checklist |
| Spot-check | Each batch | Render 3 random nationalities × 3 destinations; compare 5 facts to sources; generate the PDF | Phase checklist |

Standing calendar (goes into `NEXT-STEPS.md`): AU fees 1 July; UK fees
April; US fee/proclamation changes Oct and ad hoc; Visa Bulletin monthly;
manual columns every 90 days.

Public honesty: the Activity tab shows manual columns as "checked by hand
on <date>" the same way it shows "Not monitorable" sources today.

## 5. Naming, politics and edge cases

- Taiwan (rank 59) is in the top 100: UK non-visa-national with ID number in
  passport, AU ETA, US VWP. Use the dropdown spelling "Taiwan".
- North Korea (rank 55) and other comprehensively sanctioned states: included,
  with a single cross-cutting notice at the top of every column and no
  generated section callouts beyond it (D5).
- Iran, Syria, Yemen, Afghanistan, Venezuela, Russia, Belarus, Sudan, Libya,
  Somalia, Cuba: US visa services suspended or unavailable in-country and/or
  under entry restrictions. Traits V4/V5/X1 carry this; phrasing is dated
  ("as of <verifiedAt>").
- TB test (S2) and differential evidence (S1) depend on where the applicant
  applies from, not nationality alone. Generated text says "if you are
  applying from <country>".
- Hong Kong and Macau are not in the top 100 but China's row must note that
  HKSAR/Macao passport holders are treated differently (UK, AU, US).

## 6. Tiers and batches

Tier rule (D4): Tier A = the 25 largest senders of students to the three
destinations combined; Tier B = the remaining top-100 countries that are
either a major sender to at least one destination or carry a material
nationality-specific situation (US entry restriction, suspended US visa
services, sanctions, nationality-specific work visa); Tier C = everything
else. Tier decides only how much hand-written prose a nationality gets;
trait coverage is identical across tiers.

- **Tier A (25):** traits + up to ~10 hand callouts each, all cited. The
  large sending countries to US/UK/AU: India, China, Nigeria, Pakistan,
  Bangladesh, Vietnam, Nepal, Brazil, South Korea, Japan, Indonesia,
  Philippines, Saudi Arabia, Sri Lanka, Kenya, Ghana, Colombia, Mexico,
  Turkey, Iran, Egypt, Thailand, Malaysia, Taiwan, UAE. Plus the three
  destinations (domestic profiles, already done).
- **Tier B (35):** traits + 2–4 hand callouts (embassy/post situation,
  dual nationality, one notable quirk). Canada, Germany, France, Italy,
  Spain, Netherlands, Poland, Russia, Ukraine, Kazakhstan, Uzbekistan,
  Iraq, Jordan, Morocco, Algeria, Tunisia, Ethiopia, Uganda, Tanzania,
  South Africa, Zimbabwe, Zambia, Rwanda, Cameroon, Senegal, Peru, Chile,
  Argentina, Ecuador, Venezuela, Afghanistan, Sudan, Myanmar, Cambodia,
  Israel.
- **Tier C (37):** traits only. Generated callouts plus the dual-nationality
  line.

Batches of 10 nationalities per session in tier order; each batch is one
commit on a dedicated worktree branch, with the checker, `npm run build`,
and a `--dry-run` monitor pass in the commit message.

## 7. Phases

### Phase 0 — Decisions and audit (1 session)
1. Ahmad answers §9.
2. Audit the 7 existing overlays: classify every callout as *keep+cite*,
   *convert to trait*, or *delete*. Output: `audit-2026-09.md` table.
3. Reachability table for every source in §3.1 from CI (not just this Mac):
   run the watcher `--dry-run --source` against each candidate URL.
4. Fill the demonym column (Appendix A) into the registry format.
Exit: decisions recorded in this file; audit table committed; every trait
has a chosen source or is marked manual.

### Phase 1 — Framework (2–3 sessions)
1. Types, `nationality-traits.ts`, `trait-sources.ts`, `trait-rules.ts`,
   merge changes, unsupported-nationality notice.
2. Checker rules and coverage matrix.
3. Monitoring: `eligibility` category, `affectsTraits`, stale-manual-check
   alerts, Home Affairs list extraction.
4. MCP tools and tests.
5. Migrate the 7 existing nationalities onto traits + audited hand callouts.
   Their rendered output must not regress except where the audit deleted a
   claim.
6. Docs: `CONTENT-GUIDE.md`, `monitoring/README.md`, technical explainer.
Exit: build green with the 7 migrated; a list-page alert can be processed
end-to-end with `check_trait_column`; dry-run monitor quiet.

**Phase 1 outcome (2026-09-27).** Delivered as designed with these
adjustments:
- 17 traits implemented (V1–V4, V8–V10, S1–S4, W1–W3, R1–R3, X1). V5
  (US visa services in country), V6 (reciprocity), V7 (visa bond pilot) and S5
  (SEVIS payment restrictions) are deferred to Phase 2 as cited hand callouts
  for the nationalities they affect, because their only sources block the
  watcher and a column would be manual anyway.
- The Home Affairs extractor now reads the page-schema JSON, so AU sources
  carry real page text. The 462/417 eligible-country lists load separately
  and are a manual column; the 500 page sources `auEnglishExempt`.
- Hand-written callouts may anchor on blocks of the profile the traits select;
  the checker verifies anchors on the merged overlay.
- The audit's KEEP+CITE rows that no existing citation supported were dropped
  rather than cited loosely (UAE "digital identity" exemption, 485 PhD
  duration, ETA-via-app since the UAE is not ETA-eligible); they can return
  once a source is added.
- Practical callouts render with an asterisk and a small-print note on the
  page and in the PDF (D2).

### Phase 2 — Population (4–6 sessions)
1. **Column-first:** for each monitored column, run `check_trait_column`
   against the live page and set all 100 values at once. Manual columns are
   filled from a real-browser check and dated.
2. Register all 100 as Tier C (generated content only). Build, spot-check,
   commit. At this point every nationality is *covered*.
3. Tier B batches, then Tier A batches, 10 per session, each cited.
Exit: 100 registered, zero `unknown`, zero uncited hand callouts, coverage
matrix 100% verified within interval.

**Phase 2 progress (2026-09-27).** Steps 1 and 2 done: every column derived
for all 100 from its live source page (browser pane for the client-side 417
and 462 lists), all 93 new nationalities registered in 10 batches, each
committed with a green build. Adjustments:
- New `auWorkingHoliday` value `462-ballot` (China, India, Vietnam).
- AU visitor route: a passport on both the ETA and eVisitor lists is
  `evisitor651` (free, no app); the UK row moved to eVisitor.
- Sanctions: `comprehensive` only for country-wide embargoes (Cuba, Iran,
  North Korea); Russia, Syria (PAARSS) and other country-named programmes
  are `partial`.
- travel.state.gov (E-2 treaty list, Visa Bulletin, DV instructions) blocks
  every automated client including the browser pane; those three manual
  columns wait for Ahmad's browser check (`NEXT-STEPS.md`). New rows carry
  no E-2 value until then.
- Dual nationality: research fanned out to 9 subagents and every accepted
  verdict was re-read against its page; 29 of 93 new rows are cited, 64 are
  `unknown` under D3 as first written (English-only); D3 was then amended to
  allow non-English official pages and a second pass followed.
- Second dual-nationality pass after D3 was amended (non-English official
  pages allowed): 40 more rows cited, 24 remain `unknown`. The
  watcher now accepts PDFs (several servers answered 406 to an HTML-only
  Accept header).
Tier B done 2026-09-28: 53 cited callouts for 27 of 35; new trait
`ukVisaBrake` (18 traits). Base columns that had no block IDs (UK
after-arrival, UK and AU citizenship) got one so callouts can anchor there.
Tier A done 2026-09-28: 196 cited callouts for all 25, and the four
pre-existing overlays pruned or corrected. Phase 2 content work is complete
apart from the manual checks listed in NEXT-STEPS.
Retry 2026-09-28: 14 callouts for 7 of the 8 Tier B nationalities that had
none (Israel still none); dual nationality 85 of 100 cited (15 unknown).
US embassy pages load only in a browser, so they carry a `skipReason`.

### Phase 3 — Hardening (1 session)
1. First full monitor cycle with the new sources; tune `stripSelectors`.
2. Activity tab: eligibility filter, affected-nationality count on alerts.
3. Update `NEXT-STEPS.md` calendar and `CLAUDE.md` rules (column-first
   reviews; no volatile numbers in overlays).

**Phase 3 outcome (2026-09-28).** Full dry run over ~275 sources: 202 new
snapshots, 12 expected Home Affairs baseline changes, 2 churning gov.br pages
fixed (global strip of the rotating "recommended services" widget), 2 u.ae
pages marked not monitorable. Cited PDFs are now compared on extracted text
(scans on a file hash). `churn-check.ts` fetches every source twice to catch
rotating content. The Activity tab shows where each alerting page is used
(base content, trait columns, nationalities); the eligibility filter shipped
in Phase 1. Calendar and rules are in `NEXT-STEPS.md` and `CLAUDE.md`.

## 8. Risks

- **Blocked sources** (all of travel.state.gov, Visa Bulletin, reciprocity,
  DV, bond pilot). Mitigation: manual columns with dated stale alerts and
  honest labelling. Never add bot-evasion.
- **Fast-moving US entry restrictions.** Mitigation: dated wording, a
  monitored Federal Register or whitehouse.gov source if CI can fetch it,
  30-day manual interval otherwise.
- **Dual-nationality law** for 100 countries has no single official source
  and many non-English ones. Mitigation: decision D3.
- **Regression of existing content** during migration. Mitigation: render
  snapshots of the 7 current nationalities before Phase 1 and diff after.
- **Reviewer load.** ~20 more monitored pages, mostly stable GOV.UK lists;
  expected alert volume rises modestly. The stale-manual-check alerts are
  the new recurring cost: ~6 columns × every 90 days.

## 9. Decisions (taken 2026-09-27)

- **D1 Depth:** tiered, as in §6.
- **D2 Uncited practical advice:** allowed, but it must be visibly marked: an
  asterisk on the callout and a small-print note on the page (and in the
  PDF) saying it is not from an official source. No numbers, fees, dates or
  durations without a citation; the checker enforces this.
- **D3 Dual nationality sourcing:** option (a). Cite the home-country
  government page where an official English page exists; otherwise the
  trait is `unknown` and the generated line says to confirm with the
  home country's embassy. No non-government sources, so the "official
  sources only" promise on the home page stays true.
  *Amended 2026-09-27 (Ahmad):* official home-government pages in another
  language are allowed when no English one exists. The citation label ends
  with the language ("(in French)") and the row's note ends "The cited
  official page is in French." so readers see it beside the claim.
- **D4 Tier membership:** the rule in §6 decides membership; the lists in
  Appendix A follow from it. Adjust the rule, not individual countries.
- **D5 Sanctioned states (North Korea is rank 55, so it is in scope):**
  included with a single cross-cutting notice.
- **D6 Full US entry restriction:** base student/work content is kept and a
  prominent dated callout sits at the top of every US column, consistent
  with how every other trait renders.
- **D7 Population source:** UN mid-2023, Appendix A as listed.

## Appendix A — The 100 nationalities

Rank per UN mid-2023 estimate. Name = spelling in `countries.ts`. Label =
proposed adjective for headings. Tier per the rule in §6.
Existing = already implemented.

| # | Name | Label | Tier | Existing |
|---|---|---|---|---|
| 1 | India | Indian | A | ✔ |
| 2 | China | Chinese | A | ✔ |
| 3 | United States | American | dest | ✔ |
| 4 | Indonesia | Indonesian | A | |
| 5 | Pakistan | Pakistani | A | ✔ |
| 6 | Nigeria | Nigerian | A | |
| 7 | Brazil | Brazilian | A | |
| 8 | Bangladesh | Bangladeshi | A | |
| 9 | Russia | Russian | B | |
| 10 | Mexico | Mexican | A | |
| 11 | Ethiopia | Ethiopian | B | |
| 12 | Japan | Japanese | A | |
| 13 | Philippines | Filipino | A | |
| 14 | Egypt | Egyptian | A | |
| 15 | Congo (Democratic Republic) | DR Congo | C | |
| 16 | Vietnam | Vietnamese | A | |
| 17 | Iran | Iranian | A | |
| 18 | Turkey | Turkish | A | |
| 19 | Germany | German | B | |
| 20 | Thailand | Thai | A | |
| 21 | United Kingdom | British | dest | ✔ |
| 22 | Tanzania | Tanzanian | B | |
| 23 | France | French | B | |
| 24 | South Africa | South African | B | |
| 25 | Italy | Italian | B | |
| 26 | Kenya | Kenyan | A | |
| 27 | Myanmar | Myanmar | B | |
| 28 | Colombia | Colombian | A | |
| 29 | South Korea | South Korean | A | |
| 30 | Sudan | Sudanese | B | |
| 31 | Uganda | Ugandan | B | |
| 32 | Spain | Spanish | B | |
| 33 | Algeria | Algerian | B | |
| 34 | Argentina | Argentine | B | |
| 35 | Iraq | Iraqi | B | |
| 36 | Afghanistan | Afghan | B | |
| 37 | Ukraine | Ukrainian | B | |
| 38 | Yemen | Yemeni | C | |
| 39 | Canada | Canadian | B | |
| 40 | Poland | Polish | B | |
| 41 | Morocco | Moroccan | B | |
| 42 | Angola | Angolan | C | |
| 43 | Uzbekistan | Uzbek | B | |
| 44 | Malaysia | Malaysian | A | |
| 45 | Peru | Peruvian | B | |
| 46 | Ghana | Ghanaian | A | |
| 47 | Mozambique | Mozambican | C | |
| 48 | Saudi Arabia | Saudi | A | |
| 49 | Madagascar | Malagasy | C | |
| 50 | Ivory Coast | Ivorian | C | |
| 51 | Nepal | Nepali | A | |
| 52 | Cameroon | Cameroonian | B | |
| 53 | Venezuela | Venezuelan | B | |
| 54 | Australia | Australian | dest | ✔ |
| 55 | North Korea | North Korean | C | |
| 56 | Niger | Nigerien | C | |
| 57 | Mali | Malian | C | |
| 58 | Syria | Syrian | C | |
| 59 | Taiwan | Taiwanese | A | |
| 60 | Burkina Faso | Burkinabè | C | |
| 61 | Sri Lanka | Sri Lankan | A | |
| 62 | Malawi | Malawian | C | |
| 63 | Zambia | Zambian | B | |
| 64 | Kazakhstan | Kazakh | B | |
| 65 | Chile | Chilean | B | |
| 66 | Chad | Chadian | C | |
| 67 | Romania | Romanian | C | |
| 68 | Somalia | Somali | C | |
| 69 | Guatemala | Guatemalan | C | |
| 70 | Senegal | Senegalese | B | |
| 71 | Netherlands | Dutch | B | |
| 72 | Ecuador | Ecuadorian | B | |
| 73 | Cambodia | Cambodian | B | |
| 74 | Zimbabwe | Zimbabwean | B | |
| 75 | Guinea | Guinean | C | |
| 76 | Benin | Beninese | C | |
| 77 | Rwanda | Rwandan | B | |
| 78 | Burundi | Burundian | C | |
| 79 | Bolivia | Bolivian | C | |
| 80 | Tunisia | Tunisian | B | |
| 81 | Belgium | Belgian | C | |
| 82 | Haiti | Haitian | C | |
| 83 | South Sudan | South Sudanese | C | |
| 84 | Jordan | Jordanian | B | |
| 85 | Dominican Republic | Dominican | C | |
| 86 | Cuba | Cuban | C | |
| 87 | Czech Republic | Czech | C | |
| 88 | Honduras | Honduran | C | |
| 89 | United Arab Emirates | UAE | A | ✔ |
| 90 | Sweden | Swedish | C | |
| 91 | Portugal | Portuguese | C | |
| 92 | Tajikistan | Tajik | C | |
| 93 | Papua New Guinea | Papua New Guinean | C | |
| 94 | Azerbaijan | Azerbaijani | C | |
| 95 | Greece | Greek | C | |
| 96 | Hungary | Hungarian | C | |
| 97 | Togo | Togolese | C | |
| 98 | Israel | Israeli | B | |
| 99 | Austria | Austrian | C | |
| 100 | Belarus | Belarusian | C | |

Tier counts: A 25 (+3 destinations), B 35, C 37.

## Appendix B — Source reachability (Phase 0, probed 2026-09-27 with the watcher's own fetch + normalize, from this Mac; CI re-check happens when the citations land in Phase 1)

| Trait | URL | Result |
|---|---|---|
| V1 | gov.uk …/immigration-rules-appendix-visitor-visa-national-list | 200, 5.6k chars, list parses |
| S2 | gov.uk/tb-test-visa/countries-where-you-need-a-tb-test-to-enter-the-uk | 200, 2.5k chars, list parses |
| S3 | gov.uk …/immigration-rules-appendix-english-language | 200, 10.6k chars |
| S1 | gov.uk …/immigration-rules-appendix-student | 200, 48k chars (large page; use `contentSelector` on ST 22.1 if it churns) |
| W2 | gov.uk/youth-mobility/eligibility | 200, 1.8k chars |
| V2 | gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta | already monitored |
| V8 | immi …/electronic-travel-authority-601 and …/evisitor-651 | 200; passport lists present only in embedded JSON (`\u003cli\u003eJapan…`); normalizer must be extended |
| V9, V10, S4 | immi biometrics, what-health-examinations-you-need, english-language | 200; same embedded-JSON situation |
| W3 | immi work-holiday-417 / work-holiday-462 | 200; 462 country list not in raw HTML, find sub-page |
| V3 | dhs.gov/visa-waiver-program | 200, 16.8k chars, full 42-country table with dates |
| V4 | whitehouse.gov fact sheet (Dec 2025) | 200, 11.6k chars, country lists present |
| V4 | cbp.gov/document/bulletins/presidential-proclamation-restricting-entry | 200, short landing page linking the PDF |
| V4 | federalregister.gov document 2025-23570 | 200 but serves an "aggressive scraping" interstitial; not monitorable |
| W1 | uscis.gov E-3, TN, E-2 pages | 200 |
| W1 | uscis.gov H-1B / H-1B1 pages | 404 on both slugs tried |
| S5 | ice.gov/sevis/i901 | 200 |
| X1 | ofac.treasury.gov sanctions programme list; GOV.UK OFSI collection | 200 (OFAC slow, 9 s) |
| V5, V6, V7, R1, R2 | travel.state.gov (wait times, reciprocity, DV) | 403, as already recorded in `source-overrides.ts` |
| — | congress.gov CRS summary | 403 (not needed) |

## Appendix C — US entry restrictions in force (Proclamation 10998, effective 1 Jan 2026; from the whitehouse.gov fact sheet, to be re-verified against the proclamation text when V4 is populated)

- **Full suspension (17):** Afghanistan, Burma (Myanmar), Chad, Republic of the
  Congo, Equatorial Guinea, Eritrea, Haiti, Iran, Libya, Somalia, Sudan,
  Yemen, Burkina Faso, Mali, Niger, South Sudan, Syria; plus Palestinian
  Authority travel documents.
- **Partial suspension (19; B-1/B-2, F, M and J visas and immigrant visas):**
  Burundi, Cuba, Togo, Venezuela, Angola, Antigua and Barbuda, Benin,
  Côte d'Ivoire, Dominica, Gabon, The Gambia, Malawi, Mauritania, Nigeria,
  Senegal, Tanzania, Tonga, Zambia, Zimbabwe. Turkmenistan: immigrant visas
  only.
- Exceptions include existing visa holders and permanent residents.
- **Top-100 impact:** 26 of the 100 nationalities are affected (Afghanistan,
  Myanmar, Chad, Iran, Somalia, Sudan, Yemen, Burkina Faso, Mali, Niger,
  South Sudan, Syria, Haiti full; Burundi, Cuba, Togo, Venezuela, Angola,
  Benin, Ivory Coast, Malawi, Nigeria, Senegal, Tanzania, Zambia, Zimbabwe
  partial). For a partial-suspension nationality the US student and visit
  columns are effectively unavailable, so the V4 callout (D6) is the single
  most consequential piece of generated content in the expansion. Note that
  the existing china.ts overlay still discusses Proclamation 10043; V4 must
  carry per-nationality proclamation references, not a single global one.
