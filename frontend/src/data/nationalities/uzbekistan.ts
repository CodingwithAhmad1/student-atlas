import type { NationalityOverlay } from "../types";

/**
 * Uzbekistan — nationality overlay (Tier B).
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
            blocks: [{ type: "paragraph", text: "Uzbekistan has one Home Office-approved TB test clinic, **Tashkent International Clinic** in Tashkent, so applicants from other regions need to travel to the capital for the test. [CITE: gov.uk/tb-clinics-uzbekistan]" }],
          },
        ],
      },
    },
    "documents": {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-identity",
            blocks: [{ type: "paragraph", text: "Under Uzbekistan's military duty law, conscripts and reservists who leave to study for more than three months must **deregister from military registration** where they live, and must report changes of residence or education to their registration office within seven days. The cited official page is in Russian. [CITE: lex.uz/military-duty-law]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "Under Uzbekistan's military duty law, conscripts and reservists who leave to study for more than three months must **deregister from military registration** where they live, and must report changes of residence or education to their registration office within seven days. The cited official page is in Russian. [CITE: lex.uz/military-duty-law]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "Under Uzbekistan's military duty law, conscripts and reservists who leave to study for more than three months must **deregister from military registration** where they live, and must report changes of residence or education to their registration office within seven days. The cited official page is in Russian. [CITE: lex.uz/military-duty-law]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
