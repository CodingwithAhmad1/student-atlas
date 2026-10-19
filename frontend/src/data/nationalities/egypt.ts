import type { NationalityOverlay } from "../types";

/**
 * Egypt — nationality overlay (Tier A).
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
            blocks: [{ type: "paragraph", text: "Egyptian men studying in the United States can defer military service for study, up to age 25 for a bachelor's degree or age 29 for a master's or doctorate. The Egyptian Educational Bureau in Washington handles the deferral after registration on the Higher Education Ministry platform (sus.cdm.edu.eg), and the travel permit that follows is valid for one year for multiple trips. [CITE: egyptembassy.net/military-service]" }],
          },
        ],
      },
      UK: {
        callouts: [],
      },
      AU: {
        callouts: [],
      },
    },
  },
  "work": {
    "post-study-work": {
      US: {
        callouts: [
          {
            afterBlockId: "us-psw-cliff",
            blocks: [{ type: "paragraph", text: "To use a US degree or transcript in Egypt, have it certified first by the Egyptian Cultural and Educational Bureau in Washington, then legalized by the Egyptian consulate that serves your state. [CITE: egyptembassy.net/personal-legalization]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
