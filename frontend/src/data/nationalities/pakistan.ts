import type { NationalityOverlay } from "../types";
// No profile imports — Pakistan uses base content for all countries

const overlay: NationalityOverlay = {
  // ── Tourist visa ──────────────────────────────────────────────
  visit: {
    "how-to-apply": {
      US: {
        callouts: [],
      },
      AU: { callouts: [
          {
            afterBlockId: "au-600-apply-form",
            blocks: [
              {
                type: "paragraph",
                text: "As of September 2026, applicants in Pakistan no longer need to book an appointment to give biometrics; they take their passport, identification and the biometrics letter to the collection centre. The Australian High Commission in Islamabad does not answer visa enquiries or give application updates, so questions go to the Home Affairs Global Service Centre. [CITE: pakistan.highcommission.gov.au/visas]",
              },
            ],
          },
        ] },
    },
  },

  // ── Student visa ──────────────────────────────────────────────
  student: {
    documents: {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-financial",
            practical: true,
            blocks: [
              {
                type: "paragraph",
                text: "It’s worth paying close attention to financial documentation. Consular officers look at whether funds are genuine, accessible, and sufficient. Common issues include: bank statements showing sudden large deposits, reliance on business income without supporting tax documentation, and insufficient explanation of fund sources. If funds are held in a joint family account, provide a clear explanation of the account structure and the sponsor's relationship to the student.",
              },
            ],
          },
        ],
      },
      UK: {
        callouts: [],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-financial",
            practical: true,
            blocks: [
              {
                type: "paragraph",
                text: "Pakistani applicants should provide comprehensive financial documentation including bank statements, sponsor's income evidence (salary slips, tax returns), and a detailed explanation of how funds will cover the full duration of study. Fixed deposits and national savings certificates are accepted by Australian immigration as evidence of financial capacity, making this more flexible than the UK requirement.",
              },
            ],
          },
        ],
      },
    },
    "application-process": {
      UK: { callouts: [
          {
            afterBlockId: "uk-process-tb",
            blocks: [
              {
                type: "paragraph",
                text: "GOV.UK lists Home Office-approved TB test clinics for Pakistan in Islamabad, Lahore, Karachi and Mirpur. A certificate from any clinic not on the list is not accepted. [CITE: gov.uk/tb-clinics-pakistan]",
              },
            ],
          },
        ] },
    },
    overview: {
      UK: { callouts: [
          {
            afterBlockId: "uk-overview-kvlist",
            blocks: [
              {
                type: "paragraph",
                text: "Pakistani citizens who live permanently in Pakistan are eligible for **Commonwealth Master's Scholarships** [CITE: cscuk.fcdo.gov.uk/commonwealth-masters-scholarships] and Commonwealth PhD Scholarships for least developed countries and vulnerable states [CITE: cscuk.fcdo.gov.uk/commonwealth-phd-scholarships]. Applications go through a national nominating agency, not directly to the Commonwealth Scholarship Commission, and scholars commit to returning home afterwards. [CITE: cscuk.fcdo.gov.uk/commonwealth-masters-scholarships]",
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
                text: 'Pakistani nationals on OPT face the same process as any other nationality — the H-1B lottery is nationality-blind. However, Pakistani graduates should be aware that their country-of-birth category for the Green Card ("rest of the world") is significantly more favourable than the Indian and Chinese categories. This means that if they successfully secure H-1B sponsorship, the path to permanent residency is substantially shorter than for Indian colleagues in the same role. [CITE: uscis.gov/h-1b]',
              },
            ],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-psw-application",
            blocks: [
              {
                type: "paragraph",
                text: "The Subclass 485 post-study work visa is processed on the same basis regardless of nationality. Pakistani graduates who studied in regional Australia benefit from extended post-study work rights, which provides additional time to secure employer sponsorship or accumulate points for the Subclass 189 skilled independent visa. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485]",
              },
            ],
          },
        ],
      },
      UK: { callouts: [] },
    },
    "getting-sponsored": {
      AU: {
        callouts: [],
      },
    },
  },
};

export default overlay;
