/**
 * Layer 0 of the content model: nationality traits.
 *
 * Every fact that depends on the reader's nationality is a column in this
 * table. Each column has exactly one source page (`trait-sources.ts`), and
 * `trait-rules.ts` turns a row into generated, cited callouts and profile
 * choices. Hand-written overlays (`nationalities/*.ts`) sit on top.
 *
 * Rows are complete by construction: TypeScript refuses a nationality whose
 * row is missing a column, so "unknown" is only a legal value where the type
 * says so (dual nationality, see decision D3 in EXPANSION-PLAN.md).
 */

/** A trait value with the date it was last checked against its source. */
export interface Verified<T> {
  value: T;
  /** ISO date (YYYY-MM-DD) the value was checked against the column's source. */
  verifiedAt: string;
}

export type UsEntryRestriction = "none" | "partial" | "full";
/** UK "visa brake": out-of-country applications on these routes are refused for this nationality. */
export type UkVisaBrake = "none" | "student" | "student-skilled";
export type AuVisitorStream = "eta601" | "evisitor651" | "visitor600";
export type UsNationalityWorkVisa = "E-3" | "H-1B1" | "TN" | "E-2";
export type UkYouthMobility = "none" | "18-30" | "18-35" | "ballot" | "india-yps";
/** "462-ballot": eligible for the 462 only through the pre-application ballot (China, India, Vietnam). */
export type AuWorkingHoliday = "none" | "417" | "462" | "462-ballot";
export type VisaBulletinBacklog = "none" | "moderate" | "severe";
export type DualNationalityRule = "allowed" | "restricted" | "prohibited" | "unknown";
export type SanctionsRegime = "none" | "partial" | "comprehensive";

export interface DualNationalityTrait extends Verified<DualNationalityRule> {
  /**
   * Citation id of the home-country government page the rule was read from.
   * Required unless the value is "unknown" (decision D3: official sources only).
   */
  citationId?: string;
  /** Optional one-sentence nuance rendered after the generated line, e.g. OCI. */
  note?: string;
}

export interface NationalityTraits {
  // ── Visiting ────────────────────────────────────────────────
  /** On the UK visa national list → Standard Visitor visa; otherwise ETA. */
  ukVisaNational: Verified<boolean>;
  /** Member of the US Visa Waiver Program → ESTA instead of a B-2 visa. */
  usVwp: Verified<boolean>;
  /** US presidential proclamation suspending visa issuance to this nationality. */
  usEntryRestriction: Verified<UsEntryRestriction>;
  /** UK visa brake: Student (and for some, Skilled Worker) applications from outside the UK are refused. */
  ukVisaBrake: Verified<UkVisaBrake>;
  /** Which Australian visitor route the passport qualifies for. */
  auVisitorStream: Verified<AuVisitorStream>;
  /** Applicants in this country give biometrics at an Australian collection centre. */
  auBiometricsRequired: Verified<boolean>;
  /** Home Affairs commonly requests a health examination (higher-TB-risk country). */
  auHealthExamLikely: Verified<boolean>;

  // ── Studying ────────────────────────────────────────────────
  /** Appendix Student ST 22.1: no financial/qualification evidence up front. */
  ukDifferentialEvidence: Verified<boolean>;
  /** Residents must take a tuberculosis test before a UK visa of 6+ months. */
  ukTbTestRequired: Verified<boolean>;
  /** Majority-English-speaking country: meets the UK English requirement by nationality. */
  ukMajorityEnglish: Verified<boolean>;
  /** Passport exempts the holder from the Student (500) English test. */
  auEnglishExempt: Verified<boolean>;

  // ── Working ─────────────────────────────────────────────────
  /** Nationality-specific US work visas beyond the H-1B lottery. */
  usNationalityWorkVisas: Verified<UsNationalityWorkVisa[]>;
  /** UK Youth Mobility Scheme eligibility. */
  ukYouthMobility: Verified<UkYouthMobility>;
  /** Australian Working Holiday (417) or Work and Holiday (462) eligibility. */
  auWorkingHoliday: Verified<AuWorkingHoliday>;

  // ── Settling ────────────────────────────────────────────────
  /** Per-country employment-based green card backlog in the Visa Bulletin. */
  usVisaBulletinBacklog: Verified<VisaBulletinBacklog>;
  /** Natives may enter the US Diversity Visa lottery. */
  usDiversityVisaEligible: Verified<boolean>;
  /** Whether the home country lets its citizens naturalise abroad and keep citizenship. */
  dualNationalityAtHome: DualNationalityTrait;

  // ── Cross-cutting ───────────────────────────────────────────
  /** Comprehensive sanctions affect fee payments and consular access. */
  sanctionsRegime: Verified<SanctionsRegime>;
}

export type TraitKey = keyof NationalityTraits;

export const TRAIT_KEYS: TraitKey[] = [
  "ukVisaNational",
  "usVwp",
  "usEntryRestriction",
  "ukVisaBrake",
  "auVisitorStream",
  "auBiometricsRequired",
  "auHealthExamLikely",
  "ukDifferentialEvidence",
  "ukTbTestRequired",
  "ukMajorityEnglish",
  "auEnglishExempt",
  "usNationalityWorkVisas",
  "ukYouthMobility",
  "auWorkingHoliday",
  "usVisaBulletinBacklog",
  "usDiversityVisaEligible",
  "dualNationalityAtHome",
  "sanctionsRegime",
];

/** How a trait column is kept current. */
export interface TraitSource {
  /** Citation id (citations.ts) of the page the column is read from. */
  citationId: string;
  /**
   * "monitored": the watcher fetches the page and alerts on change.
   * "manual": the page blocks automated clients; the watcher raises a
   * stale-check alert when `verifiedAt` is older than `manualIntervalDays`.
   */
  checkKind: "monitored" | "manual";
  manualIntervalDays?: number;
  /** Date the whole column was last derived from the source. */
  verifiedAt: string;
  /** What to look for on the page when re-deriving the column. */
  note: string;
}
