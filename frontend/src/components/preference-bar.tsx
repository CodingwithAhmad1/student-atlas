import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePreferences } from "@/context/PreferencesContext";
import { COUNTRY_LABELS } from "@/data/types";
import { NationalityDropdown } from "./nationality-dropdown";
import { DestinationToggles } from "./destination-toggles";

export function PreferenceBar() {
  const { preferences, setNationality, toggleDestination } = usePreferences();
  const [editingNationality, setEditingNationality] = useState(false);
  const [editingDestinations, setEditingDestinations] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-muted/50 p-4">
      {/* Nationality chip */}
      <div className="flex items-center gap-2">
        {editingNationality ? (
          <div className="w-64">
            <NationalityDropdown
              value={preferences.nationality}
              onChange={(val) => {
                setNationality(val);
                setEditingNationality(false);
              }}
            />
          </div>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            className="gap-1.5"
            onClick={() => setEditingNationality(true)}
          >
            {preferences.nationality}
            <Pencil className="h-3 w-3" />
          </Button>
        )}
      </div>

      <span className="text-muted-foreground text-sm">·</span>

      {/* Destination chips */}
      <div className="flex items-center gap-2">
        {editingDestinations ? (
          <div className="flex items-center gap-2">
            <DestinationToggles
              selected={preferences.destinations}
              onToggle={toggleDestination}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditingDestinations(false)}
            >
              Done
            </Button>
          </div>
        ) : (
          <>
            {preferences.destinations.map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-sm font-medium"
              >
                {COUNTRY_LABELS[c]}
              </span>
            ))}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setEditingDestinations(true)}
            >
              <Pencil className="h-3 w-3" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
