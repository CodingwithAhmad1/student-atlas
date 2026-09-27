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
 *   - every registered nationality is in the dropdown list
 *   - every visa-facts entry points at a real page
 *
 * Unreferenced citations are reported as warnings (they are still monitored).
 */
import { citations } from "../src/data/citations";
import { countries } from "../src/data/countries";
import { glossary } from "../src/data/glossary";
import { nationalityRegistry } from "../src/data/nationalities/registry";
import { sections } from "../src/data/sections";
import type { ContentBlock, CountryOverlay, IdentifiedBlock, NationalityOverlay } from "../src/data/types";
import { visaFacts } from "../src/data/visa-facts";

const errors: string[] = [];
const warnings: string[] = [];
const cited = new Set<string>();

const INLINE = /\[CITE:\s*([^\]]+)\]|\[TERM:\s*([^\]|]+?)(?:\|[^\]]+)?\]/g;

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

const ids = (blocks: IdentifiedBlock[]) => new Set(blocks.map((b) => b.id).filter(Boolean));

// Base content
for (const section of sections) {
  for (const sub of section.subSections) {
    for (const c of sub.countries) {
      checkBlocks(`${section.slug}/${sub.slug}/${c.country}`, c.blocks.map((b) => b.block));
    }
    checkBlocks(`${section.slug}/${sub.slug}/crossCutting`, (sub.crossCutting ?? []).map((b) => b.block));
  }
}

// Nationality overlays
const countryNames = new Set(countries);
for (const meta of nationalityRegistry) {
  if (!countryNames.has(meta.name)) {
    errors.push(`registry: "${meta.name}" is not in countries.ts, so it can't be selected`);
  }
  const overlay: NationalityOverlay = (await meta.load()).default;
  for (const [sectionSlug, sectionOverlay] of Object.entries(overlay)) {
    const section = sections.find((s) => s.slug === sectionSlug);
    if (!section) {
      errors.push(`${meta.slug}: unknown section "${sectionSlug}"`);
      continue;
    }
    for (const [subSlug, subOverlay] of Object.entries(sectionOverlay)) {
      const sub = section.subSections.find((s) => s.slug === subSlug);
      if (!sub) {
        errors.push(`${meta.slug}: unknown subsection "${sectionSlug}/${subSlug}"`);
        continue;
      }
      for (const [key, countryOverlay] of Object.entries(subOverlay)) {
        const where = `${meta.slug}: ${sectionSlug}/${subSlug}/${key}`;
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
          if (!anchors.has(callout.afterBlockId)) {
            errors.push(`${where}: callout anchor "${callout.afterBlockId}" is not a block there, so it never renders`);
          }
          checkBlocks(where, callout.blocks);
        }
      }
    }
  }
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
console.log(`Content check passed (${cited.size} citations in use, ${warnings.length} warning(s)).`);
