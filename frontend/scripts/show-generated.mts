/**
 * Print the generated (trait-driven) content for one nationality, one line per
 * callout block, so a batch can be spot-checked against the sources.
 *
 *   npx tsx scripts/show-generated.mts <slug>
 */
import { sections } from "../src/data/sections/index.ts";
import { nationalityTraits } from "../src/data/traits/nationality-traits.ts";
import { generateOverlay } from "../src/data/traits/trait-rules.ts";
import { nationalityRegistry } from "../src/data/nationalities/registry.ts";
import type { CalloutOverlay } from "../src/data/types.ts";

const slug = process.argv[2];
const meta = nationalityRegistry.find((n) => n.slug === slug);
if (!meta || !nationalityTraits[slug]) {
  console.error(`Unknown or unregistered nationality: ${slug ?? "(none)"}`);
  process.exit(1);
}
const overlay = generateOverlay(meta, nationalityTraits[slug], sections);
const seen = new Set<string>();
for (const [section, subs] of Object.entries(overlay)) {
  for (const [sub, columns] of Object.entries(subs)) {
    for (const [column, entry] of Object.entries(columns as Record<string, { profile?: unknown; callouts?: CalloutOverlay[] }>)) {
      if (entry.profile) console.log(`[${section}/${sub}/${column}] (profile replaced)`);
      for (const callout of entry.callouts ?? []) {
        for (const block of callout.blocks) {
          const text = "text" in block ? String(block.text) : JSON.stringify(block);
          if (seen.has(text)) continue; // the same notice repeats on every column
          seen.add(text);
          console.log(`[${section}/${sub}/${column}]${callout.practical ? " *" : ""} ${text}`);
        }
      }
    }
  }
}
