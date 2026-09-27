/**
 * Content integrity check — run by `npm run build` (and the MCP server's
 * validate_content). Type-checking can't catch these because the markers live
 * inside strings and overlays are keyed by strings:
 *
 *   - every [CITE: id] exists in citations.ts
 *   - every [TERM: key] exists in glossary.ts
 *   - every overlay section/subsection/country exists in the base content
 *   - every profile reference resolves (a typo silently shows base content)
 *   - every callout anchor exists in the blocks it is merged into
 *   - every registered nationality is in the dropdown list and has a traits row
 *   - every trait column cites a real source; dual-nationality rows cite theirs
 *   - hand-written callouts are cited, or flagged `practical` and free of numbers
 *   - the trait-generated overlay passes the same checks as a hand-written one
 *   - every visa-facts entry points at a real page
 *
 * Unreferenced citations are reported as warnings (they are still monitored),
 * as are trait values past their check interval (`--strict` makes those
 * errors). A coverage summary is printed at the end.
 */
import { citations } from "../src/data/citations";
import { countries } from "../src/data/countries";
import { glossary } from "../src/data/glossary";
import { nationalityRegistry } from "../src/data/nationalities/registry";
import { sections } from "../src/data/sections";
import { nationalityTraits } from "../src/data/traits/nationality-traits";
import { generateOverlay, mergeOverlays } from "../src/data/traits/trait-rules";
import { traitSources } from "../src/data/traits/trait-sources";
import { TRAIT_KEYS } from "../src/data/traits/types";
import type {
  CalloutOverlay,
  ContentBlock,
  CountryOverlay,
  IdentifiedBlock,
  NationalityOverlay,
} from "../src/data/types";
import { visaFacts } from "../src/data/visa-facts";

const strict = process.argv.includes("--strict");
const errors: string[] = [];
const warnings: string[] = [];
const cited = new Set<string>();
const today = new Date().toISOString().slice(0, 10);

const INLINE = /\[CITE:\s*([^\]]+)\]|\[TERM:\s*([^\]|]+?)(?:\|[^\]]+)?\]/g;
const CITE_ONLY = /\[CITE:\s*[^\]]+\]/;
/** Digits catch fees, dates, durations and percentages alike. */
const NUMBER = /\d/;

function texts(block: ContentBlock): string[] {
  switch (block.type) {
    case "paragraph":
    case "heading":
      return [block.text];
    case "bullet-list":
    case "ordered-list":
      return block.items;
    case "key-value-list":
      return block.items.flatMap((i) => [i.label, i.value]);
    case "step":
      return [block.title, block.body];
  }
}

function checkBlocks(where: string, blocks: ContentBlock[]): void {
  for (const block of blocks) {
    for (const text of texts(block)) {
      for (const m of text.matchAll(INLINE)) {
        if (m[1] != null) {
          const id = m[1].trim();
          cited.add(id);
          if (!citations[id]) errors.push(`${where}: unknown citation [CITE: ${id}]`);
        } else if (m[2] != null && !glossary[m[2].trim()]) {
          errors.push(`${where}: unknown glossary term [TERM: ${m[2].trim()}]`);
        }
      }
    }
  }
}

/** Decision D2: a hand-written callout is cited, or practical and number-free. */
function checkCalloutPolicy(where: string, callout: CalloutOverlay): void {
  const all = callout.blocks.flatMap(texts).join("\n");
  if (callout.practical) {
    if (CITE_ONLY.test(all)) {
      errors.push(`${where}: a practical callout must not carry [CITE] — drop the flag or the citation`);
    }
    if (NUMBER.test(all)) {
      errors.push(`${where}: a practical callout may not contain numbers (fees, dates, durations, percentages)`);
    }
  } else if (!CITE_ONLY.test(all)) {
    errors.push(`${where}: uncited callout — add a [CITE: id] or mark it practical: true`);
  }
}

const ids = (blocks: IdentifiedBlock[]) => new Set(blocks.map((b) => b.id).filter(Boolean));

/**
 * `applyPolicy` enforces the citation rule (hand-written overlays only).
 * `checkAnchors` is off for the hand-written overlay on its own, because its
 * callouts may target blocks of a profile that the traits select; anchors are
 * verified on the merged overlay instead.
 */
function checkOverlay(slug: string, overlay: NationalityOverlay, applyPolicy: boolean, checkAnchors = true): void {
  for (const [sectionSlug, sectionOverlay] of Object.entries(overlay)) {
    const section = sections.find((s) => s.slug === sectionSlug);
    if (!section) {
      errors.push(`${slug}: unknown section "${sectionSlug}"`);
      continue;
    }
    for (const [subSlug, subOverlay] of Object.entries(sectionOverlay)) {
      const sub = section.subSections.find((s) => s.slug === subSlug);
      if (!sub) {
        errors.push(`${slug}: unknown subsection "${sectionSlug}/${subSlug}"`);
        continue;
      }
      for (const [key, countryOverlay] of Object.entries(subOverlay)) {
        const where = `${slug}: ${sectionSlug}/${subSlug}/${key}`;
        if (!countryOverlay) continue;
        let anchors: Set<string | undefined>;
        if (key === "_crossCutting") {
          anchors = ids(sub.crossCutting ?? []);
        } else {
          const base = sub.countries.find((c) => c.country === key);
          if (!base) {
            errors.push(`${where}: no base content for "${key}"`);
            continue;
          }
          const { profile } = countryOverlay as CountryOverlay;
          if ("profile" in countryOverlay && !profile) {
            errors.push(`${where}: profile reference resolves to undefined (typo in the profile key?)`);
          }
          const source = profile ?? base.blocks;
          checkBlocks(`${where} (profile)`, profile?.map((b) => b.block) ?? []);
          anchors = ids(source);
        }
        for (const callout of countryOverlay.callouts ?? []) {
          if (checkAnchors && !anchors.has(callout.afterBlockId)) {
            errors.push(`${where}: callout anchor "${callout.afterBlockId}" is not a block there, so it never renders`);
          }
          checkBlocks(where, callout.blocks);
          if (applyPolicy) checkCalloutPolicy(where, callout);
        }
      }
    }
  }
}

