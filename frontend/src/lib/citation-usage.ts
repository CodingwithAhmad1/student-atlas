import { nationalityRegistry } from "@/data/nationalities/registry";
import { sections } from "@/data/sections";
import { nationalityTraits } from "@/data/traits/nationality-traits";
import { generateOverlay, mergeOverlays } from "@/data/traits/trait-rules";
import { traitsCitedBy } from "@/data/traits/trait-sources";
import type { TraitKey } from "@/data/traits/types";

/** Where one cited source is used across the guide. */
export interface CitationUsage {
  /** Cited in the base content every reader sees. */
  base: boolean;
  /** Trait columns derived from this page (a change can affect every nationality). */
  traitColumns: TraitKey[];
  /** Nationalities whose generated or hand-written content cites the page. */
  nationalities: { slug: string; name: string }[];
}

const CITE_RE = /\[CITE:\s*([^\]]+?)\s*\]/g;

function citesIn(value: unknown): Set<string> {
  const ids = new Set<string>();
  for (const m of JSON.stringify(value).matchAll(CITE_RE)) ids.add(m[1]);
  return ids;
}

let index: Promise<{ base: Set<string>; byNationality: Map<string, Set<string>> }> | null = null;

/** Builds (once) an index of which content cites which source. Loads every overlay. */
function loadIndex() {
  index ??= (async () => {
    const base = citesIn(sections);
    const byNationality = new Map<string, Set<string>>();
    await Promise.all(
      nationalityRegistry.map(async (meta) => {
        const traits = nationalityTraits[meta.slug];
        if (!traits) return;
        const hand = (await meta.load()).default;
        const merged = mergeOverlays(generateOverlay(meta, traits, sections), hand);
        byNationality.set(meta.slug, citesIn(merged));
      })
    );
    return { base, byNationality };
  })();
  return index;
}

/** Usage for a source, given its primary citation id and any ids sharing its URL. */
export async function citationUsage(citationIds: string[]): Promise<CitationUsage> {
  const { base, byNationality } = await loadIndex();
  const ids = new Set(citationIds);
  const hit = (set: Set<string>) => [...ids].some((id) => set.has(id));
  return {
    base: hit(base),
    traitColumns: [...new Set(citationIds.flatMap((id) => traitsCitedBy(id)))],
    nationalities: nationalityRegistry
      .filter((meta) => {
        const cited = byNationality.get(meta.slug);
        return cited ? hit(cited) : false;
      })
      .map(({ slug, name }) => ({ slug, name })),
  };
}
