// Relative imports (not "@/") so the monitoring watcher can load this file via tsx.
import type { TraitKey, TraitSource } from "./types";

/**
 * One source page per trait column. The watcher monitors the "monitored"
 * pages like any other citation and raises a stale-check alert for the
 * "manual" ones once `verifiedAt` is older than `manualIntervalDays`.
 *
 * `dualNationalityAtHome` has no single source: each row carries its own
 * home-country citation (see `DualNationalityTrait.citationId`).
 */
export const traitSources: Record<TraitKey, TraitSource> = {
  ukVisaNational: {
    citationId: "gov.uk/visa-national-list",
    checkKind: "monitored",
    verifiedAt: "2026-09-27",
    note: "Appendix Visitor: Visa national list. On the list → Standard Visitor visa; not on it → ETA.",
  },
  usVwp: {
    citationId: "dhs.gov/visa-waiver-program",
    checkKind: "monitored",
    verifiedAt: "2026-09-27",
    note: "DHS table of the 42 Visa Waiver Program countries (Taiwan and UK carry passport conditions).",
  },
  usEntryRestriction: {
    citationId: "whitehouse.gov/proclamation-10998",
    checkKind: "monitored",
    verifiedAt: "2026-09-27",
    note: "Proclamation 10998 (in force 1 Jan 2026): full-suspension and partial-suspension country lists. Partial covers B, F, M, J and immigrant visas.",
  },
  auVisitorStream: {
    citationId: "immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601",
    checkKind: "monitored",
    verifiedAt: "2026-09-27",
    note: "ETA (601) eligible passports on this page; eVisitor (651) list on the 651 page; everyone else is Visitor (600).",
  },
  auBiometricsRequired: {
    citationId: "immi.homeaffairs.gov.au/biometrics",
    checkKind: "monitored",
    verifiedAt: "2026-09-27",
    note: "Country/location table of Australian Biometrics Collection Centres (applicants in a listed country give biometrics).",
  },
  auHealthExamLikely: {
    citationId: "immi.homeaffairs.gov.au/health-examinations",
    checkKind: "monitored",
    verifiedAt: "2026-09-27",
    note: "'Countries with low risk of tuberculosis' list; any country not listed is high risk → examinations for stays of 6 months or more.",
  },
  ukDifferentialEvidence: {
    citationId: "gov.uk/appendix-student",
    checkKind: "monitored",
    verifiedAt: "2026-09-27",
    note: "Appendix Student ST 22.1 differential evidence requirement country list.",
  },
  ukTbTestRequired: {
    citationId: "gov.uk/tb-test-countries",
    checkKind: "monitored",
    verifiedAt: "2026-09-27",
    note: "Countries where a TB test is needed for a UK visa of more than 6 months (based on residence, not nationality).",
  },
  ukMajorityEnglish: {
    citationId: "gov.uk/appendix-english-language",
    checkKind: "monitored",
    verifiedAt: "2026-09-27",
    note: "Appendix English Language: majority English speaking countries (18 + British Overseas Territories).",
  },
  auEnglishExempt: {
    citationId: "immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
    checkKind: "monitored",
    verifiedAt: "2026-09-27",
    note: "Student (500) English requirement: passport holders of the UK, USA, Canada, NZ and Ireland are exempt.",
  },
  usNationalityWorkVisas: {
    citationId: "uscis.gov/e-2",
    checkKind: "manual",
    manualIntervalDays: 180,
    verifiedAt: "2026-09-27",
    note: "E-3 Australia, H-1B1 Chile/Singapore, TN Canada/Mexico (USCIS pages); E-2 treaty countries are on travel.state.gov, which blocks the watcher.",
  },
  ukYouthMobility: {
    citationId: "gov.uk/youth-mobility-eligibility",
    checkKind: "monitored",
    verifiedAt: "2026-09-27",
    note: "Eligible countries with age bands (18–30 / 18–35), ballot countries; India uses the Young Professionals Scheme.",
  },
  auWorkingHoliday: {
    citationId: "immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-462",
    checkKind: "manual",
    manualIntervalDays: 180,
    verifiedAt: "2026-09-27",
    note: "417 and 462 eligible-country lists are loaded client-side and not in the fetched page; check in a browser.",
  },
  usVisaBulletinBacklog: {
    citationId: "travel.state.gov/visa-bulletin",
    checkKind: "manual",
    manualIntervalDays: 90,
    verifiedAt: "2026-09-27",
    note: "Employment-based final action dates: a country with its own column (India, China, Mexico, Philippines) is backlogged; severe when years behind 'all chargeability areas'.",
  },
  usDiversityVisaEligible: {
    citationId: "travel.state.gov/dv-instructions",
    checkKind: "manual",
    manualIntervalDays: 365,
    verifiedAt: "2026-09-27",
    note: "DV instructions list the countries whose natives are NOT eligible (over 50,000 immigrants in five years).",
  },
  dualNationalityAtHome: {
    citationId: "gov.uk/dual-citizenship",
    checkKind: "manual",
    manualIntervalDays: 365,
    verifiedAt: "2026-09-27",
    note: "Placeholder column source; each row cites its own home-country government page (D3).",
  },
  sanctionsRegime: {
    citationId: "ofac.treasury.gov/sanctions-programs",
    checkKind: "monitored",
    verifiedAt: "2026-09-27",
    note: "OFAC programme list: comprehensive programmes (Cuba, Iran, North Korea, Syria, Russia-related) vs targeted ones.",
  },
};

/** Trait columns that a given citation id feeds (for alerts and get_alert). */
export function traitsCitedBy(citationId: string): TraitKey[] {
  return (Object.keys(traitSources) as TraitKey[]).filter(
    (key) => traitSources[key].citationId === citationId
  );
}
