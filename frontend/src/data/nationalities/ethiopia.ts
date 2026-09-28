import type { NationalityOverlay } from "../types";

/**
 * Ethiopia — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "residency": {
    "dual-nationality": {
      _crossCutting: {
        callouts: [
          {
            afterBlockId: "dual-origin-position",
            blocks: [{ type: "paragraph", text: "A former Ethiopian national who takes another citizenship other than Eritrean (or a foreign national with an Ethiopian parent, grandparent or great-grandparent) can hold an **Ethiopian Origin ID card**. Holders need no entry visa or residence permit to live in Ethiopia and can work there without a work permit, but cannot vote, stand for office, or be employed on a regular basis in defence, security or foreign affairs [CITE: justice.gov.et/proclamation-270-2002]." }],
          },
        ],
      },
    },
  },
};

export default overlay;
