/**
 * Pages that have structured rows in visa-facts for ComparisonTable.
 * Keep in sync with visaFacts in data/visa-facts.ts when adding new compare targets.
 */
const COUNTRY_COMPARE_KEYS = new Set<string>([
  "student/overview",
  "visit/entry-requirement",
  "work/post-study-work",
  "work/getting-sponsored",
  "residency/permanent-residency",
  "residency/citizenship",
]);

export function isCountryCompareRoute(
  sectionSlug: string,
  subSectionSlug: string
): boolean {
  return COUNTRY_COMPARE_KEYS.has(`${sectionSlug}/${subSectionSlug}`);
}
