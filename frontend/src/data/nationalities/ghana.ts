import type { NationalityOverlay } from "../types";

/**
 * Ghana — nationality overlay (Tier A).
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
            blocks: [{ type: "paragraph", text: "Home Office-approved TB test clinics in Ghana are in Accra (four clinics, including the IOM centre) and Kumasi (Wellnest and the IOM centre). The clinic issues an IOM medical certificate confirming you are free from TB. [CITE: gov.uk/tb-clinics-ghana]" }],
          },
        ],
      },
    },
  },
  "work": {
    "post-study-work": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-psw-transition",
            blocks: [{ type: "paragraph", text: "Ghanaian nationals are eligible for **Commonwealth Master's Scholarships** to study in the UK. Scholars sign an undertaking to return home before their student visa expires, and switching to the Graduate visa or another visa to stay in the UK is not permitted. [CITE: cscuk.fcdo.gov.uk/commonwealth-masters-scholarships]" }],
          },
          {
            afterBlockId: "uk-psw-transition",
            blocks: [{ type: "paragraph", text: "On returning to Ghana, a foreign degree can be evaluated through the Ghana Tertiary Education Commission's Credential Evaluation Service (CEMS), which reports its equivalence in Ghana's education system. Official academic records are required, and non-English documents need certified English translations. [CITE: cems.gtec.edu.gh]" }],
          },
        ],
      },
      US: {
        callouts: [
          {
            afterBlockId: "us-psw-cliff",
            blocks: [{ type: "paragraph", text: "On returning to Ghana, a foreign degree can be evaluated through the Ghana Tertiary Education Commission's Credential Evaluation Service (CEMS), which reports its equivalence in Ghana's education system. Official academic records are required, and non-English documents need certified English translations. [CITE: cems.gtec.edu.gh]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-psw-application",
            blocks: [{ type: "paragraph", text: "On returning to Ghana, a foreign degree can be evaluated through the Ghana Tertiary Education Commission's Credential Evaluation Service (CEMS), which reports its equivalence in Ghana's education system. Official academic records are required, and non-English documents need certified English translations. [CITE: cems.gtec.edu.gh]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
