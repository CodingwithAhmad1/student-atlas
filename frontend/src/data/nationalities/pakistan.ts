import type { NationalityOverlay } from "../types";
// No profile imports — Pakistan uses base content for all countries

const overlay: NationalityOverlay = {
  // ── Tourist visa ──────────────────────────────────────────────
  visit: {
    "how-to-apply": {
      US: {
        callouts: [
          {
            afterBlockId: "us-apply-assessment",
            practical: true,
            blocks: [
              {
                type: "paragraph",
                text: "Pakistani applicants should expect more detailed questioning about ties to Pakistan, particularly around employment stability, property ownership, and family obligations. Applicants who are self-employed or retired tend to face closer review. Having a clearly written letter explaining the purpose of the visit (visiting a child at university), evidence of the child's enrollment, and a detailed travel itinerary significantly strengthens the application.",
              },
            ],
          },
        ],
      },
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
        callouts: [
          {
            afterBlockId: "uk-docs-financial-rule",
            blocks: [
              {
                type: "paragraph",
                text: "For Pakistani families, the 28-day rule requires particular attention. Funds must be held in a bank account (not prize bonds, national savings certificates, or property equity). Pakistani bank statements should be on official letterhead with stamps. [CITE: gov.uk/student-visa/money]",
              },
            ],
          },
        ],
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
    },
    "getting-sponsored": {
      AU: {
        callouts: [
          {
            afterBlockId: "au-sponsor-189",
            blocks: [
              {
                type: "paragraph",
                text: "Australia's points-tested Subclass 189 pathway is particularly accessible to Pakistani graduates. There is no nationality-based queue — applications are assessed purely on points. A Pakistani graduate with an Australian qualification, strong English ability, and relevant work experience can achieve a competitive points score. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189]",
              },
            ],
          },
        ],
      },
    },
  },
};

export default overlay;
