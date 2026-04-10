import { useState } from "react";
import { usePreferences } from "@/context/PreferencesContext";
import { COUNTRY_LABELS } from "@/data/types";
import { Button } from "@/components/ui/button";
import { generateReport } from "@/lib/generate-pdf";
import {
  PlaneIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  HomeIcon,
  CheckIcon,
  FileTextIcon,
  LoaderIcon,
} from "lucide-react";

const SECTIONS = [
  {
    slug: "visit",
    title: "Tourist Visa",
    description: "Entry requirements and short-stay applications",
    icon: PlaneIcon,
  },
  {
    slug: "student",
    title: "Student Visa",
    description: "Application process, documents, and after arrival",
    icon: GraduationCapIcon,
  },
  {
    slug: "work",
    title: "Work Visa",
    description: "Post-study work rights and employer sponsorship",
    icon: BriefcaseIcon,
  },
  {
    slug: "residency",
    title: "Residency Pathway",
    description: "Permanent residency, citizenship, and dual nationality",
    icon: HomeIcon,
  },
] as const;

export function ReportPage() {
  const { preferences, isConfigured } = usePreferences();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [generating, setGenerating] = useState(false);

  const toggle = (slug: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const canGenerate = isConfigured && selected.size > 0;

  const handleGenerate = async () => {
    if (!canGenerate || !preferences.nationality) return;
    setGenerating(true);
    // Small delay so the UI updates before the sync PDF work
    await new Promise((r) => setTimeout(r, 50));
    try {
      generateReport({
        nationality: preferences.nationality,
        destinations: preferences.destinations,
        sections: SECTIONS.filter((s) => selected.has(s.slug)).map(
          (s) => s.slug
        ),
      });
    } finally {
      setGenerating(false);
    }
  };

  const destinationList = preferences.destinations
    .map((c) => COUNTRY_LABELS[c])
    .join(", ")
    .replace(/, ([^,]*)$/, " and $1");

  if (!isConfigured) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="rounded-full bg-muted p-4">
          <FileTextIcon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">Set up your preferences first</h2>
        <p className="max-w-md text-muted-foreground">
          To generate a report, select your nationality and at least one
          destination country from the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Generate Report</h1>
        <p className="mt-1 text-muted-foreground">
          Create a PDF report tailored to your selections.
        </p>
      </div>

      {/* Preferences summary */}
      <div className="mb-8 rounded-lg border bg-card p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground w-28">
            Nationality
          </span>
          <span className="text-sm font-semibold">
            {preferences.nationality}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground w-28">
            Destinations
          </span>
          <span className="text-sm font-semibold">{destinationList}</span>
        </div>
      </div>

      {/* Section selector */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Select sections to include
        </h2>
        <div className="grid gap-3">
          {SECTIONS.map((section) => {
            const isSelected = selected.has(section.slug);
            const Icon = section.icon;
            return (
              <button
                key={section.slug}
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
                    {section.description}
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

      {!canGenerate && selected.size === 0 && (
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Select at least one section to enable report generation.
        </p>
      )}
    </div>
  );
}
