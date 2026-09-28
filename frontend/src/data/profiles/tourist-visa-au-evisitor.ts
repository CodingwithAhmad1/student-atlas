import type { Profile } from "../types";

const CITE = "[CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/evisitor-651]";

/** eVisitor (subclass 651) — replaces the Australian tourist-visa base content
 *  for European passports on the eVisitor list (EU, EEA, Switzerland, UK). */
export const touristVisaAuEvisitor: Profile = {
  "entry-requirement": [
    {
      id: "au-evisitor-intro",
      block: {
        type: "paragraph",
        text: `As a holder of an eligible European passport you can visit Australia on an **eVisitor (subclass 651)** instead of a full visitor visa. It is a free, online authorisation linked to your passport. ${CITE}`,
      },
    },
    {
      id: "au-evisitor-details",
      block: {
        type: "paragraph",
        text: `The eVisitor is valid for 12 months from the date it is granted and allows multiple visits of up to three months each. If a single stay needs to be longer than three months — for example, to be in Australia around your child’s graduation and travel afterwards — apply for a **Visitor visa (subclass 600)** instead, which allows stays of up to 12 months. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600]`,
      },
    },
    {
      id: "au-evisitor-kvlist",
      block: {
        type: "key-value-list",
        items: [
          { label: "Fee", value: `free ${CITE}` },
          { label: "Application", value: "online through ImmiAccount" },
          { label: "Validity", value: "12 months from grant" },
          { label: "Maximum stay per visit", value: "3 months" },
          { label: "Multiple entries", value: "yes" },
          { label: "Alternative if longer stay needed", value: "Visitor visa subclass 600 (up to 12 months)" },
        ],
      },
    },
  ],
  "how-to-apply": [
    {
      id: "au-evisitor-apply-process",
      block: {
        type: "paragraph",
        text: `Apply online through **ImmiAccount** on the Department of Home Affairs website. You must be outside Australia when you apply and when the eVisitor is granted. You need your passport details, an email address and answers to character and health questions; there is no fee. ${CITE}`,
      },
    },
    {
      block: {
        type: "bullet-list",
        items: [
          "Valid passport from an eVisitor-eligible country",
          "ImmiAccount login and a valid email address",
          "Answers to the health and character questions",
        ],
      },
    },
    {
      id: "au-evisitor-decision",
      block: {
        type: "paragraph",
        text: `Most eVisitors are granted within days, though some take longer if health or character checks are needed. The grant is electronic and linked to your passport; you can confirm it at any time through VEVO. If you are not eligible or the eVisitor is refused, apply for a Visitor visa (subclass 600) instead. ${CITE}`,
      },
    },
  ],
};
