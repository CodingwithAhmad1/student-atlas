import type { Profile } from "../types";

/** Domestic UK profile — replaces UK student visa content for British citizens */
export const domesticUkStudent: Profile = {
  overview: [
    {
      id: "uk-domestic-student-intro",
      block: {
        type: "paragraph",
        text: "As a **British citizen**, you have the right to study at any UK institution without a student visa. You are classified as a **home student** for fee purposes, which means you pay home tuition fees rather than the significantly higher international student rates.",
      },
    },
    {
      id: "uk-domestic-student-details",
      block: {
        type: "key-value-list",
        items: [
          { label: "Visa required", value: "No — full right to study as a citizen" },
          { label: "Fee status", value: "Home student (lower fees)" },
          { label: "Student finance", value: "Eligible for UK student loans and grants" },
          { label: "Work rights", value: "Unrestricted — no work limits while studying" },
        ],
      },
    },
    {
      id: "uk-domestic-student-finance",
      block: {
        type: "paragraph",
        text: "British citizens are eligible for student finance through Student Finance England (or equivalent bodies in Scotland, Wales, and Northern Ireland). This includes tuition fee loans covering the full fee and maintenance loans for living costs. Repayment only begins once earning above the repayment threshold after graduation.",
      },
    },
  ],
  documents: [
    {
      id: "uk-domestic-student-docs",
      block: {
        type: "paragraph",
        text: "As a British citizen, you do not need to submit visa-related documentation. Your university application goes through **UCAS** (for undergraduate) or directly to the institution (for postgraduate). You will need to provide proof of identity (passport or birth certificate), academic transcripts, and a personal statement. Student finance applications require proof of residency and household income details.",
      },
    },
  ],
  "application-process": [
    {
      id: "uk-domestic-student-process",
      block: {
        type: "paragraph",
        text: "The application process for British citizens is entirely through the academic route — there is no immigration component. Apply through UCAS for undergraduate courses (deadline typically January for September entry) or directly to the university for postgraduate programmes. Accept your offer, arrange accommodation, and enrol — no visa appointment, biometrics, or immigration health surcharge required.",
      },
    },
  ],
  "after-arrival": [
    {
      id: "uk-domestic-student-arrival",
      block: {
        type: "paragraph",
        text: "As a British citizen studying in the UK, you have no immigration-related obligations. You can work unlimited hours alongside your studies, travel freely in and out of the UK, and access the NHS without paying the Immigration Health Surcharge. Your focus is purely academic — attend orientation, register with a local GP, and set up your student bank account.",
      },
    },
  ],
};
