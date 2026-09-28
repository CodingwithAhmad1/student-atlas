import type { NationalityOverlay } from "../types";

/**
 * Malaysia — nationality overlay (Tier A).
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
            blocks: [{ type: "paragraph", text: "In Malaysia, Home Office-approved TB clinics are in Kuala Lumpur, Penang, Port Dickson, Kota Kinabalu (Sabah) and Kuching (Sarawak), and UKVI does not accept a certificate from any other clinic. [CITE: gov.uk/tb-clinics-malaysia]" }],
          },
        ],
      },
    },
    "overview": {
      US: {
        callouts: [
          {
            afterBlockId: "us-overview-kvlist",
            blocks: [{ type: "paragraph", text: "Malaysia's public-service qualification register (**eSisraf**, run by the MQA) recognises first degrees from the United States, the United Kingdom and Australia only when taken full time on the university's own campus, and excludes double degrees. [CITE: mqa.gov.my/esisraf-luar-negara] Students who may join the Malaysian public service should check their programme there before enrolling." }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-overview-kvlist",
            blocks: [{ type: "paragraph", text: "Malaysia's public-service qualification register (**eSisraf**, run by the MQA) recognises first degrees from the United States, the United Kingdom and Australia only when taken full time on the university's own campus, and excludes double degrees. [CITE: mqa.gov.my/esisraf-luar-negara] Students who may join the Malaysian public service should check their programme there before enrolling." }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-overview-kvlist",
            blocks: [{ type: "paragraph", text: "Malaysia's public-service qualification register (**eSisraf**, run by the MQA) recognises first degrees from the United States, the United Kingdom and Australia only when taken full time on the university's own campus, and excludes double degrees. [CITE: mqa.gov.my/esisraf-luar-negara] Students who may join the Malaysian public service should check their programme there before enrolling." }],
          },
        ],
      },
    },
  },
};

export default overlay;
