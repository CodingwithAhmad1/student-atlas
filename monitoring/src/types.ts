// The frontend file is the single source of truth for monitoring types;
// the watcher imports it directly so the two sides can never drift.
export type {
  ActivityAlert,
  ActivityStatus,
  DraftEdit,
  Significance,
  SourceCategory,
  SourceCountry,
  SourceStatus,
  SourceStatusFile,
} from "../../frontend/src/types/monitoring";

export { UNHEALTHY_FAILURE_THRESHOLD } from "../../frontend/src/types/monitoring";

/** One fetch target — citation ids that share a URL are checked once. */
export interface MonitoredTarget {
  /** Filesystem-safe key derived from the primary source id. */
  key: string;
  url: string;
  /** Primary citation id (first one registered for this URL). */
  sourceId: string;
  /** Every other citation id pointing at the same URL. */
  relatedSourceIds: string[];
  label: string;
  country: import("../../frontend/src/types/monitoring").SourceCountry;
  category: import("../../frontend/src/types/monitoring").SourceCategory;
  contentSelector?: string;
  /** When set, the watcher does not fetch this target. */
  skipReason?: string;
}
