import type { NationalityOverlay } from "../types";

/**
 * Tunisia — nationality overlay (Tier B).
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
            blocks: [{ type: "paragraph", text: "Tunisian nationals of conscription age who study abroad can apply for a **deferral of national service (sursis militaire)** through the Tunisian consulate covering where they live, as long as they are under 28. The application needs an original enrolment or school attendance certificate and a copy of the residence permit or visa, among other documents [CITE: econsulat.tn/demande-de-sursis-militaire]." }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-arrival-intro",
            blocks: [{ type: "paragraph", text: "Tunisian nationals of conscription age who study abroad can apply for a **deferral of national service (sursis militaire)** through the Tunisian consulate covering where they live, as long as they are under 28. The application needs an original enrolment or school attendance certificate and a copy of the residence permit or visa, among other documents [CITE: econsulat.tn/demande-de-sursis-militaire]." }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-arrival-work",
            blocks: [{ type: "paragraph", text: "Tunisian nationals of conscription age who study abroad can apply for a **deferral of national service (sursis militaire)** through the Tunisian consulate covering where they live, as long as they are under 28. The application needs an original enrolment or school attendance certificate and a copy of the residence permit or visa, among other documents [CITE: econsulat.tn/demande-de-sursis-militaire]." }],
          },
        ],
      },
    },
  },
};

export default overlay;
