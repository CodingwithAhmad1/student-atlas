import { citations } from "../../frontend/src/data/citations";
import { sourceOverrides } from "../../frontend/src/data/source-overrides";
import { classifySource } from "../../frontend/src/lib/classify-source";
import type { MonitoredTarget } from "./types";

export function slugify(id: string): string {
  return id
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Build the fetch targets from the citation registry, deduplicating by URL so
 * citation ids that point at the same page share one fetch, one snapshot, and
 * one alert.
 */
export function loadTargets(): MonitoredTarget[] {
  const byUrl = new Map<string, MonitoredTarget>();

  for (const cite of Object.values(citations)) {
    const heuristic = classifySource(cite.id, cite.label);
    const override = sourceOverrides[cite.id];
    const existing = byUrl.get(cite.url);
    if (existing) {
      existing.relatedSourceIds.push(cite.id);
      continue;
    }
    byUrl.set(cite.url, {
      key: slugify(cite.id),
      url: cite.url,
      sourceId: cite.id,
      relatedSourceIds: [],
      label: cite.label,
      country: override?.country ?? heuristic.country,
      category: override?.category ?? heuristic.category,
      ...(override?.contentSelector
        ? { contentSelector: override.contentSelector }
        : {}),
      ...(override?.skipReason ? { skipReason: override.skipReason } : {}),
    });
  }

  return [...byUrl.values()];
}
