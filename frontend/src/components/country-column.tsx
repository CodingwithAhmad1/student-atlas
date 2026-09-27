import type { Country, ResolvedBlock } from "@/data/types";
import { ProseAccordion } from "./prose-accordion";

interface CountryColumnProps {
  country: Country;
  blocks: ResolvedBlock[];
  /** Used to track first-visit accordion state */
  sessionKey?: string;
}

export function CountryColumn({
  country,
  blocks,
  sessionKey,
}: CountryColumnProps) {
  return (
    <div className="space-y-4">
      {/* Keyed so each page gets its own first-visit open state. */}
      <ProseAccordion
        key={sessionKey ?? country}
        blocks={blocks}
        sessionKey={sessionKey ?? `sa:seen:${country}`}
      />
    </div>
  );
}
