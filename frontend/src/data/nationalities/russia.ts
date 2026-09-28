import type { NationalityOverlay } from "../types";

/**
 * Russia — nationality overlay (Tier B).
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
            blocks: [{ type: "paragraph", text: "As of September 2026, US sanctions (OFAC Directive 2) bar US financial institutions from processing transactions involving **Sberbank of Russia** and many of its subsidiaries. [CITE: ofac.treasury.gov/faqs-russia] Before relying on a Russian bank for tuition payments or proof of funds, confirm with the school's international office that transfers from it can be received." }],
          },
        ],
      },
    },
    "application-process": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-process-tb",
            blocks: [{ type: "paragraph", text: "Home Office-approved TB test clinics in Russia are in four cities: Moscow, St Petersburg, Novosibirsk and Yekaterinburg. A certificate from a clinic the Home Office has not approved is not accepted. [CITE: gov.uk/tb-clinics-russia]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
