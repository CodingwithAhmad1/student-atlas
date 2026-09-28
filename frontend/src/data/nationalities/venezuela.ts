import type { NationalityOverlay } from "../types";

/**
 * Venezuela — nationality overlay (Tier B).
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
            blocks: [{ type: "paragraph", text: "As of September 2026, the US Embassy in Caracas has resumed diplomatic operations, but the State Department said in March 2026 that consular services would resume only later [CITE: state.gov/embassy-caracas-resumption]. The embassy's visa page sends applicants to the visa pages of the US Embassy in Bogotá, and says B-1/B-2 visas for Venezuelan nationals need a **bond of up to $15,000**, set at the interview. [CITE: ve.usembassy.gov/visas]" }],
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
            afterBlockId: "us-docs-identity",
            blocks: [{ type: "paragraph", text: "A Venezuelan student under 18 leaving Venezuela alone, with a guardian or with one parent needs a **travel permit** from the parent or parents not travelling, issued by a SAREN registry and notary office or the Court for Children and Adolescents, or by a Venezuelan embassy or consulate if the child lives abroad. Without it, the child may be refused exit. [CITE: gov.uk/foreign-travel-advice/venezuela/entry-requirements]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "A Venezuelan student under 18 leaving Venezuela alone, with a guardian or with one parent needs a **travel permit** from the parent or parents not travelling, issued by a SAREN registry and notary office or the Court for Children and Adolescents, or by a Venezuelan embassy or consulate if the child lives abroad. Without it, the child may be refused exit. [CITE: gov.uk/foreign-travel-advice/venezuela/entry-requirements]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "A Venezuelan student under 18 leaving Venezuela alone, with a guardian or with one parent needs a **travel permit** from the parent or parents not travelling, issued by a SAREN registry and notary office or the Court for Children and Adolescents, or by a Venezuelan embassy or consulate if the child lives abroad. Without it, the child may be refused exit. [CITE: gov.uk/foreign-travel-advice/venezuela/entry-requirements]" }],
          },
        ],
      },
    },
  },
  "residency": {
    "citizenship": {
      US: {
        callouts: [
          {
            afterBlockId: "us-cit-timeline",
            blocks: [{ type: "paragraph", text: "Venezuelan dual nationals must use their Venezuelan identity documents to enter and leave Venezuela, and the authorities may not let them depart without a valid Venezuelan passport. [CITE: gov.uk/foreign-travel-advice/venezuela/entry-requirements] Anyone who naturalises abroad should keep a valid Venezuelan passport for trips home." }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-cit-intro",
            blocks: [{ type: "paragraph", text: "Venezuelan dual nationals must use their Venezuelan identity documents to enter and leave Venezuela, and the authorities may not let them depart without a valid Venezuelan passport. [CITE: gov.uk/foreign-travel-advice/venezuela/entry-requirements] Anyone who naturalises abroad should keep a valid Venezuelan passport for trips home." }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-cit-intro",
            blocks: [{ type: "paragraph", text: "Venezuelan dual nationals must use their Venezuelan identity documents to enter and leave Venezuela, and the authorities may not let them depart without a valid Venezuelan passport. [CITE: gov.uk/foreign-travel-advice/venezuela/entry-requirements] Anyone who naturalises abroad should keep a valid Venezuelan passport for trips home." }],
          },
        ],
      },
    },
  },
};

export default overlay;
