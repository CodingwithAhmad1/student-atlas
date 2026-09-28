import type { NationalityOverlay } from "../types";

/**
 * Zimbabwe — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "residency": {
    "permanent-residency": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-pr-timeline",
            blocks: [{ type: "paragraph", text: "Citizens of Zimbabwe are named on the eligibility list for the **UK Ancestry visa** alongside Commonwealth citizens, so a Zimbabwean with a grandparent born in the UK, the Channel Islands or the Isle of Man may qualify [CITE: gov.uk/ancestry-visa]. It allows work and a stay of 5 years, but you cannot switch into it from another UK visa, such as the Student or Graduate visa [CITE: gov.uk/ancestry-visa]." }],
          },
        ],
      },
    },
  },
};

export default overlay;
