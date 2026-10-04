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
   * Raises the watcher's 200,000-character cap on this page's normalized text
   * (MAX_TEXT_CHARS in monitoring/src/normalize.ts) for a long page that must
   * be compared in full. Changing it changes the stored text, so the page's
   * open alert picks up the difference and is reviewed once; set it with
   * headroom so the page does not hit the new cap as it grows.
   */
  maxTextChars?: number;
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

  // The treaty articles run alphabetically past the default 200,000-character
  // cap (it cut the text mid-"Sweden", so Switzerland … Venezuela were not
  // compared). The full publication is ~272,000 characters (2026-10-02).
  "irs.gov/p901": { maxTextChars: 400_000 },

  // ── Eligibility lists feeding the nationality traits (traits/trait-sources.ts) ──
  "gov.uk/visa-national-list": { category: "eligibility" },
  "gov.uk/visa-brake": { category: "eligibility" },
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
  "dgip.gov.pk/dual-nationality": { country: "INTL", category: "citizenship", skipReason: "dgip.gov.pk does not answer the watcher's automated checks reliably; verified by hand on 2026-10-04." },
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
  "cancilleria.gov.co/en/nationality": { country: "INTL", category: "citizenship", skipReason: "cancilleria.gov.co does not answer the watcher's automated checks reliably; verified by hand on 2026-10-04." },
  "elaw.klri.re.kr/nationality-act": { country: "INTL", category: "citizenship" },
  "washington.mofa.go.ug/citizenship-dual-citizenship": { country: "INTL", category: "citizenship" },
  "csidn.cancilleria.gob.ar/argentine-citizenship": { country: "INTL", category: "citizenship", skipReason: "The host fails TLS negotiation with automated clients (network error); verify this page manually." },
  "mofa.gov.iq/washington/passport-issuance": {
    country: "INTL",
    category: "citizenship",
    stripSelectors: [".postbox__meta"], // page-view counter
  },
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
  "giwmscdnone.gov.np/nepal-citizenship-act-2063": { country: "INTL", category: "citizenship" },
  "minjustice.cm/justitia-13-nationalite": { country: "INTL", category: "citizenship" },
  "service-public.gouv.tg/code-nationalite-1978": { country: "INTL", category: "citizenship" },
  "hcc.gov.mg/arret-04-hcc-ar-2023": { country: "INTL", category: "citizenship" },
  "presidence.cd/constitution-2011": { country: "INTL", category: "citizenship" },
  "omrh.gouv.ht/constitution-amendee-2012": { country: "INTL", category: "citizenship" },
  "portal.ahu.go.id/uu-12-2006-kewarganegaraan": { country: "INTL", category: "citizenship" },
  "pbgdpl.gov.vn/cong-dan-viet-nam-dong-thoi-co-quoc-tich-nuoc-ngoai": { country: "INTL", category: "citizenship" },
  "report.dopa.go.th/nationality-act-2508": { country: "INTL", category: "citizenship" },
  "bdlaws.minlaw.gov.bd/citizenship-order-1972-art-2b": { country: "INTL", category: "citizenship" },
  "justice.gov.et/nationality-proclamation-378-2003": { country: "INTL", category: "citizenship" },
  "gov.za/home-affairs-citizenship-portal-2025": { country: "INTL", category: "citizenship" },
  "mitos.gov.gr/loss-greek-citizenship-foreign": { country: "INTL", category: "citizenship" },
  "kdmid.ru/138-fz-citizenship": {
    country: "INTL",
    category: "citizenship",
    skipReason: "kdmid.ru times out for automated clients outside Russia (every run since 2026-09-27); verify this page manually.",
  },
  "pravo.by/citizenship-law-136-z": { country: "INTL", category: "citizenship", skipReason: "pravo.by rejects automated clients (HTTP 403); verify this page manually." },
  "snovmr.gov.ua/multiple-citizenship-2026": { country: "INTL", category: "citizenship" },
  "lex.uz/citizenship-law-zru-610": { country: "INTL", category: "citizenship" },
  "avkd.tj/dual-citizenship-status": { country: "INTL", category: "citizenship" },
  "migration.gov.az/loss-of-citizenship": { country: "INTL", category: "citizenship" },
  "mevzuat.gov.tr/5901-turk-vatandasligi-kanunu": { country: "INTL", category: "citizenship" },
  "chile.gob.cl/nacionalidad": { country: "INTL", category: "citizenship" },
  "mjusticia.gob.es/como-pierde-nacionalidad": { country: "INTL", category: "citizenship" },
  "files.diariodarepublica.pt/lei-organica-1-2026": { country: "INTL", category: "citizenship" },
  "camara.leg.br/ec-131-2023": { country: "INTL", category: "citizenship" },
  "tsc.gob.hn/constitucion": { country: "INTL", category: "citizenship" },
  "asambleanacional.gob.ec/constitucion": { country: "INTL", category: "citizenship" },
  "anc.pj.gob.pe/constitucion-1993": { country: "INTL", category: "citizenship" },
  "planificacion.gob.bo/constitucion": { country: "INTL", category: "citizenship" },
  "presidencia.gob.do/constitucion-2015": { country: "INTL", category: "citizenship" },
  "asambleanacional.gob.ve/constitucion": { country: "INTL", category: "citizenship" },
  "gacetaoficial.gob.cu/constitucion": { country: "INTL", category: "citizenship" },
  "cne.ao/lei-2-16-nacionalidade": {
    country: "INTL",
    category: "citizenship",
    skipReason: "The host sends an incomplete TLS certificate chain, so automated clients cannot verify it; verify this page manually.",
  },
  "parlamento.mz/constituicao": { country: "INTL", category: "citizenship" },
  "legifrance.gouv.fr/code-civil-art-23": { country: "INTL", category: "citizenship", skipReason: "Légifrance rejects automated clients (HTTP 403); verify this page manually." },
  "sgg.gouv.bj/loi-2022-32-nationalite": { country: "INTL", category: "citizenship" },
  "coursupreme.org.gn/code-civil-2019": { country: "INTL", category: "citizenship" },
  "sgg-mali.ml/cpf-2011-art-249": { country: "INTL", category: "citizenship" },
  "joradp.dz/ordonnance-05-01-nationalite": { country: "INTL", category: "citizenship" },
  "tgr.gov.ma/code-nationalite-marocaine": { country: "INTL", category: "citizenship" },
  "cspd.gov.jo/nationality-law": { country: "INTL", category: "citizenship" },
  "yemennic.net/nationality-law": { country: "INTL", category: "citizenship" },
  // Tier A (2026-09-28)
  "portal.cscse.edu.cn/degree-authentication": { country: "INTL", skipReason: "The host refuses automated clients from outside China (network error); verify this page manually." },
  "u.ae/armed-forces": { country: "INTL", skipReason: "u.ae renders its content with JavaScript, so automated fetches see no text; verify this page manually." },
  "u.ae/qualification-recognition": { country: "INTL", skipReason: "u.ae renders its content with JavaScript, so automated fetches see no text; verify this page manually." },
  // Dual-nationality retry (2026-09-28).
  "migration.gov.rw/organic-law-nationality-2021": { country: "INTL", category: "citizenship" },
  "justice.gov.tn/code-nationalite": { country: "INTL", category: "citizenship" },
  "dri.gouv.sn/loi-61-10-nationalite": { country: "INTL", category: "citizenship" },
  "sri.ro/legea-21-1991-cetatenie": { country: "INTL", category: "citizenship" },
  "adilet.zan.kz/law-on-citizenship": { country: "INTL", category: "citizenship", skipReason: "The page renders its content client-side, so the watcher sees only the title; verify this page manually (the site's API, /api/documents/by-ngr/Z910004800_?language=eng, returns the text)." },
  "saudipedia.com/saudi-nationality-law": { country: "INTL", category: "citizenship" },
  "malawiembassyusa.com/dual-citizenship-sop": { country: "INTL", category: "citizenship" },
  "icric.gov.so/constitution-chapters-1-4": { country: "INTL", category: "citizenship" },
  "petrocom.gov.gh/constitution-art-8": { country: "INTL", category: "citizenship" },
  // Tier B retry (2026-09-28): pages automated clients cannot read.
  "consulado.pe/autorizacion-viaje-menores": { skipReason: "The host sends an incomplete TLS certificate chain, so automated clients cannot verify it; verify this page manually." },
  "ve.usembassy.gov/visas": { skipReason: "usembassy.gov rejects automated clients (HTTP 403); verify this page manually." },
  "ma.usembassy.gov/visas": { skipReason: "usembassy.gov rejects automated clients (HTTP 403); verify this page manually." },
  "sn.usembassy.gov/visas": { skipReason: "usembassy.gov rejects automated clients (HTTP 403); verify this page manually." },
  "iq.usembassy.gov/nonimmigrant-visas": { skipReason: "usembassy.gov rejects automated clients (HTTP 403); verify this page manually." },
  "state.gov/embassy-caracas-resumption": { skipReason: "state.gov rejects automated clients (HTTP 403); verify this page manually." },
  // A randomised "related posts" list churns on every fetch.
  "minesup.gov.cm/equivalence-platform": { stripSelectors: [".related-posts"] },
  // Dual-nationality pass 4 (2026-09-28): archived copies of official pages (label ends in *).
  "amategeko.gov.bi/loi-1-013-2000-code-nationalite": { country: "INTL", category: "citizenship", skipReason: "Cited from an Internet Archive copy because the official page is offline or blocked; the copy never changes. Check once a year whether the official page is back and cite it instead." },
  "gouv.ci/code-nationalite-61-415": { country: "INTL", category: "citizenship", skipReason: "Cited from an Internet Archive copy because the official page is offline or blocked; the copy never changes. Check once a year whether the official page is back and cite it instead." },
  "coj.gov.kh/law-on-nationality-2018": { country: "INTL", category: "citizenship", skipReason: "Cited from an Internet Archive copy because the official page is offline or blocked; the copy never changes. Check once a year whether the official page is back and cite it instead." },
  "minex.gob.gt/ley-de-nacionalidad": { country: "INTL", category: "citizenship", skipReason: "Cited from an Internet Archive copy because the official page is offline or blocked; the copy never changes. Check once a year whether the official page is back and cite it instead." },
  "rc.majlis.ir/civil-code": { country: "INTL", category: "citizenship", skipReason: "Cited from an Internet Archive copy because the official page is offline or blocked; the copy never changes. Check once a year whether the official page is back and cite it instead." },
  "mojca.gov.ss/transitional-constitution": { country: "INTL", category: "citizenship", skipReason: "Cited from an Internet Archive copy because the official page is offline or blocked; the copy never changes. Check once a year whether the official page is back and cite it instead." },
  "moj.gov.sd/nationality-act-1994": { country: "INTL", category: "citizenship", skipReason: "Cited from an Internet Archive copy because the official page is offline or blocked; the copy never changes. Check once a year whether the official page is back and cite it instead." },
  "moj.gov.sy/nationality-decree-276-1969": { country: "INTL", category: "citizenship", skipReason: "Cited from an Internet Archive copy because the official page is offline or blocked; the copy never changes. Check once a year whether the official page is back and cite it instead." },
};
