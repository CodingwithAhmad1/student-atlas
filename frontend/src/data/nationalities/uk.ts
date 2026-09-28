import type { NationalityOverlay } from "../types";

/**
 * United Kingdom — nationality overlay.
 *
 * Domestic profiles for the UK columns, ESTA and the Australian eVisitor, the
 * Working Holiday visa and dual nationality are generated from
 * `traits/nationality-traits.ts`. Only hand-written extras live here.
 */
const overlay: NationalityOverlay = {
  student: {
    documents: {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-financial",
            practical: true,
            blocks: [
              {
                type: "paragraph",
                text: "UK bank statements, ISAs and other savings accounts are accepted as financial evidence for the university’s certificate of eligibility and the student visa interview without translation or notarisation. Note that UK student finance (Student Loans Company funding) does not cover study in the United States, so the evidence has to come from family funds, savings or a private loan.",
              },
            ],
          },
        ],
      },
    },
  },
};

export default overlay;
