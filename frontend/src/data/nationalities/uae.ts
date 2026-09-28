import type { NationalityOverlay } from "../types";

const overlay: NationalityOverlay = {
  // ── Student visa ──────────────────────────────────────────────
  student: {
    overview: {
      AU: {
        callouts: [
          {
            afterBlockId: "au-overview-kvlist",
            blocks: [
              {
                type: "paragraph",
                text: "Under Resolution No. (5) of 2025, an Emirati student abroad, self-funded or on a scholarship, must study at a university ranked in the world's top 100 for the subject and the top 100 overall in the United States, the United Kingdom or Australia, or in the top 50 for the subject anywhere, using rankings the Ministry of Higher Education and Scientific Research accredits. [CITE: mohesr.gov.ae/resolution-5-2025] A qualification from a university that does not meet the standard is not recognised for employment, promotion or qualification-related benefits in the federal government sector. [CITE: mohesr.gov.ae/resolution-5-2025] **Check the ranking before accepting an offer.**",
              },
            ],
          },
        ],
      },
      US: { callouts: [
          {
            afterBlockId: "us-overview-kvlist",
            blocks: [
              {
                type: "paragraph",
                text: "Under Resolution No. (5) of 2025, an Emirati student abroad, self-funded or on a scholarship, must study at a university ranked in the world's top 100 for the subject and the top 100 overall in the United States, the United Kingdom or Australia, or in the top 50 for the subject anywhere, using rankings the Ministry of Higher Education and Scientific Research accredits. [CITE: mohesr.gov.ae/resolution-5-2025] A qualification from a university that does not meet the standard is not recognised for employment, promotion or qualification-related benefits in the federal government sector. [CITE: mohesr.gov.ae/resolution-5-2025] **Check the ranking before accepting an offer.**",
              },
            ],
          },
        ] },
      UK: { callouts: [
          {
            afterBlockId: "uk-overview-kvlist",
            blocks: [
              {
                type: "paragraph",
                text: "Under Resolution No. (5) of 2025, an Emirati student abroad, self-funded or on a scholarship, must study at a university ranked in the world's top 100 for the subject and the top 100 overall in the United States, the United Kingdom or Australia, or in the top 50 for the subject anywhere, using rankings the Ministry of Higher Education and Scientific Research accredits. [CITE: mohesr.gov.ae/resolution-5-2025] A qualification from a university that does not meet the standard is not recognised for employment, promotion or qualification-related benefits in the federal government sector. [CITE: mohesr.gov.ae/resolution-5-2025] **Check the ranking before accepting an offer.**",
              },
            ],
          },
        ] },
    },
    documents: {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [
              {
                type: "paragraph",
                text: "Federal Law No. 6 of 2014 makes national service mandatory for all medically fit Emirati men, and the term is 11 months for those with a high school diploma or higher. [CITE: u.ae/armed-forces] Citizens who fail to enlist without a valid reason by the age of 29 face a prison term, a fine or both, so male students should settle their service before a long course abroad. [CITE: u.ae/armed-forces]",
              },
            ],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [
              {
                type: "paragraph",
                text: "Federal Law No. 6 of 2014 makes national service mandatory for all medically fit Emirati men, and the term is 11 months for those with a high school diploma or higher. [CITE: u.ae/armed-forces] Citizens who fail to enlist without a valid reason by the age of 29 face a prison term, a fine or both, so male students should settle their service before a long course abroad. [CITE: u.ae/armed-forces]",
              },
            ],
          },
        ],
      },
      US: { callouts: [
          {
            afterBlockId: "us-docs-identity",
            blocks: [
              {
                type: "paragraph",
                text: "Federal Law No. 6 of 2014 makes national service mandatory for all medically fit Emirati men, and the term is 11 months for those with a high school diploma or higher. [CITE: u.ae/armed-forces] Citizens who fail to enlist without a valid reason by the age of 29 face a prison term, a fine or both, so male students should settle their service before a long course abroad. [CITE: u.ae/armed-forces]",
              },
            ],
          },
        ] },
    },
    "application-process": {
      AU: {
        callouts: [
          {
            afterBlockId: "au-process-decision",
            blocks: [
              {
                type: "paragraph",
                text: "A quick note that sometimes catches families off guard: Australia’s visa grant is entirely electronic. The student does not receive a stamp or sticker — their visa status is confirmed when the airline checks their travel document electronically at check-in. The grant letter is not an official travel document, but it is a good idea to carry a copy just in case. The student can also check their visa status at any time using the [TERM: vevo|Visa Entitlement Verification Online (VEVO)] service. [CITE: immi.homeaffairs.gov.au/visas/already-have-a-visa/check-visa-details-and-conditions/check-conditions-online]",
              },
            ],
          },
        ],
      },
    },
    "after-arrival": {
      US: {
        callouts: [
          {
            afterBlockId: "us-arrival-travel",
            practical: true,
            blocks: [
              {
                type: "paragraph",
                text: "UAE students returning home for a break and planning to re-enter the US should check the expiry date of their US student visa stamp before purchasing return tickets. If the stamp has already expired, they must apply for a new one at the Abu Dhabi Embassy or Dubai Consulate before returning. This is a routine process but requires planning ahead.",
              },
            ],
          },
          {
            afterBlockId: "us-arrival-travel",
            blocks: [
              {
                type: "paragraph",
                text: "Abu Dhabi is one of CBP's preclearance airports, where US officers inspect travellers before they board a US-bound flight. [CITE: cbp.gov/preclearance] A student flying from Abu Dhabi therefore needs the passport, visa and Form I-20 in hand before boarding, not only on landing.",
              },
            ],
          },
          {
            afterBlockId: "us-arrival-travel",
            blocks: [
              {
                type: "paragraph",
                text: "The Ministry of Foreign Affairs' Twajudi service lets UAE nationals register their details before travelling or while abroad, so the ministry can contact them in an emergency. Registration is free and uses UAE Pass on the ministry's website or the UAE MOFA app. [CITE: mofa.gov.ae/twajudi]",
              },
            ],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-arrival-work",
            blocks: [
              {
                type: "paragraph",
                text: "The Ministry of Foreign Affairs' Twajudi service lets UAE nationals register their details before travelling or while abroad, so the ministry can contact them in an emergency. Registration is free and uses UAE Pass on the ministry's website or the UAE MOFA app. [CITE: mofa.gov.ae/twajudi]",
              },
            ],
          },
        ],
      },
      UK: { callouts: [
          {
            afterBlockId: "uk-arrival-intro",
            blocks: [
              {
                type: "paragraph",
                text: "The Ministry of Foreign Affairs' Twajudi service lets UAE nationals register their details before travelling or while abroad, so the ministry can contact them in an emergency. Registration is free and uses UAE Pass on the ministry's website or the UAE MOFA app. [CITE: mofa.gov.ae/twajudi]",
              },
            ],
          },
        ] },
    },
  },

  // ── Work visa ─────────────────────────────────────────────────
  work: {
    "post-study-work": {
      US: {
        callouts: [
          {
            afterBlockId: "us-psw-cliff",
            blocks: [
              {
                type: "paragraph",
                text: "Graduates returning to the UAE use the Ministry of Higher Education and Scientific Research's University Qualifications Recognition service for a degree from an accredited institution outside the UAE. The recognition report is the official document for employment, further study, visas and government services in the UAE. [CITE: u.ae/qualification-recognition]",
              },
            ],
          },
        ],
      },
      UK: { callouts: [
          {
            afterBlockId: "uk-psw-transition",
            blocks: [
              {
                type: "paragraph",
                text: "Graduates returning to the UAE use the Ministry of Higher Education and Scientific Research's University Qualifications Recognition service for a degree from an accredited institution outside the UAE. The recognition report is the official document for employment, further study, visas and government services in the UAE. [CITE: u.ae/qualification-recognition]",
              },
            ],
          },
        ] },
      AU: { callouts: [
          {
            afterBlockId: "au-psw-application",
            blocks: [
              {
                type: "paragraph",
                text: "Graduates returning to the UAE use the Ministry of Higher Education and Scientific Research's University Qualifications Recognition service for a degree from an accredited institution outside the UAE. The recognition report is the official document for employment, further study, visas and government services in the UAE. [CITE: u.ae/qualification-recognition]",
              },
            ],
          },
        ] },
    },
    "getting-sponsored": {
      UK: {
        callouts: [],
      },
      AU: {
        callouts: [],
      },
    },
  },
};

export default overlay;
