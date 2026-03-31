import { useMemo } from "react";
import { Link } from "react-router-dom";
import { usePreferences } from "@/context/PreferencesContext";
import { sectionRegistry } from "@/data/sections";
import { citations } from "@/data/citations";
import { mergeBlocks, mergeCrossCutting } from "@/data/merge-content";
import { CountryColumn } from "@/components/country-column";
import { ResolvedBlockRenderer } from "@/components/content-blocks";
import { cn } from "@/lib/utils";

const NATIONALITY_LABELS: Record<string, string> = {
  uae: "UAE",
  pakistan: "Pakistan",
  india: "India",
};

interface ContentPageProps {
  sectionSlug: string;
  subSectionSlug: string;
}

function CitationFootnotes({
  citationMap,
}: {
  citationMap: Map<string, number>;
}) {
  const entries = Array.from(citationMap.entries()).sort((a, b) => a[1] - b[1]);
  if (entries.length === 0) return null;

  return (
    <div className="mt-12 pt-6 border-t">
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
          Select your nationality and destination countries on the home page to
          see personalised content.
        </p>
        <Link
          to="/"
          className="text-primary hover:text-primary/80 underline"
        >
          Go to home page
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
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-2xl font-semibold tracking-tight">
          {subSection.title}
        </h1>
        <div className="max-w-3xl space-y-4">
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

  // Country-specific content
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-2xl font-semibold tracking-tight">
        {subSection.title}
      </h1>
      <div
        className={cn(
          "grid gap-8",
          destinations.length === 1 && "grid-cols-1 max-w-3xl",
          destinations.length === 2 && "grid-cols-1 md:grid-cols-2",
          destinations.length === 3 && "grid-cols-1 md:grid-cols-3"
        )}
      >
        {destinations.map((country) => {
          const countryData = subSection.countries.find(
            (c) => c.country === country
          );
          if (!countryData) return null;

          const countryOverlay = subSectionOverlay?.[country];
          const resolvedBlocks = mergeBlocks(
            countryData.blocks,
            countryOverlay,
            nationalityLabel
          );

          return (
            <CountryColumn
              key={country}
              country={country}
              blocks={resolvedBlocks}
              showHeader={destinations.length > 1}
              citationMap={citationMap}
            />
          );
        })}
      </div>
      <CitationFootnotes citationMap={citationMap} />
    </div>
  );
}
