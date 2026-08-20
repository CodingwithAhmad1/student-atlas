import { cn } from "@/lib/utils";

/** Render a stored unified diff with add/remove line coloring. */
export function DiffViewer({
  diff,
  truncated,
}: {
  diff: string;
  truncated: boolean;
}) {
  const lines = diff.split("\n");
  return (
    <div className="overflow-x-auto rounded-md border bg-muted/30">
      <pre className="min-w-max p-3 font-mono text-xs leading-relaxed">
        {lines.map((line, i) => {
          const isAdd = line.startsWith("+") && !line.startsWith("+++");
          const isDel = line.startsWith("-") && !line.startsWith("---");
          const isHunk = line.startsWith("@@");
          return (
            <div
              key={i}
              className={cn(
                "px-1",
                isAdd && "bg-green-50 text-green-800",
                isDel && "bg-red-50 text-red-800",
                isHunk && "text-blue-600",
                !isAdd && !isDel && !isHunk && "text-muted-foreground"
              )}
            >
              {line || " "}
            </div>
          );
        })}
      </pre>
      {truncated ? (
        <p className="border-t px-3 py-1.5 text-xs text-muted-foreground">
          Diff truncated for size — the full change is on the source page.
        </p>
      ) : null}
    </div>
  );
}
