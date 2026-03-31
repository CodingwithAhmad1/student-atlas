import { Button } from "@/components/ui/button";
import type { Country } from "@/data/types";
import { COUNTRY_LABELS } from "@/data/types";

interface DestinationTogglesProps {
  selected: Country[];
  onToggle: (country: Country) => void;
}

const allCountries: Country[] = ["US", "UK", "AU"];

export function DestinationToggles({ selected, onToggle }: DestinationTogglesProps) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground mb-1.5 block">
        Where are you considering studying?
      </label>
      <div className="flex gap-3">
        {allCountries.map((country) => {
          const isSelected = selected.includes(country);
          return (
            <Button
              key={country}
              variant={isSelected ? "default" : "outline"}
              onClick={() => onToggle(country)}
              className="flex-1"
            >
              {COUNTRY_LABELS[country]}
            </Button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        You can compare countries side by side once selected.
      </p>
    </div>
  );
}
