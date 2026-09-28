import type { NationalityOverlay } from "../types";

/**
 * Sri Lanka — nationality overlay (Tier A).
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
            blocks: [{ type: "paragraph", text: "Sri Lanka has one Home Office-approved TB testing clinic, run by the International Organization for Migration (IOM) in Colombo. The Home Office does not accept a TB certificate from a clinic it has not approved. [CITE: gov.uk/tb-clinics-sri-lanka]" }],
          },
        ],
      },
    },
    "documents": {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-financial",
            blocks: [{ type: "paragraph", text: "Under Sri Lanka's foreign exchange rules, families and parents may send money for a student's tuition, living and other education costs abroad through an Authorized Dealer (a licensed bank) by giving it the necessary documentary evidence. [CITE: dfe.lk/faqs] Parents may also send funds from Sri Lanka to repay a loan their child took abroad for education. [CITE: dfe.lk/faqs]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-financial-rule",
            blocks: [{ type: "paragraph", text: "Under Sri Lanka's foreign exchange rules, families and parents may send money for a student's tuition, living and other education costs abroad through an Authorized Dealer (a licensed bank) by giving it the necessary documentary evidence. [CITE: dfe.lk/faqs] Parents may also send funds from Sri Lanka to repay a loan their child took abroad for education. [CITE: dfe.lk/faqs]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-financial",
            blocks: [{ type: "paragraph", text: "Under Sri Lanka's foreign exchange rules, families and parents may send money for a student's tuition, living and other education costs abroad through an Authorized Dealer (a licensed bank) by giving it the necessary documentary evidence. [CITE: dfe.lk/faqs] Parents may also send funds from Sri Lanka to repay a loan their child took abroad for education. [CITE: dfe.lk/faqs]" }],
          },
        ],
      },
    },
    "overview": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-overview-kvlist",
            blocks: [{ type: "paragraph", text: "Sri Lankan citizens who are permanently resident in Sri Lanka can apply for Commonwealth Master's and Commonwealth PhD Scholarships, funded by the UK Foreign, Commonwealth & Development Office, and scholars commit to returning home afterwards. [CITE: cscuk.fcdo.gov.uk/commonwealth-masters-scholarships] [CITE: cscuk.fcdo.gov.uk/commonwealth-phd-scholarships] The Commission does not take direct applications: the national nominating agency for Sri Lanka is the Ministry of Higher Education. [CITE: cscuk.fcdo.gov.uk/national-nominating-agencies]" }],
          },
        ],
      },
    },
  },
  "work": {
    "post-study-work": {
      US: {
        callouts: [
          {
            afterBlockId: "us-psw-cliff",
            blocks: [{ type: "paragraph", text: "To have a foreign degree certificate attested by Sri Lanka's Ministry of Foreign Affairs, the graduate presents the original with copies certified by the Sri Lankan embassy in the country of study or by that country's embassy in Sri Lanka. Copies certified by the British Council (for UK degrees) or the US Fulbright Commission (for US degrees) are also accepted. [CITE: mfa.gov.lk/degree-certificates-foreign-universities]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-psw-transition",
            blocks: [{ type: "paragraph", text: "To have a foreign degree certificate attested by Sri Lanka's Ministry of Foreign Affairs, the graduate presents the original with copies certified by the Sri Lankan embassy in the country of study or by that country's embassy in Sri Lanka. Copies certified by the British Council (for UK degrees) or the US Fulbright Commission (for US degrees) are also accepted. [CITE: mfa.gov.lk/degree-certificates-foreign-universities]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-psw-application",
            blocks: [{ type: "paragraph", text: "To have a foreign degree certificate attested by Sri Lanka's Ministry of Foreign Affairs, the graduate presents the original with copies certified by the Sri Lankan embassy in the country of study or by that country's embassy in Sri Lanka. Copies certified by the British Council (for UK degrees) or the US Fulbright Commission (for US degrees) are also accepted. [CITE: mfa.gov.lk/degree-certificates-foreign-universities]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
