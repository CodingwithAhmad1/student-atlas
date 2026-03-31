# Student Atlas Content Management Guide

This guide explains how to use the MCP tools to add and edit visa/immigration content.
Read this via `read_content_file("CONTENT-GUIDE.md")`.

---

## Content Architecture (3 Layers)

### Layer 1: Base Content (`sections/*.ts`)
Nationality-agnostic content covering the most common visa path for each destination.

| Section slug | File | Subsections |
|---|---|---|
| `visit` | `tourist-visa.ts` | `entry-requirement`, `how-to-apply` |
| `student` | `student-visa.ts` | `overview`, `documents`, `application-process`, `after-arrival` |
| `work` | `work-visa.ts` | `post-study-work`, `getting-sponsored` |
| `residency` | `residency-pathway.ts` | `permanent-residency`, `citizenship`, `dual-nationality` |

### Layer 2: Profiles (`profiles/*.ts`)
Reusable content that **replaces** base content entirely for a given country + subsection.

| Profile | Export | Used when |
|---|---|---|
| `tourist-visa-uk-eta.ts` | `touristVisaUkEta` | Nationality qualifies for UK ETA |
| `tourist-visa-au-eta.ts` | `touristVisaAuEta` | Nationality qualifies for AU ETA (601) |
| `tourist-visa-us-vwp.ts` | `touristVisaUsVwp` | Nationality qualifies for US ESTA/VWP |
| `domestic-uk-*.ts` | `domesticUk{Visit,Student,Work,Residency}` | UK nationals viewing UK column |
| `domestic-us-*.ts` | `domesticUs{Visit,Student,Work,Residency}` | US nationals viewing US column |
| `domestic-au-*.ts` | `domesticAu{Visit,Student,Work,Residency}` | AU nationals viewing AU column |

### Layer 3: Nationality Overlays (`nationalities/*.ts`)
Per-nationality customizations with **callouts** (injected after specific blocks) and optional **profile** references.

---

## Block Types

```
paragraph    { type: "paragraph", text: "Markdown text with [CITE: id]" }
heading      { type: "heading", level: 2|3|4, text: "Title" }
key-value-list { type: "key-value-list", items: [{ label: "Fee", value: "$185" }] }
bullet-list  { type: "bullet-list", items: ["Item 1", "Item 2"] }
ordered-list { type: "ordered-list", items: ["Step 1", "Step 2"] }
step         { type: "step", number: 1, title: "Title", body: "Description" }
```

---

## Adding a New Nationality (Step by Step)

### 1. Determine visa paths
- Does this nationality qualify for UK ETA? → use `touristVisaUkEta` profile
- Does this nationality qualify for AU ETA (601)? → use `touristVisaAuEta` profile
- Does this nationality qualify for US ESTA/VWP? → use `touristVisaUsVwp` profile
- Is this nationality's home country one of US/UK/AU? → use domestic profiles
- Otherwise → callout-only overlay (like Pakistan, China)

### 2. Create the nationality
```
authenticate(password)
create_nationality(name, slug, uses_uk_eta, uses_au_eta)
```
This creates `nationalities/{slug}.ts` with empty callouts and adds to `registry.ts`.

### 3. Find block IDs for callout targeting
```
get_block_ids("visit", "entry-requirement", "US")  → base content block IDs
get_profile_block_ids("tourist-visa-uk-eta.ts")     → profile block IDs
```
Every callout needs an `afterBlockId` that matches a block ID in the base or profile content.

### 4. Add callouts
```
add_callout(slug, section_slug, subsection_slug, country, after_block_id, blocks_json)
```
Where `blocks_json` is a JSON array:
```json
[{"id": "optional-id", "block": {"type": "paragraph", "text": "Content here..."}}]
```

### 5. Set profiles (if applicable)
```
set_profile(slug, section_slug, subsection_slug, country, 'profileVar["subsection"]')
```

### 6. Add citations
```
add_citations('{"citation-id": {"url": "https://...", "label": "Description"}}')
```

### 7. Validate
```
validate_content()
```

---

## Editing Existing Content

### Update a callout block
```
update_callout(slug, block_id, '{"type": "paragraph", "text": "New text..."}')
```

### Remove a callout
```
remove_callout(slug, block_id)
```

### Full file rewrite (last resort)
```
content = read_content_file("nationalities/slug.ts")
# modify content
write_content_file("nationalities/slug.ts", modified_content)
```

---

## Common Patterns

### Callout-only (e.g. Pakistan, China)
No profile imports. All countries use base content. Callouts add nationality-specific notes.

### ETA/VWP profile (e.g. UAE → UK ETA + AU ETA)
Import profile, set `profile: profileVar["subsection"]` on the country entry.
Callouts target the **profile's** block IDs (not base content IDs).

### Domestic profile (e.g. UK → UK column)
Import domestic profile, set it on the home country column for every subsection.
Content says "you're a citizen, no visa needed" etc.

### Cross-cutting (dual nationality)
Use `_crossCutting` instead of a country code. Applies to all destination columns.
Target `dual-origin-position` or `dual-destination-position` block IDs.

---

## Tool Quick Reference

| Tool | Purpose |
|---|---|
| `authenticate(password)` | Required before all other tools |
| `get_content_overview()` | See all sections, profiles, nationalities |
| `get_block_ids(section, subsection?, country?)` | Find callout anchor points |
| `get_profile_block_ids(file)` | Block IDs in a profile |
| `get_nationality_summary(slug)` | Summary of a nationality's overlay |
| `compare_nationalities(a, b)` | Side-by-side comparison |
| `list_available_profiles()` | All profiles and who uses them |
| `get_content_schema()` | Block types and structure docs |
| `get_nationality_template(name, slug, ...)` | Generate template (preview) |
| `create_nationality(name, slug, ...)` | Create file + registry entry |
| `add_callout(slug, section, subsection, country, afterId, blocks)` | Add callout |
| `update_callout(slug, blockId, newBlock)` | Edit existing callout |
| `remove_callout(slug, blockId)` | Remove a callout |
| `set_profile(slug, section, subsection, country, expr)` | Set/remove profile |
| `add_citations(json)` | Add citations |
| `write_content_file(path, content)` | Full file overwrite |
| `read_content_file(path)` | Read any file |
| `search_content(query, pattern?)` | Search across files |
| `validate_content()` | TypeScript type-check |
| `delete_nationality(slug)` | Remove nationality |
| `add_nationality_to_dropdown(name)` | Add to countries list |

---

## Currently Implemented Nationalities

| Name | Slug | Tourist profiles | Notes |
|---|---|---|---|
| UAE | `uae` | UK ETA, AU ETA | Gulf nationality, no dual nationality |
| Pakistan | `pakistan` | None | Callout-only, bilateral dual nationality agreement |
| India | `india` | UK ETA | No dual nationality, OCI card available |
| China | `china` | None | Callout-only, no dual nationality (Article 9) |
| United Kingdom | `uk` | US VWP, AU ETA, UK domestic | All UK columns use domestic profiles |
