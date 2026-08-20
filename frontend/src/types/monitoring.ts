// Shared between the frontend and the monitoring watcher (imported via tsx),
// so imports here must stay relative — no "@/" alias.
import type { SourceCategory, SourceCountry } from "../lib/classify-source";

export type { SourceCategory, SourceCountry };

export type ActivityStatus =
  | "pending" // change detected; LLM not yet run or errored last run
  | "dismissed" // LLM classified the change as noise (auto-resolved)
  | "review" // draft ready, PR open, awaiting human approval
  | "approved" // PR merged — edit is live in the content files
  | "rejected" // PR closed without merging
  | "manual" // needs human attention; no safe automatic edit was possible
  | "error"; // pipeline failure recorded for this alert

export type Significance = "noise" | "minor" | "meaningful";

export interface DraftEdit {
  /** Repo-relative path, e.g. "Student Atlas/frontend/src/data/sections/student-visa.ts" */
  file: string;
  blockId: string | null;
  /** Exact current text — used as the locator for the replacement. */
  oldText: string;
  newText: string;
}

export interface ActivityAlert {
  /** e.g. "20260820-0917--gov-uk-standard-visitor-visa" */
  id: string;
  sourceId: string;
  /** Other citation ids that share this source's URL. */
  relatedSourceIds: string[];
  sourceLabel: string;
  sourceUrl: string;
  country: SourceCountry;
  category: SourceCategory;
  detectedAt: string;
  oldHash: string | null;
  newHash: string;
  /** Unified diff of normalized page text, capped in size. */
  diff: string;
  diffTruncated: boolean;
  significance: Significance | null;
  summary: string | null;
  confidence: number | null;
  status: ActivityStatus;
  draft: {
    rationale: string;
    edits: DraftEdit[];
  } | null;
  pr: {
    number: number;
    url: string;
    branch: string;
  } | null;
  resolvedAt: string | null;
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
  lastCrawlRun: string | null;
  openAlerts: number;
  publishedUpdates: number;
  unhealthySources: number;
  sourcesNeverChecked: number;
}

export const OPEN_ALERT_STATUSES: ActivityStatus[] = [
  "pending",
  "review",
  "manual",
  "error",
];

export const STATUS_LABELS: Record<ActivityStatus, string> = {
  pending: "Pending",
  dismissed: "Dismissed",
  review: "In review",
  approved: "Approved",
  rejected: "Rejected",
  manual: "Needs attention",
  error: "Error",
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
  general: "General",
};

export const COUNTRY_LABELS: Record<SourceCountry, string> = {
  US: "United States",
  UK: "United Kingdom",
  AU: "Australia",
  INTL: "International",
};

/** A source is considered unhealthy after this many consecutive fetch failures. */
export const UNHEALTHY_FAILURE_THRESHOLD = 3;
