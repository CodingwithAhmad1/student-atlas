import type { NationalityOverlay } from "../types";

/**
 * Peru — nationality overlay (Tier B).
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
            blocks: [{ type: "paragraph", text: "A Peruvian student under 18 who leaves Peru alone or with only one parent needs a **travel authorisation** from the parents, valid for one trip. Peruvian minors who live abroad need one only if their stay in Peru has exceeded 183 days. The cited official page is in Spanish. [CITE: consulado.pe/autorizacion-viaje-menores]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "A Peruvian student under 18 who leaves Peru alone or with only one parent needs a **travel authorisation** from the parents, valid for one trip. Peruvian minors who live abroad need one only if their stay in Peru has exceeded 183 days. The cited official page is in Spanish. [CITE: consulado.pe/autorizacion-viaje-menores]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "A Peruvian student under 18 who leaves Peru alone or with only one parent needs a **travel authorisation** from the parents, valid for one trip. Peruvian minors who live abroad need one only if their stay in Peru has exceeded 183 days. The cited official page is in Spanish. [CITE: consulado.pe/autorizacion-viaje-menores]" }],
          },
        ],
      },
    },
  },
  "visit": {
    "how-to-apply": {
      AU: {
        callouts: [
          {
            afterBlockId: "au-600-apply-form",
            blocks: [{ type: "paragraph", text: "Documents in Spanish must be uploaded with an English translation alongside the original. Outside Australia, official documents such as birth certificates and national ID cards must be translated by a **sworn translator**; passports and bank statements need no translation if an English reader can understand them. [CITE: peru.embassy.gov.au/apply]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
