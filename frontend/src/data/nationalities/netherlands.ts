import type { NationalityOverlay } from "../types";

/**
 * Netherlands — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "student": {
    "overview": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-overview-kvlist",
            blocks: [{ type: "paragraph", text: "Dutch nationals who already hold settled or pre-settled status under the **EU Settlement Scheme** can enrol in education or study in the UK on that status. [CITE: gov.uk/euss-what-status-means] The deadline for most people to apply to the scheme was 30 June 2021, so it is not a route for most students arriving now. [CITE: gov.uk/settled-status-eu-citizens-families] Settled status is kept through up to 5 years in a row outside the UK; pre-settled status requires continuous residence in the UK. [CITE: gov.uk/euss-what-status-means]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
