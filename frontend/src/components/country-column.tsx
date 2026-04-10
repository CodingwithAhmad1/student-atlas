import type { Country, ResolvedBlock } from "@/data/types";
import { COUNTRY_LABELS } from "@/data/types";
import { ProseAccordion } from "./prose-accordion";

interface CountryColumnProps {
  country: Country;
  blocks: ResolvedBlock[];
  showHeader: boolean;
  citationMap: Map<string, number>;
  /** Used to track first-visit accordion state */
  sessionKey?: string;
}

export function CountryColumn({
  country,
  blocks,
  showHeader,
  citationMap,
  sessionKey,
}: CountryColumnProps) {
  return (
    <div className="space-y-4">
      {showHeader && (
        <h3 className="text-lg font-semibold border-b pb-2">
          {COUNTRY_LABELS[country]}
        </h3>
      )}
      <ProseAccordion
        blocks={blocks}
        citationMap={citationMap}
        sessionKey={sessionKey ?? `sa:seen:${country}`}
      />
    </div>
  );
}
