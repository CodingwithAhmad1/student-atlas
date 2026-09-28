// Relative imports (not "@/") so scripts/check-content.ts and the MCP server's
// type-check can load this file via tsx.
import { touristVisaAuEta } from "../profiles/tourist-visa-au-eta";
import { touristVisaAuEvisitor } from "../profiles/tourist-visa-au-evisitor";
import { touristVisaUkEta } from "../profiles/tourist-visa-uk-eta";
import { touristVisaUsVwp } from "../profiles/tourist-visa-us-vwp";
import { domesticAuResidency } from "../profiles/domestic-au-residency";
import { domesticAuStudent } from "../profiles/domestic-au-student";
import { domesticAuVisit } from "../profiles/domestic-au-visit";
import { domesticAuWork } from "../profiles/domestic-au-work";
import { domesticUkResidency } from "../profiles/domestic-uk-residency";
import { domesticUkStudent } from "../profiles/domestic-uk-student";
import { domesticUkVisit } from "../profiles/domestic-uk-visit";
import { domesticUkWork } from "../profiles/domestic-uk-work";
import { domesticUsResidency } from "../profiles/domestic-us-residency";
import { domesticUsStudent } from "../profiles/domestic-us-student";
import { domesticUsVisit } from "../profiles/domestic-us-visit";
import { domesticUsWork } from "../profiles/domestic-us-work";
import type {
  CalloutOverlay,
  ContentBlock,
  Country,
  IdentifiedBlock,
  NationalityOverlay,
  Profile,
  Section,
  SectionOverlay,
  SubSectionOverlay,
} from "../types";
import { traitSources } from "./trait-sources";
import type { NationalityTraits, TraitKey } from "./types";

/** What the rules need to know about a nationality besides its traits. */
export interface TraitSubject {
  /** Country name as shown in the dropdown, e.g. "Pakistan". */
  name: string;
  /** Adjective for headings, e.g. "Pakistani". */
  label: string;
  /** Set when the nationality is one of the destinations (domestic profiles). */
  destination?: Country;
}

const DOMESTIC: Record<Country, Record<string, Profile>> = {
  US: { visit: domesticUsVisit, student: domesticUsStudent, work: domesticUsWork, residency: domesticUsResidency },
  UK: { visit: domesticUkVisit, student: domesticUkStudent, work: domesticUkWork, residency: domesticUkResidency },
  AU: { visit: domesticAuVisit, student: domesticAuStudent, work: domesticAuWork, residency: domesticAuResidency },
};

const cite = (key: TraitKey) => `[CITE: ${traitSources[key].citationId}]`;
const asOf = (t: { verifiedAt: string }) => `Position checked ${t.verifiedAt}.`;
/** A country name as it reads in running text; dropdown spellings stay as they are elsewhere. */
const PROSE_NAMES: Record<string, string> = {
  "Congo (Democratic Republic)": "the Democratic Republic of the Congo",
  "Czech Republic": "the Czech Republic",
  "Dominican Republic": "the Dominican Republic",
  Netherlands: "the Netherlands",
  Philippines: "the Philippines",
  "United Arab Emirates": "the United Arab Emirates",
  "United Kingdom": "the United Kingdom",
  "United States": "the United States",
};
export const proseName = (name: string) => PROSE_NAMES[name] ?? name;
const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** "a" or "an" before a nationality adjective ("an Indian", "a Ugandan", "a UAE", "an Uzbek"). */
const withArticle = (word: string) => `${/^(?:[AEIO]|Uzb)/.test(word) ? "an" : "a"} ${word}`;
const p = (text: string): ContentBlock => ({ type: "paragraph", text });

/** Id of the first identified block in a column: generated callouts anchor there
 *  (callouts render at the top of the column regardless of anchor). */
function firstAnchor(blocks: IdentifiedBlock[]): string | undefined {
  return blocks.find((b) => b.id)?.id;
}

/**
 * Build the generated overlay for one nationality from its traits. Returns
 * profile selections and cited callouts keyed like a hand-written overlay,
 * so `mergeOverlays` can combine the two.
 */
