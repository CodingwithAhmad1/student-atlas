import type { NationalityOverlay } from "../types";

/**
 * Argentina — nationality overlay (Tier B).
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
            blocks: [{ type: "paragraph", text: "An Argentine student under 18 who leaves Argentina with only one parent, alone or with another adult needs a travel authorisation from the parents, given before a notary, a judge or another competent public authority. [CITE: argentina.gob.ar/salida-de-menores] The Dirección Nacional de Migraciones also issues it at its offices. [CITE: argentina.gob.ar/migraciones-autorizacion-menores]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "An Argentine student under 18 who leaves Argentina with only one parent, alone or with another adult needs a travel authorisation from the parents, given before a notary, a judge or another competent public authority. [CITE: argentina.gob.ar/salida-de-menores] The Dirección Nacional de Migraciones also issues it at its offices. [CITE: argentina.gob.ar/migraciones-autorizacion-menores]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "An Argentine student under 18 who leaves Argentina with only one parent, alone or with another adult needs a travel authorisation from the parents, given before a notary, a judge or another competent public authority. [CITE: argentina.gob.ar/salida-de-menores] The Dirección Nacional de Migraciones also issues it at its offices. [CITE: argentina.gob.ar/migraciones-autorizacion-menores]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
