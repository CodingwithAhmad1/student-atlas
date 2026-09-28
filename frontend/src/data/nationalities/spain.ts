import type { NationalityOverlay } from "../types";

/**
 * Spain — nationality overlay (Tier B).
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
            afterBlockId: "uk-process-biometrics",
            blocks: [{ type: "paragraph", text: "With a biometric Spanish passport you can usually prove your identity with the **UK Immigration: ID Check app** instead of attending a visa application centre, because the app accepts biometric passports from EU countries [CITE: gov.uk/uk-immigration-id-check-app]. If the app cannot read the passport chip, you book a VAC or UKVCAS appointment instead [CITE: gov.uk/uk-immigration-id-check-app]. Once approved, you travel on a digital immigration status and get no vignette in your passport [CITE: gov.uk/uk-immigration-id-check-app]." }],
          },
        ],
      },
    },
    "overview": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-overview-kvlist",
            blocks: [{ type: "paragraph", text: "Spanish students in full-time higher education who hold a European Health Insurance Card (EHIC) issued in Spain or another EU country can apply for a refund of the immigration health surcharge once they live in the UK [CITE: gov.uk/ihs-refund-eu-students]. The surcharge is still paid with the visa application, the refund is not available to anyone who works or intends to work in the UK while studying, and afterwards the EHIC covers only medically necessary treatment [CITE: gov.uk/ihs-refund-eu-students]." }],
          },
        ],
      },
    },
  },
};

export default overlay;
