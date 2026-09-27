import { ContentBlockRenderer } from "@/components/content-blocks";
import type { ContentBlock } from "@/data/types";

/** Nationality-specific notes, shown above the general content they refine. */
export function NationalityCallout({
  label,
  blocks,
}: {
  label: string | null;
  blocks: ContentBlock[];
}) {
  if (blocks.length === 0) return null;
  return (
    <aside className="border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-950/20 p-4 rounded-r-lg">
      <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1 uppercase tracking-wide">
        For {label ?? "your nationality"} applicants
      </p>
      <div className="text-sm text-amber-900 dark:text-amber-200 leading-6 space-y-2">
        {blocks.map((block, i) => (
          <ContentBlockRenderer key={i} block={block} />
        ))}
      </div>
    </aside>
  );
}
