import { useState, useEffect } from "react";
import type { NationalityOverlay } from "@/data/types";
import { nationalityRegistry } from "@/data/nationalities/registry";

interface OverlayState {
  overlay: NationalityOverlay | null;
  nationalitySlug: string | null;
  isLoading: boolean;
}

export function useNationalityOverlay(
  nationalityName: string | null
): OverlayState {
  const [state, setState] = useState<OverlayState>({
    overlay: null,
    nationalitySlug: null,
    isLoading: false,
  });

  useEffect(() => {
    if (!nationalityName) {
      setState({ overlay: null, nationalitySlug: null, isLoading: false });
      return;
    }

    const meta = nationalityRegistry.find((n) => n.name === nationalityName);
    if (!meta) {
      // Nationality not in registry — no overlay, show base content
      setState({ overlay: null, nationalitySlug: null, isLoading: false });
      return;
    }

    let cancelled = false;
    setState((s) => ({ ...s, isLoading: true }));

    meta.load().then((mod) => {
      if (!cancelled) {
        setState({
          overlay: mod.default,
          nationalitySlug: meta.slug,
          isLoading: false,
        });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [nationalityName]);

  return state;
}
