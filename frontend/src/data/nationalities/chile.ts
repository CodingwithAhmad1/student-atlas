import type { NationalityOverlay } from "../types";

/**
 * Chile — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "student": {
    "documents": {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-identity",
            blocks: [{ type: "paragraph", text: "A Chilean student under 18 who leaves Chile without both parents needs written authorisation from the parent not travelling, or from both if travelling alone, given before a notary or by the competent court. The same authorisation must be shown again on return to Chile. [CITE: consulado.gob.cl/salir-con-menor]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "A Chilean student under 18 who leaves Chile without both parents needs written authorisation from the parent not travelling, or from both if travelling alone, given before a notary or by the competent court. The same authorisation must be shown again on return to Chile. [CITE: consulado.gob.cl/salir-con-menor]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "A Chilean student under 18 who leaves Chile without both parents needs written authorisation from the parent not travelling, or from both if travelling alone, given before a notary or by the competent court. The same authorisation must be shown again on return to Chile. [CITE: consulado.gob.cl/salir-con-menor]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
