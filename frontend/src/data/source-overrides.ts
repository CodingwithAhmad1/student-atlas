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
};
