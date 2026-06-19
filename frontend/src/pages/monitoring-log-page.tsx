import { useMemo, useState } from "react";
import { ExternalLink, RefreshCwIcon } from "lucide-react";
import { useMonitoringData } from "@/hooks/useMonitoringData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type {
  ChangeAlertDetail,
  ChangeAlertStatus,
  SourceCategory,
  SourceCountry,
  SourceHealth,
} from "@/types/monitoring";
import { CATEGORY_LABELS, STATUS_LABELS } from "@/types/monitoring";

const STATUS_STYLES: Record<ChangeAlertStatus, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  drafting: "bg-blue-100 text-blue-800 border-blue-200",
  review: "bg-purple-100 text-purple-800 border-purple-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};

const COUNTRIES: (SourceCountry | "all")[] = ["all", "US", "UK", "AU"];
const CATEGORIES: (SourceCategory | "all")[] = [
  "all",
  "visitor",
  "student",
  "work",
  "residency",
  "citizenship",
  "general",
];

function formatDateTime(iso: string | null): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

function truncateHash(hash: string | null): string {
  if (!hash) return "Awaiting first crawl";
  if (hash.length <= 12) return hash;
  return `${hash.slice(0, 12)}…`;
}

function StatusBadge({ status }: { status: ChangeAlertStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        STATUS_STYLES[status]
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function SummaryCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      {hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

function SupabaseSetupBanner() {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
      <p className="font-semibold mb-1">Supabase not connected</p>
      <p className="leading-relaxed">
        Copy <code className="font-mono text-xs">frontend/.env.example</code> to{" "}
        <code className="font-mono text-xs">frontend/.env.local</code>, run{" "}
        <code className="font-mono text-xs">supabase start</code> and{" "}
        <code className="font-mono text-xs">supabase db reset</code>, then paste
        the URL and anon key from{" "}
        <code className="font-mono text-xs">supabase status</code>.
      </p>
    </div>
  );
}

function FilterTabs<T extends string>({
  options,
  value,
  onChange,
  labels,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
  labels?: Partial<Record<T, string>>;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            value === opt
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:text-foreground"
          )}
        >
          {labels?.[opt] ?? (opt === "all" ? "All" : opt)}
        </button>
      ))}
    </div>
  );
}

