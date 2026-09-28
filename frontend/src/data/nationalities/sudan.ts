import type { NationalityOverlay } from "../types";

/**
 * Sudan — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "visit": {
    "how-to-apply": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-svv-apply-vac",
            blocks: [{ type: "paragraph", text: "As of September 2026, visa services at the British Embassy in Khartoum are suspended [CITE: gov.uk/british-embassy-khartoum-visa-section]. GOV.UK tells applicants for Sudan to choose a visa application centre in a different country, so plan travel to another country for the biometrics appointment [CITE: gov.uk/find-a-visa-application-centre]." }],
          },
        ],
      },
    },
  },
};

export default overlay;
