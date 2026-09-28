import { createContext, useContext } from "react";
import type { Country, NationalityOverlay } from "@/data/types";

export interface Preferences {
  nationality: string | null;
  destinations: Country[];
}

export interface PreferencesContextValue {
  preferences: Preferences;
  setNationality: (nationality: string) => void;
  setDestinations: (destinations: Country[]) => void;
  toggleDestination: (country: Country) => void;
  /** Setup finished and both a nationality and a destination are chosen. */
  isConfigured: boolean;
  nationalityOverlay: NationalityOverlay | null;
  nationalitySlug: string | null;
  /** Adjective for the chosen nationality, e.g. "Pakistani". */
  nationalityLabel: string | null;
  overlayLoading: boolean;
  /** Set when the nationality content failed to load (e.g. offline). */
  overlayError: string | null;
  /** The chosen nationality has no guide content yet; pages show the base rules only. */
  nationalityUnsupported: boolean;
  reset: () => void;
}

export const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return ctx;
}
