import type { NationalityOverlay } from "../types";

/**
 * Taiwan — nationality overlay (Tier A).
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
            afterBlockId: "us-vwp-intro",
            blocks: [{ type: "paragraph", text: "For Taiwan, the Visa Waiver Program covers only people with an unrestricted right of permanent abode in Taiwan who hold an **electronic passport bearing a personal identification (household registration) number**. [CITE: dhs.gov/visa-waiver-program] Check that your passport shows the number before applying for ESTA." }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-eta-intro",
            blocks: [{ type: "paragraph", text: "Taiwanese nationals are exempt from the UK visitor visa requirement only if their Taiwan passport includes the number of their Taiwan identification card. [CITE: gov.uk/visa-national-list]" }],
          },
        ],
      },
    },
  },
  "student": {
    "documents": {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-identity",
            blocks: [{ type: "paragraph", text: "Taiwanese men who have not done military service need approval to leave Taiwan from 1 January of the year after they turn 18. Those who left before conscription age to study abroad can keep re-entering and leaving on a verified certificate of enrolment up to age 24 for a bachelor's degree, 27 for a master's and 30 for a doctorate, and each stay in Taiwan is limited to three months. [CITE: law.moj.gov.tw/conscript-exit-regulations]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "Taiwanese men who have not done military service need approval to leave Taiwan from 1 January of the year after they turn 18. Those who left before conscription age to study abroad can keep re-entering and leaving on a verified certificate of enrolment up to age 24 for a bachelor's degree, 27 for a master's and 30 for a doctorate, and each stay in Taiwan is limited to three months. [CITE: law.moj.gov.tw/conscript-exit-regulations]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "Taiwanese men who have not done military service need approval to leave Taiwan from 1 January of the year after they turn 18. Those who left before conscription age to study abroad can keep re-entering and leaving on a verified certificate of enrolment up to age 24 for a bachelor's degree, 27 for a master's and 30 for a doctorate, and each stay in Taiwan is limited to three months. [CITE: law.moj.gov.tw/conscript-exit-regulations]" }],
          },
        ],
      },
    },
    "after-arrival": {
      US: {
        callouts: [
          {
            afterBlockId: "us-arrival-travel",
            blocks: [{ type: "paragraph", text: "When a Taiwanese university recognises a foreign degree, it asks for entry and exit records covering the study period and counts only time spent studying in the country: at least 32 months for a bachelor's, 8 months for a master's and 16 months for a doctorate. [CITE: law.moj.gov.tw/foreign-degree-recognition] The university can also ask for the diploma and transcripts to be verified at a Taiwanese overseas mission. [CITE: law.moj.gov.tw/foreign-degree-recognition]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-arrival-intro",
            blocks: [{ type: "paragraph", text: "When a Taiwanese university recognises a foreign degree, it asks for entry and exit records covering the study period and counts only time spent studying in the country: at least 32 months for a bachelor's, 8 months for a master's and 16 months for a doctorate. [CITE: law.moj.gov.tw/foreign-degree-recognition] The university can also ask for the diploma and transcripts to be verified at a Taiwanese overseas mission. [CITE: law.moj.gov.tw/foreign-degree-recognition]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-arrival-work",
            blocks: [{ type: "paragraph", text: "When a Taiwanese university recognises a foreign degree, it asks for entry and exit records covering the study period and counts only time spent studying in the country: at least 32 months for a bachelor's, 8 months for a master's and 16 months for a doctorate. [CITE: law.moj.gov.tw/foreign-degree-recognition] The university can also ask for the diploma and transcripts to be verified at a Taiwanese overseas mission. [CITE: law.moj.gov.tw/foreign-degree-recognition]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
