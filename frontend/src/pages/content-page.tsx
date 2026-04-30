import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { usePreferences } from "@/context/PreferencesContext";
import { DASHBOARD_ROUTE } from "@/lib/routes";
import { isCountryCompareRoute } from "@/lib/compare-routes";
import { sectionRegistry } from "@/data/sections";
import { citations } from "@/data/citations";
import { mergeBlocks, mergeCrossCutting } from "@/data/merge-content";
import { COUNTRY_LABELS } from "@/data/types";
import { visaFacts } from "@/data/visa-facts";
import { CountryColumn } from "@/components/country-column";
import { TLDRCard } from "@/components/tldr-card";
import { ComparisonTable } from "@/components/comparison-table";
import { ContentBlockRenderer, ResolvedBlockRenderer } from "@/components/content-blocks";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

/** Matches Sources pill — compact meta controls under the title */
const META_PILL_CLASS =
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors";

const NATIONALITY_LABELS: Record<string, string> = {
  uae: "UAE",
  pakistan: "Pakistan",
  india: "India",
};

interface ContentPageProps {
  sectionSlug: string;
  subSectionSlug: string;
}

function SourcesPill({
  citationMap,
}: {
  citationMap: Map<string, number>;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Read the map size after the render pass has populated it
    setCount(citationMap.size);
  });

  if (count === 0) return null;

  return (
    <button
      type="button"
      onClick={() =>
        document
          .getElementById("sources-footer")
          ?.scrollIntoView({ behavior: "smooth" })
      }
      className={META_PILL_CLASS}
    >
      {count} {count === 1 ? "source" : "sources"} ↓
    </button>
  );
}

