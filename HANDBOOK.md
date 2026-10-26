# Student Atlas — Handbook

_Last updated 2026-10-26. This is the single reference for how the project is
built, how it stays accurate, what needs a person, and what to do before
launch. Detailed references it points to: `frontend/src/data/CONTENT-GUIDE.md`
(content model and editing tools) and `monitoring/README.md` (the watcher)._

---

## 1. What it is

A visa and immigration guide for international students (and their families)
going to the **United States, United Kingdom and Australia**. A reader picks a
nationality and destinations; every page then shows the base rules plus what
changes for that passport.

- **100 nationalities**: the 100 most populous (UN mid-2023), including the
  three destinations themselves (their citizens see "domestic" pages).
- **Four sections**: tourist visa, student visa, work visa, residency pathway.
- **Official sources only**: every fact is cited to a government page
  (`[CITE: id]`), and every cited page is monitored for changes. The only
  exception is clearly marked practical advice (asterisk, no numbers).
- **Static site**: no backend, no database, no accounts, no cookies, no
  analytics. Preferences live in the browser's localStorage.

Current size: 312 citations (305 distinct pages, 38 of them not
automatically monitorable), 20 nationality traits, 100 × 20 trait values,
170 distinct hand-written callouts (304 placements across columns).

---

## 2. Repository layout

```
student-atlas/
├── HANDBOOK.md            ← this file
├── CLAUDE.md              ← rules for Claude sessions working on the repo
├── README.md              ← short overview and quick start
├── frontend/              ← the app (React 19, TypeScript, Vite, Tailwind)
│   ├── src/data/          ← ALL content (TypeScript data, see §3)
│   │   ├── traits/        ← nationality facts table + rules that generate content
│   │   ├── sections/      ← base content (tourist, student, work, residency)
│   │   ├── profiles/      ← alternative content blocks (ETA, ESTA, domestic)
│   │   ├── nationalities/ ← per-nationality hand-written extras + registry
│   │   ├── citations.ts   ← every source (id, URL, label)
│   │   ├── source-overrides.ts ← per-source monitoring settings (skip, selectors)
│   │   ├── glossary.ts, visa-facts.ts, home-content.ts, …
│   │   ├── monitoring/    ← watcher output bundled into the app (alerts, status)
│   │   └── CONTENT-GUIDE.md
│   ├── scripts/check-content.ts ← content integrity check (runs in every build)
│   └── src/pages, components, hooks, lib ← the UI
├── monitoring/            ← source watcher (GitHub Actions, every 12 h)
│   ├── src/               ← fetch, normalise, diff, alert; PDF text extraction
│   └── snapshots/         ← reviewed text of every monitored page
├── mcp-content-server/    ← tool server for reviewing alerts and editing content (+ atlas_cli.py)
├── feedback-triage/       ← daily routine that triages visitor feedback (policy, prompt, setup)
└── archive/               ← retired Flask-era code, not used by anything
```

The workflow is `.github/workflows/student-atlas-monitor.yml` at the repo root.

---

## 3. How the content works

Four layers, merged at runtime for the chosen nationality:

1. **Traits** (`traits/nationality-traits.ts`): one row per nationality, 19
   columns of facts that decide content (visa-waiver membership, TB test,
   entry restrictions, dual nationality, …). Each column is read from one
   official list page (`traits/trait-sources.ts`), except dual nationality,
   where each row cites its own home-government page.
2. **Rules** (`traits/trait-rules.ts`): turn a row into generated callouts and
   profile swaps. Changing a rule changes all 100 nationalities at once.
3. **Base content** (`sections/*.ts`): what every reader sees.
4. **Hand-written overlays** (`nationalities/<slug>.ts`): extra cited callouts
   for one nationality, merged on top of the generated ones.

Depth by tier: **Tier A** (28, the largest student-sending countries and the
three destinations) up to ~10 hand callouts each; **Tier B** (35) 2–4;
**Tier C** (37) traits only. Every nationality has the full trait row.

### The 20 traits

