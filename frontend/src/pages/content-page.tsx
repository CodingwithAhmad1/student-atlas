import { useMemo, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { ComparisonTable } from "@/components/comparison-table";
import { ContentBlockRenderer } from "@/components/content-blocks";
import { CountryColumn } from "@/components/country-column";
import { NationalityCallout } from "@/components/nationality-callout";
import { SetupRequired } from "@/components/setup-required";
import { TLDRCard } from "@/components/tldr-card";
import { usePreferences } from "@/context/preferences";
import { citations } from "@/data/citations";
import { mergeBlocks, mergeCrossCutting, splitCallouts } from "@/data/merge-content";
import { sectionRegistry } from "@/data/sections";
import { COUNTRY_LABELS, type ContentBlock } from "@/data/types";
import { visaFacts } from "@/data/visa-facts";
import { isCountryCompareRoute } from "@/lib/compare-routes";
import { collectCitations } from "@/lib/inline-markup";
import { DASHBOARD_ROUTE } from "@/lib/routes";
import { cn } from "@/lib/utils";

/** Compact meta controls under the title */
const META_PILL_CLASS =
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors";

interface ContentPageProps {
  sectionSlug: string;
  subSectionSlug: string;
}

function SourcesPill({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <button
      type="button"
      onClick={() =>
        document.getElementById("sources-footer")?.scrollIntoView({ behavior: "smooth" })
      }
      className={META_PILL_CLASS}
    >
      {count} {count === 1 ? "source" : "sources"} ↓
    </button>
  );
}

function CitationFootnotes({ ids }: { ids: string[] }) {
  if (ids.length === 0) return null;
  return (
    <div id="sources-footer" className="mt-12 pt-6 border-t">
      <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
        Sources
      </h3>
      <ol className="space-y-1 text-sm text-muted-foreground">
        {ids.map((id, i) => {
          const cite = citations[id];
          return (
            <li key={id} className="flex gap-2">
              <span className="font-mono text-xs mt-0.5">[{i + 1}]</span>
              {cite ? (
                <a
                  href={cite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline decoration-dotted"
                >
                  {cite.label}
                </a>
              ) : (
                <span>Unknown source: {id}</span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function NotFound({ what }: { what: string }) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-2xl font-semibold tracking-tight">{what} not found</h1>
    </div>
  );
}

export function ContentPage({ sectionSlug, subSectionSlug }: ContentPageProps) {
  const {
    preferences,
    nationalityOverlay,
    nationalityLabel,
    overlayError,
    nationalityUnsupported,
    isConfigured,
  } = usePreferences();
  const { destinations } = preferences;

  // Quick compare is open per page; navigating elsewhere closes it.
  const pageKey = `${sectionSlug}/${subSectionSlug}`;
  const [compareOpenOn, setCompareOpenOn] = useState<string | null>(null);
  const compareExpanded = compareOpenOn === pageKey;

  const subSection = sectionRegistry
    .get(sectionSlug)
    ?.subSections.find((s) => s.slug === subSectionSlug);
  const subSectionOverlay = nationalityOverlay?.[sectionSlug]?.[subSectionSlug];
  const label = nationalityLabel ?? undefined;

  // Resolve every block the page shows up front, so the Sources list covers
  // content inside collapsed panels too.
  const resolved = useMemo(() => {
    if (!subSection) return null;
    if (subSection.crossCutting?.length) {
      const blocks = mergeCrossCutting(
        subSection.crossCutting,
        subSectionOverlay?._crossCutting?.callouts,
        label
      );
      return { crossCutting: splitCallouts(blocks), columns: [] };
    }
    const columns = destinations.flatMap((country) => {
      const countryData = subSection.countries.find((c) => c.country === country);
      if (!countryData) return [];
      const overlay = subSectionOverlay?.[country];
      return [{
        country,
        // A nationality profile (e.g. visa-free travel, home country) replaces
        // the standard route, so the standard route's TL;DR facts don't apply.
        usesProfile: Boolean(overlay?.profile),
        ...splitCallouts(mergeBlocks(countryData.blocks, overlay, label)),
      }];
    });
    return { crossCutting: null, columns };
  }, [subSection, subSectionOverlay, destinations, label]);

  const citationIds = useMemo(() => {
    if (!resolved) return [];
    const blocks: ContentBlock[] = [];
    for (const part of resolved.crossCutting ? [resolved.crossCutting] : resolved.columns) {
      blocks.push(...part.callouts.map((c) => c.block), ...part.body.map((b) => b.block));
    }
    return collectCitations(blocks);
  }, [resolved]);

  if (!isConfigured) {
    return (
      <SetupRequired>
        Select your nationality and destination countries on the {DASHBOARD_ROUTE.label} page to
        see personalised content.
      </SetupRequired>
    );
  }
  if (!sectionRegistry.has(sectionSlug)) return <NotFound what="Page" />;
  if (!subSection || !resolved) return <NotFound what="Section" />;

  const loadWarning = overlayError ? (
    <p className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
      Nationality-specific notes couldn't be loaded, so this page shows the general
      guidance only. Reload the page to try again.
    </p>
  ) : nationalityUnsupported ? (
    <p className="rounded-md border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
      We don't have nationality-specific guidance for {preferences.nationality} yet, so this
      page shows the general rules only. Whether you need a visa, and which evidence you must
      provide, can differ by nationality — check the official sources cited below.
    </p>
  ) : null;

  if (resolved.crossCutting) {
    const { callouts, body } = resolved.crossCutting;
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-semibold tracking-tight">{subSection.title}</h1>
        <SourcesPill count={citationIds.length} />
        {loadWarning}
        <NationalityCallout label={nationalityLabel} blocks={callouts} />
        <div className="space-y-4">
          {body.map((b, i) => (
            <ContentBlockRenderer key={i} block={b.block} />
          ))}
        </div>
        <CitationFootnotes ids={citationIds} />
      </div>
    );
  }

  const sectionFacts = visaFacts[sectionSlug]?.[subSectionSlug];
  const applicableFacts = sectionFacts
    ? Object.fromEntries(
        resolved.columns
          .filter((c) => !c.usesProfile && sectionFacts[c.country])
          .map((c) => [c.country, sectionFacts[c.country]])
      )
    : undefined;
  const showCountryCompare =
    destinations.length >= 2 &&
    isCountryCompareRoute(sectionSlug, subSectionSlug) &&
    Object.keys(applicableFacts ?? {}).length > 0;
  const isSingle = destinations.length === 1;

  return (
    <div className={cn("flex flex-1 flex-col gap-4 p-4 pt-0", isSingle && "max-w-4xl mx-auto w-full")}>
      <h1 className="text-2xl font-semibold tracking-tight">{subSection.title}</h1>

      <div className="flex flex-row flex-wrap items-center gap-2">
        {showCountryCompare && (
          <button
            type="button"
            onClick={() => setCompareOpenOn(compareExpanded ? null : pageKey)}
            aria-expanded={compareExpanded}
            aria-controls="quick-compare-panel"
            id="quick-compare-trigger"
            className={cn(META_PILL_CLASS, "gap-1.5")}
          >
            Quick compare
            <ChevronDownIcon
              className={cn(
                "size-3.5 shrink-0 transition-transform duration-300 ease-out",
                compareExpanded && "rotate-180"
              )}
              aria-hidden
            />
          </button>
        )}
        <SourcesPill count={citationIds.length} />
      </div>
      {loadWarning}

      {showCountryCompare && (
        <div
          id="quick-compare-panel"
          role="region"
          aria-labelledby="quick-compare-trigger"
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-out",
            compareExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden min-h-0">
            <div className={cn(compareExpanded && "pb-1 pt-1")}>
              <ComparisonTable countries={destinations} facts={applicableFacts} />
            </div>
          </div>
        </div>
      )}

      <div
        className={cn(
          "grid gap-8",
          destinations.length === 1 && "grid-cols-1",
          // Side-by-side only once each column has room next to the sidebar.
          destinations.length === 2 && "grid-cols-1 lg:grid-cols-2",
          destinations.length === 3 && "grid-cols-1 xl:grid-cols-3"
        )}
      >
        {resolved.columns.map(({ country, callouts, body }, index) => {
          const facts = applicableFacts?.[country];
          return (
            <div
              key={country}
              className={cn(
                "min-w-0 space-y-4",
                index > 0 && destinations.length === 2 && "lg:border-l lg:border-border lg:pl-8",
                index > 0 && destinations.length === 3 && "xl:border-l xl:border-border xl:pl-8",
                index === destinations.length - 1 && destinations.length === 2 && "lg:border-r lg:border-border lg:pr-8"
              )}
            >
              <div className="rounded-lg border border-border bg-muted/50 px-4 py-3">
                <h2 className="text-xl font-bold tracking-tight">{COUNTRY_LABELS[country]}</h2>
              </div>
              <NationalityCallout label={nationalityLabel} blocks={callouts} />
              {facts && <TLDRCard facts={facts} />}
              <CountryColumn
                country={country}
                blocks={body}
                sessionKey={`sa:seen:${sectionSlug}/${subSectionSlug}/${country}`}
              />
            </div>
          );
        })}
      </div>
      <CitationFootnotes ids={citationIds} />
    </div>
  );
}
