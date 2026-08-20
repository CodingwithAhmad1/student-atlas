import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { RefreshCwIcon } from "lucide-react";
import { ActivityCard } from "@/components/activity/activity-card";
import { AdminGate } from "@/components/activity/admin-gate";
import {
  FilterTabs,
  SummaryCard,
  formatDate,
  formatDateTime,
} from "@/components/monitoring/shared";
import { useActivityData } from "@/hooks/useActivityData";
import { MONITORING_LOG_ROUTE } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type {
  ActivityStatus,
  SourceCategory,
  SourceCountry,
} from "@/types/monitoring";
import {
  CATEGORY_LABELS,
  OPEN_ALERT_STATUSES,
  STATUS_LABELS,
} from "@/types/monitoring";

type StatusFilter = "all" | "open" | ActivityStatus;

const STATUS_FILTERS: StatusFilter[] = [
  "all",
  "open",
  "review",
  "manual",
  "approved",
  "rejected",
  "dismissed",
];

const STATUS_FILTER_LABELS: Partial<Record<StatusFilter, string>> = {
  open: "Open",
  ...STATUS_LABELS,
};

const COUNTRIES: (SourceCountry | "all")[] = ["all", "US", "UK", "AU", "INTL"];
const CATEGORIES: (SourceCategory | "all")[] = [
  "all",
  "visitor",
  "student",
  "work",
  "residency",
  "citizenship",
  "general",
];

export function ActivityPage() {
  const {
    alerts,
    summary,
    generatedAt,
    isAdmin,
    refreshing,
    refreshError,
    refresh,
    onAdminChange,
  } = useActivityData();

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [countryFilter, setCountryFilter] = useState<SourceCountry | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<SourceCategory | "all">("all");

  const filtered = useMemo(
    () =>
      alerts.filter((alert) => {
        if (statusFilter === "open") {
          if (!OPEN_ALERT_STATUSES.includes(alert.status)) return false;
        } else if (statusFilter !== "all" && alert.status !== statusFilter) {
          return false;
        }
        if (countryFilter !== "all" && alert.country !== countryFilter) return false;
        if (categoryFilter !== "all" && alert.category !== categoryFilter)
          return false;
        return true;
      }),
    [alerts, statusFilter, countryFilter, categoryFilter]
  );

  const byDay = useMemo(() => {
    const groups = new Map<string, typeof filtered>();
    for (const alert of filtered) {
      const day = alert.detectedAt.slice(0, 10);
      const group = groups.get(day);
      if (group) group.push(alert);
      else groups.set(day, [alert]);
    }
    return [...groups.entries()];
  }, [filtered]);

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-6 py-12">
      <header className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Activity</h1>
          <div className="flex items-center gap-2">
            {isAdmin ? (
              <button
                type="button"
                onClick={() => void refresh()}
                disabled={refreshing}
                className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground disabled:opacity-50"
              >
                <RefreshCwIcon
                  className={cn("size-3.5", refreshing && "animate-spin")}
                />
                Refresh
              </button>
            ) : null}
            <AdminGate onChange={onAdminChange} />
          </div>
        </div>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Every change our monitor detects on the official sources behind this
          guide appears here, along with the AI-drafted correction and its
          review outcome. Source-by-source health lives in the{" "}
          <Link
            to={MONITORING_LOG_ROUTE.path}
            className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
          >
            monitoring log
          </Link>
          .
        </p>
        {generatedAt ? (
          <p className="text-xs text-muted-foreground">
            Last monitor run {formatDateTime(generatedAt)} · checks run every 12
            hours
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            First monitor run pending.
          </p>
        )}
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Sources monitored" value={summary.totalSources} />
        <SummaryCard
          label="Open items"
          value={summary.openAlerts}
          hint="Awaiting analysis or review"
        />
        <SummaryCard
          label="Published updates"
          value={summary.publishedUpdates}
          hint="Approved and merged"
        />
        <SummaryCard
          label="Sources needing attention"
          value={summary.unhealthySources}
          hint="Repeated fetch failures"
        />
      </section>

      {refreshError ? (
        <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          Refresh failed: {refreshError}
        </p>
      ) : null}

      <section className="space-y-4">
        <div className="space-y-2">
          <FilterTabs
            options={STATUS_FILTERS}
            value={statusFilter}
            onChange={setStatusFilter}
            labels={STATUS_FILTER_LABELS}
          />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <FilterTabs
              options={COUNTRIES}
              value={countryFilter}
              onChange={setCountryFilter}
            />
            <FilterTabs
              options={CATEGORIES}
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
                ? "No activity yet — the first monitoring run hasn't detected any changes."
                : "No activity matches these filters."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {byDay.map(([day, dayAlerts]) => (
              <div key={day} className="space-y-3">
                <h2 className="sticky top-0 z-10 -mx-2 bg-background/95 px-2 py-1 text-sm font-semibold backdrop-blur">
                  {formatDate(`${day}T12:00:00Z`)}
                </h2>
                <div className="space-y-3 border-l-2 border-border/60 pl-4">
                  {dayAlerts.map((alert) => (
                    <ActivityCard
                      key={alert.id}
                      alert={alert}
                      isAdmin={isAdmin}
                      onReviewed={() => void refresh()}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
