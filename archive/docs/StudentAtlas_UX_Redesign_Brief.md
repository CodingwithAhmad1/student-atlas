# Student Atlas — UX Redesign Brief
### For Claude Code Implementation

---

## How to Read This Document

This brief is structured for a single, clean implementation pass. Read it fully before writing a single line of code. Every decision in here has a reason. Do not skip sections, do not reorder the build sequence, and do not substitute components unless explicitly noted.

---

## 1. The Problem Being Solved

The current platform is built like a reference document — structured for someone who already knows what they want. The actual user is a 17-year-old who is anxious, time-poor, and terrified of making a mistake. They do not read. They scan for reassurance.

The platform currently fails the user at first contact because:
- Every subsection renders everything at once — no progressive disclosure
- Visual hierarchy is flat — prose, key-value lists, callouts, and citations all compete equally for attention
- The three-column side-by-side layout asks users to mentally diff dense prose blocks instead of being shown differences clearly
- `text-muted-foreground` on all body copy creates a wall of grey with no anchor points

The redesign is a **mode switch** — from encyclopedia to decision support tool. The content does not change. How it is revealed and prioritised does.

---

## 2. The User's Mental Model

When a student lands on a visa page, they have exactly two jobs:

1. **"Does this apply to me / what are my chances?"** — needs to be answered in under 30 seconds
2. **"What do I actually need to do?"** — needs to be a checklist they can act on immediately

Everything else — prose explanations, legal nuance, fee breakdowns, citations — is supporting material. It must exist, but it must not be the first thing the user encounters.

The correct information hierarchy, mirroring how a student actually thinks:

```
1. Personalised callout        → "Does this apply to me specifically?"
2. TL;DR card                  → "What's the short answer?"
3. Checklist                   → "What do I do?"
4. Accordion depth             → "Why, and what are the details?"
5. Comparison table            → "How does this compare to other countries?"
```

Implement in this order. Do not invert it.

---

## 3. Components to Build

### 3.1 TL;DR Card (Highest Priority)

**What it is:** A compact summary card that appears at the top of every country column, before any prose. It contains exactly 5–6 glanceable facts. It is the first thing the user reads.

**What it must contain (fields are fixed — do not add or remove):**
- Visa name + one-line plain-English definition
- Total upfront cost (all fees summed into one number, e.g. "~£490 total")
- Maximum work hours (e.g. "20 hrs/week during term")
- Dependants allowed → render as ✓ or ✗ only — no prose
- Validity model (e.g. "Duration of Status (D/S)" or "Fixed 3-year term")
- One "watch out" — a single sentence highlighting the biggest pitfall for this country/visa combination

**Design constraints:**
- Card must be visually distinct from the prose below — use a slightly elevated surface (subtle shadow or border), not just a background colour change
- All six facts must be scannable in under 10 seconds — no sentences longer than 8 words in the fact rows
- The "watch out" field should have a distinct visual treatment (amber left-border or equivalent) to signal it is a warning, not a fact
- Must be the same component across all visa types and countries — data-driven, not duplicated markup

**What happens below it:** The current prose paragraphs collapse into an accordion (see §3.3). The TL;DR card replaces the prose as the default visible state.

---

### 3.2 Checklist Component (Highest Product Value)

**What it is:** An interactive checklist replacing all "what you need to do / documents required / application steps" content. This is the platform's biggest differentiator — it turns the app from a textbook into a tool.

**Behaviour:**
- Checkboxes are interactive — user can check off items as they complete them
- State is **session-only** — do not use localStorage. If the user refreshes, the list resets. This is intentional.
- Checked items should visually recede (strikethrough + reduced opacity) but remain visible
- A progress indicator shows "X of Y completed" at the top of the list
- Sections within a checklist (e.g. "Before you apply", "At the appointment", "After approval") should be visually grouped with a lightweight section header

**Content that becomes a checklist:**
- Application steps (numbered, sequential)
- Documents required
- Pre-departure checklist ("Before you fly")
- Any "you must do X before Y" procedural content

**Design constraints:**
- Checkbox styling must feel native to the platform's design language — do not use the browser default checkbox
- Items should be concise — one action per line, max 12 words
- If an item has a detail/nuance, use a small expandable "ⓘ" inline rather than putting prose in the list item
- Mobile tap targets: minimum 44px height per item

