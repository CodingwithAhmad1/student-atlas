import type { NationalityOverlay } from "../types";

/**
 * Colombia — nationality overlay (Tier A).
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
            blocks: [{ type: "paragraph", text: "A Colombian student under 18 who leaves Colombia without both parents needs an **exit permit** signed by each parent who is not travelling, plus a copy of the birth registration (registro civil). A parent in Colombia signs the permit before a notary; a parent abroad signs it in Spanish before a notary and has it apostilled. The rule also applies to dual nationals whose other nationality is Colombian. [CITE: migracioncolombia.gov.co/salida-menores]" }],
          },
          {
            afterBlockId: "us-docs-supporting",
            blocks: [{ type: "paragraph", text: "Before a Colombian university degree, transcript or acta de grado can be apostilled, the Ministry of Education (MEN) must verify it through its free online legalisation service; the apostille is then issued online by the Ministry of Foreign Affairs (Cancillería). [CITE: mineducacion.gov.co/legalizacion-educacion-superior] Start this early if a university or employer abroad asks for apostilled copies." }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "A Colombian student under 18 who leaves Colombia without both parents needs an **exit permit** signed by each parent who is not travelling, plus a copy of the birth registration (registro civil). A parent in Colombia signs the permit before a notary; a parent abroad signs it in Spanish before a notary and has it apostilled. The rule also applies to dual nationals whose other nationality is Colombian. [CITE: migracioncolombia.gov.co/salida-menores]" }],
          },
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "Before a Colombian university degree, transcript or acta de grado can be apostilled, the Ministry of Education (MEN) must verify it through its free online legalisation service; the apostille is then issued online by the Ministry of Foreign Affairs (Cancillería). [CITE: mineducacion.gov.co/legalizacion-educacion-superior] Start this early if a university or employer abroad asks for apostilled copies." }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "A Colombian student under 18 who leaves Colombia without both parents needs an **exit permit** signed by each parent who is not travelling, plus a copy of the birth registration (registro civil). A parent in Colombia signs the permit before a notary; a parent abroad signs it in Spanish before a notary and has it apostilled. The rule also applies to dual nationals whose other nationality is Colombian. [CITE: migracioncolombia.gov.co/salida-menores]" }],
          },
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "Before a Colombian university degree, transcript or acta de grado can be apostilled, the Ministry of Education (MEN) must verify it through its free online legalisation service; the apostille is then issued online by the Ministry of Foreign Affairs (Cancillería). [CITE: mineducacion.gov.co/legalizacion-educacion-superior] Start this early if a university or employer abroad asks for apostilled copies." }],
          },
        ],
      },
    },
    "after-arrival": {
      US: {
        callouts: [
          {
            afterBlockId: "us-arrival-travel",
            blocks: [{ type: "paragraph", text: "Colombian men living abroad remain subject to military service registration, and can settle their military situation definitively through a Colombian consulate once they show at least three years of residence abroad. [CITE: colombiacompra.gov.co/ley-1861-2017]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-arrival-intro",
            blocks: [{ type: "paragraph", text: "Colombian men living abroad remain subject to military service registration, and can settle their military situation definitively through a Colombian consulate once they show at least three years of residence abroad. [CITE: colombiacompra.gov.co/ley-1861-2017]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-arrival-work",
            blocks: [{ type: "paragraph", text: "Colombian men living abroad remain subject to military service registration, and can settle their military situation definitively through a Colombian consulate once they show at least three years of residence abroad. [CITE: colombiacompra.gov.co/ley-1861-2017]" }],
          },
        ],
      },
    },
  },
  "work": {
    "post-study-work": {
      US: {
        callouts: [
          {
            afterBlockId: "us-psw-cliff",
            blocks: [{ type: "paragraph", text: "A foreign degree has the same academic and legal effect in Colombia as a Colombian one only after the Ministry of Education **convalidates** it. Convalidation is required to obtain a professional licence (tarjeta profesional) in a regulated profession, to work in the public sector, to bid for public contracts and for placement on the teachers' pay scale; the foreign degree must be apostilled or legalised and translated into Spanish, and the application is made online. [CITE: mineducacion.gov.co/convalidacion-proceso]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-psw-transition",
            blocks: [{ type: "paragraph", text: "A foreign degree has the same academic and legal effect in Colombia as a Colombian one only after the Ministry of Education **convalidates** it. Convalidation is required to obtain a professional licence (tarjeta profesional) in a regulated profession, to work in the public sector, to bid for public contracts and for placement on the teachers' pay scale; the foreign degree must be apostilled or legalised and translated into Spanish, and the application is made online. [CITE: mineducacion.gov.co/convalidacion-proceso]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-psw-application",
            blocks: [{ type: "paragraph", text: "A foreign degree has the same academic and legal effect in Colombia as a Colombian one only after the Ministry of Education **convalidates** it. Convalidation is required to obtain a professional licence (tarjeta profesional) in a regulated profession, to work in the public sector, to bid for public contracts and for placement on the teachers' pay scale; the foreign degree must be apostilled or legalised and translated into Spanish, and the application is made online. [CITE: mineducacion.gov.co/convalidacion-proceso]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
