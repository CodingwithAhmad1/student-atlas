import { useMemo } from "react";
import statusFileJson from "@/data/monitoring/status.json";
import { monitoredSources } from "@/data/source-registry";
import type {
  ActivityAlert,
  MonitoringSummary,
  SourceStatus,
  SourceStatusFile,
} from "@/types/monitoring";
import { OPEN_ALERT_STATUSES } from "@/types/monitoring";

// All alert records are committed to the repo by the monitoring workflow and
// the content review (MCP) flow, and bundled at build time — the deployed feed
// refreshes with each site rebuild.
const alertModules = import.meta.glob("../data/monitoring/alerts/*.json", {
  eager: true,
}) as Record<string, { default: ActivityAlert } | ActivityAlert>;

const alerts: ActivityAlert[] = Object.values(alertModules)
  .map((mod) => ("default" in mod ? mod.default : mod))
  .sort((a, b) => b.detectedAt.localeCompare(a.detectedAt));

const statusFile = statusFileJson as SourceStatusFile;

/** Registry-complete source list: every monitored page, with crawl status when present. */
const sources: SourceStatus[] = monitoredSources.map((source) => {
  const status = statusFile.sources[source.sourceId];
  return (
    status ?? {
      sourceId: source.sourceId,
      url: source.url,
      country: source.country,
      category: source.category,
      label: source.label,
      lastCheckedAt: null,
      lastChangedAt: null,
      lastHash: null,
      lastHttpStatus: null,
      consecutiveFailures: 0,
      lastError: null,
      skipReason: source.skipReason ?? null,
    }
  );
});

export interface ActivityData {
  alerts: ActivityAlert[];
  sources: SourceStatus[];
  summary: MonitoringSummary;
  generatedAt: string | null;
}

export function useActivityData(): ActivityData {
  const summary = useMemo<MonitoringSummary>(() => {
    return {
      totalSources: sources.length,
      openAlerts: alerts.filter((a) => OPEN_ALERT_STATUSES.includes(a.status))
        .length,
      publishedUpdates: alerts.filter((a) => a.status === "approved").length,
    };
  }, []);

  return { alerts, sources, summary, generatedAt: statusFile.generatedAt };
}
