import { citations } from "./citations";
import { sourceOverrides } from "./source-overrides";
import {
  classifySource,
  type SourceCategory,
  type SourceCountry,
} from "@/lib/classify-source";

export interface MonitoredSource {
  id: string;
  url: string;
  country: SourceCountry;
  category: SourceCategory;
  label: string;
  contentSelector?: string;
}

/** Every government URL we cite — the canonical list for source monitoring. */
export const monitoredSources: MonitoredSource[] = Object.values(citations).map(
  (cite) => {
    const { country, category } = classifySource(cite.id, cite.label);
    const override = sourceOverrides[cite.id];
    return {
      id: cite.id,
      url: cite.url,
      country: override?.country ?? country,
      category: override?.category ?? category,
      label: cite.label,
      ...(override?.contentSelector
        ? { contentSelector: override.contentSelector }
        : {}),
    };
  }
);

export const monitoredSourceCount = monitoredSources.length;
