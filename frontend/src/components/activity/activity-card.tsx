import { useState } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ExternalLink,
  GitPullRequestIcon,
  XIcon,
} from "lucide-react";
import { DiffViewer } from "@/components/activity/diff-viewer";
import { DraftPreview } from "@/components/activity/draft-preview";
import {
  STATUS_DOT_STYLES,
  StatusBadge,
  formatDateTime,
} from "@/components/monitoring/shared";
import { approveDraft, rejectDraft } from "@/lib/github-admin";
import { cn } from "@/lib/utils";
import type { ActivityAlert } from "@/types/monitoring";
import { CATEGORY_LABELS, SIGNIFICANCE_LABELS } from "@/types/monitoring";

function ConfidenceChip({ confidence }: { confidence: number }) {
  const pct = Math.round(confidence * 100);
  const tone =
    pct >= 80
      ? "text-green-700 border-green-200 bg-green-50"
      : pct >= 50
        ? "text-amber-700 border-amber-200 bg-amber-50"
        : "text-red-700 border-red-200 bg-red-50";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        tone
      )}
    >
      {pct}% confident
    </span>
  );
}

export function ActivityCard({
  alert,
  isAdmin,
  onReviewed,
}: {
  alert: ActivityAlert;
  isAdmin: boolean;
  onReviewed: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [acting, setActing] = useState<"approve" | "reject" | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [localStatus, setLocalStatus] = useState<ActivityAlert["status"] | null>(
    null
  );

  const status = localStatus ?? alert.status;
  const reviewable = isAdmin && status === "review" && alert.pr !== null;

  async function act(kind: "approve" | "reject") {
    if (!alert.pr) return;
    setActing(kind);
    setActionError(null);
    try {
      if (kind === "approve") await approveDraft(alert.pr.number);
      else await rejectDraft(alert.pr.number);
      setLocalStatus(kind === "approve" ? "approved" : "rejected");
      onReviewed();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : String(err));
    } finally {
      setActing(null);
    }
  }

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
              Change detected — awaiting analysis.
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
            {alert.pr ? (
              <a
                href={alert.pr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 underline underline-offset-2 hover:text-blue-700"
              >
                <GitPullRequestIcon className="size-3.5" />
                PR #{alert.pr.number}
              </a>
            ) : null}
            {alert.confidence !== null ? (
              <ConfidenceChip confidence={alert.confidence} />
            ) : null}
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

          {alert.draft ? <DraftPreview draft={alert.draft} /> : null}

          {reviewable ? (
            <div className="flex flex-wrap items-center gap-2 border-t pt-3">
              <button
                type="button"
                disabled={acting !== null}
                onClick={() => void act("approve")}
                className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
              >
                <CheckIcon className="size-4" />
                {acting === "approve" ? "Merging…" : "Approve & publish"}
              </button>
              <button
                type="button"
                disabled={acting !== null}
                onClick={() => void act("reject")}
                className="inline-flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
              >
                <XIcon className="size-4" />
                {acting === "reject" ? "Closing…" : "Reject"}
              </button>
              <span className="text-xs text-muted-foreground">
                Approve squash-merges the PR; the site updates on the next
                deploy.
              </span>
            </div>
          ) : null}

          {actionError ? (
            <p className="text-sm text-red-700">
              {actionError}
              {alert.pr ? (
                <>
                  {" — you can also "}
                  <a
                    href={alert.pr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    review it on GitHub
                  </a>
                  .
                </>
              ) : null}
            </p>
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
