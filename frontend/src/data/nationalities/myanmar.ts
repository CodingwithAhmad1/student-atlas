import type { NationalityOverlay } from "../types";

/**
 * Myanmar — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "student": {
    "documents": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-financial-rule",
            blocks: [{ type: "paragraph", text: "The UK government's business-risk guide for Myanmar notes that the Financial Action Task Force added Myanmar to its **high-risk list subject to a call for action** in October 2022, and that the country operates foreign exchange controls [CITE: gov.uk/overseas-business-risk-myanmar]. Start moving tuition and maintenance funds early so the money has been held for the full 28 days before you apply." }],
          },
        ],
      },
    },
  },
  "residency": {
    "citizenship": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-cit-intro",
            blocks: [{ type: "paragraph", text: "As of September 2026, Myanmar is enforcing a conscription law announced in February 2024 that can require Myanmar men and women to serve in the armed forces. The FCDO warns that a British passport may not exempt a British-Myanmar dual national, because Myanmar does not recognise dual nationality. [CITE: gov.uk/foreign-travel-advice/myanmar/safety]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
