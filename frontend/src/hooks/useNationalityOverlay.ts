import { useEffect, useState } from "react";
import type { NationalityOverlay } from "@/data/types";
import { nationalityRegistry } from "@/data/nationalities/registry";

interface OverlayState {
  overlay: NationalityOverlay | null;
  nationalitySlug: string | null;
  nationalityLabel: string | null;
  isLoading: boolean;
  error: string | null;
}

interface Loaded {
  name: string;
  overlay: NationalityOverlay | null;
  error: string | null;
}

/**
 * Lazily loads the overlay for a nationality. While a new nationality loads,
 * no overlay is returned, so the previous nationality's content can never be
 * shown under the new name.
 */
export function useNationalityOverlay(nationalityName: string | null): OverlayState {
  const meta = nationalityName
    ? nationalityRegistry.find((n) => n.name === nationalityName)
    : undefined;
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!meta) return;
    let cancelled = false;
    meta
      .load()
      .then((mod) => {
        if (!cancelled) setLoaded({ name: meta.name, overlay: mod.default, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setLoaded({
          name: meta.name,
          overlay: null,
          error: err instanceof Error ? err.message : String(err),
        });
        // One automatic retry covers a transient failure (e.g. a stale chunk).
        if (attempt === 0) setAttempt(1);
      });
    return () => {
      cancelled = true;
    };
  }, [meta, attempt]);

  if (!meta) {
    // Not in the registry: base content only.
    return { overlay: null, nationalitySlug: null, nationalityLabel: null, isLoading: false, error: null };
  }
  const current = loaded?.name === meta.name ? loaded : null;
  return {
    overlay: current?.overlay ?? null,
    nationalitySlug: current?.overlay ? meta.slug : null,
    nationalityLabel: meta.label,
    isLoading: current === null,
    error: current?.error ?? null,
  };
}
