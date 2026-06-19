import { citations } from "./citations";
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
}

/** Every government URL we cite — the canonical list for source monitoring. */
export const monitoredSources: MonitoredSource[] = Object.values(citations).map(
  (cite) => {
    const { country, category } = classifySource(cite.id, cite.label);
    return {
      id: cite.id,
      url: cite.url,
      country,
      category,
      label: cite.label,
    };
  }
);

export const monitoredSourceCount = monitoredSources.length;
