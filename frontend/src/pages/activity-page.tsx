import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ActivityCard } from "@/components/activity/activity-card";
import {
  FilterTabs,
  SummaryCard,
  formatDate,
  formatDateTime,
} from "@/components/monitoring/shared";
import { useActivityData } from "@/hooks/useActivityData";
import { MONITORING_LOG_ROUTE } from "@/lib/routes";
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
  "pending",
  "manual",
  "approved",
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
  const { alerts, summary, generatedAt } = useActivityData();

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
        <h1 className="text-3xl font-bold tracking-tight">Activity</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Every change our monitor detects on the official sources behind this
          guide appears here. Each change is reviewed by a person, and the
          outcome (content updated or no change needed) is recorded alongside
          it. Source-by-source health lives in the{" "}
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
          hint="Awaiting review"
        />
        <SummaryCard
          label="Published updates"
          value={summary.publishedUpdates}
          hint="Changes that updated the guide"
        />
        <SummaryCard
          label="Sources needing attention"
          value={summary.unhealthySources}
          hint="Repeated fetch failures"
        />
      </section>

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
                    <ActivityCard key={alert.id} alert={alert} />
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
