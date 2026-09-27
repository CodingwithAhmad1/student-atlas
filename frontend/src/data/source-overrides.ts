// Relative import (not "@/") so the monitoring watcher can load this file via tsx.
import type { SourceCategory, SourceCountry } from "../lib/classify-source";

export interface SourceOverride {
  country?: SourceCountry;
  category?: SourceCategory;
  /**
   * CSS selector for the main content region of this page, used by the
   * monitoring watcher when the default selectors (main, #main-content,
   * [role=main], article) pick up too much or too little.
   */
  contentSelector?: string;
  /**
   * Extra CSS selectors removed before hashing — for page regions that churn
   * without the guidance changing (rotating blog teasers, promo carousels).
   */
  stripSelectors?: string[];
  /**
   * Set when automated monitoring cannot fetch this page (bot protection,
   * TLS blocking). The watcher skips it and the Activity tab reports it as
   * not monitorable instead of endlessly failing.
   */
  skipReason?: string;
}

const STATE_GOV_BLOCKED =
  "travel.state.gov blocks automated clients (Akamai bot protection); verify this page manually.";

/**
 * Explicit corrections applied on top of `classifySource` heuristics.
 * Add an entry here whenever a source is misclassified or its page needs a
 * custom content selector to hash reliably.
 */
export const sourceOverrides: Record<string, SourceOverride> = {
  // UAE federal-law reference for dual-nationality guidance — not a US source.
  "uaecabinet.ae/en/details/federal-laws": {
    country: "INTL",
    category: "citizenship",
    skipReason:
      "uaecabinet.ae rejects automated clients (HTTP 403); verify this page manually.",
  },
  // Verified 2026-08-20: these hosts reject non-browser TLS fingerprints, so
  // the watcher cannot fetch them without resorting to bot-detection evasion.
  "travel.state.gov/B-visa": { skipReason: STATE_GOV_BLOCKED },
  "travel.state.gov/fees": { skipReason: STATE_GOV_BLOCKED },
  "travel.state.gov/esta-countries": { skipReason: STATE_GOV_BLOCKED },
  "travel.state.gov/photos": { skipReason: STATE_GOV_BLOCKED },
  "travel.state.gov/visa-bulletin": { skipReason: STATE_GOV_BLOCKED },
  "travel.state.gov/student-visa": { skipReason: STATE_GOV_BLOCKED },
  "ceac.state.gov/genniv": {
    skipReason:
      "ceac.state.gov refuses automated TLS connections; verify this page manually.",
  },
  "ukvcas.co.uk": {
    skipReason:
      "ukvcas.co.uk refuses automated TLS connections; verify this page manually.",
  },
  // These are JavaScript applications whose pages contain no static text to
  // monitor (verified 2026-08-20).
  "cbp.gov/i94": {
    skipReason:
      "The I-94 site is a JavaScript application with no static text to monitor; verify manually.",
  },
  // Only ever serves a redirect error or maintenance notice to non-browser
  // clients (verified 2026-09-27), so its "changes" were never the fee.
  "fmjfee.com": {
    skipReason:
      "The I-901 fee site is a JavaScript application with no static text to monitor; verify the fee manually.",
  },
  // The homepage's "Recent blogs" teaser list rotates every few weeks and
  // raised an alert each time (verified 2026-09-27).
  "studyinthestates.dhs.gov": {
    stripSelectors: [".paragraph--type--recent-blogs"],
  },

  // ── Eligibility lists feeding the nationality traits (traits/trait-sources.ts) ──
  "gov.uk/visa-national-list": { category: "eligibility" },
  "gov.uk/tb-test-countries": { category: "eligibility" },
  "gov.uk/appendix-english-language": { category: "eligibility" },
  "gov.uk/appendix-student": {
    category: "eligibility",
    // The whole appendix is ~48k characters; only ST 22 (differential evidence) matters.
  },
  "gov.uk/youth-mobility-eligibility": { category: "eligibility" },
  "dhs.gov/visa-waiver-program": { category: "eligibility" },
  "whitehouse.gov/proclamation-10998": { category: "eligibility" },
  "immi.homeaffairs.gov.au/health-examinations": { category: "eligibility" },
  "immi.homeaffairs.gov.au/biometrics": { category: "eligibility" },
  "ofac.treasury.gov/sanctions-programs": { country: "INTL", category: "eligibility" },
  // Home-country dual-nationality pages (decision D3).
  "dgip.gov.pk/dual-nationality": { country: "INTL", category: "citizenship" },
  "nia.gov.cn/nationality-law": { country: "INTL", category: "citizenship" },
  "immi.homeaffairs.gov.au/dual-citizen": { category: "citizenship" },
  "gov.uk/dual-citizenship": { category: "citizenship" },
  "travel.state.gov/dual-nationality": { category: "citizenship", skipReason: STATE_GOV_BLOCKED },
  "travel.state.gov/dv-instructions": { category: "eligibility", skipReason: STATE_GOV_BLOCKED },
  // Home-government dual-nationality pages (decision D3), added in Phase 2 of the expansion.
  "nigeriaconsulatenewyork.org/faqs-dual-citizenship": { country: "INTL", category: "citizenship" },
  "gob.mx/sre-double-nationality": { country: "INTL", category: "citizenship" },
  "japaneselawtranslation.go.jp/nationality-act": { country: "INTL", category: "citizenship" },
  "newyorkpcg.org/dual-citizenship-ra9225": { country: "INTL", category: "citizenship" },
  "egyptembassy.net/dual-citizenship-approval": { country: "INTL", category: "citizenship" },
  "auswaertiges-amt.de/nationality-law": { country: "INTL", category: "citizenship" },
  "foreign.go.tz/frequently-asked-question-faq": { country: "INTL", category: "citizenship", skipReason: "The host fails TLS negotiation with automated clients (network error); verify this page manually." },
  "esteri.it/citizenship": { country: "INTL", category: "citizenship" },
  "immigration.go.ke/dual-citizenship": { country: "INTL", category: "citizenship" },
  "cancilleria.gov.co/en/nationality": { country: "INTL", category: "citizenship" },
  "elaw.klri.re.kr/nationality-act": { country: "INTL", category: "citizenship" },
  "washington.mofa.go.ug/citizenship-dual-citizenship": { country: "INTL", category: "citizenship" },
  "csidn.cancilleria.gob.ar/argentine-citizenship": { country: "INTL", category: "citizenship", skipReason: "The host fails TLS negotiation with automated clients (network error); verify this page manually." },
  "mofa.gov.iq/washington/passport-issuance": { country: "INTL", category: "citizenship" },
  "ircc.canada.ca/dual-citizenship": { country: "INTL", category: "citizenship" },
  "gov.pl/renunciation-of-polish-citizenship": { country: "INTL", category: "citizenship" },
  "malaysia.gov.my/kewarganegaraan": { country: "INTL", category: "citizenship", skipReason: "The page renders its content client-side, so the watcher sees only the title; verify this page manually." },
  "law.moj.gov.tw/nationality-act": { country: "INTL", category: "citizenship" },
  "hc-london.gov.lk/dual-citizenship": { country: "INTL", category: "citizenship" },
  "zambiaembassy.org/dual-citizenship": { country: "INTL", category: "citizenship" },
  "ind.nl/losing-dutch-nationality": { country: "INTL", category: "citizenship" },
  "zimgaborone.gov.zw/dual-citizenship": { country: "INTL", category: "citizenship" },
  "diplomatie.belgium.be/nationality": { country: "INTL", category: "citizenship" },
  "bmeia.gv.at/dual-citizenship": { country: "INTL", category: "citizenship" },
  "mzv.gov.cz/czech-citizenship-legislation": { country: "INTL", category: "citizenship" },
  "migrationsverket.se/what-swedish-citizenship-means": { country: "INTL", category: "citizenship" },
  "ica.gov.pg/citizenship-and-dual-citizenship": { country: "INTL", category: "citizenship" },
  "washington.mfa.gov.hu/about-hungarian-citizenship": { country: "INTL", category: "citizenship" },
};