| Trait | Source | Kept current by |
|---|---|---|
| `ukVisaNational` | GOV.UK visa national list | watcher |
| `usVwp` | DHS Visa Waiver Program list | watcher |
| `usEntryRestriction` | Proclamation 10998 (whitehouse.gov) | watcher |
| `ukVisaBrake` | GOV.UK visa brake | watcher |
| `auVisitorStream` | Home Affairs ETA 601 / eVisitor 651 lists | watcher |
| `auBiometricsRequired` | Home Affairs biometrics page | watcher |
| `auHealthExamLikely` | Home Affairs health examinations (low-TB list) | watcher |
| `ukDifferentialEvidence` | Appendix Student ST 22.1 | watcher |
| `ukTbTestRequired` | GOV.UK TB test countries | watcher |
| `ukMajorityEnglish` | Appendix English Language | watcher |
| `auEnglishExempt` | Home Affairs Student 500 page | watcher |
| `auStudentFamilyExempt` | Home Affairs Student 500 page (family exemption 4) | watcher |
| `usTaxTreatyStudent` | IRS Publication 901 | watcher |
| `ukYouthMobility` | GOV.UK Youth Mobility eligibility | watcher |
| `sanctionsRegime` | OFAC sanctions programs | watcher |
| `usNationalityWorkVisas` | USCIS E-2 / treaty list | **manual, every 180 days** |
| `auWorkingHoliday` | Home Affairs 417/462 lists | **manual, every 180 days** |
| `usVisaBulletinBacklog` | travel.state.gov Visa Bulletin | **manual, every 90 days** |
| `usDiversityVisaEligible` | DV instructions (travel.state.gov) | **manual, every 365 days** |
| `dualNationalityAtHome` | each home government's page | **manual, every 365 days** |

Manual columns raise a "stale check" alert on the Activity tab when their
interval runs out.

### Content rules (decided during the expansion, still in force)

- **Official sources only.** Government pages, including the home country's
  own government in its own language (label ends "(in French)" etc., and the
  dual-nationality note says so).
- **Archived copies.** If an official page is offline or blocked, an Internet
  Archive copy of that same official page may be cited; its label ends
  "(archived copy)*" and it carries a `skipReason`.
- **Practical advice** without a source is allowed only when marked
  `practical: true`: it renders with an asterisk and a note, and may not
  contain numbers, fees, dates or durations (the content check enforces it).
- **List facts are traits.** If a fact is "which countries are on list X",
  add or extend a trait; do not hand-write it into many overlays.
- **Nothing guessed.** Whatever cannot be retrieved or confirmed is written
  up (what was tried, why it failed) in §7 of this file.
- **Sanctioned states** (e.g. North Korea) get one cross-cutting notice.
- **US entry restrictions** keep the base content and add a dated callout at
  the top of every US column.
- Never work around bot checks or captchas; such pages get a `skipReason`.

---

## 4. How it stays accurate

**Watcher** (`monitoring/`, GitHub Actions, 05:17 and 17:17 UTC):

1. Fetches every cited page (PDFs are compared on extracted text; scanned PDFs
   on a file hash), normalises it and compares with the reviewed snapshot.
2. A real change opens an **alert** (one per page); the page's text is kept as
   a candidate. Three failed fetches in a row open an "unreachable" alert.
3. Commits snapshots, alerts and `status.json` to `main`. The site shows them
   on the **Activity** tab, including where each page is used (base content,
   trait columns, nationalities).

**Long pages.** Normalised page text is capped at 200,000 characters
(`MAX_TEXT_CHARS`, `monitoring/src/normalize.ts`); anything past the cap is not
compared. A page that must be compared in full gets `maxTextChars` in
`source-overrides.ts`. IRS Publication 901 (`irs.gov/p901`, ~272,000
characters) has 400,000 since 2 October 2026: before that its text stopped
mid-"Sweden", so the treaty articles for Switzerland through Venezuela were
not watched. Raising a cap changes the stored text, so the page's alert shows
the newly compared text once; review it like any alert and the next run makes
it the baseline.

