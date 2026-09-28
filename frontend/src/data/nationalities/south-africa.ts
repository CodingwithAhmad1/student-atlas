import type { NationalityOverlay } from "../types";

/**
 * South Africa — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "residency": {
    "permanent-residency": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-pr-timeline",
            blocks: [{ type: "paragraph", text: "South African nationals are Commonwealth citizens under UK nationality law [CITE: legislation.gov.uk/bna-1981-schedule-3], so a South African with a grandparent born in the UK, the Channel Islands or the Isle of Man may qualify for the **UK Ancestry visa**, which allows work and a stay of 5 years [CITE: gov.uk/ancestry-visa]. You cannot switch into it from another UK visa, such as the Student or Graduate visa [CITE: gov.uk/ancestry-visa]." }],
          },
        ],
      },
    },
  },
  "student": {
    "documents": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-financial-rule",
            blocks: [{ type: "paragraph", text: "South African exchange control lets a bank (an Authorised Dealer) transfer the year's tuition and academic fees directly to the university abroad, in addition to the single discretionary allowance available to students [CITE: resbank.co.za/currency-exchanges-guidelines-individuals]. The bank needs proof of enrolment for the period and a letter or prospectus showing the fees, and fresh evidence for each year after the first 12 months [CITE: resbank.co.za/currency-exchanges-guidelines-individuals]." }],
          },
        ],
      },
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-financial",
            blocks: [{ type: "paragraph", text: "South African exchange control lets a bank (an Authorised Dealer) transfer the year's tuition and academic fees directly to the university abroad, in addition to the single discretionary allowance available to students. The bank needs proof of enrolment and a letter or prospectus showing the fees, and fresh evidence for each year after the first 12 months. [CITE: resbank.co.za/currency-exchanges-guidelines-individuals]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-financial",
            blocks: [{ type: "paragraph", text: "South African exchange control lets a bank (an Authorised Dealer) transfer the year's tuition and academic fees directly to the university abroad, in addition to the single discretionary allowance available to students. The bank needs proof of enrolment and a letter or prospectus showing the fees, and fresh evidence for each year after the first 12 months. [CITE: resbank.co.za/currency-exchanges-guidelines-individuals]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
