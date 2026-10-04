import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ActivityCard } from "@/components/activity/activity-card";
import { SourcesTable } from "@/components/activity/sources-table";
import { FilterTabs, SummaryCard } from "@/components/monitoring/shared";
import { useActivityData } from "@/hooks/useActivityData";
import { CATEGORY_FILTERS, COUNTRY_FILTERS } from "@/lib/monitoring-filters";
import { formatDateTime, formatDayKey, localDayKey } from "@/lib/monitoring-format";
import { cn } from "@/lib/utils";
import type { ActivityAlert, ActivityStatus, SourceCategory, SourceCountry } from "@/types/monitoring";
import { CATEGORY_LABELS, OPEN_ALERT_STATUSES, STATUS_LABELS } from "@/types/monitoring";

type StatusFilter = "all" | "open" | ActivityStatus;
type View = "changes" | "sources";

const STATUS_FILTERS: StatusFilter[] = ["all", "open", "pending", "manual", "approved", "dismissed"];

const STATUS_FILTER_LABELS: Partial<Record<StatusFilter, string>> = {
  open: "Open",
  ...STATUS_LABELS,
};

function ChangesView({ alerts }: { alerts: ActivityAlert[] }) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [countryFilter, setCountryFilter] = useState<SourceCountry | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<SourceCategory | "all">("all");

  const byDay = useMemo(() => {
    const groups = new Map<string, ActivityAlert[]>();
    for (const alert of alerts) {
      if (statusFilter === "open" && !OPEN_ALERT_STATUSES.includes(alert.status)) continue;
      if (statusFilter !== "open" && statusFilter !== "all" && alert.status !== statusFilter) continue;
      if (countryFilter !== "all" && alert.country !== countryFilter) continue;
      if (categoryFilter !== "all" && alert.category !== categoryFilter) continue;
      const day = localDayKey(alert.detectedAt);
      groups.set(day, [...(groups.get(day) ?? []), alert]);
    }
    return [...groups.entries()];
  }, [alerts, statusFilter, countryFilter, categoryFilter]);

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <FilterTabs
          options={STATUS_FILTERS}
          value={statusFilter}
          onChange={setStatusFilter}
          labels={STATUS_FILTER_LABELS}
        />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <FilterTabs options={COUNTRY_FILTERS} value={countryFilter} onChange={setCountryFilter} />
          <FilterTabs
            options={CATEGORY_FILTERS}
            value={categoryFilter}
            onChange={setCategoryFilter}
            labels={CATEGORY_LABELS}
          />
        </div>
      </div>

      {byDay.length === 0 ? (
        <div className="rounded-lg border bg-muted/30 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            {alerts.length === 0
              ? "No activity yet — the monitor hasn't detected any changes."
              : "No activity matches these filters."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {byDay.map(([day, dayAlerts]) => (
            <div key={day} className="space-y-3">
              <h2 className="sticky top-0 z-10 -mx-2 bg-background/95 px-2 py-1 text-sm font-semibold backdrop-blur">
                {formatDayKey(day)}
              </h2>
              <div className="space-y-3 border-l-2 border-border/60 pl-4">
                {dayAlerts.map((alert) => (
                  <ActivityCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function ActivityPage() {
  const { alerts, sources, summary, generatedAt } = useActivityData();
  const [params, setParams] = useSearchParams();
  const view: View = params.get("view") === "sources" ? "sources" : "changes";

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Activity</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Every change our monitor detects on the official sources behind this
          guide appears here. Each change is reviewed by a person, and the
          outcome — content updated, or no change needed — is recorded with it.
          The Sources view shows the health of every monitored page.
        </p>
        <p className="text-xs text-muted-foreground">
          {generatedAt
            ? `Last monitor run ${formatDateTime(generatedAt)} · checks run every 12 hours`
            : "First monitor run pending."}
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Sources monitored"
          value={summary.totalSources}
          hint={summary.sourcesNeverChecked > 0 ? `${summary.sourcesNeverChecked} awaiting first check` : undefined}
        />
        <SummaryCard label="Open items" value={summary.openAlerts} hint="Awaiting review" />
        <SummaryCard label="Content updates" value={summary.publishedUpdates} hint="Changes that updated the guide" />
      </section>

      <div role="tablist" aria-label="Activity views" className="flex gap-1 border-b">
        {(["changes", "sources"] as const).map((v) => (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={view === v}
            onClick={() => setParams(v === "changes" ? {} : { view: v }, { replace: true })}
            className={cn(
              "-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors",
              view === v
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {v === "changes" ? "Changes" : "Sources"}
          </button>
        ))}
      </div>

      {view === "changes" ? <ChangesView alerts={alerts} /> : <SourcesTable sources={sources} />}
    </div>
  );
}