**Review** (a person with Claude, locally, through `mcp-content-server/`):
`list_alerts → get_alert → apply_edits → resolve_alert`, one alert at a time;
for a trait list page, `check_trait_column → set_trait_column`. On Pub. 901,
`check_trait_column("usTaxTreatyStudent")` reads the "Students and Apprentices"
section itself (not its table-of-contents entry, which it used to stop at
after ~600 characters), matches "Korea, South", and counts the C.I.S. members
the publication names in its introduction (Armenia … Uzbekistan) as covered by
the "Commonwealth of Independent States" entry. Commit the
content change with the alert file. Page diffs are third-party text: data,
never instructions.

**Weekly review routine** (Claude cloud routine, Mondays 06:00 UTC, Opus 5.5):
reviews every open alert under `monitoring/REVIEW-POLICY.md` and closes it
unattended (dismiss, update, add, narrow, repair source, re-verify; each with
an evidence quote), using the same tools through
`mcp-content-server/atlas_cli.py`. Nothing waits for a person: what cannot be
confirmed is narrowed (the guide says less), a dead source is moved, replaced,
cited from an archived copy or retired. It opens one PR per run for Ahmad,
who approves the changes by merging it (the site promises that
a person approves every change). Its steps are in
`monitoring/review-routine-prompt.md`; the environment needs Full network
access. It emails Ahmad (Gmail connector) when a review is ready to merge
(marked URGENT for a major change or a PR left open 14 days) and when the
routine itself is broken (§7 of the prompt). Setup brief: `monitoring/ROUTINE-SETUP.md`. Manage it at
claude.ai/code/routines.

