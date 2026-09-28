import type { NationalityOverlay } from "../types";

/**
 * Cameroon — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "student": {
    "after-arrival": {
      US: {
        callouts: [
          {
            afterBlockId: "us-arrival-travel",
            blocks: [{ type: "paragraph", text: "Cameroon's Ministry of Higher Education (MINESUP) assesses foreign degrees for equivalence, and since 1 January 2025 applications are made and tracked **online at equivalence.cm**. The cited official page is in French. [CITE: minesup.gov.cm/equivalence-platform]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-arrival-intro",
            blocks: [{ type: "paragraph", text: "Cameroon's Ministry of Higher Education (MINESUP) assesses foreign degrees for equivalence, and since 1 January 2025 applications are made and tracked **online at equivalence.cm**. The cited official page is in French. [CITE: minesup.gov.cm/equivalence-platform]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-arrival-work",
            blocks: [{ type: "paragraph", text: "Cameroon's Ministry of Higher Education (MINESUP) assesses foreign degrees for equivalence, and since 1 January 2025 applications are made and tracked **online at equivalence.cm**. The cited official page is in French. [CITE: minesup.gov.cm/equivalence-platform]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