export function generateOverlay(
  subject: TraitSubject,
  traits: NationalityTraits,
  sections: Section[]
): NationalityOverlay {
  const overlay: NationalityOverlay = {};
  const { label } = subject;
  const name = proseName(subject.name);
  const Name = capitalise(name);

  const column = (sectionSlug: string, subSlug: string, country: Country) =>
    sections
      .find((s) => s.slug === sectionSlug)
      ?.subSections.find((s) => s.slug === subSlug)
      ?.countries.find((c) => c.country === country)?.blocks;

  const setProfile = (
    sectionSlug: string,
    subSlug: string,
    country: Country,
    profile: IdentifiedBlock[] | undefined,
    domestic = false
  ) => {
    if (!profile) return;
    if (subject.destination === country && !domestic) return; // domestic column: rules don't apply
    const sec = (overlay[sectionSlug] ??= {});
    const sub = (sec[subSlug] ??= {});
    sub[country] = { ...(sub[country] ?? {}), profile };
  };

  const addCallout = (sectionSlug: string, subSlug: string, country: Country, blocks: ContentBlock[]) => {
    if (subject.destination === country) return; // domestic column: rules don't apply
    const sec = (overlay[sectionSlug] ??= {});
    const sub = (sec[subSlug] ??= {});
    const entry = (sub[country] ??= {});
    const anchor = firstAnchor(entry.profile ?? column(sectionSlug, subSlug, country) ?? []);
    if (!anchor) return;
    (entry.callouts ??= []).push({ afterBlockId: anchor, blocks });
  };

  const addCrossCutting = (sectionSlug: string, subSlug: string, afterBlockId: string, blocks: ContentBlock[], practical = false) => {
    const sec = (overlay[sectionSlug] ??= {});
    const sub = (sec[subSlug] ??= {});
    const cc = (sub._crossCutting ??= {});
    const callout: CalloutOverlay = { afterBlockId, blocks };
    if (practical) callout.practical = true;
    (cc.callouts ??= []).push(callout);
  };

  // ── Domestic profiles: the reader's own country needs no visa ──
  if (subject.destination) {
    const home = subject.destination;
    for (const section of sections) {
      const profile = DOMESTIC[home][section.slug];
      if (!profile) continue;
      for (const sub of section.subSections) {
        if (profile[sub.slug] && sub.countries.some((c) => c.country === home)) {
          setProfile(section.slug, sub.slug, home, profile[sub.slug], true);
        }
      }
    }
  }

  // ── Visiting: which route each destination offers this passport ──
  if (traits.usVwp.value) {
    setProfile("visit", "entry-requirement", "US", touristVisaUsVwp["entry-requirement"]);
    setProfile("visit", "how-to-apply", "US", touristVisaUsVwp["how-to-apply"]);
  }
  if (!traits.ukVisaNational.value) {
    setProfile("visit", "entry-requirement", "UK", touristVisaUkEta["entry-requirement"]);
    setProfile("visit", "how-to-apply", "UK", touristVisaUkEta["how-to-apply"]);
  }
  if (traits.auVisitorStream.value === "eta601") {
    setProfile("visit", "entry-requirement", "AU", touristVisaAuEta["entry-requirement"]);
    setProfile("visit", "how-to-apply", "AU", touristVisaAuEta["how-to-apply"]);
  } else if (traits.auVisitorStream.value === "evisitor651") {
    setProfile("visit", "entry-requirement", "AU", touristVisaAuEvisitor["entry-requirement"]);
    setProfile("visit", "how-to-apply", "AU", touristVisaAuEvisitor["how-to-apply"]);
  }

  // ── US entry restriction (Proclamation 10998) ──
  const restriction = traits.usEntryRestriction;
  if (restriction.value !== "none") {
    const scope =
      restriction.value === "full"
        ? "the issue of all immigrant and non-immigrant visas, including visitor (B-1/B-2) and student (F, M, J) visas,"
        : "the issue of visitor (B-1/B-2), student and exchange (F, M, J) and immigrant visas";
    const text =
      `**US visa issuance to ${label} nationals is currently suspended.** Presidential Proclamation 10998, in force since 1 January 2026, ` +
      `suspends ${scope} to nationals of ${name} who are outside the United States without a valid visa. ` +
      `Existing visa holders, permanent residents and a few other categories are excepted. ` +
      `Treat the US route as unavailable until the proclamation is lifted, and check its status before spending money on an application. ` +
      `${asOf(restriction)} ${cite("usEntryRestriction")}`;
    for (const [section, sub] of [
      ["visit", "entry-requirement"],
      ["visit", "how-to-apply"],
      ["student", "overview"],
      ["student", "application-process"],
      ["work", "post-study-work"],
    ] as const) {
      addCallout(section, sub, "US", [p(text)]);
    }
  }

  // ── UK visa brake ──
  const brake = traits.ukVisaBrake;
  if (brake.value !== "none" && subject.destination !== "UK") {
    const routes = brake.value === "student-skilled" ? "Student and Skilled Worker visa applications" : "Student visa applications";
    const text =
      `**UK ${routes} from ${label} nationals are currently refused.** Under the UK's visa brake, in force since 26 March 2026, ` +
      `${routes} made from outside the UK are refused when the main applicant is a national of ${name}, even with a valid CAS or Certificate of Sponsorship. ` +
      `Visas already granted stay valid, and people already in the UK can still extend or switch if they are eligible. ` +
      `The brake is reviewed regularly and has no set end date. ${asOf(brake)} ${cite("ukVisaBrake")}`;
    const where: [string, string][] = [["student", "overview"], ["student", "application-process"]];
    if (brake.value === "student-skilled") where.push(["work", "getting-sponsored"]);
    for (const [section, sub] of where) addCallout(section, sub, "UK", [p(text)]);
  }

  // ── US tax treaty: students article (IRS Publication 901) ──
  const treaty = traits.usTaxTreatyStudent;
  if (treaty.value === "available") {
    addCallout("student", "after-arrival", "US", [
      p(
        `An income tax treaty between the United States and ${name} has a students article. ` +
          `If you were a resident of ${name} when you arrived, you may be exempt from US income tax on some income while you study, ` +
          `such as payments from abroad for your maintenance and study and, depending on the treaty, grants or limited earnings from work. ` +
          `IRS Publication 901 sets out the conditions and limits. ${cite("usTaxTreatyStudent")}`
      ),
    ]);
  } else if (treaty.value === "suspended") {
    addCallout("student", "after-arrival", "US", [
      p(
        `The United States has suspended the students article of its income tax treaty with ${name}, ` +
          `so students resident in ${name} cannot claim the treaty's exemptions on US income while the suspension lasts. ` +
          `${asOf(treaty)} ${cite("usTaxTreatyStudent")}`
      ),
    ]);
  }

  // ── Comprehensive sanctions ──
  if (traits.sanctionsRegime.value === "comprehensive") {
    const text =
      `**${Name} is under comprehensive sanctions.** US sanctions administered by OFAC restrict payments from ${name}, ` +
      `which affects paying US government fees (the SEVIS I-901 fee and visa fees) and university deposits from a bank in ${name}; ` +
      `UK financial sanctions can affect transfers too. Plan to pay from outside ${name} or through a third party where the rules allow it, ` +
      `and confirm the position with the institution. ${asOf(traits.sanctionsRegime)} ${cite("sanctionsRegime")}`;
    for (const section of sections) {
      for (const sub of section.subSections) {
        for (const c of sub.countries) addCallout(section.slug, sub.slug, c.country, [p(text)]);
      }
    }
  }

  // ── Australia: biometrics and health examinations ──
  if (traits.auBiometricsRequired.value) {
    const text =
      `Applicants lodging from ${name} must give biometrics (fingerprints and a photograph) at an Australian Biometrics Collection Centre after submitting the application. ` +
      `Home Affairs sends a request letter; the application is not decided until biometrics are collected. ${cite("auBiometricsRequired")}`;
    if (traits.auVisitorStream.value === "visitor600") addCallout("visit", "how-to-apply", "AU", [p(text)]);
    addCallout("student", "application-process", "AU", [p(text)]);
  }
  if (traits.auHealthExamLikely.value) {
    const text =
      `${Name} is not on Home Affairs' list of countries with a low risk of tuberculosis, so a stay of 6 months or more (every Student visa, and longer visits) ` +
      `normally requires a medical examination and chest X-ray at an approved panel clinic. Visits under 6 months usually need no examination. ${cite("auHealthExamLikely")}`;
    if (traits.auVisitorStream.value === "visitor600") addCallout("visit", "how-to-apply", "AU", [p(text)]);
    addCallout("student", "documents", "AU", [p(text)]);
  }

  // ── UK student evidence rules ──
  if (traits.ukTbTestRequired.value) {
    addCallout("student", "documents", "UK", [
      p(
        `Anyone who has lived in ${name} for the last 6 months must have a tuberculosis test at a Home Office-approved clinic before applying for a UK visa of more than 6 months, ` +
          `which includes the Student visa. The certificate is valid for 6 months and goes in with the application. ${cite("ukTbTestRequired")}`
      ),
    ]);
  }
  if (traits.ukDifferentialEvidence.value) {
    addCallout("student", "documents", "UK", [
      p(
        `${label} nationals applying from ${name} (or from inside the UK) benefit from the **differential evidence requirement**: financial evidence and qualification documents do not have to be sent with the Student visa application. ` +
          `UKVI can still ask for them before deciding, so have the bank statements and certificates ready. ${cite("ukDifferentialEvidence")}`
      ),
    ]);
  }
  if (traits.ukMajorityEnglish.value) {
    addCallout("student", "documents", "UK", [
      p(
        `${Name} is on the UK's list of majority English speaking countries, so ${label} nationals meet the Student visa English language requirement by nationality and do not need a Secure English Language Test. ${cite("ukMajorityEnglish")}`
      ),
    ]);
  }
  if (traits.auEnglishExempt.value) {
    addCallout("student", "documents", "AU", [
      p(
        `Holders of ${withArticle(label)} passport do not need to provide an English test score with the Student (subclass 500) application. ${cite("auEnglishExempt")}`
      ),
    ]);
  }

  // ── Work: nationality-specific routes ──
  const workVisas = traits.usNationalityWorkVisas.value;
  if (workVisas.length > 0) {
    const names: Record<string, string> = {
      "E-3": "the **E-3** specialty-occupation visa (Australian citizens only; annual quota, renewable, no lottery) [CITE: uscis.gov/e-3]",
      "H-1B1": "the **H-1B1** free-trade-agreement visa (Chile and Singapore; separate quota from the H-1B lottery) [CITE: uscis.gov/h-1b]",
      TN: "the **TN** professional visa under USMCA (Canada and Mexico; listed professions, no lottery) [CITE: uscis.gov/tn]",
      "E-2": "the **E-2** treaty investor visa (for those who invest in a US business) [CITE: uscis.gov/e-2]",
    };
    addCallout("work", "post-study-work", "US", [
      p(
        `${label} graduates have a nationality-specific option besides the H-1B lottery: ${workVisas.map((v) => names[v]).join("; ")}. ` +
          `${asOf(traits.usNationalityWorkVisas)}`
      ),
    ]);
  }
  const ym = traits.ukYouthMobility.value;
  if (ym !== "none") {
    const text =
      ym === "india-yps"
        ? `Indian graduates aged 18 to 30 can also apply for the **India Young Professionals Scheme visa**, a 2-year visa with no sponsor, allocated by ballot. [CITE: gov.uk/india-young-professionals]`
        : `${label} nationals aged ${ym === "18-35" ? "18 to 35" : "18 to 30"} can also apply for the **UK Youth Mobility Scheme visa**${ym === "ballot" ? " through its annual ballot" : ""}: 2 years in the UK (3 for some countries) with the right to work and no sponsor needed. ${cite("ukYouthMobility")}`;
    addCallout("work", "post-study-work", "UK", [p(text)]);
  }
  const wh = traits.auWorkingHoliday.value;
  if (wh !== "none") {
    const whPage = wh === "417" ? "417" : "462";
    const whVisa =
      wh === "417"
        ? "can also apply for the **Working Holiday visa (subclass 417)**"
        : wh === "462"
          ? "can also apply for the **Work and Holiday visa (subclass 462)**"
          : "can also apply for the **Work and Holiday visa (subclass 462)** if they are randomly selected in its pre-application ballot";
    addCallout("work", "post-study-work", "AU", [
      p(
        `${label} nationals aged 18 to 30 (35 for some countries) ${whVisa}: 12 months in Australia with full work rights and no sponsor. ` +
          `${asOf(traits.auWorkingHoliday)} [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-${whPage}]`
      ),
    ]);
  }

  // ── Settling: US per-country backlogs and the Diversity Visa ──
  const backlog = traits.usVisaBulletinBacklog;
  if (backlog.value !== "none") {
    const severity =
      backlog.value === "severe"
        ? `Demand from ${name} exceeds its per-country share of employment-based green cards by so much that ${label} applicants wait many years longer than applicants from elsewhere; some categories are more than a decade behind.`
        : `Demand from ${name} exceeds its per-country share in some employment-based categories, so ${label} applicants can wait years longer than applicants from other countries.`;
    const text =
      `**${Name} has its own column in the US Visa Bulletin.** ${severity} ` +
      `This is the single biggest difference between the US route and the UK or Australian routes for ${withArticle(label)} graduate. ` +
      `${asOf(backlog)} ${cite("usVisaBulletinBacklog")}`;
    addCallout("work", "getting-sponsored", "US", [p(text)]);
    addCallout("residency", "permanent-residency", "US", [p(text)]);
  }
  if (!traits.usDiversityVisaEligible.value && subject.destination !== "US") {
    addCallout("residency", "permanent-residency", "US", [
      p(
        `${label} nationals cannot enter the US Diversity Visa lottery: ${name} is excluded because more than 50,000 of its natives immigrated to the US in the last five years. ` +
          `${asOf(traits.usDiversityVisaEligible)} ${cite("usDiversityVisaEligible")}`
      ),
    ]);
  }

  // ── Dual nationality at home ──
  const dual = traits.dualNationalityAtHome;
  const dualCite = dual.citationId ? ` [CITE: ${dual.citationId}]` : "";
  const note = dual.note ? ` ${dual.note}` : "";
  const abroad = (["US", "UK", "AU"] as Country[])
    .filter((c) => c !== subject.destination)
    .map((c) => ({ US: "the United States", UK: "the United Kingdom", AU: "Australia" })[c]);
  const abroadList = abroad.length > 1 ? `${abroad.slice(0, -1).join(", ")} or ${abroad[abroad.length - 1]}` : abroad[0];
  const dualText: Record<typeof dual.value, string> = {
    allowed: `${Name} permits dual nationality: ${label} citizens who naturalise in ${abroadList} keep their ${label} citizenship.${note}${dualCite}`,
    restricted: `${Name} permits dual nationality only in limited circumstances, so check before naturalising in ${abroadList}.${note}${dualCite}`,
    prohibited: `${Name} does not permit dual nationality: naturalising in ${abroadList} means giving up ${label} citizenship.${note}${dualCite}`,
    unknown: `We have not yet verified the dual-nationality rules of ${name} against an official source. Confirm with an embassy or consulate of ${name} before naturalising abroad.`,
  };
  addCrossCutting("residency", "dual-nationality", "dual-origin-position", [p(dualText[dual.value])], dual.value === "unknown");

  return overlay;
}

