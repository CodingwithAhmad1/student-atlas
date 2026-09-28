import type { NationalityOverlay } from "../types";

/**
 * Ukraine — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "student": {
    "application-process": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-process-tb",
            blocks: [{ type: "paragraph", text: "In Ukraine the only Home Office-approved TB test clinic is the IOM Healthy and Happy Clinic in Kyiv. The TB certificate waiver for residents of Ukraine covers only the Ukraine Family Scheme, Homes for Ukraine and the Ukraine Extension Scheme, not the Student visa. [CITE: gov.uk/tb-clinics-ukraine]" }],
          },
        ],
      },
    },
    "overview": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-overview-kvlist",
            blocks: [{ type: "paragraph", text: "As of September 2026, Ukrainian nationals already in the UK under one of the Ukraine schemes can apply for the **Ukraine Permission Extension scheme**, which lets them continue to work and study. It is open only to people who already hold permission under a Ukraine scheme. [CITE: gov.uk/ukraine-permission-extension]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
