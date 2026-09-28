import type { NationalityOverlay } from "../types";

/**
 * Algeria — nationality overlay (Tier B).
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
            blocks: [{ type: "paragraph", text: "National service is an obligation for Algerian nationals aged 19 and over, and Algerian consulates abroad register nationals from age 17 and handle requests for a **deferral (sursis)** or an exemption [CITE: embaccra.mfa.gov.dz/autres-services]. Renewing a deferral from abroad requires a school certificate and a copy of the residence permit among other documents, so Algerian students should keep their national service status current through the consulate covering where they study [CITE: cgparis.mfa.gov.dz/demande-renouvellement-sursis]." }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-arrival-intro",
            blocks: [{ type: "paragraph", text: "National service is an obligation for Algerian nationals aged 19 and over, and Algerian consulates abroad register nationals from age 17 and handle requests for a **deferral (sursis)** or an exemption [CITE: embaccra.mfa.gov.dz/autres-services]. Renewing a deferral from abroad requires a school certificate and a copy of the residence permit among other documents, so Algerian students should keep their national service status current through the consulate covering where they study [CITE: cgparis.mfa.gov.dz/demande-renouvellement-sursis]." }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-arrival-work",
            blocks: [{ type: "paragraph", text: "National service is an obligation for Algerian nationals aged 19 and over, and Algerian consulates abroad register nationals from age 17 and handle requests for a **deferral (sursis)** or an exemption [CITE: embaccra.mfa.gov.dz/autres-services]. Renewing a deferral from abroad requires a school certificate and a copy of the residence permit among other documents, so Algerian students should keep their national service status current through the consulate covering where they study [CITE: cgparis.mfa.gov.dz/demande-renouvellement-sursis]." }],
          },
        ],
      },
    },
  },
};

export default overlay;
