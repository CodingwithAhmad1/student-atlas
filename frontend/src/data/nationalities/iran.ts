import type { NationalityOverlay } from "../types";

/**
 * Iran — nationality overlay (Tier A).
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
            blocks: [{ type: "paragraph", text: "Under OFAC's general licence for noncommercial personal remittances, family money sent to or from Iran must be processed by a US depository institution (bank) or a US registered securities broker-dealer, must not debit or credit an account in Iran, and must not go by, to or through the Government of Iran [CITE: govinfo.gov/31-cfr-560-550]. The licence does not cover charitable donations or funds for running a business [CITE: govinfo.gov/31-cfr-560-550]." }],
          },
        ],
      },
    },
  },
};

export default overlay;
