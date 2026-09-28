import type { NationalityOverlay } from "../types";

/**
 * Afghanistan — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "student": {
    "application-process": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-process-biometrics",
            blocks: [{ type: "paragraph", text: "As of September 2026, there is no UK visa application centre operating in Afghanistan, so applicants there normally give their biometrics (fingerprints and photograph) at a centre in a third country. [CITE: gov.uk/support-british-non-british-nationals-afghanistan] When booking, choose a centre in a different country; if you do not pick one, the centre most accessible to the country you live in is chosen for you. [CITE: gov.uk/find-a-visa-application-centre]" }],
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
            blocks: [{ type: "paragraph", text: "As of September 2026, the Australian Embassy in Kabul remains closed (since 28 May 2021) and Australia's Interim Mission to Afghanistan works from the Australian Embassy in Doha. Visa applications from Afghan nationals are processed by the Department of Home Affairs in Canberra, so apply online rather than through an Australian office in Afghanistan. [CITE: afghanistan.embassy.gov.au]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
