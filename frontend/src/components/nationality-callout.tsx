import { ContentBlockRenderer } from "@/components/content-blocks";
import { PRACTICAL_NOTE, type CalloutBlock } from "@/data/types";

/** Nationality-specific notes, shown above the general content they refine. */
export function NationalityCallout({
  label,
  blocks,
}: {
  label: string | null;
  blocks: CalloutBlock[];
}) {
  if (blocks.length === 0) return null;
  const hasPractical = blocks.some((b) => b.practical);
  return (
    <aside className="border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-950/20 p-4 rounded-r-lg">
      <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1 uppercase tracking-wide">
        For {label ?? "your nationality"} applicants
      </p>
      <div className="text-sm text-amber-900 dark:text-amber-200 leading-6 space-y-2">
        {blocks.map((cb, i) =>
          cb.practical ? (
            <div key={i} className="flex gap-1">
              <div className="flex-1">
                <ContentBlockRenderer block={cb.block} />
              </div>
              <span
                className="shrink-0 font-semibold text-amber-700 dark:text-amber-400"
                aria-label="practical guidance, not from an official source"
                title="Practical guidance, not from an official source"
              >
                *
              </span>
            </div>
          ) : (
            <ContentBlockRenderer key={i} block={cb.block} />
          )
        )}
      </div>
      {hasPractical && (
        <p className="mt-2 text-[11px] leading-4 text-amber-700/80 dark:text-amber-400/80">
          {PRACTICAL_NOTE}
        </p>
      )}
    </aside>
  );
}
