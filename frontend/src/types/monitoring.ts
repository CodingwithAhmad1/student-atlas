// Shared between the frontend and the monitoring watcher (imported via tsx),
// so imports here must stay relative — no "@/" alias.
import type { SourceCategory, SourceCountry } from "../lib/classify-source";

export type { SourceCategory, SourceCountry };

export type ActivityStatus =
  | "pending" // change detected; awaiting review
  | "manual" // needs human attention outside the content (e.g. source unreachable)
  | "approved" // reviewed; site content was updated to match
  | "dismissed"; // reviewed (or auto-resolved); no content change needed

export type AlertKind =
  | "change" // the page text differs from the reviewed baseline
  | "unreachable" // the page failed 3 checks in a row
  | "stale-check"; // a manually checked trait column is past its check interval

export type Significance = "noise" | "minor" | "meaningful";

/** One exact-string content edit applied while resolving an alert. */
export interface ContentEdit {
  /** Repo-relative path, e.g. "Student Atlas/frontend/src/data/sections/student-visa.ts" */
  file: string;
  oldText: string;
  newText: string;
}

export interface ActivityAlert {
  /** e.g. "20260820-0917--gov-uk-standard-visitor-visa" */
  id: string;
  kind: AlertKind;
  sourceId: string;
  /** Other citation ids that share this source's URL. */
  relatedSourceIds: string[];
  sourceLabel: string;
  sourceUrl: string;
  country: SourceCountry;
  category: SourceCategory;
  /** When the change was first seen. */
  detectedAt: string;
  /** When the watcher last refreshed the diff (the page kept changing). */
  updatedAt: string;
  /** Hash of the reviewed baseline snapshot the diff is taken against. */
  oldHash: string | null;
  /** Hash of the page text the diff (and any review) refers to. */
  newHash: string;
  /** Unified diff of normalized page text, capped in size. */
  diff: string;
  diffTruncated: boolean;
  /** Set by the reviewer. */
  significance: Significance | null;
  /** Reviewer's plain-language summary of what changed. */
  summary: string | null;
  status: ActivityStatus;
  /** Set when the alert is resolved. */
  resolution: {
    note: string;
    edits: ContentEdit[];
  } | null;
  resolvedAt: string | null;
  /** Fetch error for "unreachable" alerts. */
  error: string | null;
}

export interface SourceStatus {
  sourceId: string;
  url: string;
  country: SourceCountry;
  category: SourceCategory;
  label: string;
  lastCheckedAt: string | null;
  lastChangedAt: string | null;
  lastHash: string | null;
  lastHttpStatus: number | null;
  consecutiveFailures: number;
  lastError: string | null;
  /** Set when the watcher deliberately skips this source (bot protection). */
  skipReason: string | null;
}

export interface SourceStatusFile {
  generatedAt: string | null;
  sources: Record<string, SourceStatus>;
}

export interface MonitoringSummary {
  totalSources: number;
  openAlerts: number;
  publishedUpdates: number;
  unhealthySources: number;
  sourcesNeverChecked: number;
}

export const OPEN_ALERT_STATUSES: ActivityStatus[] = ["pending", "manual"];

export const STATUS_LABELS: Record<ActivityStatus, string> = {
  pending: "Awaiting review",
  manual: "Needs attention",
  approved: "Content updated",
  dismissed: "Dismissed",
};

export const SIGNIFICANCE_LABELS: Record<Significance, string> = {
  noise: "Noise",
  minor: "Minor",
  meaningful: "Meaningful",
};

export const CATEGORY_LABELS: Record<SourceCategory, string> = {
  visitor: "Visitor",
  student: "Student",
  work: "Work",
  residency: "Residency",
  citizenship: "Citizenship",
  eligibility: "Eligibility list",
  general: "General",
};

/** A source is considered unhealthy after this many consecutive fetch failures. */
export const UNHEALTHY_FAILURE_THRESHOLD = 3;