function CitationFootnotes({
  citationMap,
}: {
  citationMap: Map<string, number>;
}) {
  const entries = Array.from(citationMap.entries()).sort((a, b) => a[1] - b[1]);
  if (entries.length === 0) return null;

  return (
    <div id="sources-footer" className="mt-12 pt-6 border-t">
      <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
        Sources
      </h3>
      <ol className="space-y-1 text-sm text-muted-foreground">
        {entries.map(([id, num]) => {
          const cite = citations[id];
          return (
            <li key={id} className="flex gap-2">
              <span className="font-mono text-xs mt-0.5">[{num}]</span>
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

export function ContentPage({ sectionSlug, subSectionSlug }: ContentPageProps) {
  const { preferences, nationalityOverlay, nationalitySlug, isConfigured } =
    usePreferences();

  const [viewMode, setViewMode] = useState<"single" | "compare">("single");

  useEffect(() => {
    if (!isCountryCompareRoute(sectionSlug, subSectionSlug)) {
      setViewMode("single");
    }
  }, [sectionSlug, subSectionSlug]);

  // Mutable map that collects citations during render — reset on each render
  const citationMap = useMemo(
    () => new Map<string, number>(),
    [sectionSlug, subSectionSlug]
  );
  // Clear on each render cycle
  citationMap.clear();

  const nationalityLabel = nationalitySlug
    ? NATIONALITY_LABELS[nationalitySlug] ??
      nationalitySlug.charAt(0).toUpperCase() + nationalitySlug.slice(1)
    : undefined;

  if (!isConfigured) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <h2 className="text-xl font-semibold">Set up your preferences first</h2>
        <p className="text-muted-foreground max-w-md">
          Select your nationality and destination countries on the {DASHBOARD_ROUTE.label} page to
          see personalised content.
        </p>
        <Link
          to={DASHBOARD_ROUTE.path}
          className="text-primary hover:text-primary/80 underline"
        >
          Go to {DASHBOARD_ROUTE.label}
        </Link>
      </div>
    );
  }

  const section = sectionRegistry.get(sectionSlug);
  if (!section) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-2xl font-semibold tracking-tight">
          Page not found
        </h1>
      </div>
    );
  }

  const subSection = section.subSections.find((s) => s.slug === subSectionSlug);
  if (!subSection) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-2xl font-semibold tracking-tight">
          Section not found
        </h1>
      </div>
    );
  }

  const { destinations } = preferences;

  // Look up the overlay for this section + subsection
  const subSectionOverlay =
    nationalityOverlay?.[sectionSlug]?.[subSectionSlug];

  // Cross-cutting content (e.g. Dual nationality)
  if (subSection.crossCutting && subSection.crossCutting.length > 0) {
    const crossCuttingCallouts =
      subSectionOverlay?._crossCutting?.callouts;

    const resolvedBlocks = mergeCrossCutting(
      subSection.crossCutting,
      crossCuttingCallouts,
      nationalityLabel
    );

    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-semibold tracking-tight">
          {subSection.title}
        </h1>
        <SourcesPill citationMap={citationMap} />
        <div className="space-y-4">
          {resolvedBlocks.map((resolved, i) => (
            <ResolvedBlockRenderer
              key={i}
              resolved={resolved}
              citationMap={citationMap}
            />
          ))}
        </div>
        <CitationFootnotes citationMap={citationMap} />
      </div>
    );
  }

  const sectionFacts = visaFacts[sectionSlug]?.[subSectionSlug];
  const canCompare = destinations.length >= 2;
  const showCountryCompare =
    canCompare && isCountryCompareRoute(sectionSlug, subSectionSlug);

  const isSingle = destinations.length === 1;

  // Country-specific content
  const compareExpanded = viewMode === "compare";

  return (
    <div className={cn(
      "flex flex-1 flex-col gap-4 p-4 pt-0",
      isSingle && "max-w-4xl mx-auto w-full"
    )}>
      <h1 className="text-2xl font-semibold tracking-tight">
        {subSection.title}
      </h1>

      <div className="flex flex-row flex-wrap items-center gap-2">
        {showCountryCompare && (
          <button
            type="button"
            onClick={() =>
              setViewMode((m) => (m === "single" ? "compare" : "single"))
            }
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
        <SourcesPill citationMap={citationMap} />
      </div>

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
              <ComparisonTable countries={destinations} facts={sectionFacts} />
            </div>
          </div>
        </div>
      )}

      <div
        className={cn(
          "grid gap-8",
          destinations.length === 1 && "grid-cols-1",
          destinations.length === 2 && "grid-cols-1 md:grid-cols-2",
          destinations.length === 3 && "grid-cols-1 md:grid-cols-3"
        )}
      >
        {destinations.map((country, index) => {
          const countryData = subSection.countries.find(
            (c) => c.country === country
          );
          if (!countryData) return null;

          const countryOverlay = subSectionOverlay?.[country];
          const allBlocks = mergeBlocks(
            countryData.blocks,
            countryOverlay,
            nationalityLabel
          );

          // Partition: callouts go to top, everything else to body
          const topCallouts = allBlocks.filter((b) => b.isCallout);
          const bodyBlocks = allBlocks.filter((b) => !b.isCallout);

          const facts = sectionFacts?.[country];

          return (
            <div
              key={country}
              className={cn(
                "space-y-4",
                index > 0 && destinations.length > 1 && "md:border-l md:border-border md:pl-8",
                index === destinations.length - 1 && destinations.length === 2 && "md:border-r md:border-border md:pr-8"
              )}
            >
              <div className="rounded-lg border border-border bg-muted/50 px-4 py-3">
                <h2 className="text-xl font-bold tracking-tight">
                  {COUNTRY_LABELS[country]}
                </h2>
              </div>
              {topCallouts.length > 0 && (
                <aside className="border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-950/20 p-4 rounded-r-lg">
                  <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1 uppercase tracking-wide">
                    For {nationalityLabel ?? "your nationality"} applicants
                  </p>
                  <div className="text-sm text-amber-900 dark:text-amber-200 leading-6 space-y-2">
                    {topCallouts.map((c, ci) => (
                      <ContentBlockRenderer
                        key={ci}
                        block={c.block}
                        citationMap={citationMap}
                      />
                    ))}
                  </div>
                </aside>
              )}
              {facts && <TLDRCard facts={facts} />}
              <CountryColumn
                country={country}
                blocks={bodyBlocks}
                citationMap={citationMap}
                sessionKey={`sa:seen:${sectionSlug}/${subSectionSlug}/${country}`}
              />
            </div>
          );
        })}
      </div>
      <CitationFootnotes citationMap={citationMap} />
    </div>
  );
}
