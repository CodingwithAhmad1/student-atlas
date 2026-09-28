import type { NationalityOverlay } from "../types";

/**
 * Vietnam — nationality overlay (Tier A).
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
            afterBlockId: "uk-process-tb",
            blocks: [{ type: "paragraph", text: "Home Office-approved TB test clinics in Vietnam are in Hanoi, Ho Chi Minh City and Danang, and a certificate from any other clinic is not accepted. [CITE: gov.uk/tb-clinics-vietnam]" }],
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
            afterBlockId: "au-600-apply-intro",
            blocks: [{ type: "paragraph", text: "The Australian Embassy in Hanoi and the Consulate-General in Ho Chi Minh City do not handle visa applications or general visa enquiries: applications are lodged online through ImmiAccount and managed by the Department of Home Affairs. [CITE: hcmc.vietnam.embassy.gov.au/visas-and-migration]" }],
          },
        ],
      },
    },
  },
  "work": {
    "post-study-work": {
      AU: {
        callouts: [
          {
            afterBlockId: "au-psw-application",
            blocks: [{ type: "paragraph", text: "As of September 2026, Home Affairs has received reports of scammers targeting Vietnamese Work and Holiday visa ballot registrants who share their personal information online or with unauthorised third parties. The Department of Home Affairs is the only official Australian Government provider of visas. [CITE: hcmc.vietnam.embassy.gov.au/visas-and-migration]" }],
          },
          {
            afterBlockId: "au-psw-application",
            blocks: [{ type: "paragraph", text: "To use a foreign degree in Vietnam, graduates apply to have it recognised (cong nhan van bang). Under Circular 65/2026/TT-BGDDT, in force from 26 September 2026, the procedure is handled **entirely online** on the National Public Service Portal. [CITE: xaydungchinhsach.chinhphu.vn/thong-tu-65-2026]" }],
          },
        ],
      },
      US: {
        callouts: [
          {
            afterBlockId: "us-psw-cliff",
            blocks: [{ type: "paragraph", text: "To use a foreign degree in Vietnam, graduates apply to have it recognised (cong nhan van bang). Under Circular 65/2026/TT-BGDDT, in force from 26 September 2026, the procedure is handled **entirely online** on the National Public Service Portal. [CITE: xaydungchinhsach.chinhphu.vn/thong-tu-65-2026]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-psw-transition",
            blocks: [{ type: "paragraph", text: "To use a foreign degree in Vietnam, graduates apply to have it recognised (cong nhan van bang). Under Circular 65/2026/TT-BGDDT, in force from 26 September 2026, the procedure is handled **entirely online** on the National Public Service Portal. [CITE: xaydungchinhsach.chinhphu.vn/thong-tu-65-2026]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
