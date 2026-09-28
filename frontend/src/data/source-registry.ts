// Relative imports (not "@/") so the monitoring watcher can load this file via tsx.
import { citations } from "./citations";
import { sourceOverrides } from "./source-overrides";
import { traitsCitedBy } from "./traits/trait-sources";
import {
  classifySource,
  type SourceCategory,
  type SourceCountry,
} from "../lib/classify-source";

/**
 * One monitored page. Citation ids that point at the same URL are grouped so
 * the page is fetched once, has one snapshot, one status entry, and one alert.
 */
export interface MonitoredSource {
  /** Primary citation id (the first one registered for this URL). */
  sourceId: string;
  /** Every other citation id pointing at the same URL. */
  relatedSourceIds: string[];
  /** Filesystem-safe key derived from the primary id (snapshot file name). */
  key: string;
  url: string;
  label: string;
  country: SourceCountry;
  category: SourceCategory;
  contentSelector?: string;
  stripSelectors?: string[];
  /** When set, the watcher does not fetch this page. */
  skipReason?: string;
  /** Trait columns (traits/trait-sources.ts) derived from this page, if any. */
  affectsTraits: string[];
}

export function slugify(id: string): string {
  return id
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildRegistry(): MonitoredSource[] {
  const byUrl = new Map<string, MonitoredSource>();

  for (const cite of Object.values(citations)) {
    const override = sourceOverrides[cite.id];
    const existing = byUrl.get(cite.url);
    if (existing) {
      existing.relatedSourceIds.push(cite.id);
      // An override on any id sharing the URL applies to the whole page.
      if (override?.skipReason && !existing.skipReason) {
        existing.skipReason = override.skipReason;
      }
      continue;
    }
    const heuristic = classifySource(cite.id, cite.label);
    byUrl.set(cite.url, {
      sourceId: cite.id,
      relatedSourceIds: [],
      key: slugify(cite.id),
      url: cite.url,
      label: cite.label,
      country: override?.country ?? heuristic.country,
      category: override?.category ?? heuristic.category,
      affectsTraits: traitsCitedBy(cite.id),
      ...(override?.contentSelector
        ? { contentSelector: override.contentSelector }
        : {}),
      ...(override?.stripSelectors
        ? { stripSelectors: override.stripSelectors }
        : {}),
      ...(override?.skipReason ? { skipReason: override.skipReason } : {}),
    });
  }

  return [...byUrl.values()];
}

/** Every government page we cite — the canonical list for source monitoring. */
export const monitoredSources: MonitoredSource[] = buildRegistry();

export const monitoredSourceCount = monitoredSources.length;
