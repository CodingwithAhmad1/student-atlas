export type Country = "US" | "UK" | "AU";

export const COUNTRY_LABELS: Record<Country, string> = {
  US: "United States",
  UK: "United Kingdom",
  AU: "Australia",
};

export interface Citation {
  id: string;
  url: string;
  label: string;
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "key-value-list"; items: { label: string; value: string }[] }
  | { type: "bullet-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "step"; number: number; title: string; body: string };

/** Wrapper that gives a block an optional stable ID for overlay targeting */
export interface IdentifiedBlock {
  id?: string;
  block: ContentBlock;
}

export interface CountrySection {
  country: Country;
  blocks: IdentifiedBlock[];
}

export interface SubSection {
  slug: string;
  title: string;
  countries: CountrySection[];
  crossCutting?: IdentifiedBlock[];
}

export interface Section {
  slug: string;
  title: string;
  subSections: SubSection[];
}

// ── Profile type ────────────────────────────────────────────

/** A profile provides replacement content for a specific visa path.
 *  Keyed by subsection slug. Each entry replaces the entire country
 *  block for that subsection. */
export type Profile = {
  [subSectionSlug: string]: IdentifiedBlock[];
};

// ── Nationality overlay types ───────────────────────────────

export interface CalloutOverlay {
  afterBlockId: string;
  blocks: ContentBlock[];
  /**
   * Uncited practical advice (decision D2 in EXPANSION-PLAN.md). Rendered with
   * an asterisk and a small-print note; may not contain numbers, fees, dates
   * or durations, and may not carry [CITE] markers — check-content enforces it.
   */
  practical?: boolean;
}

export interface CountryOverlay {
  /** Profile to use (replaces base country blocks). Omit = use base. */
  profile?: IdentifiedBlock[];
  /** Callouts inserted after specific blocks in base or profile content */
  callouts?: CalloutOverlay[];
}

/** Overlay config for a single subsection */
export type SubSectionOverlay = {
  [country in Country]?: CountryOverlay;
} & { _crossCutting?: { callouts?: CalloutOverlay[] } };

/** Overlay config for a single section */
export type SectionOverlay = {
  [subSectionSlug: string]: SubSectionOverlay;
};

/** Complete nationality overlay. Keys = section slugs. */
export type NationalityOverlay = {
  [sectionSlug: string]: SectionOverlay;
};

/** Registry entry for a nationality */
export interface NationalityMeta {
  /** Exactly as listed in the nationality dropdown (countries.ts). */
  name: string;
  slug: string;
  /** Adjective for headings, e.g. "Pakistani" → "For Pakistani applicants". */
  label: string;
  /**
   * How much hand-written content the nationality gets (EXPANSION-PLAN.md §6).
   * Trait coverage is identical across tiers.
   */
  tier: "A" | "B" | "C";
  /** ISO date the nationality's traits and hand-written callouts were last reviewed. */
  reviewedAt: string;
  /** Set when the nationality is one of the destinations: its own column uses domestic profiles. */
  destination?: Country;
  /** Hand-written overlay (extras on top of the trait-generated content). */
  load: () => Promise<{ default: NationalityOverlay }>;
}

// ── Rendered output type ────────────────────────────────────

export interface ResolvedBlock {
  block: ContentBlock;
  isCallout?: boolean;
  /** Uncited practical advice (see CalloutOverlay.practical). */
  practical?: boolean;
  nationalityLabel?: string;
}

/** A callout block as shown in the nationality box. */
export interface CalloutBlock {
  block: ContentBlock;
  practical?: boolean;
}

/** Small-print note shown once under any box containing a practical callout. */
export const PRACTICAL_NOTE =
  "* Practical guidance from experience, not from an official source.";
