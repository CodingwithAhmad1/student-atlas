import { useCallback, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import type {
  ChangeAlertDetail,
  MonitoringSummary,
  SourceHealth,
} from "@/types/monitoring";
import { OPEN_ALERT_STATUSES } from "@/types/monitoring";

const POLL_MS = 60_000;

function buildSummary(
  sources: SourceHealth[],
  alerts: ChangeAlertDetail[]
): MonitoringSummary {
  const lastCrawlRun = sources.reduce<string | null>((latest, s) => {
    if (!s.last_checked_at) return latest;
    if (!latest || s.last_checked_at > latest) return s.last_checked_at;
    return latest;
  }, null);

  return {
    totalSources: sources.length,
    activeSources: sources.filter((s) => s.is_active).length,
    lastCrawlRun,
    openAlerts: alerts.filter((a) => OPEN_ALERT_STATUSES.includes(a.status))
      .length,
    publishedUpdates: alerts.filter(
      (a) => a.status === "approved" && a.published_at
    ).length,
    sourcesNeverChecked: sources.filter((s) => !s.last_checked_at).length,
  };
}

export function useMonitoringData() {
  const [sources, setSources] = useState<SourceHealth[]>([]);
  const [alerts, setAlerts] = useState<ChangeAlertDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchedAt, setLastFetchedAt] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const [sourcesResult, alertsResult] = await Promise.all([
      supabase
        .from("source_health")
        .select("*")
        .order("country")
        .order("category")
        .order("label"),
      supabase
        .from("change_alerts_detail")
        .select("*")
        .order("detected_at", { ascending: false }),
    ]);

    if (sourcesResult.error) {
      setError(sourcesResult.error.message);
      setLoading(false);
      return;
    }

    if (alertsResult.error) {
      setError(alertsResult.error.message);
      setLoading(false);
      return;
    }

    setSources((sourcesResult.data ?? []) as SourceHealth[]);
    setAlerts((alertsResult.data ?? []) as ChangeAlertDetail[]);
    setLastFetchedAt(new Date());
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const id = window.setInterval(() => {
      void fetchData();
    }, POLL_MS);

    return () => window.clearInterval(id);
  }, [fetchData]);

  const summary = useMemo(
    () => buildSummary(sources, alerts),
    [sources, alerts]
  );

  return {
    sources,
    alerts,
    summary,
    loading,
    error,
    lastFetchedAt,
    isConfigured: isSupabaseConfigured,
    refresh: fetchData,
  };
}