---

### 3.3 Accordion Wrapper (Progressive Disclosure)

**What it is:** The existing prose content — paragraphs, key-value lists, legal detail — wrapped in an accordion so it is hidden by default and revealed on demand.

**Use accordion, not tabs.** Tabs imply the content is optional and parallel. Accordion implies "here is more when you want it" — psychologically softer, and better for content of varying depth.

**Behaviour:**
- Default state: collapsed
- First accordion item ("Overview") can default to open if it is the first time a user views a section — use session state to track this
- Smooth open/close animation (150–200ms ease-out) — no jarring snap
- Accordion header must clearly communicate what is inside ("Costs & Fees", "Work Rights", "Dependants", "Fine Print & Edge Cases")
- Do not accordion the TL;DR card or the checklist — those stay permanently visible

**What goes in the accordion (in order):**
1. Overview (prose explanation of what this visa is)
2. Costs & Fees (itemised breakdown)
3. Work Rights (detailed rules)
4. Dependants (eligibility, restrictions)
5. Fine Print (edge cases, exceptions, jargon definitions)
6. Sources

---

### 3.4 Comparison Table (Replaces Side-by-Side Prose Columns)

**What it is:** A structured table where rows are attributes and columns are countries. This replaces the current three-column prose layout for the comparison view.

**Row attributes (fixed — implement all of these):**

| Attribute | Format |
|---|---|
| Visa name | Text |
| Processing time | Text (e.g. "3–8 weeks") |
| Application fee | Currency |
| Total upfront cost | Currency (fees combined) |
| Work rights | Text (e.g. "20 hrs/week term-time") |
| Dependants allowed | ✓ / ✗ |
| Post-study work option | Text or ✓ / ✗ |
| Language requirement | Text |
| Financial proof required | Currency/text |
| Validity model | Text |

**Design constraints:**
- Rows alternate background (very subtle — do not use harsh stripes)
- ✓ should be green, ✗ should render in muted red — use colour purposefully, not decoratively
- First column (attribute label) is sticky on horizontal scroll (mobile)
- Differences between countries should be visually apparent — consider bolding the "best" value per row where applicable (e.g. cheapest fee)
- This table is the comparison view — it does not replace single-country depth, it is a separate mode (see §3.5)

---

### 3.5 Single-Country vs Comparison Mode

**Current problem:** The three-column layout forces comparison even when the user wants to focus on one country.

**Solution:** Implement a mode toggle at the top of the section.

- **Default mode: Single-country focus** — one country visible at a time, full TL;DR + checklist + accordion
- **Comparison mode** — comparison table view (§3.4), triggered by a "Compare countries" button/toggle
- The toggle should be unobtrusive — a small control in the section header, not a dominant UI element
- On mobile, single-country mode is the only mode (comparison table is desktop-only)

---

### 3.6 Personalised Nationality Callout (Repositioned)

**Current problem:** The amber nationality-specific callout appears mid-column, mid-prose, as an interruption.

**Fix:** Pin it to the **top of the country column**, above the TL;DR card. It should be the first thing the user reads after selecting a country.

**Design constraints:**
- Use amber/yellow — it signals "pay attention" without signalling danger
- One short paragraph maximum — if the callout is longer, it is not a callout, it is content
- Should include the origin country flag or a "For [Nationality] applicants:" label so the user immediately registers it is personalised to them
- If there is no nationality-specific information for a given combination, the callout does not render at all — do not show an empty container

---

## 4. Typography and Colour Fixes

These are quick wins that improve perceived density immediately, before any component restructuring.

### 4.1 Body Text Colour

**Current issue:** `text-muted-foreground` on all body copy creates a wall of grey. There is no visual hierarchy because everything is equally de-emphasised.

**Fix:**
- Body text → full foreground colour (`text-foreground`)
- Reserve `text-muted-foreground` strictly for: captions, fee disclaimers, "last updated" metadata, source attributions
- This single change will make the page feel lighter because hierarchy returns

### 4.2 Citations

**Current issue:** Inline `[1]` superscripts add visual noise to every sentence.

**Fix:** Remove inline citation numbers. Replace with a single "Sources" pill at the top of each subsection (e.g. "8 sources ↓") that, when clicked, smooth-scrolls to or expands the sources list. The sources list itself stays — just the inline markers go.

