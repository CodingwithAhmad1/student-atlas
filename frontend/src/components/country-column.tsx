import type { Country, ResolvedBlock } from "@/data/types";
import { COUNTRY_LABELS } from "@/data/types";
import { ResolvedBlockRenderer } from "./content-blocks";

interface CountryColumnProps {
  country: Country;
  blocks: ResolvedBlock[];
  showHeader: boolean;
  citationMap: Map<string, number>;
}

export function CountryColumn({
  country,
  blocks,
  showHeader,
  citationMap,
}: CountryColumnProps) {
  return (
    <div className="space-y-4">
      {showHeader && (
        <h3 className="text-lg font-semibold border-b pb-2">
          {COUNTRY_LABELS[country]}
        </h3>
      )}
      {blocks.map((resolved, i) => (
        <ResolvedBlockRenderer
          key={i}
          resolved={resolved}
          citationMap={citationMap}
        />
      ))}
    </div>
  );
}
