import { useState } from "react";
import { ChevronDownIcon, ExternalLink } from "lucide-react";
import { DiffViewer } from "@/components/activity/diff-viewer";
import { ResolutionPreview } from "@/components/activity/resolution-preview";
import {
  STATUS_DOT_STYLES,
  StatusBadge,
  formatDateTime,
} from "@/components/monitoring/shared";
import { cn } from "@/lib/utils";
import type { ActivityAlert } from "@/types/monitoring";
import { CATEGORY_LABELS, SIGNIFICANCE_LABELS } from "@/types/monitoring";

export function ActivityCard({ alert }: { alert: ActivityAlert }) {
  const [expanded, setExpanded] = useState(false);
  const { status } = alert;

  return (
    <article className="relative rounded-lg border bg-background transition-shadow hover:shadow-sm">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-start gap-3 p-4 text-left"
      >
        <span
          className={cn(
            "mt-1.5 size-2.5 shrink-0 rounded-full",
            STATUS_DOT_STYLES[status]
          )}
        />
        <span className="min-w-0 flex-1 space-y-1">
          <span className="flex flex-wrap items-center gap-2">
            <StatusBadge status={status} />
            <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
              {alert.country} · {CATEGORY_LABELS[alert.category]}
            </span>
            {alert.significance ? (
              <span className="text-xs text-muted-foreground">
                {SIGNIFICANCE_LABELS[alert.significance]} change
              </span>
            ) : null}
            <span className="ml-auto text-xs whitespace-nowrap text-muted-foreground">
              {formatDateTime(alert.detectedAt)}
            </span>
          </span>
          <span className="block text-sm font-medium">{alert.sourceLabel}</span>
          {alert.summary ? (
            <span
              className={cn(
                "block text-sm leading-relaxed text-muted-foreground",
                !expanded && "line-clamp-2"
              )}
            >
              {alert.summary}
            </span>
          ) : (
            <span className="block text-sm italic text-muted-foreground">
              Change detected — awaiting review.
            </span>
          )}
        </span>
        <ChevronDownIcon
          className={cn(
            "mt-1 size-4 shrink-0 text-muted-foreground transition-transform",
            expanded && "rotate-180"
          )}
        />
      </button>

      {expanded ? (
        <div className="space-y-4 border-t px-4 py-4">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <a
              href={alert.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 underline underline-offset-2 hover:text-blue-700"
            >
              View source page
              <ExternalLink className="size-3" />
            </a>
          </div>

          {alert.error ? (
            <p className="rounded-md border border-orange-200 bg-orange-50 p-3 text-sm text-orange-900">
              {alert.error}
            </p>
          ) : null}

          {alert.diff ? (
            <div>
              <h4 className="mb-1.5 text-sm font-semibold">
                What changed on the page
              </h4>
              <DiffViewer diff={alert.diff} truncated={alert.diffTruncated} />
            </div>
          ) : null}

          {alert.resolution ? (
            <ResolutionPreview resolution={alert.resolution} />
          ) : null}

          {alert.resolvedAt ? (
            <p className="text-xs text-muted-foreground">
              Resolved {formatDateTime(alert.resolvedAt)}
            </p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
