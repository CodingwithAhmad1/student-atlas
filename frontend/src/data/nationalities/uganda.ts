import type { NationalityOverlay } from "../types";

/**
 * Uganda — nationality overlay (Tier B).
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
            blocks: [{ type: "paragraph", text: "Ugandan nationals are Commonwealth citizens under UK nationality law [CITE: legislation.gov.uk/bna-1981-schedule-3], so a Ugandan with a grandparent born in the UK, the Channel Islands or the Isle of Man may qualify for the **UK Ancestry visa**, which allows work and a stay of 5 years [CITE: gov.uk/ancestry-visa]. You cannot switch into it from another UK visa, such as the Student or Graduate visa [CITE: gov.uk/ancestry-visa]." }],
          },
        ],
      },
    },
  },
};

export default overlay;
