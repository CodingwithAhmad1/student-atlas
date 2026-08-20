import { useCallback, useMemo, useState } from "react";
import statusFileJson from "@/data/monitoring/status.json";
import { monitoredSources } from "@/data/source-registry";
import { fetchPrState, getPat } from "@/lib/github-admin";
import type {
  ActivityAlert,
  MonitoringSummary,
  SourceStatus,
  SourceStatusFile,
} from "@/types/monitoring";
import {
  OPEN_ALERT_STATUSES,
  UNHEALTHY_FAILURE_THRESHOLD,
} from "@/types/monitoring";

// All alert records are committed to the repo by the monitoring workflow and
// bundled at build time — the deployed feed refreshes with each site rebuild.
const alertModules = import.meta.glob("../data/monitoring/alerts/*.json", {
  eager: true,
}) as Record<string, { default: ActivityAlert } | ActivityAlert>;

const bundledAlerts: ActivityAlert[] = Object.values(alertModules)
  .map((mod) => ("default" in mod ? mod.default : mod))
  .sort((a, b) => b.detectedAt.localeCompare(a.detectedAt));

const statusFile = statusFileJson as SourceStatusFile;

/** Registry-complete source list: every monitored source, with crawl status when present. */
const sources: SourceStatus[] = monitoredSources.map((source) => {
  const status = statusFile.sources[source.id];
  return (
    status ?? {
      sourceId: source.id,
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
      skipReason: null,
    }
  );
});

export interface ActivityData {
  alerts: ActivityAlert[];
  sources: SourceStatus[];
  summary: MonitoringSummary;
  generatedAt: string | null;
  isAdmin: boolean;
  refreshing: boolean;
  refreshError: string | null;
  /** Admin-mode: re-check open PRs so approve/merge state is current. */
  refresh: () => Promise<void>;
  /** Re-read admin state after the token is added or cleared. */
  onAdminChange: () => void;
}

export function useActivityData(): ActivityData {
  const [isAdmin, setIsAdmin] = useState(() => getPat() !== null);
  const [statusOverrides, setStatusOverrides] = useState<
    Record<string, ActivityAlert["status"]>
  >({});
  const [refreshing, setRefreshing] = useState(false);
  const [refreshError, setRefreshError] = useState<string | null>(null);

  const alerts = useMemo(
    () =>
      bundledAlerts.map((alert) =>
        statusOverrides[alert.id]
          ? { ...alert, status: statusOverrides[alert.id] }
          : alert
      ),
    [statusOverrides]
  );

  const refresh = useCallback(async () => {
    if (!getPat()) return;
    setRefreshing(true);
    setRefreshError(null);
    try {
      const inReview = bundledAlerts.filter(
        (a) => a.status === "review" && a.pr !== null
      );
      const overrides: Record<string, ActivityAlert["status"]> = {};
      for (const alert of inReview) {
        const pr = await fetchPrState(alert.pr!.number);
        if (pr.merged) overrides[alert.id] = "approved";
        else if (pr.state === "closed") overrides[alert.id] = "rejected";
      }
      setStatusOverrides(overrides);
    } catch (err) {
      setRefreshError(err instanceof Error ? err.message : String(err));
    } finally {
      setRefreshing(false);
    }
  }, []);

  const onAdminChange = useCallback(() => {
    setIsAdmin(getPat() !== null);
  }, []);

  const summary = useMemo<MonitoringSummary>(() => {
    const monitorable = sources.filter((s) => s.skipReason === null);
    return {
      totalSources: sources.length,
      lastCrawlRun: statusFile.generatedAt,
      openAlerts: alerts.filter((a) => OPEN_ALERT_STATUSES.includes(a.status))
        .length,
      publishedUpdates: alerts.filter((a) => a.status === "approved").length,
      unhealthySources: sources.filter(
        (s) => s.consecutiveFailures >= UNHEALTHY_FAILURE_THRESHOLD
      ).length,
      sourcesNeverChecked: monitorable.filter((s) => s.lastCheckedAt === null)
        .length,
    };
  }, [alerts]);

  return {
    alerts,
    sources,
    summary,
    generatedAt: statusFile.generatedAt,
    isAdmin,
    refreshing,
    refreshError,
    refresh,
    onAdminChange,
  };
}