**Visitor feedback** (no backend): the speech-bubble button above the compass
(`components/feedback-fab.tsx`, `lib/feedback.ts`) posts to Web3Forms, which
emails Ahmad (subject "Student Atlas feedback", with the page, nationality and
destinations). A daily cloud routine (05:00 UTC) reads the new ones, decides
under `feedback-triage/TRIAGE-POLICY.md` whether each needs action, and sends
**one digest email** with a paste-ready Claude prompt per action item. It is
read-only: it changes nothing in the repo, and Gmail labels ("Student
Atlas/Feedback triaged") record what it has handled. Setup and settings:
`feedback-triage/ROUTINE-SETUP.md`. While `WEB3FORMS_ACCESS_KEY` is empty the
button is hidden.

**Checks in every build** (`npm run build` runs `check:content`): every
`[CITE]` and `[TERM]` exists, callout anchors exist, practical callouts have no
numbers, all 100 rows have all 20 traits, no trait is past its review date.
The build fails if any of these fail.

---

## 5. Commands

```bash
# App
cd frontend && npm install
npm run dev                 # local dev server
npm run build               # content check + type-check + production build → frontend/dist
npm run check:content       # content integrity only
npm run lint

# Watcher
cd monitoring && npm ci
npx tsx src/run.ts --dry-run            # full live sweep, writes nothing
npx tsx src/run.ts --source <citation-id>
npx tsx src/churn-check.ts              # pages whose text changes between fetches
npx tsc --noEmit

# Content server (local review tools)
cd mcp-content-server && pip install -r requirements.txt
python3 -m unittest discover tests
# Claude Code config: copy mcp-content-server/.mcp.json.example to .mcp.json
```

Show the generated content for one nationality:
`cd frontend && npx tsx scripts/show-generated.mts <slug>`.

---

## 6. Check-up calendar

| When | What | How |
|---|---|---|
| Every 12 h (automatic) | ~270 monitored pages | Review open alerts on the Activity tab |
| Daily (automatic, only when there is feedback) | Visitor feedback | Digest email: paste each prompt into Claude Code, merge the PR it opens |
| Weekly (Monday, automatic) | Open alerts | Review routine closes them and emails you its PR: check the decisions, merge |
| Every 90 days | Visa Bulletin backlog column | travel.state.gov in a browser → `set_trait_column` |
| Every 180 days | E-2 treaty list; Working Holiday 417/462 lists | Browser; stale-check alert reminds you |
| Every 365 days | DV eligibility (new instructions ~October); dual-nationality rows; the 38 unmonitorable sources (§8) | Browser / home-government pages |
| April | UK fee changes | GOV.UK fee tables; update `visa-facts.ts` by hand |
| 1 July | Australian fee changes | Home Affairs in a browser (fees render client-side); `visa-facts.ts` by hand |
| October | US fiscal year: fees, DV cycle | Alerts + browser |
| Ad hoc | US proclamations; UK visa brake reviews | Alerts on whitehouse.gov and gov.uk/visa-brake |
| 1 Jan 2027 | UK Graduate Route becomes 18 months | Content already says so; revisit wording |
| After adding citations | Churn check | `npx tsx src/churn-check.ts` |

`visa-facts.ts` (the summary cards) has **no citations**, so the watcher never
flags it: update it whenever a fee or threshold changes in the prose.

---

## 7. What needs a person (open items as of 2026-10-02)

### Alerts waiting for review
The weekly review routine keeps this list current. Only alerts its policy
allows it to carry over are listed (a manual trait column with no newer
evidence anywhere).

None (the 26 October 2026 review closed all 15 open alerts).

### Follow-ups
Improvements a code change could add, noted by the review routine. None of
them blocks anything.

- 2026-10-04: `add_citations` adds no `source-overrides.ts` entry, so a new
  home-country source gets no `country: "INTL"` / category. (The two from
  the 4 October run were filed by hand.) A tool option would let the routine
  do it.
- 2026-10-04: web.archive.org could not be reached from the cloud routine
  (HTTP 403 / connection reset), so source-ladder step 4 was unavailable.
  Vietnam's dual-nationality row was retired to "unknown" because
  pbgdpl.gov.vn returned 503 and no other official page states the rule
  explicitly. Restore it when pbgdpl.gov.vn or an archived copy is reachable.
  The routine now checks at setup whether snapshots load, skips step 4 when
  they do not, and flags each source it retired without an archive check.
  Still HTTP 403 from the cloud on 2026-10-05, 2026-10-12, 2026-10-19 and
  2026-10-26.
- 2026-10-04: `immi.homeaffairs.gov.au/what-we-do/whm-program/latest-news`
  extracts only its title and description, although the HTML carries the
  news text (e.g. the planned ballot for Indonesian Work and Holiday visa
  applicants). Extraction support would let it be cited and monitored.
- 2026-10-12: the Pakistan HEC foreign-degree equivalence callouts were
  retired because the whole hec.gov.pk site returned 503 / connection resets
  and the archive step was unavailable. Restore them (citing
  `.../DES/Pages/Procedure/Procedure-foreign.aspx`) once hec.gov.pk answers.
- 2026-10-12: `mcp-content-server/requirements.txt` (`mcp>=1.26.0`) now
  installs mcp 2.x, where `mcp.server.fastmcp` no longer exists, so
  `atlas_cli.py` fails to import. Pinning `mcp>=1.26.0,<2` fixes it (the run
  used a venv with that pin). Still the case on 2026-10-19 and 2026-10-26.
- 2026-10-12: a real `run.ts --source` that finds an `unreachable` source
  reachable again auto-closes the alert as `dismissed` with no edits, even
  when `fix_source` had just recorded a URL change on it (Cameroon's
  `minjustice.cm/justitia-13-nationalite`). Keeping the recorded edits and
  closing it as `approved` would make the Activity feed accurate.
- 2026-10-19: the Egypt Supreme Council of Universities degree-recognition
  callouts (scientific supervision of the education missions; full-time
  study for practical fields) were retired because the whole scu.eg site
  returned HTTP 503 and the archive step was unavailable. Restore them
  (citing the SCU "General Administration for Degree Equivalence" FAQ page)
  once scu.eg answers.
- 2026-10-19: dismissing a change alert whose candidate is an error page
  (law.moj.gov.tw briefly served "Unreachable Server") makes that error
  text the reviewed baseline, and the next check re-alerts. The run used
  `refresh_alert` instead, which auto-closed it. A watcher check that treats
  such error pages as fetch failures would avoid the alert.
- 2026-10-26: three dual-nationality rows were retired to "unknown" with no
  archive check: Senegal (dri.gouv.sn under maintenance, the law PDF 404),
  Somalia (icric.gov.so HTTP 403; parliament.gov.so only has the superseded
  2012 text) and DR Congo (presidence.cd connection reset). Restore them
  when those sites, or archived copies, can be read again.
- 2026-10-26: the watcher saved a bot-check page ("Please wait while your
  request is being verified...") as the baseline of three sources
  (avkd.tj, coursupreme.org.gn, dri.gouv.sn), so the real text later showed
  up as a change alert. Treating such interstitials as fetch failures would
  avoid both the bad baseline and the alert.

### Done in the 2 October review (for the record)
- **Australia, Student visa from 2 October 2026**: most applicants cannot
  include family and most must apply from outside Australia (AU overview,
  dependants item, TL;DR card). The Pacific Island / ASEAN family exemption
  is the `auStudentFamilyExempt` trait (8 rows). "GTE statement" became the
  Genuine Student answers (glossary `genuine-student`).
- **IRS Publication 901 is monitored in full**: per-source `maxTextChars`
  in `source-overrides.ts` (400k for p901; the default cap stays 200k), and
  `check_trait_column usTaxTreatyStudent` reads the Students and Apprentices
  section itself.

### Weekly review routine: created 3 October 2026
"Student Atlas weekly alert review" (claude.ai/code/routines/trig_01GQrzmFwYyxatkkukV1pqDA),
Mondays 06:00 UTC, Opus 5.5, Gmail connector only. The cloud environment must
allow Full network access.

### Checks only a real browser can do
travel.state.gov and usembassy.gov block automated clients.

1. **E-2 treaty countries** (travel.state.gov treaty page): only Pakistan,
   UK and Australia carry E-2 today; mark every top-100 country on the list.
2. **Diversity Visa ineligible countries**: confirm the DV-2026 list; re-check
   when DV-2027 instructions appear.
3. **Visa Bulletin**: separate employment columns only for China, India
   (`severe`), Mexico and the Philippines (`moderate`)?
4. **US embassy leads**: Russians' designated US visa posts (Warsaw, Astana);
   the full US visa-bond country list (Senegal and Venezuela confirmed; then
   make it a trait); US Embassy Caracas consular services (operations resumed
   30 March 2026, consular services "eventual").
5. **Content checks**: China's two Australian callouts (Chinese ImmiAccount,
   Frequent Traveller stream); Indonesia's rule reportedly treating a
   non-Honours Australian bachelor's as Diploma Tiga; the Bangladesh Bank
   guidelines cited are the 2018 edition.

### Watch items
- Other pages still cut at the 200,000-character cap (only the first 200,000
  characters are watched): the Ecuador, Venezuela, Bolivia and Dominican
  Republic and Ghana constitutions, Guinea's civil code, Mali's family code,
  the Cameroon nationality code and OFAC's Russia sanctions FAQs. Not yet checked whether the articles we cite fall
  before the cap; if one does not, give that page a `maxTextChars` override.
- H-1B $100,000 payment guidance (vacated by a court, June 2026; may be appealed).
- F-1 Duration of Status rule (blocked by a preliminary injunction, 14 Sep 2026).

### Could not be retrieved or confirmed

**Dual nationality: 7 of 100 rows are `unknown`** (readers see "not yet
verified; confirm with an embassy"):

| Country | Why |
|---|---|
| Afghanistan | The 2000 Citizenship Law bars dual citizenship, but no official source says the current authorities apply it. |
| Burkina Faso | The 2025 family code replaced the rule; no official copy is online. |
| Chad | The 1962 ordinance is only on the official gazette site, behind a bot check; no archived copy. |
| Israel | Government sites refuse automated clients; archived pages only describe renunciation. |
| Myanmar | The legal database refuses connections; archived pages never captured the law. |
| Niger | No official copy of the 2014 law; the Foreign Ministry page predates it. |
| North Korea | No official publication exists. |

**Cited from archived copies (8)**: Burundi, Cambodia, Guatemala, Iran, Ivory
Coast, South Sudan, Sudan, Syria. Once a year, check whether the official page
is back and cite it instead. Ivory Coast is the 1961 text (later amendments
unread; none reported to change art. 48).

**Israel** has only practical (asterisked) callouts: check IDF status before
leaving; ask Bituach Leumi about insurance rights abroad.

---

## 8. Sources the watcher cannot read

38 cited pages carry a `skipReason` in `frontend/src/data/source-overrides.ts`
and appear as "not monitorable" on the Activity tab: travel.state.gov,
*.usembassy.gov and state.gov (bot checks), u.ae and adilet.zan.kz
(JavaScript only), cne.ao and consulado.pe (broken TLS chains), kdmid.ru
(times out), legifrance and pravo.by (403), the 8 archived copies, and a few
others. Check them by hand once a year. Local quirk: some hosts
(privatehealth.gov.au, dol.gov) fail from a home connection but work in CI.

---

## 9. Launching the site

The app is a static single-page app: `cd frontend && npm run build` produces
`frontend/dist/`. Any static host works (Cloudflare Pages, Netlify, Vercel,
GitHub Pages).

**Chosen host: Vercel (free Hobby plan).** Project settings: root directory
`frontend`, framework Vite (from `vercel.json`), Node 22, Git
connected to `main` so every push redeploys. Domain:
**thestudentatlas.com** (registered at GoDaddy, DNS stays on GoDaddy's
nameservers): `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com`; on
Vercel `www` redirects (308) to the bare domain. `thestudentatlas.vercel.app`
still works. Watcher commits carry
`[skip ci]`; if Vercel skips those, new alerts appear on the next ordinary
deploy.

**Must do**
- [ ] **Create the Vercel project** with the settings above, so it rebuilds
      on every push to `main` (the watcher commits new alerts and status twice
      a day, and they are bundled at build time).
- [x] **SPA fallback.** The app uses browser routes (`/student/documents`,
      `/activity`, …). Rewrite unknown paths to `/index.html`, or deep links
      will 404. Vercel: done by `frontend/vercel.json` (static files are served
      first, everything else goes to `index.html`). Netlify: `_redirects` with
      `/* /index.html 200`. Cloudflare Pages: automatic without a `404.html`.
- [ ] **Clear the open items in §7** that affect readers (browser checks,
      pending alerts), and do a final `npm run build` with no failures.
- [ ] **Read the disclaimer** (home page, `home-content.ts`): "an information
      resource, not legal advice"; make sure you are happy with it.
- [ ] **Domain and title**: domain done (2026-10-24, see above). `index.html`
      has the title and description; add a
      social preview image if you want link previews.

**Should do**
- [ ] Check on a phone and with a keyboard only (navigation, dropdown, PDF export).
- [ ] Decide whether the Activity tab stays public (it is transparent by design).
- [ ] Decide on analytics. There are none now, so no cookie banner is needed;
      adding any changes that.
- [ ] The main JavaScript chunk is ~580 kB (Vite warns above 500 kB). Fine for
      launch; split the PDF export or activity page further if load time matters.

**Stays local**
- The content server (`mcp-content-server/`) is a review tool for you and
  Claude, not part of the site. Do not deploy it. Its optional SSE mode
  (`start.sh`) needs a password in `mcp-content-server/.env`, which is not
  committed.
- The watcher needs only the repository's default GitHub Actions token (write
  access to `main`); there are no other secrets.

---

## 10. Adding or changing content (short version)

- **A fact that is a list** → a trait: types → trait source → rule →
  100 row values → content-server `TRAIT_VALUES`/`REGIONS` → tests →
  content check. `usTaxTreatyStudent` (2026-09-28) is the latest example.
- **A nationality-specific fact** → a cited callout in
  `nationalities/<slug>.ts` (`add_callout`), citation added first
  (`add_citations`), anchored on a block id from the column it belongs to.
- **Wording anywhere** → `apply_edits`.
- Full workflow and tool list: `frontend/src/data/CONTENT-GUIDE.md`.
- Git: work in a worktree on a branch, open a PR, merge to `main`
  (Claude sessions cannot push to or merge into `main` themselves).
