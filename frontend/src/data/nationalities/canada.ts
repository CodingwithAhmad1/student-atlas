import type { NationalityOverlay } from "../types";

/**
 * Canada — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "visit": {
    "entry-requirement": {
      US: {
        callouts: [
          {
            afterBlockId: "us-entry-intro",
            blocks: [{ type: "paragraph", text: "Canadian citizens do not need the B-2 visitor visa described here: US regulations say a visa is generally not required for Canadian citizens, apart from the E, K, S and V categories, so there is no DS-160, visa fee or interview for a family visit [CITE: govinfo.gov/8-cfr-212-1]. Bring a valid Canadian passport, which is required for Canadian citizens arriving in the United States except in a few listed cases [CITE: govinfo.gov/8-cfr-212-1]." }],
          },
        ],
      },
    },
  },
  "student": {
    "overview": {
      US: {
        callouts: [
          {
            afterBlockId: "us-overview-kvlist",
            blocks: [{ type: "paragraph", text: "The visa fee and consular interview in this table do not apply to Canadian citizens, who are **visa exempt** and apply for F-1 status at the US port of entry instead [CITE: ice.gov/sevis-i901-faq]. The I-901 SEVIS fee and the Form I-20 still apply in full [CITE: ice.gov/sevis-i901-faq]." }],
          },
        ],
      },
    },
    "application-process": {
      US: {
        callouts: [
          {
            afterBlockId: "us-process-book-interview",
            blocks: [{ type: "paragraph", text: "Canadian citizens skip the interview and passport-collection steps and ask for F-1 status when they arrive at the US border or airport [CITE: ice.gov/sevis-i901-faq]. Pay the I-901 SEVIS fee and allow time for processing before travelling, because it cannot be paid at the port of entry [CITE: ice.gov/sevis-i901-faq]. Hand-carry the passport and signed Form I-20, since the CBP officer may inspect them [CITE: studyinthestates.dhs.gov/students/travel]." }],
          },
        ],
      },
    },
    "after-arrival": {
      US: {
        callouts: [
          {
            afterBlockId: "us-arrival-travel",
            blocks: [{ type: "paragraph", text: "Canadian students do not need an F-1 visa stamp to come back after a trip, because a visa is generally not required for Canadian citizens [CITE: govinfo.gov/8-cfr-212-1]. The other re-entry requirements still apply, including a Form I-20 endorsed for travel and signed by the DSO [CITE: ice.gov/sevis/travel]." }],
          },
        ],
      },
    },
  },
};

export default overlay;