/** Hand-written overlay on top of the generated one: hand profiles win, callouts append. */
export function mergeOverlays(generated: NationalityOverlay, hand: NationalityOverlay): NationalityOverlay {
  const out: NationalityOverlay = {};
  const sectionSlugs = new Set([...Object.keys(generated), ...Object.keys(hand)]);
  for (const sectionSlug of sectionSlugs) {
    const g = generated[sectionSlug] ?? {};
    const h = hand[sectionSlug] ?? {};
    const section: SectionOverlay = (out[sectionSlug] = {});
    for (const subSlug of new Set([...Object.keys(g), ...Object.keys(h)])) {
      const gs = g[subSlug] ?? {};
      const hs = h[subSlug] ?? {};
      const sub: Record<string, unknown> = {};
      for (const key of new Set([...Object.keys(gs), ...Object.keys(hs)])) {
        if (key === "_crossCutting") {
          sub[key] = { callouts: [...(gs._crossCutting?.callouts ?? []), ...(hs._crossCutting?.callouts ?? [])] };
          continue;
        }
        const country = key as Country;
        const gc = gs[country];
        const hc = hs[country];
        const profile = hc && "profile" in hc ? hc.profile : gc?.profile;
        // A hand-written profile replaces the column the generated callouts
        // were anchored in, so move them to the profile's first block.
        const handAnchor = hc?.profile && gc?.callouts?.length ? firstAnchor(hc.profile) : undefined;
        const generatedCallouts = (gc?.callouts ?? []).map((c) =>
          handAnchor ? { ...c, afterBlockId: handAnchor } : c
        );
        sub[country] = {
          ...(profile ? { profile } : {}),
          callouts: [...generatedCallouts, ...(hc?.callouts ?? [])],
        };
      }
      section[subSlug] = sub as SubSectionOverlay;
    }
  }
  return out;
}