// Base content
for (const section of sections) {
  for (const sub of section.subSections) {
    for (const c of sub.countries) {
      checkBlocks(`${section.slug}/${sub.slug}/${c.country}`, c.blocks.map((b) => b.block));
    }
    checkBlocks(`${section.slug}/${sub.slug}/crossCutting`, (sub.crossCutting ?? []).map((b) => b.block));
  }
}

// Trait columns
for (const key of TRAIT_KEYS) {
  const src = traitSources[key];
  if (!citations[src.citationId]) {
    errors.push(`trait-sources: ${key} cites unknown citation "${src.citationId}"`);
  } else {
    cited.add(src.citationId);
  }
  if (src.checkKind === "manual" && !src.manualIntervalDays) {
    errors.push(`trait-sources: manual column ${key} has no manualIntervalDays`);
  }
}

// Nationalities: registry, traits, hand-written overlay, generated overlay
const countryNames = new Set(countries);
let staleValues = 0;
for (const meta of nationalityRegistry) {
  if (!countryNames.has(meta.name)) {
    errors.push(`registry: "${meta.name}" is not in countries.ts, so it can't be selected`);
  }
  const traits = nationalityTraits[meta.slug];
  if (!traits) {
    errors.push(`traits: registered nationality "${meta.slug}" has no row in nationality-traits.ts`);
    continue;
  }
  for (const key of TRAIT_KEYS) {
    const trait = traits[key];
    const src = traitSources[key];
    const limit = src.checkKind === "manual" ? (src.manualIntervalDays ?? 365) : 365;
    const age = (Date.parse(today) - Date.parse(trait.verifiedAt)) / 86_400_000;
    if (Number.isNaN(age)) {
      errors.push(`traits: ${meta.slug}.${key} has an invalid verifiedAt "${trait.verifiedAt}"`);
    } else if (age > limit) {
      staleValues += 1;
      (strict ? errors : warnings).push(
        `traits: ${meta.slug}.${key} was last verified ${trait.verifiedAt} (limit ${limit} days)`
      );
    }
  }
  const dual = traits.dualNationalityAtHome;
  if (dual.value === "unknown") {
    warnings.push(`traits: ${meta.slug} dual nationality is unknown — no official source found yet`);
  } else if (!dual.citationId) {
    errors.push(`traits: ${meta.slug}.dualNationalityAtHome needs a citationId (decision D3)`);
  } else if (!citations[dual.citationId]) {
    errors.push(`traits: ${meta.slug}.dualNationalityAtHome cites unknown citation "${dual.citationId}"`);
  } else {
    cited.add(dual.citationId);
  }

  const hand: NationalityOverlay = (await meta.load()).default;
  checkOverlay(meta.slug, hand, true, false);
  const generated = generateOverlay(meta, traits, sections);
  checkOverlay(`${meta.slug} (generated)`, generated, false);
  // The merged result is what renders; anchors must still resolve there.
  checkOverlay(`${meta.slug} (merged)`, mergeOverlays(generated, hand), false);
}

// TL;DR facts
for (const [sectionSlug, subs] of Object.entries(visaFacts)) {
  const section = sections.find((s) => s.slug === sectionSlug);
  for (const subSlug of Object.keys(subs)) {
    if (!section?.subSections.some((s) => s.slug === subSlug)) {
      errors.push(`visa-facts: no page "${sectionSlug}/${subSlug}"`);
    }
  }
}

for (const id of Object.keys(citations)) {
  if (!cited.has(id)) warnings.push(`citation "${id}" is never cited (still monitored)`);
}

for (const w of warnings) console.warn(`warning: ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`error: ${e}`);
  console.error(`\nContent check failed: ${errors.length} error(s).`);
  process.exit(1);
}

const tiers = nationalityRegistry.reduce<Record<string, number>>((acc, m) => {
  acc[m.tier] = (acc[m.tier] ?? 0) + 1;
  return acc;
}, {});
console.log(
  `Content check passed (${cited.size} citations in use, ${warnings.length} warning(s)).\n` +
    `Coverage: ${nationalityRegistry.length} nationalities × ${TRAIT_KEYS.length} traits ` +
    `(tiers ${Object.entries(tiers).map(([t, n]) => `${t}=${n}`).join(", ")}), ${staleValues} stale value(s).`
);
