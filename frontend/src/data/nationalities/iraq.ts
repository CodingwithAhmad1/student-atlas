import type { NationalityOverlay } from "../types";

/**
 * Iraq — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "student": {
    "application-process": {
      US: {
        callouts: [
          {
            afterBlockId: "us-process-book-interview",
            blocks: [{ type: "paragraph", text: "As of September 2026, the US Embassy in Baghdad processes **limited numbers** of nonimmigrant visas, including student visas, and appointments are very limited. Applicants can also try the US Consulate General in Erbil or any US embassy or consulate with available appointments, and F, M and J applicants may request an emergency appointment. [CITE: iq.usembassy.gov/nonimmigrant-visas]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-process-tb",
            blocks: [{ type: "paragraph", text: "Iraq has two Home Office-approved TB test clinics, both run by IOM: **one in Baghdad and one in Erbil**. [CITE: gov.uk/tb-clinics-iraq]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
