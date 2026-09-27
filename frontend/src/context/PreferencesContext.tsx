import { useEffect, useState, type ReactNode } from "react";
import { COUNTRY_LABELS, type Country } from "@/data/types";
import { useNationalityOverlay } from "@/hooks/useNationalityOverlay";
import { readStorage, removeStorage, writeStorage } from "@/lib/storage";
import { PreferencesContext, type Preferences } from "./preferences";

const STORAGE_KEY = "student-atlas-preferences";
const SETUP_DONE_KEY = "student-atlas-setup-done";

const defaultPreferences: Preferences = {
  nationality: null,
  destinations: [],
};

function isCountry(value: unknown): value is Country {
  return typeof value === "string" && value in COUNTRY_LABELS;
}

function loadPreferences(): Preferences {
  try {
    const parsed = JSON.parse(readStorage(STORAGE_KEY) ?? "null");
    if (parsed && typeof parsed === "object") {
      return {
        nationality: typeof parsed.nationality === "string" ? parsed.nationality : null,
        destinations: Array.isArray(parsed.destinations)
          ? [...new Set<Country>(parsed.destinations.filter(isCountry))]
          : [],
      };
    }
  } catch {
    // Corrupt stored value — start fresh.
  }
  return defaultPreferences;
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(loadPreferences);
  const [setupDone, setSetupDone] = useState(() => readStorage(SETUP_DONE_KEY) === "true");

  const overlayState = useNationalityOverlay(preferences.nationality);

  useEffect(() => {
    writeStorage(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    if (setupDone) writeStorage(SETUP_DONE_KEY, "true");
  }, [setupDone]);

  const setNationality = (nationality: string) => {
    setPreferences((prev) => ({ ...prev, nationality }));
  };

  const toggleDestination = (country: Country) => {
    setPreferences((prev) => {
      const next = prev.destinations.includes(country)
        ? prev.destinations.filter((c) => c !== country)
        : [...prev.destinations, country];
      return { ...prev, destinations: next };
    });
  };

  const setDestinations = (destinations: Country[]) => {
    setPreferences((prev) => ({ ...prev, destinations }));
    if (destinations.length > 0) setSetupDone(true);
  };

  const reset = () => {
    setPreferences(defaultPreferences);
    setSetupDone(false);
    removeStorage(SETUP_DONE_KEY);
  };

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        setNationality,
        setDestinations,
        toggleDestination,
        isConfigured:
          setupDone &&
          preferences.nationality !== null &&
          preferences.destinations.length > 0,
        nationalityOverlay: overlayState.overlay,
        nationalitySlug: overlayState.nationalitySlug,
        nationalityLabel: overlayState.nationalityLabel,
        overlayLoading: overlayState.isLoading,
        overlayError: overlayState.error,
        reset,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
