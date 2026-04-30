import type { Country, ResolvedBlock } from "@/data/types";
import { ProseAccordion } from "./prose-accordion";

interface CountryColumnProps {
  country: Country;
  blocks: ResolvedBlock[];
  citationMap: Map<string, number>;
  /** Used to track first-visit accordion state */
  sessionKey?: string;
}

export function CountryColumn({
  country,
  blocks,
  citationMap,
  sessionKey,
}: CountryColumnProps) {
  return (
    <div className="space-y-4">
      <ProseAccordion
        blocks={blocks}
        citationMap={citationMap}
        sessionKey={sessionKey ?? `sa:seen:${country}`}
      />
    </div>
  );
}
