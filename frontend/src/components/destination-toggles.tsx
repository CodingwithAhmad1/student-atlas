import type { Country } from "@/data/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface DestinationTogglesProps {
  selected: Country[];
  onToggle: (country: Country) => void;
}

const DESTINATIONS: { code: Country; label: string; flag: string }[] = [
  { code: "US", label: "United States", flag: "🇺🇸" },
  { code: "UK", label: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", label: "Australia", flag: "🇦🇺" },
];

export function DestinationToggles({ selected, onToggle }: DestinationTogglesProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {DESTINATIONS.map(({ code, label, flag }) => {
        const isSelected = selected.includes(code);
        return (
          <button
            key={code}
            type="button"
            onClick={() => onToggle(code)}
            className={cn(
              "relative flex flex-col items-center gap-2 rounded-lg border-2 px-3 py-4 text-sm transition-all cursor-pointer",
              "hover:border-foreground/20 hover:bg-accent/50",
              isSelected
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border bg-card"
            )}
          >
            {isSelected && (
              <span className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-3" />
              </span>
            )}
            <span className="text-2xl">{flag}</span>
            <span className={cn(
              "font-medium leading-tight text-center",
              isSelected ? "text-foreground" : "text-muted-foreground"
            )}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
