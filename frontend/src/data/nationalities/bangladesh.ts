import type { NationalityOverlay } from "../types";

/**
 * Bangladesh — nationality overlay (Tier A).
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
            blocks: [{ type: "paragraph", text: "GOV.UK lists Home Office-approved TB test clinics for Bangladesh in Dhaka, Sylhet and Chattogram. A certificate from any clinic not on the list is not accepted. [CITE: gov.uk/tb-clinics-bangladesh]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-process-decision",
            blocks: [{ type: "paragraph", text: "The Australian High Commission in Dhaka warns that if an agent lodges your visa, the agent should let you see the application in ImmiAccount to check the visa type and status, and an agent who refuses is scamming you. High Commission staff in Dhaka cannot help with general visa enquiries. [CITE: bangladesh.highcommission.gov.au/visas]" }],
          },
        ],
      },
    },
    "documents": {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-financial",
            blocks: [{ type: "paragraph", text: "Under Bangladesh Bank's foreign exchange guidelines, a bank releases money for undergraduate, postgraduate and professional diploma courses at recognised institutions abroad against the admission letter (the I-20 for US institutions), the institution's cost estimate, attested educational certificates and a valid passport. Tuition is paid directly to the institution, no more than one academic year is released at a time, and all purchases for the whole course must come from **one bank branch**, which keeps the student's file. [CITE: bb.org.bd/gfet-ch11]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-financial-rule",
            blocks: [{ type: "paragraph", text: "Under Bangladesh Bank's foreign exchange guidelines, a bank releases money for undergraduate, postgraduate and professional diploma courses at recognised institutions abroad against the admission letter (the I-20 for US institutions), the institution's cost estimate, attested educational certificates and a valid passport. Tuition is paid directly to the institution, no more than one academic year is released at a time, and all purchases for the whole course must come from **one bank branch**, which keeps the student's file. [CITE: bb.org.bd/gfet-ch11]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-financial",
            blocks: [{ type: "paragraph", text: "Under Bangladesh Bank's foreign exchange guidelines, a bank releases money for undergraduate, postgraduate and professional diploma courses at recognised institutions abroad against the admission letter (the I-20 for US institutions), the institution's cost estimate, attested educational certificates and a valid passport. Tuition is paid directly to the institution, no more than one academic year is released at a time, and all purchases for the whole course must come from **one bank branch**, which keeps the student's file. [CITE: bb.org.bd/gfet-ch11]" }],
          },
        ],
      },
    },
    "overview": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-overview-kvlist",
            blocks: [{ type: "paragraph", text: "Bangladeshi citizens who live permanently in Bangladesh are eligible for **Commonwealth Master's Scholarships** [CITE: cscuk.fcdo.gov.uk/commonwealth-masters-scholarships] and Commonwealth PhD Scholarships for least developed countries and vulnerable states [CITE: cscuk.fcdo.gov.uk/commonwealth-phd-scholarships]. Applications go through a national nominating agency, not directly to the Commonwealth Scholarship Commission, and scholars commit to returning home afterwards. [CITE: cscuk.fcdo.gov.uk/commonwealth-masters-scholarships]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
