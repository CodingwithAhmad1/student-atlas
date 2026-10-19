import { useState } from "react";
import { SetupRequired } from "@/components/setup-required";
import { usePreferences } from "@/context/preferences";
import { Button } from "@/components/ui/button";
import {
  DestinationsPreferenceControl,
  NationalityPreferenceControl,
} from "@/components/preference-controls";
import {
  PlaneIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  HomeIcon,
  CheckIcon,
  FileTextIcon,
  LoaderIcon,
  AlertCircleIcon,
  type LucideIcon,
} from "lucide-react";
import { REPORT_SECTIONS, type ReportSection } from "@/lib/report-sections";

const SECTION_ICONS: Record<ReportSection["slug"], LucideIcon> = {
  visit: PlaneIcon,
  student: GraduationCapIcon,
  work: BriefcaseIcon,
  residency: HomeIcon,
};

export function ReportPage() {
  const { preferences, isConfigured, nationalityUnsupported } = usePreferences();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (slug: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const allSelected = selected.size === REPORT_SECTIONS.length;
  const toggleAll = () =>
    setSelected(allSelected ? new Set() : new Set(REPORT_SECTIONS.map((s) => s.slug)));

  const canGenerate = isConfigured && selected.size > 0;

  const handleGenerate = async () => {
    if (!canGenerate || !preferences.nationality) return;
    setGenerating(true);
    setError(null);
    // Small delay so the UI updates before the PDF work
    await new Promise((r) => setTimeout(r, 50));
    try {
      // jsPDF is large; load it only when a report is requested.
      const { generateReport } = await import("@/lib/pdf");
      await generateReport({
        nationality: preferences.nationality,
        destinations: preferences.destinations,
        sections: REPORT_SECTIONS.filter((s) => selected.has(s.slug)).map(
          (s) => s.slug
        ),
      });
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Something went wrong generating the report."
      );
    } finally {
      setGenerating(false);
    }
  };

  if (!isConfigured) {
    return (
      <SetupRequired>
        To generate a report, select your nationality and at least one
        destination country.
      </SetupRequired>
    );
  }

  return (
    <div className="mx-auto max-w-2xl py-8 px-4 w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Generate Report</h1>
        <p className="mt-1 text-muted-foreground">
          Create a PDF report tailored to your selections.
        </p>
      </div>

      {/* Preferences summary — same edit UX as dashboard, stacked rows */}
      <div className="mb-8 rounded-lg border bg-card p-4 space-y-4">
        <NationalityPreferenceControl layout="stacked" />
        <DestinationsPreferenceControl layout="stacked" />
      </div>

      {nationalityUnsupported && (
        <p className="mb-8 rounded-md border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
          We don't have nationality-specific guidance for {preferences.nationality} yet, so the
          report will show the general rules only.
        </p>
      )}

      {/* Section selector */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Select sections to include
          </h2>
          <Button variant="ghost" size="sm" onClick={toggleAll}>
            {allSelected ? "Clear all" : "Select all"}
          </Button>
        </div>
        <div className="grid gap-3">
          {REPORT_SECTIONS.map((section) => {
            const isSelected = selected.has(section.slug);
            const Icon = SECTION_ICONS[section.slug];
            return (
              <button
                key={section.slug}
                aria-pressed={isSelected}
                onClick={() => toggle(section.slug)}
                className={`
                  flex items-center gap-4 rounded-lg border p-4 text-left transition-all cursor-pointer
                  ${
                    isSelected
                      ? "border-primary bg-primary/[0.04] ring-1 ring-primary/20"
                      : "border-border hover:border-primary/30 hover:bg-accent/50"
                  }
                `}
              >
                <div
                  className={`
                    flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors
                    ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{section.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {section.summary}
                  </div>
                </div>
                <div
                  className={`
                    flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all
                    ${
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30"
                    }
                  `}
                >
                  {isSelected && <CheckIcon className="h-3.5 w-3.5" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Generate button */}
      <Button
        size="lg"
        className="w-full"
        disabled={!canGenerate || generating}
        onClick={handleGenerate}
      >
        {generating ? (
          <>
            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <FileTextIcon className="mr-2 h-4 w-4" />
            Generate Report
            {selected.size > 0 && (
              <span className="ml-1.5 text-xs opacity-70">
                ({selected.size} {selected.size === 1 ? "section" : "sections"})
              </span>
            )}
          </>
        )}
      </Button>

      {error && (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!canGenerate && selected.size === 0 && (
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Select at least one section to enable report generation.
        </p>
      )}
    </div>
  );
}
