// The frontend files are the single source of truth for monitoring types and
// the source registry; the watcher imports them directly so the two sides can
// never drift.
export type {
  ActivityAlert,
  ActivityStatus,
  SourceStatus,
  SourceStatusFile,
} from "../../frontend/src/types/monitoring";

export {
  OPEN_ALERT_STATUSES,
  UNHEALTHY_FAILURE_THRESHOLD,
} from "../../frontend/src/types/monitoring";

export type { MonitoredSource as MonitoredTarget } from "../../frontend/src/data/source-registry";
