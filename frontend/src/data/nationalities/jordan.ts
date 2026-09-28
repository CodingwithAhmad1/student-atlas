import type { NationalityOverlay } from "../types";

/**
 * Jordan — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "visit": {
    "entry-requirement": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-svv-intro",
            blocks: [{ type: "paragraph", text: "Jordanian nationals need a **Standard Visitor visa** to visit the United Kingdom: from 10 September 2024 Jordan was removed from the Electronic Travel Authorisation (ETA) scheme and made a visa national country, so older advice that Jordanians can visit on an ETA is out of date. [CITE: gov.uk/hc-217-explanatory-memorandum]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
