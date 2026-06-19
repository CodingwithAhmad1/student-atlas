export type SourceCountry = "US" | "UK" | "AU";

export type SourceCategory =
  | "visitor"
  | "student"
  | "work"
  | "residency"
  | "citizenship"
  | "general";

export type ChangeAlertStatus =
  | "pending"
  | "drafting"
  | "review"
  | "approved"
  | "rejected";

export interface SourceHealth {
  id: string;
  url: string;
  country: SourceCountry;
  category: SourceCategory;
  label: string;
  is_active: boolean;
  created_at: string;
  last_checked_at: string | null;
  last_content_hash: string | null;
  last_snapshot_id: string | null;
}

export interface ChangeAlertDetail {
  id: string;
  source_id: string;
  old_snapshot_id: string | null;
  new_snapshot_id: string | null;
  detected_at: string;
  status: ChangeAlertStatus;
  agent_draft: unknown | null;
  agent_explanation: string | null;
  reviewer_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  published_at: string | null;
  source_label: string;
  source_url: string;
  country: SourceCountry;
  category: SourceCategory;
}

export interface MonitoringSummary {
  totalSources: number;
  activeSources: number;
  lastCrawlRun: string | null;
  openAlerts: number;
  publishedUpdates: number;
  sourcesNeverChecked: number;
}

export const OPEN_ALERT_STATUSES: ChangeAlertStatus[] = [
  "pending",
  "drafting",
  "review",
];

export const STATUS_LABELS: Record<ChangeAlertStatus, string> = {
  pending: "Pending",
  drafting: "Drafting",
  review: "In review",
  approved: "Approved",
  rejected: "Rejected",
};

export const CATEGORY_LABELS: Record<SourceCategory, string> = {
  visitor: "Visitor",
  student: "Student",
  work: "Work",
  residency: "Residency",
  citizenship: "Citizenship",
  general: "General",
};
