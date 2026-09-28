import type { NationalityOverlay } from "../types";

/**
 * Thailand — nationality overlay (Tier A).
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
            blocks: [{ type: "paragraph", text: "Both Home Office-approved TB test clinics in Thailand are in Bangkok: BNH Hospital and the International Organisation for Migration (IOM). [CITE: gov.uk/tb-clinics-thailand]" }],
          },
        ],
      },
    },
    "documents": {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-identity",
            blocks: [{ type: "paragraph", text: "Thai men studying abroad privately can apply to **defer conscription selection**: the student, a parent or a guardian files the request with the district chief of the student's military domicile before the selection date on the call-up notice (Sor Dor 35), with a certificate from the Thai embassy, consulate or student office in the destination country. For government scholars supervised by the OCSC, the OCSC makes the application. [CITE: tdc.mi.th/deferral-study-abroad]" }],
          },
          {
            afterBlockId: "us-docs-financial",
            blocks: [{ type: "paragraph", text: "When money is sent from Thailand for education costs abroad, the bank asks for evidence of study, such as a letter from the institution or the OCSC, the institution's bill, or the student visa; transfers under USD 200,000 need no supporting documents. [CITE: bot.or.th/fx-transfer-documents]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "Thai men studying abroad privately can apply to **defer conscription selection**: the student, a parent or a guardian files the request with the district chief of the student's military domicile before the selection date on the call-up notice (Sor Dor 35), with a certificate from the Thai embassy, consulate or student office in the destination country. For government scholars supervised by the OCSC, the OCSC makes the application. [CITE: tdc.mi.th/deferral-study-abroad]" }],
          },
          {
            afterBlockId: "uk-docs-financial-rule",
            blocks: [{ type: "paragraph", text: "When money is sent from Thailand for education costs abroad, the bank asks for evidence of study, such as a letter from the institution or the OCSC, the institution's bill, or the student visa; transfers under USD 200,000 need no supporting documents. [CITE: bot.or.th/fx-transfer-documents]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "Thai men studying abroad privately can apply to **defer conscription selection**: the student, a parent or a guardian files the request with the district chief of the student's military domicile before the selection date on the call-up notice (Sor Dor 35), with a certificate from the Thai embassy, consulate or student office in the destination country. For government scholars supervised by the OCSC, the OCSC makes the application. [CITE: tdc.mi.th/deferral-study-abroad]" }],
          },
          {
            afterBlockId: "au-docs-financial",
            blocks: [{ type: "paragraph", text: "When money is sent from Thailand for education costs abroad, the bank asks for evidence of study, such as a letter from the institution or the OCSC, the institution's bill, or the student visa; transfers under USD 200,000 need no supporting documents. [CITE: bot.or.th/fx-transfer-documents]" }],
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
            afterBlockId: "au-600-apply-intro",
            blocks: [{ type: "paragraph", text: "The Australian Embassy in Bangkok does not help with general visa enquiries: applications are lodged online through ImmiAccount, and questions about a lodged application go to the visa office in Thailand through the Australian Immigration Enquiry Form. [CITE: thailand.embassy.gov.au/visas-and-migration]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
