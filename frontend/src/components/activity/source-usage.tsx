import { useEffect, useState } from "react";
import { nationalityRegistry } from "@/data/nationalities/registry";
import { citationUsage, type CitationUsage } from "@/lib/citation-usage";

const SHOW_NAMES = 8;

/** "Where this page is used": base content, trait columns and nationalities. */
export function SourceUsage({ citationIds }: { citationIds: string[] }) {
  const key = citationIds.join("|");
  // Results are tagged with their key, so a stale one is never shown for new ids.
  const [result, setResult] = useState<{ key: string; usage: CitationUsage | null } | null>(null);

  useEffect(() => {
    let live = true;
    citationUsage(key.split("|"))
      .then((usage) => live && setResult({ key, usage }))
      .catch(() => live && setResult({ key, usage: null }));
    return () => {
      live = false;
    };
  }, [key]);

  const current = result?.key === key ? result : null;
  const usage = current?.usage ?? null;
  if (current && !usage) {
    return <p className="text-xs text-muted-foreground">Could not load where this page is used. Reload to try again.</p>;
  }
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
