import type { Profile } from "../types";

/** Domestic US profile — replaces US student visa content for US citizens */
export const domesticUsStudent: Profile = {
  overview: [
    {
      id: "us-domestic-student-intro",
      block: {
        type: "paragraph",
        text: "As a **United States citizen**, you have the right to study at any US institution without a student visa. You are classified as a **domestic student** for admissions and fee purposes, and are eligible for federal financial aid including grants, loans, and work-study programs.",
      },
    },
    {
      id: "us-domestic-student-details",
      block: {
        type: "key-value-list",
        items: [
          { label: "Visa required", value: "No — full right to study as a citizen" },
          { label: "Fee status", value: "Domestic/in-state (if applicable)" },
          { label: "Financial aid", value: "Eligible for FAFSA, federal loans, Pell Grants" },
          { label: "Work rights", value: "Unrestricted — no work limits while studying" },
        ],
      },
    },
    {
      id: "us-domestic-student-finance",
      block: {
        type: "paragraph",
        text: "US citizens should complete the FAFSA (Free Application for Federal Student Aid) to access federal financial aid. This includes Pell Grants (need-based, no repayment), subsidized and unsubsidized loans, and federal work-study opportunities. Many states also offer in-state tuition rates at public universities for residents, which can significantly reduce costs.",
      },
    },
  ],
  documents: [
    {
      id: "us-domestic-student-docs",
      block: {
        type: "paragraph",
        text: "As a US citizen, you do not need to submit any immigration documentation. University applications are submitted through the Common App, Coalition App, or directly to the institution. You will need academic transcripts, standardized test scores (if required), personal essays, and letters of recommendation. Financial aid applications require FAFSA completion and possibly CSS Profile for private institutions.",
      },
    },
  ],
  "application-process": [
    {
      id: "us-domestic-student-process",
      block: {
        type: "paragraph",
        text: "The application process for US citizens is entirely academic — there is no immigration component. Apply through the Common App or directly to universities. Most undergraduate deadlines fall between November (Early Decision) and January (Regular Decision). Accept your offer, submit your enrollment deposit, and arrange housing. No visa interview, [TERM: i-20], or [TERM: sevis|SEVIS] registration required.",
      },
    },
  ],
  "after-arrival": [
    {
      id: "us-domestic-student-arrival",
      block: {
        type: "paragraph",
        text: "As a US citizen studying in the US, you have no immigration-related obligations. You can work unlimited hours alongside your studies, travel freely, and access all domestic services. Focus on academic orientation, setting up a local bank account, and getting involved in campus life.",
      },
    },
  ],
};
