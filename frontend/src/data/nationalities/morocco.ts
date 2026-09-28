import type { NationalityOverlay } from "../types";

/**
 * Morocco — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "visit": {
    "how-to-apply": {
      US: {
        callouts: [
          {
            afterBlockId: "us-apply-book",
            blocks: [{ type: "paragraph", text: "In Morocco, the US Embassy's visa pages list the **US Consulate in Casablanca** as the place where consular services, including visa interviews, are provided. [CITE: ma.usembassy.gov/visas]" }],
          },
        ],
      },
    },
  },
  "student": {
    "documents": {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-financial",
            blocks: [{ type: "paragraph", text: "Moroccan families pay tuition, living costs and rent abroad through **one Moroccan bank** that holds the student's \"études à l'étranger\" file, and the bank asks for the enrolment or pre-enrolment certificate. Living-cost transfers above 15,000 dirhams a month also need a document from the university, the host country's consulate or another competent authority. Transfers can be made up to 12 months in advance, but only 4 months ahead on a pre-enrolment unless the university or consulate requires earlier payment. The cited official page is in French. [CITE: oc.gov.ma/voyages-pour-etudes]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-financial-rule",
            blocks: [{ type: "paragraph", text: "Moroccan families pay tuition, living costs and rent abroad through **one Moroccan bank** that holds the student's \"études à l'étranger\" file, and the bank asks for the enrolment or pre-enrolment certificate. Living-cost transfers above 15,000 dirhams a month also need a document from the university, the host country's consulate or another competent authority. Transfers can be made up to 12 months in advance, but only 4 months ahead on a pre-enrolment unless the university or consulate requires earlier payment. The cited official page is in French. [CITE: oc.gov.ma/voyages-pour-etudes]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-financial",
            blocks: [{ type: "paragraph", text: "Moroccan families pay tuition, living costs and rent abroad through **one Moroccan bank** that holds the student's \"études à l'étranger\" file, and the bank asks for the enrolment or pre-enrolment certificate. Living-cost transfers above 15,000 dirhams a month also need a document from the university, the host country's consulate or another competent authority. Transfers can be made up to 12 months in advance, but only 4 months ahead on a pre-enrolment unless the university or consulate requires earlier payment. The cited official page is in French. [CITE: oc.gov.ma/voyages-pour-etudes]" }],
          },
        ],
      },
    },
    "after-arrival": {
      US: {
        callouts: [
          {
            afterBlockId: "us-arrival-travel",
            blocks: [{ type: "paragraph", text: "A Moroccan student may open a bank account abroad for study expenses, but must close it at the end of the stay and bring the balance back to Morocco within 60 days of returning. The Moroccan bank may keep transferring living costs and rent for the year after studies end. The cited official page is in French. [CITE: oc.gov.ma/voyages-pour-etudes]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-arrival-intro",
            blocks: [{ type: "paragraph", text: "A Moroccan student may open a bank account abroad for study expenses, but must close it at the end of the stay and bring the balance back to Morocco within 60 days of returning. The Moroccan bank may keep transferring living costs and rent for the year after studies end. The cited official page is in French. [CITE: oc.gov.ma/voyages-pour-etudes]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-arrival-work",
            blocks: [{ type: "paragraph", text: "A Moroccan student may open a bank account abroad for study expenses, but must close it at the end of the stay and bring the balance back to Morocco within 60 days of returning. The Moroccan bank may keep transferring living costs and rent for the year after studies end. The cited official page is in French. [CITE: oc.gov.ma/voyages-pour-etudes]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
