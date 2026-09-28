import { useEffect, useState } from "react";
import { nationalityRegistry } from "@/data/nationalities/registry";
import { citationUsage, type CitationUsage } from "@/lib/citation-usage";

const SHOW_NAMES = 8;

/** "Where this page is used": base content, trait columns and nationalities. */
export function SourceUsage({ citationIds }: { citationIds: string[] }) {
  const [usage, setUsage] = useState<CitationUsage | null>(null);
  const key = citationIds.join("|");

  useEffect(() => {
    let live = true;
    citationUsage(key.split("|")).then((u) => live && setUsage(u));
    return () => {
      live = false;
    };
  }, [key]);

  if (!usage) {
    return <p className="text-xs text-muted-foreground">Checking where this page is used…</p>;
  }

  const parts: string[] = [];
  if (usage.base) parts.push("base content that every reader sees");
  if (usage.traitColumns.length > 0) {
    parts.push(
      `the ${usage.traitColumns.join(", ")} trait ${usage.traitColumns.length === 1 ? "column" : "columns"}, ` +
        `which ${usage.traitColumns.length === 1 ? "decides" : "decide"} content for all ${nationalityRegistry.length} nationalities`
    );
  }
  const n = usage.nationalities.length;
  if (n > 0) {
    const names = usage.nationalities.slice(0, SHOW_NAMES).map((x) => x.name).join(", ");
    parts.push(
      `nationality-specific content for ${n} ${n === 1 ? "nationality" : "nationalities"} (${names}${n > SHOW_NAMES ? `, and ${n - SHOW_NAMES} more` : ""})`
    );
  }

  return (
    <div>
      <h4 className="mb-1 text-sm font-semibold">Where this page is used</h4>
      <p className="text-sm text-muted-foreground">
        {parts.length > 0 ? `Cited in ${parts.join("; ")}.` : "Not cited anywhere in the current content."}
      </p>
    </div>
  );
}