### 4.3 Heading Weight

Ensure subsection headings (`h3`, `h4`) are visually distinct from body text. If they currently use the same weight as bold prose, increase to `font-semibold` or `font-bold` and add a small `margin-top` to create breathing room above each section.

---

## 5. What NOT to Build

Do not implement the following — they are explicitly out of scope for this pass:

- **Icon chips (idea B)** — nice to have, not priority. Adds implementation time for moderate gain.
- **Reading time / difficulty labels (idea J)** — counterproductive. Telling a user "3 min read" before they've decided to read is a conversion killer.
- **Mini right-rail TOC (idea I)** — only matters if pages remain long after the accordion. Fix density first; revisit if needed.
- **Moving citations to hover (idea F partial)** — the Sources pill approach above is sufficient. Do not invest in hover citation tooltips.
- **localStorage persistence for checklists** — explicitly rejected. Session-only state only, consistent with the platform's no-data-storage philosophy.

---

## 6. Build Sequence

Implement in this exact order. Each step is independently shippable.

**Step 1 — Typography fix** (§4.1, §4.2, §4.3)
Change `text-muted-foreground` to `text-foreground` on body copy. Remove inline citation markers. Fix heading weights. This takes under an hour and makes everything feel immediately better. Ship it alone first.

**Step 2 — TL;DR card** (§3.1)
Build the component. Wire it to the data structure for one visa type and one country. Validate it looks correct before scaling to all country/visa combinations. Then scale.

**Step 3 — Accordion wrapper** (§3.3)
Wrap existing prose in accordions. Do not restructure the prose itself — just wrap it. The content editing is a separate pass.

**Step 4 — Checklist component** (§3.2)
Identify all procedural content (application steps, documents required, pre-departure). Convert to checklist format. Build the component once, reuse everywhere.

**Step 5 — Comparison table** (§3.4) + **Mode toggle** (§3.5)
Build the table component and the single/comparison mode toggle. Wire to existing data.

**Step 6 — Callout repositioning** (§3.6)
Move the nationality callout from inline to top-of-column. Purely a structural change, no new component needed.

---

## 7. Data Structure Notes

The TL;DR card and comparison table require structured data to be data-driven. Before implementation, confirm that the following fields exist (or can be derived) in the current data layer for each country/visa combination:

- `visa_name` (string)
- `visa_definition` (string, ≤ 15 words)
- `total_upfront_cost` (number + currency)
- `work_hours_per_week` (number or null)
- `dependants_allowed` (boolean)
- `validity_model` (string, ≤ 8 words)
- `watch_out` (string, ≤ 20 words — the single biggest pitfall)
- `application_fee` (number + currency)
- `processing_time` (string)
- `post_study_work` (string or boolean)
- `language_requirement` (string)
- `financial_proof_required` (string)

If any of these fields do not exist in the current data layer, flag them before starting implementation. Do not hardcode values into component markup.

---

## 8. Prompt for Claude Code

Copy and paste the following prompt directly into Claude Code to begin implementation. Do not paraphrase it.

---

