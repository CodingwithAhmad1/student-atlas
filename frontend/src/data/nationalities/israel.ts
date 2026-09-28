import type { NationalityOverlay } from "../types";

/**
 * Israel — nationality overlay.
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 *
 * Israeli government sites (gov.il, embassies.gov.il, btl.gov.il) refuse
 * automated clients, so these callouts only point readers to the authority.
 */
const overlay: NationalityOverlay = {
  student: {
    documents: {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-identity",
            blocks: [{ type: "paragraph", text: "Israelis with IDF service obligations should confirm their status with the IDF before leaving to study abroad, and arrange any deferral through an Israeli embassy or consulate once abroad." }],
            practical: true,
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "Israelis with IDF service obligations should confirm their status with the IDF before leaving to study abroad, and arrange any deferral through an Israeli embassy or consulate once abroad." }],
            practical: true,
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "Israelis with IDF service obligations should confirm their status with the IDF before leaving to study abroad, and arrange any deferral through an Israeli embassy or consulate once abroad." }],
            practical: true,
          },
        ],
      },
    },
    "after-arrival": {
      US: {
        callouts: [
          {
            afterBlockId: "us-arrival-travel",
            blocks: [{ type: "paragraph", text: "Israeli residents studying abroad should ask the National Insurance Institute (Bituach Leumi) how a long stay abroad affects their national insurance and health insurance rights, and what they need to keep paying." }],
            practical: true,
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-arrival-intro",
            blocks: [{ type: "paragraph", text: "Israeli residents studying abroad should ask the National Insurance Institute (Bituach Leumi) how a long stay abroad affects their national insurance and health insurance rights, and what they need to keep paying." }],
            practical: true,
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-arrival-work",
            blocks: [{ type: "paragraph", text: "Israeli residents studying abroad should ask the National Insurance Institute (Bituach Leumi) how a long stay abroad affects their national insurance and health insurance rights, and what they need to keep paying." }],
            practical: true,
          },
        ],
      },
    },
  },
};

export default overlay;
