import type { NationalityOverlay } from "../types";

/**
 * Japan — nationality overlay (Tier A).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "student": {
    "after-arrival": {
      US: {
        callouts: [
          {
            afterBlockId: "us-arrival-travel",
            blocks: [{ type: "paragraph", text: "Japanese nationals who live abroad for three months or more must file a **residence notification** (zairyu todoke) with the Japanese embassy or consulate responsible for the area, under Article 16 of the Passport Act. [CITE: laws.e-gov.go.jp/passport-act-art16]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-arrival-intro",
            blocks: [{ type: "paragraph", text: "Japanese nationals who live abroad for three months or more must file a **residence notification** (zairyu todoke) with the Japanese embassy or consulate responsible for the area, under Article 16 of the Passport Act. [CITE: laws.e-gov.go.jp/passport-act-art16]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-arrival-work",
            blocks: [{ type: "paragraph", text: "Japanese nationals who live abroad for three months or more must file a **residence notification** (zairyu todoke) with the Japanese embassy or consulate responsible for the area, under Article 16 of the Passport Act. [CITE: laws.e-gov.go.jp/passport-act-art16]" }],
          },
        ],
      },
    },
  },
  "visit": {
    "entry-requirement": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-eta-context",
            blocks: [{ type: "paragraph", text: "Japanese passport holders can use the **eGates** at UK border control if they are 8 or over, have a biometric passport and hold a valid digital immigration status or a record of a digital exemption. [CITE: gov.uk/uk-border-control/at-border-control]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