function SourcesTable({ sources }: { sources: SourceHealth[] }) {
  const [countryFilter, setCountryFilter] = useState<SourceCountry | "all">(
    "all"
  );
  const [categoryFilter, setCategoryFilter] = useState<SourceCategory | "all">(
    "all"
  );

  const filtered = useMemo(() => {
    return sources.filter((s) => {
      if (countryFilter !== "all" && s.country !== countryFilter) return false;
      if (categoryFilter !== "all" && s.category !== categoryFilter)
        return false;
      return true;
    });
  }, [sources, countryFilter, categoryFilter]);

  if (sources.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No monitored sources in the database yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-3 py-2 font-medium">Country</th>
              <th className="px-3 py-2 font-medium">Category</th>
              <th className="px-3 py-2 font-medium">Source</th>
              <th className="px-3 py-2 font-medium">Last checked</th>
              <th className="px-3 py-2 font-medium">Content hash</th>
              <th className="px-3 py-2 font-medium">Active</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b last:border-0">
                <td className="px-3 py-2.5 font-medium">{s.country}</td>
                <td className="px-3 py-2.5 text-muted-foreground">
                  {CATEGORY_LABELS[s.category]}
                </td>
                <td className="px-3 py-2.5 max-w-xs">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-1 text-blue-600 underline underline-offset-2 hover:text-blue-700"
                  >
                    <span className="line-clamp-2">{s.label}</span>
                    <ExternalLink className="mt-0.5 size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-muted-foreground">
                  {formatDateTime(s.last_checked_at)}
                </td>
                <td className="px-3 py-2.5 font-mono text-xs text-muted-foreground">
                  {truncateHash(s.last_content_hash)}
                </td>
                <td className="px-3 py-2.5">
                  {s.is_active ? (
                    <span className="text-green-700">Yes</span>
                  ) : (
                    <span className="text-muted-foreground">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {sources.length} sources
      </p>
    </div>
  );
}

function AlertDetailPanel({ alert }: { alert: ChangeAlertDetail }) {
  return (
    <div className="space-y-4 pt-2 text-sm">
      {alert.agent_explanation ? (
        <div>
          <h4 className="font-semibold mb-1">Agent explanation</h4>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {alert.agent_explanation}
          </p>
        </div>
      ) : null}

      {alert.agent_draft != null ? (
        <div>
          <h4 className="font-semibold mb-1">Agent draft</h4>
          <pre className="overflow-x-auto rounded-md border bg-muted/40 p-3 font-mono text-xs leading-relaxed">
            {JSON.stringify(alert.agent_draft, null, 2)}
          </pre>
        </div>
      ) : null}

      {alert.reviewer_notes ? (
        <div>
          <h4 className="font-semibold mb-1">Reviewer notes</h4>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {alert.reviewer_notes}
          </p>
        </div>
      ) : null}

      <dl className="grid gap-2 sm:grid-cols-2 text-xs text-muted-foreground">
        <div>
          <dt className="font-medium text-foreground">Reviewed by</dt>
          <dd>{alert.reviewed_by ?? "—"}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Reviewed at</dt>
          <dd>{formatDateTime(alert.reviewed_at)}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Published at</dt>
          <dd>{formatDateTime(alert.published_at)}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Old snapshot</dt>
          <dd className="font-mono">{alert.old_snapshot_id ?? "—"}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">New snapshot</dt>
          <dd className="font-mono">{alert.new_snapshot_id ?? "—"}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Alert ID</dt>
          <dd className="font-mono">{alert.id}</dd>
        </div>
      </dl>
    </div>
  );
}

function AlertsTimeline({ alerts }: { alerts: ChangeAlertDetail[] }) {
  if (alerts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No policy changes detected yet. When the monitoring crawler runs and
        finds a substantive change, alerts will appear here with full agent and
        reviewer details.
      </p>
    );
  }

  return (
    <Accordion className="space-y-2">
      {alerts.map((alert) => (
        <AccordionItem
          key={alert.id}
          value={alert.id}
          className="rounded-lg border px-4"
        >
          <AccordionTrigger className="py-3 hover:no-underline">
            <div className="flex flex-1 flex-col gap-1 text-left sm:flex-row sm:items-center sm:gap-3">
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatDateTime(alert.detected_at)}
              </span>
              <StatusBadge status={alert.status} />
              <span className="text-sm font-medium line-clamp-1">
                {alert.source_label}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pb-3">
              <a
                href={alert.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-600 underline underline-offset-2 hover:text-blue-700"
              >
                {alert.source_url}
                <ExternalLink className="size-3" />
              </a>
              {alert.agent_explanation ? (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {alert.agent_explanation}
                </p>
              ) : null}
              <AlertDetailPanel alert={alert} />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function MonitoringLogPage() {
  const {
    sources,
    alerts,
    summary,
    loading,
    error,
    lastFetchedAt,
    isConfigured,
    refresh,
  } = useMonitoringData();

  return (
    <div className="mx-auto max-w-4xl py-12 px-6 space-y-10">
      <header className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Monitoring log</h1>
          {isConfigured ? (
            <button
              type="button"
              onClick={() => void refresh()}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors disabled:opacity-50"
            >
              <RefreshCwIcon
                className={cn("size-3.5", loading && "animate-spin")}
              />
              Refresh
            </button>
          ) : null}
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed">
          This is a public, read-only view of Student Atlas&apos;s content
          freshness pipeline. Every monitored source, detected change, AI draft,
          and human review is logged here — there is no hidden admin layer.
        </p>
        {lastFetchedAt ? (
          <p className="text-xs text-muted-foreground">
            Last updated {formatDateTime(lastFetchedAt.toISOString())}
            {isConfigured ? " · auto-refreshes every 60 seconds" : null}
          </p>
        ) : null}
      </header>

      {!isConfigured ? <SupabaseSetupBanner /> : null}

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          Failed to load monitoring data: {error}
        </div>
      ) : null}

      {isConfigured && !loading && !error ? (
        <>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Pipeline status</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <SummaryCard
                label="Sources monitored"
                value={summary.totalSources}
                hint={`${summary.activeSources} active`}
              />
              <SummaryCard
                label="Last crawl run"
                value={
                  summary.lastCrawlRun
                    ? formatDateTime(summary.lastCrawlRun)
                    : "Not yet run"
                }
                hint={
                  summary.sourcesNeverChecked > 0
                    ? `${summary.sourcesNeverChecked} awaiting first check`
                    : undefined
                }
              />
              <SummaryCard
                label="Open alerts"
                value={summary.openAlerts}
                hint="Pending, drafting, or in review"
              />
              <SummaryCard
                label="Published updates"
                value={summary.publishedUpdates}
                hint="Approved and published"
              />
            </div>
            {summary.lastCrawlRun === null && summary.totalSources > 0 ? (
              <p className="text-sm text-muted-foreground rounded-lg border bg-muted/40 p-4">
                Monitoring pipeline is initialised with{" "}
                {summary.totalSources} sources. First crawl pending — snapshot
                data will appear once the crawler runs.
              </p>
            ) : null}
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Monitored sources</h2>
            <SourcesTable sources={sources} />
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Change alerts</h2>
            <AlertsTimeline alerts={alerts} />
          </section>
        </>
      ) : null}

      {isConfigured && loading && !error ? (
        <p className="text-sm text-muted-foreground">Loading monitoring data…</p>
      ) : null}
    </div>
  );
}
