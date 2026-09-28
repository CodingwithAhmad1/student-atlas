import type { NationalityOverlay } from "../types";

/**
 * Nepal — nationality overlay (Tier A).
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
            afterBlockId: "us-docs-financial",
            blocks: [{ type: "paragraph", text: "Nepali students going to study at an institution in any country must first obtain a **foreign study permission letter (NOC)** from Nepal's Ministry of Education, Science and Technology. [CITE: moest.gov.np/faq] The ministry issues this letter to students going abroad at their own expense or on a scholarship, and recommends them for the foreign currency exchange facility used to pay study costs from Nepal. [CITE: moest.gov.np/higher-education-division]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-financial-rule",
            blocks: [{ type: "paragraph", text: "Nepali students going to study at an institution in any country must first obtain a **foreign study permission letter (NOC)** from Nepal's Ministry of Education, Science and Technology. [CITE: moest.gov.np/faq] The ministry issues this letter to students going abroad at their own expense or on a scholarship, and recommends them for the foreign currency exchange facility used to pay study costs from Nepal. [CITE: moest.gov.np/higher-education-division]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-financial",
            blocks: [{ type: "paragraph", text: "Nepali students going to study at an institution in any country must first obtain a **foreign study permission letter (NOC)** from Nepal's Ministry of Education, Science and Technology. [CITE: moest.gov.np/faq] The ministry issues this letter to students going abroad at their own expense or on a scholarship, and recommends them for the foreign currency exchange facility used to pay study costs from Nepal. [CITE: moest.gov.np/higher-education-division]" }],
          },
        ],
      },
    },
    "application-process": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-process-tb",
            blocks: [{ type: "paragraph", text: "Nepal has three Home Office-approved TB testing clinics: the IOM Migration Health Assessment Center and Norvic International Hospital in Kathmandu, and the IOM Resettlement Health Assessment Centre in Jhapa. The Home Office does not accept a TB certificate from a clinic it has not approved. [CITE: gov.uk/tb-clinics-nepal]" }],
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
            afterBlockId: "au-600-apply-account",
            blocks: [{ type: "paragraph", text: "As of September 2026, the Australian High Commission in New Delhi manages most Australian visa applications for applicants in Nepal, and staff at the Australian Embassy in Nepal cannot help with visa or citizenship enquiries. [CITE: nepal.embassy.gov.au/visa-immigration] Visa questions go to the Department of Home Affairs instead. [CITE: nepal.embassy.gov.au/visa-immigration]" }],
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
            blocks: [{ type: "paragraph", text: "Graduates returning to Nepal get a foreign qualification recognised through an equivalence certificate: higher education degrees go to Tribhuvan University's Curriculum Development Centre, and Class 10 and Class 12 level qualifications to the Curriculum Development Centre in Sanothimi. [CITE: moest.gov.np/faq]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-psw-transition",
            blocks: [{ type: "paragraph", text: "Graduates returning to Nepal get a foreign qualification recognised through an equivalence certificate: higher education degrees go to Tribhuvan University's Curriculum Development Centre, and Class 10 and Class 12 level qualifications to the Curriculum Development Centre in Sanothimi. [CITE: moest.gov.np/faq]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-psw-application",
            blocks: [{ type: "paragraph", text: "Graduates returning to Nepal get a foreign qualification recognised through an equivalence certificate: higher education degrees go to Tribhuvan University's Curriculum Development Centre, and Class 10 and Class 12 level qualifications to the Curriculum Development Centre in Sanothimi. [CITE: moest.gov.np/faq]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
