import type { NationalityOverlay } from "../types";

/**
 * Kazakhstan — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "work": {
    "post-study-work": {
      US: {
        callouts: [
          {
            afterBlockId: "us-psw-cliff",
            blocks: [{ type: "paragraph", text: "Kazakh students funded by the **Bolashak** state scholarship must return to Kazakhstan after graduating and work in their field continuously for two to five years, depending on where in Kazakhstan they work. Deferrals are allowed only in listed cases, so check the scholarship contract before planning post-study work abroad. [CITE: bolashak.gov.kz/work-obligations]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-psw-transition",
            blocks: [{ type: "paragraph", text: "Kazakh students funded by the **Bolashak** state scholarship must return to Kazakhstan after graduating and work in their field continuously for two to five years, depending on where in Kazakhstan they work. Deferrals are allowed only in listed cases, so check the scholarship contract before planning post-study work abroad. [CITE: bolashak.gov.kz/work-obligations]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-psw-application",
            blocks: [{ type: "paragraph", text: "Kazakh students funded by the **Bolashak** state scholarship must return to Kazakhstan after graduating and work in their field continuously for two to five years, depending on where in Kazakhstan they work. Deferrals are allowed only in listed cases, so check the scholarship contract before planning post-study work abroad. [CITE: bolashak.gov.kz/work-obligations]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
