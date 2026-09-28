import type { NationalityOverlay } from "../types";

/**
 * South Korea — nationality overlay (Tier A).
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
            blocks: [{ type: "paragraph", text: "In South Korea, the Home Office-approved TB clinics are in Seoul. Book directly with a clinic, say the test is for a UK visa application, and bring your passport. [CITE: gov.uk/tb-clinics-south-korea]" }],
          },
        ],
      },
    },
    "documents": {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-identity",
            blocks: [{ type: "paragraph", text: "South Korean men aged 25 or over who have not completed military service need an overseas travel permit from the Military Manpower Administration, and those who left Korea before 24 must get an extension permit by 15 January of the year they turn 25. [CITE: mma.go.kr/overseas-travel-permit] A study-abroad permit is issued against an admission letter or certificate of enrolment, within age limits for each level of study. [CITE: mma.go.kr/study-abroad-permit]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "South Korean men aged 25 or over who have not completed military service need an overseas travel permit from the Military Manpower Administration, and those who left Korea before 24 must get an extension permit by 15 January of the year they turn 25. [CITE: mma.go.kr/overseas-travel-permit] A study-abroad permit is issued against an admission letter or certificate of enrolment, within age limits for each level of study. [CITE: mma.go.kr/study-abroad-permit]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "South Korean men aged 25 or over who have not completed military service need an overseas travel permit from the Military Manpower Administration, and those who left Korea before 24 must get an extension permit by 15 January of the year they turn 25. [CITE: mma.go.kr/overseas-travel-permit] A study-abroad permit is issued against an admission letter or certificate of enrolment, within age limits for each level of study. [CITE: mma.go.kr/study-abroad-permit]" }],
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
            afterBlockId: "uk-eta-details",
            blocks: [{ type: "paragraph", text: "South Korean nationals can use the **ePassport gates** on arrival in the UK if they are 8 or over (8 to 17 year olds with an adult) and hold valid permission such as an ETA or eVisa. [CITE: gov.uk/faster-travel-uk-border]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
