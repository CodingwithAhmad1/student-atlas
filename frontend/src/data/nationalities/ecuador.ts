import type { NationalityOverlay } from "../types";

/**
 * Ecuador — nationality overlay (Tier B).
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
            blocks: [{ type: "paragraph", text: "An Ecuadorian student under 18 who leaves Ecuador with only one parent needs prior notarial or judicial authorisation from the parent not travelling; one travelling alone or with other adults needs authorisation from the parents or guardians. No authorisation is needed when the student travels with both parents. [CITE: ministeriodegobierno.gob.ec/requisitos-salir-del-pais]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "An Ecuadorian student under 18 who leaves Ecuador with only one parent needs prior notarial or judicial authorisation from the parent not travelling; one travelling alone or with other adults needs authorisation from the parents or guardians. No authorisation is needed when the student travels with both parents. [CITE: ministeriodegobierno.gob.ec/requisitos-salir-del-pais]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "An Ecuadorian student under 18 who leaves Ecuador with only one parent needs prior notarial or judicial authorisation from the parent not travelling; one travelling alone or with other adults needs authorisation from the parents or guardians. No authorisation is needed when the student travels with both parents. [CITE: ministeriodegobierno.gob.ec/requisitos-salir-del-pais]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
