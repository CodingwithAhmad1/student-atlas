import type { NationalityOverlay } from "../types";

/**
 * Senegal — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "visit": {
    "how-to-apply": {
      US: {
        callouts: [
          {
            afterBlockId: "us-apply-book",
            blocks: [{ type: "paragraph", text: "As of September 2026, Senegalese nationals whom a consular officer finds otherwise eligible for a B-1/B-2 visitor visa must post a **bond of up to $15,000** before the visa is issued, wherever they apply. The officer gives instructions at the interview; do not pay a bond before then or through any third-party website. [CITE: sn.usembassy.gov/visas]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
