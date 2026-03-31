import type { Profile } from "../types";

/** Domestic AU profile — replaces AU student visa content for Australian citizens */
export const domesticAuStudent: Profile = {
  overview: [
    {
      id: "au-domestic-student-intro",
      block: {
        type: "paragraph",
        text: "As an **Australian citizen**, you have the right to study at any Australian institution without a student visa. You are classified as a **domestic student** for fee purposes, meaning you pay Commonwealth Supported Place (CSP) fees rather than full international fees — a substantial difference.",
      },
    },
    {
      id: "au-domestic-student-details",
      block: {
        type: "key-value-list",
        items: [
          { label: "Visa required", value: "No — full right to study as a citizen" },
          { label: "Fee status", value: "Domestic (CSP rates)" },
          { label: "Student finance", value: "Eligible for HECS-HELP and FEE-HELP loans" },
          { label: "Work rights", value: "Unrestricted — no work limits while studying" },
        ],
      },
    },
    {
      id: "au-domestic-student-finance",
      block: {
        type: "paragraph",
        text: "Australian citizens are eligible for HECS-HELP loans, which cover tuition fees with repayment deferred until earnings exceed the repayment threshold (currently around AUD $54,000). No upfront payment is required. Additional support is available through Centrelink payments such as Youth Allowance and Austudy for eligible students.",
      },
    },
  ],
  documents: [
    {
      id: "au-domestic-student-docs",
      block: {
        type: "paragraph",
        text: "As an Australian citizen, you do not need to submit visa-related documentation. University applications go through **UAC** (Universities Admissions Centre) in NSW/ACT, **VTAC** in Victoria, or directly to the institution depending on your state and level of study. You will need academic transcripts (ATAR for undergraduate), a personal statement, and proof of identity. HECS-HELP applications require a Tax File Number (TFN).",
      },
    },
  ],
  "application-process": [
    {
      id: "au-domestic-student-process",
      block: {
        type: "paragraph",
        text: "The application process for Australian citizens is entirely academic — there is no immigration component. Apply through your state's admissions centre or directly to the university. Most undergraduate offers are made through the main round in January for the February semester. Accept your offer, enrol in courses, and arrange accommodation. No visa application, health examination, or Overseas Student Health Cover (OSHC) required — you are covered by Medicare.",
      },
    },
  ],
  "after-arrival": [
    {
      id: "au-domestic-student-arrival",
      block: {
        type: "paragraph",
        text: "As an Australian citizen studying in Australia, you have no immigration-related obligations. You can work unlimited hours alongside your studies, travel freely in and out of Australia, and access Medicare for healthcare. Focus on academic orientation, setting up your student account, and exploring campus services.",
      },
    },
  ],
};
