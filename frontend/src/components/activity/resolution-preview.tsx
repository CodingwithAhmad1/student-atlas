import { ParsedText } from "@/components/parsed-text";
import type { ActivityAlert } from "@/types/monitoring";

/** Reviewer's note plus old vs new text for each content edit made. */
export function ResolutionPreview({
  resolution,
}: {
  resolution: NonNullable<ActivityAlert["resolution"]>;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="mb-1 text-sm font-semibold">Review outcome</h4>
        <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
          {resolution.note}
        </p>
      </div>

      {resolution.edits.map((edit, i) => (
        <div key={i} className="space-y-2 rounded-md border p-3">
          <p className="font-mono text-xs text-muted-foreground">
            {edit.file.replace(/^Student Atlas\//, "")}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded border border-red-200 bg-red-50/60 p-2">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-red-700">
                Before
              </p>
              <p className="text-xs leading-relaxed text-red-900 whitespace-pre-wrap">
                {edit.oldText}
              </p>
            </div>
            <div className="rounded border border-green-200 bg-green-50/60 p-2">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-green-700">
                After
              </p>
              <p className="text-xs leading-relaxed text-green-900 whitespace-pre-wrap">
                {edit.newText}
              </p>
            </div>
          </div>
          <div className="rounded border bg-background p-2">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              As shown on the site
            </p>
            <p className="text-sm leading-relaxed">
              <ParsedText text={edit.newText} citationMap={new Map()} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
