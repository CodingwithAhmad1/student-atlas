import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Country, NationalityOverlay } from "@/data/types";
import { useNationalityOverlay } from "@/hooks/useNationalityOverlay";

interface Preferences {
  nationality: string | null;
  destinations: Country[];
}

interface PreferencesContextValue {
  preferences: Preferences;
  setNationality: (nationality: string) => void;
  setDestinations: (destinations: Country[]) => void;
  toggleDestination: (country: Country) => void;
  isConfigured: boolean;
  nationalityOverlay: NationalityOverlay | null;
  nationalitySlug: string | null;
  overlayLoading: boolean;
  reset: () => void;
}

const STORAGE_KEY = "student-atlas-preferences";

const defaultPreferences: Preferences = {
  nationality: null,
  destinations: [],
};

function loadPreferences(): Preferences {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        nationality: parsed.nationality ?? null,
        destinations: parsed.destinations ?? [],
      };
    }
  } catch {
    // ignore parse errors
  }
  return defaultPreferences;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(loadPreferences);

  const {
    overlay: nationalityOverlay,
    nationalitySlug,
    isLoading: overlayLoading,
  } = useNationalityOverlay(preferences.nationality);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const setNationality = (nationality: string) => {
    setPreferences((prev) => ({ ...prev, nationality }));
  };

  const setDestinations = (destinations: Country[]) => {
    setPreferences((prev) => ({ ...prev, destinations }));
  };

  const toggleDestination = (country: Country) => {
    setPreferences((prev) => {
      const has = prev.destinations.includes(country);
      const next = has
        ? prev.destinations.filter((c) => c !== country)
        : [...prev.destinations, country];
      return { ...prev, destinations: next };
    });
  };

  const isConfigured =
    preferences.nationality !== null && preferences.destinations.length > 0;

  const reset = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        setNationality,
        setDestinations,
        toggleDestination,
        isConfigured,
        nationalityOverlay,
        nationalitySlug,
        overlayLoading,
        reset,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return ctx;
}
