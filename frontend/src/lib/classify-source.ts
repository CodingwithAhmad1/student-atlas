/** Shared classification for citations and the source monitoring registry. */

export type SourceCategory =
  | "visitor"
  | "student"
  | "work"
  | "residency"
  | "citizenship"
  | "eligibility"
  | "general";

export type SourceCountry = "US" | "UK" | "AU" | "INTL";

export function classifySource(
  id: string,
  label: string
): { country: SourceCountry; category: SourceCategory } {
  let countryCode: "us" | "uk" | "au" | "other" = "other";
  const lcId = id.toLowerCase();
  const lcLabel = label.toLowerCase();

  if (
    lcId.includes("state.gov") ||
    lcId.includes("uscis.gov") ||
    lcId.includes("studyinthestates") ||
    lcId.includes("cbp.gov") ||
    lcId.includes("dol.gov") ||
    lcId.includes("fmjfee") ||
    lcId.includes("usembassy") ||
    lcId.includes("ustraveldocs") ||
    lcId.includes("ceac.state") ||
    lcId.includes("dhs.gov") ||
    lcId.includes("whitehouse.gov") ||
    lcId.includes("ice.gov") ||
    lcId.includes("ofac.treasury")
  ) {
    countryCode = "us";
  } else if (lcId.includes("gov.uk") || lcId.includes("ukvcas")) {
    countryCode = "uk";
  } else if (
    lcId.includes("homeaffairs") ||
    lcId.includes("immi.") ||
    lcId.includes("privatehealth.gov.au")
  ) {
    countryCode = "au";
  }

  let category: SourceCategory = "general";

  if (
    lcLabel.includes("citizen") ||
    lcLabel.includes("citizenship") ||
    lcLabel.includes("dual nationality") ||
    lcLabel.includes("nationality law") ||
    lcLabel.includes("naturaliz")
  ) {
    category = "citizenship";
  } else if (
    lcLabel.includes("permanent residen") ||
    lcLabel.includes("green card") ||
    lcLabel.includes("indefinite leave") ||
    lcLabel.includes("life in the uk") ||
    lcLabel.includes("perm labor") ||
    lcLabel.includes("visa bulletin") ||
    lcId.includes("skilled-independent") ||
    lcId.includes("skilled-nominated") ||
    lcId.includes("employer-nomination")
  ) {
    category = "residency";
  } else if (
    lcLabel.includes("h-1b") ||
    lcLabel.includes("skilled worker") ||
    lcLabel.includes("temporary skill shortage") ||
    lcLabel.includes("tsmit") ||
    lcLabel.includes("foreign labor") ||
    lcLabel.includes("opt") ||
    lcLabel.includes("practical training") ||
    lcLabel.includes("stem opt") ||
    lcLabel.includes("graduate visa") ||
    lcId.includes("temporary-graduate") ||
    lcLabel.includes("working in the us")
  ) {
    category = "work";
  } else if (
    lcLabel.includes("student") ||
    lcLabel.includes("study") ||
    lcLabel.includes("sevis") ||
    lcLabel.includes("i-20") ||
    lcLabel.includes("cas") ||
    lcLabel.includes("health surcharge") ||
    lcLabel.includes("health cover") ||
    lcLabel.includes("health requirement") ||
    lcLabel.includes("tuberculosis") ||
    lcLabel.includes("sponsor a student") ||
    lcLabel.includes("maintaining your status") ||
    lcLabel.includes("form i-20") ||
    lcId.includes("student-500") ||
    lcId.includes("fmjfee")
  ) {
    category = "student";
  } else if (
    lcLabel.includes("visitor") ||
    lcLabel.includes("b-1") ||
    lcLabel.includes("b-2") ||
    lcLabel.includes("esta") ||
    lcLabel.includes("visa waiver") ||
    lcLabel.includes("eta") ||
    lcLabel.includes("electronic travel") ||
    lcLabel.includes("standard visitor") ||
    lcId.includes("visitor-600") ||
    lcId.includes("travel-authority")
  ) {
    category = "visitor";
  }

  const country: SourceCountry =
    countryCode === "us"
      ? "US"
      : countryCode === "uk"
        ? "UK"
        : countryCode === "au"
          ? "AU"
          : "INTL";

  return { country, category };
}