```
You are implementing a UX redesign for Student Atlas, a visa information platform for high school students. Read every instruction below fully before writing any code.

CONTEXT:
The platform currently presents visa information as dense reference-document prose. The redesign converts it to a decision-support tool. The content does not change — the information hierarchy and progressive disclosure model does. The users are 17-year-olds who scan, not read.

WHAT YOU ARE BUILDING:
Six changes, in this exact order. Complete each fully before starting the next. Do not batch them.

STEP 1 — TYPOGRAPHY FIX (start here, ship independently):
- Change all body copy from text-muted-foreground to text-foreground
- Reserve text-muted-foreground only for: captions, fee disclaimers, "last updated" labels, source attributions
- Remove all inline citation superscripts ([1], [2], etc.) from body text
- Replace with a single "N sources" pill per subsection that expands or scrolls to the sources list
- Increase heading contrast: h3 and h4 should be font-semibold minimum, with margin-top spacing above each

STEP 2 — TL;DR CARD COMPONENT:
Build a reusable TLDRCard component. It renders at the top of every country column, before any prose. It contains exactly these 6 fields:
- visa_name + visa_definition (one line, ≤15 words)
- total_upfront_cost (single combined number)
- work_hours (e.g. "20 hrs/week term-time" or "Not permitted")
- dependants_allowed (render ONLY as ✓ or ✗, no prose)
- validity_model (≤8 words)
- watch_out (amber left-border treatment, ≤20 words, single biggest pitfall)

Design requirements for the card:
- Visually elevated surface — subtle shadow or border, not just background colour change
- All 6 facts scannable in under 10 seconds
- Same component for all visa types and countries — purely data-driven
- The watch_out field must be visually distinct (amber/yellow left border or equivalent)

STEP 3 — ACCORDION WRAPPER:
Wrap all existing prose sections in accordions. Do not edit the prose content — only wrap it.
- Use accordion, not tabs
- Default state: collapsed (except "Overview" which can default open on first visit, tracked via sessionStorage)
- Animation: 150–200ms ease-out open/close
- Accordion items in this order: Overview, Costs & Fees, Work Rights, Dependants, Fine Print, Sources
- Do NOT accordion the TL;DR card or the checklist — those stay permanently visible

STEP 4 — CHECKLIST COMPONENT:
Build a reusable Checklist component. Convert all procedural content (application steps, documents required, pre-departure items) from prose/lists to this component.
- Interactive checkboxes — custom styled, not browser default
- Session-only state — NO localStorage, NO sessionStorage for checkbox state. In-memory only.
- Checked items: strikethrough + 40% opacity, remain visible
- Progress indicator at top: "X of Y completed"
- Section grouping within a checklist (e.g. "Before you apply" / "At the appointment") with lightweight section headers
- Mobile tap targets: minimum 44px height per item
- Expandable ⓘ for item-level detail — inline, not a new element

STEP 5 — COMPARISON TABLE + MODE TOGGLE:
Build a ComparisonTable component and a mode toggle.
- Mode toggle: "Single country" (default) vs "Compare" — small control in section header, not dominant
- Single country mode: one country, full TL;DR + checklist + accordion
- Compare mode: table with rows as attributes, columns as countries
- Table rows (implement all): Visa name, Processing time, Application fee, Total upfront cost, Work rights, Dependants allowed, Post-study work, Language requirement, Financial proof required, Validity model
- ✓ = green, ✗ = muted red
- Alternating row backgrounds (subtle)
- First column sticky on horizontal scroll
- Compare mode is desktop-only — hide toggle on mobile (single country is the only mobile mode)

STEP 6 — CALLOUT REPOSITIONING:
Move the nationality-specific callout from its current inline mid-prose position to the top of the country column, above the TL;DR card.
- Amber/yellow styling
- "For [Nationality] applicants:" label
- Maximum one short paragraph
- If no nationality-specific content exists for a combination, render nothing — no empty container

CONSTRAINTS THAT APPLY TO ALL STEPS:
- All components are data-driven — no hardcoded content in markup
- No localStorage anywhere in this implementation
- Every component must work on mobile (single-column stacked layout)
- Do not build: icon chips, reading time labels, right-rail TOC, hover citation tooltips
- Before starting, confirm that the data layer contains all required fields for TLDRCard and ComparisonTable (listed in the brief). If fields are missing, flag them and stop — do not proceed with hardcoded placeholder data without explicit confirmation.
- After each step, confirm it renders correctly before proceeding to the next

Begin with Step 1. Confirm completion before Step 2.
```

---

## 9. Acceptance Criteria

Before considering the implementation complete, verify:

- [ ] Body copy is full foreground colour everywhere; muted grey is only used for metadata
- [ ] No inline citation numbers visible in body text
- [ ] TL;DR card appears above prose for every country/visa combination
- [ ] TL;DR card is identical in structure across all combinations (data-driven, not duplicated)
- [ ] All procedural content (steps, documents, pre-departure) is rendered as interactive checklists
- [ ] Checklist state resets on page refresh (no persistence)
- [ ] All prose sections are wrapped in accordions (default collapsed)
- [ ] Comparison table renders correctly with all 10 row attributes
- [ ] Single-country mode is default; comparison mode is opt-in
- [ ] Comparison mode does not render on mobile
- [ ] Nationality callout is at the top of the column, above the TL;DR card
- [ ] No empty callout containers visible when no nationality content exists
- [ ] All components work correctly on mobile viewport

---

*End of brief. Questions to resolve before build: confirm data layer field availability for TLDRCard and ComparisonTable fields listed in §7.*
