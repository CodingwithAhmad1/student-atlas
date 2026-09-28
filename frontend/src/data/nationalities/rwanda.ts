import type { NationalityOverlay } from "../types";

/**
 * Rwanda — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "work": {
    "post-study-work": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-psw-transition",
            blocks: [{ type: "paragraph", text: "Rwanda is on the eligible-country lists for the 2027/28 **Commonwealth Master's and PhD Scholarships**, funded by the UK government [CITE: cscuk.fcdo.gov.uk/commonwealth-masters-scholarships] [CITE: cscuk.fcdo.gov.uk/commonwealth-phd-scholarships]. Commonwealth Scholars commit to returning home after the scholarship, and switching to a Graduate or other visa to stay in the UK is not permitted. [CITE: cscuk.fcdo.gov.uk/commonwealth-masters-scholarships]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
