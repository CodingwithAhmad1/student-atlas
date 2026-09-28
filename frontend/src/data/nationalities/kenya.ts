import type { NationalityOverlay } from "../types";

/**
 * Kenya — nationality overlay (Tier A).
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
            blocks: [{ type: "paragraph", text: "GOV.UK lists one Home Office-approved TB clinic in Kenya: IOM Kenya, 78 UN Crescent, Gigiri, Nairobi. It advises booking an appointment at least 10 weeks before you travel. [CITE: gov.uk/tb-clinics-kenya]" }],
          },
        ],
      },
    },
    "documents": {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-identity",
            blocks: [{ type: "paragraph", text: "The State Department for Foreign Affairs authenticates (legalises) Kenyan academic certificates, police clearance certificates, and birth and marriage certificates. Applications are made online through eCitizen. [CITE: mfa.ecitizen.go.ke]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "The State Department for Foreign Affairs authenticates (legalises) Kenyan academic certificates, police clearance certificates, and birth and marriage certificates. Applications are made online through eCitizen. [CITE: mfa.ecitizen.go.ke]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "The State Department for Foreign Affairs authenticates (legalises) Kenyan academic certificates, police clearance certificates, and birth and marriage certificates. Applications are made online through eCitizen. [CITE: mfa.ecitizen.go.ke]" }],
          },
        ],
      },
    },
  },
  "work": {
    "post-study-work": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-psw-transition",
            blocks: [{ type: "paragraph", text: "As of September 2026, Kenya is one of the countries eligible for **Commonwealth Master's Scholarships** in the United Kingdom. Kenyan citizens permanently resident in Kenya apply through a nominating body, mainly the national nominating agency, not directly to the Commission. Commonwealth Scholars commit to returning home after the scholarship and may not switch to the Graduate visa or another visa to stay in the UK. [CITE: cscuk.fcdo.gov.uk/commonwealth-masters-scholarships]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
