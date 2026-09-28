import type { NationalityOverlay } from "../types";

/**
 * Philippines — nationality overlay (Tier A).
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
            blocks: [{ type: "paragraph", text: "In the Philippines, Home Office-approved TB clinics are in Manila, Cebu City, Davao City, Iloilo City and Cagayan de Oro City, and UKVI does not accept a certificate from any other clinic. [CITE: gov.uk/tb-clinics-philippines]" }],
          },
        ],
      },
    },
    "documents": {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-identity",
            blocks: [{ type: "paragraph", text: "Academic records from a Philippine private college or local university that will be used outside the Philippines need a CHED **Certification, Authentication and Verification (CAV)**: the registrar certifies them and endorses them to the CHED regional office, and the applicant then takes the sealed CAV to a DFA office. [CITE: caraga.ched.gov.ph/how-to-apply-for-cav] Start this early if a university abroad asks for authenticated records." }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "Academic records from a Philippine private college or local university that will be used outside the Philippines need a CHED **Certification, Authentication and Verification (CAV)**: the registrar certifies them and endorses them to the CHED regional office, and the applicant then takes the sealed CAV to a DFA office. [CITE: caraga.ched.gov.ph/how-to-apply-for-cav] Start this early if a university abroad asks for authenticated records." }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "Academic records from a Philippine private college or local university that will be used outside the Philippines need a CHED **Certification, Authentication and Verification (CAV)**: the registrar certifies them and endorses them to the CHED regional office, and the applicant then takes the sealed CAV to a DFA office. [CITE: caraga.ched.gov.ph/how-to-apply-for-cav] Start this early if a university abroad asks for authenticated records." }],
          },
        ],
      },
    },
  },
};

export default overlay;
