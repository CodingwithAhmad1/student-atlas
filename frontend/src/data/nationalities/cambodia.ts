import type { NationalityOverlay } from "../types";

/**
 * Cambodia — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "student": {
    "overview": {
      AU: {
        callouts: [
          {
            afterBlockId: "au-overview-kvlist",
            blocks: [{ type: "paragraph", text: "Cambodians can apply for **Australia Awards Scholarships**, run by the Department of Foreign Affairs and Trade, for full-time postgraduate study at Australian institutions. [CITE: cambodia.embassy.gov.au/study]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
