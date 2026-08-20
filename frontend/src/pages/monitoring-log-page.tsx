import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import {
  FilterTabs,
  SummaryCard,
  formatDateTime,
} from "@/components/monitoring/shared";
import { useActivityData } from "@/hooks/useActivityData";
import { ACTIVITY_ROUTE } from "@/lib/routes";
import type {
  SourceCategory,
  SourceCountry,
  SourceStatus,
} from "@/types/monitoring";
import {
  CATEGORY_LABELS,
  UNHEALTHY_FAILURE_THRESHOLD,
} from "@/types/monitoring";

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

function truncateHash(hash: string | null): string {
  if (!hash) return "—";
  return `${hash.slice(0, 12)}…`;
}

function HealthCell({ source }: { source: SourceStatus }) {
  if (source.skipReason) {
    return (
      <span className="text-muted-foreground" title={source.skipReason}>
        Not monitorable
      </span>
    );
  }
  if (source.consecutiveFailures >= UNHEALTHY_FAILURE_THRESHOLD) {
    return (
      <span className="text-red-700" title={source.lastError ?? undefined}>
        Failing ({source.consecutiveFailures}×)
      </span>
    );
  }
  if (source.lastError) {
    return (
      <span className="text-amber-700" title={source.lastError}>
        Retrying
      </span>
    );
  }
  if (source.lastCheckedAt === null) {
    return <span className="text-muted-foreground">Awaiting first check</span>;
  }
  return <span className="text-green-700">OK</span>;
}

function SourcesTable({ sources }: { sources: SourceStatus[] }) {
  const [countryFilter, setCountryFilter] = useState<SourceCountry | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<SourceCategory | "all">("all");

  const filtered = useMemo(
    () =>
      sources.filter((s) => {
        if (countryFilter !== "all" && s.country !== countryFilter) return false;
        if (categoryFilter !== "all" && s.category !== categoryFilter)
          return false;
        return true;
      }),
    [sources, countryFilter, categoryFilter]
  );

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
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-3 py-2 font-medium">Country</th>
              <th className="px-3 py-2 font-medium">Category</th>
              <th className="px-3 py-2 font-medium">Source</th>
              <th className="px-3 py-2 font-medium">Health</th>
              <th className="px-3 py-2 font-medium">Last checked</th>
              <th className="px-3 py-2 font-medium">Last changed</th>
              <th className="px-3 py-2 font-medium">Content hash</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.sourceId} className="border-b last:border-0">
                <td className="px-3 py-2.5 font-medium">{s.country}</td>
                <td className="px-3 py-2.5 text-muted-foreground">
                  {CATEGORY_LABELS[s.category]}
                </td>
                <td className="max-w-xs px-3 py-2.5">
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
                <td className="whitespace-nowrap px-3 py-2.5">
                  <HealthCell source={s} />
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 text-muted-foreground">
                  {formatDateTime(s.lastCheckedAt)}
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 text-muted-foreground">
                  {formatDateTime(s.lastChangedAt)}
                </td>
                <td className="px-3 py-2.5 font-mono text-xs text-muted-foreground">
                  {truncateHash(s.lastHash)}
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

export function MonitoringLogPage() {
  const { sources, summary, generatedAt } = useActivityData();

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-6 py-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Monitoring log</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          This is the public, read-only health view of Student Atlas&apos;s
          content-freshness pipeline: every monitored source, when it was last
          checked, and whether it can be checked at all. Detected changes, AI
          drafts, and review outcomes live in the{" "}
          <Link
            to={ACTIVITY_ROUTE.path}
            className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
          >
            Activity feed
          </Link>
          .
        </p>
        {generatedAt ? (
          <p className="text-xs text-muted-foreground">
            Last monitor run {formatDateTime(generatedAt)}
          </p>
        ) : null}
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Pipeline status</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard label="Sources monitored" value={summary.totalSources} />
          <SummaryCard
            label="Last monitor run"
            value={generatedAt ? formatDateTime(generatedAt) : "Not yet run"}
            hint={
              summary.sourcesNeverChecked > 0
                ? `${summary.sourcesNeverChecked} awaiting first check`
                : undefined
            }
          />
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
        </div>
        {generatedAt === null && summary.totalSources > 0 ? (
          <p className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
            Monitoring pipeline is initialised with {summary.totalSources}{" "}
            sources. First run pending — health data will appear once the
            scheduled monitor has run.
          </p>
        ) : null}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Monitored sources</h2>
        <SourcesTable sources={sources} />
      </section>
    </div>
  );
}
