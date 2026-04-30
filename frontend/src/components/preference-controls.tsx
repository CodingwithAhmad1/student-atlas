import { useState } from "react";
import { Pencil } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { COUNTRY_LABELS, type Country } from "@/data/types";
import { NationalityDropdown } from "./nationality-dropdown";
import { cn } from "@/lib/utils";

const COUNTRY_FLAGS: Record<string, string> = {
  US: "🇺🇸",
  UK: "🇬🇧",
  AU: "🇦🇺",
};

const ALL_DESTINATIONS: Country[] = ["US", "UK", "AU"];

export type PreferenceControlLayout = "bar" | "stacked";

interface NationalityPreferenceControlProps {
  layout: PreferenceControlLayout;
}

export function NationalityPreferenceControl({
  layout,
}: NationalityPreferenceControlProps) {
  const { preferences, setNationality } = usePreferences();
  const [editingNationality, setEditingNationality] = useState(false);

  const labelClass =
    layout === "bar"
      ? "text-xs font-medium uppercase tracking-wide text-muted-foreground shrink-0"
      : "text-sm font-medium text-muted-foreground w-28 shrink-0";

  const rowClass =
    layout === "bar"
      ? "flex items-center gap-2 min-w-0"
      : "flex flex-wrap items-center gap-2";

  const valueWrapperClass =
    layout === "stacked" ? "min-w-0 flex-1" : "contents";

  return (
    <div className={rowClass}>
      <span className={labelClass}>Nationality</span>
      <div className={valueWrapperClass}>
        {editingNationality ? (
          <div className="w-48 min-w-[12rem] max-w-full">
            <NationalityDropdown
              value={preferences.nationality}
              onChange={(val) => {
                setNationality(val);
                setEditingNationality(false);
              }}
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditingNationality(true)}
            className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-sm font-medium transition-colors hover:bg-secondary/80 cursor-pointer"
          >
            {preferences.nationality}
            <Pencil className="size-3 text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );
}

interface DestinationsPreferenceControlProps {
  layout: PreferenceControlLayout;
}

export function DestinationsPreferenceControl({
  layout,
}: DestinationsPreferenceControlProps) {
  const { preferences, toggleDestination } = usePreferences();
  const [editingDestinations, setEditingDestinations] = useState(false);

  const labelClass =
    layout === "bar"
      ? "text-xs font-medium uppercase tracking-wide text-muted-foreground shrink-0"
      : "text-sm font-medium text-muted-foreground w-28 shrink-0";

  const labelText = layout === "bar" ? "Studying in" : "Destinations";

  const rowClass =
    layout === "bar"
      ? "flex items-center gap-2 min-w-0"
      : "flex flex-wrap items-start gap-2";

  const valueWrapClass =
    layout === "bar"
      ? "flex items-center gap-1.5 min-w-0"
      : "flex flex-1 min-w-0 flex-wrap items-center gap-1.5";

  return (
    <div className={rowClass}>
      <span className={labelClass}>{labelText}</span>
      {editingDestinations ? (
        <div className={valueWrapClass}>
          {ALL_DESTINATIONS.map((c) => {
            const isSelected = preferences.destinations.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleDestination(c)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-sm font-medium transition-colors cursor-pointer",
                  isSelected
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-transparent bg-secondary/50 text-muted-foreground hover:bg-secondary"
                )}
              >
                <span className="text-xs">{COUNTRY_FLAGS[c]}</span>
                {COUNTRY_LABELS[c]}
              </button>
            );
          })}
          <button
            type="button"
            disabled={preferences.destinations.length === 0}
            onClick={() => setEditingDestinations(false)}
            className={cn(
              "ml-1 text-xs font-medium transition-colors",
              preferences.destinations.length === 0
                ? "text-muted-foreground/40 cursor-not-allowed"
                : "text-muted-foreground hover:text-foreground cursor-pointer"
            )}
          >
            Done
          </button>
        </div>
      ) : (
        <div className={valueWrapClass}>
          {preferences.destinations.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-sm font-medium"
            >
              <span className="text-xs">{COUNTRY_FLAGS[c]}</span>
              {COUNTRY_LABELS[c]}
            </span>
          ))}
          <button
            type="button"
            onClick={() => setEditingDestinations(true)}
            className="inline-flex items-center justify-center size-7 rounded-md transition-colors hover:bg-accent cursor-pointer shrink-0"
          >
            <Pencil className="size-3 text-muted-foreground" />
          </button>
        </div>
      )}
    </div>
  );
}
