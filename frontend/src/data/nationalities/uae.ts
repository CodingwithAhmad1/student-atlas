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
                text: "UAE nationals applying for an Australian Subclass 500 visa typically experience straightforward processing. Australia does not require an in-person interview for student visa applications — the entire process is done online. Having comprehensive financial documentation prepared from the outset is the single most effective way to avoid delays. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500]",
              },
            ],
          },
        ],
      },
    },
    documents: {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-financial-rule",
            blocks: [
              {
                type: "paragraph",
                text: "UAE families commonly hold funds across multiple accounts or in investment portfolios. For the UK application, only funds held in a bank account (not stocks, bonds, or real estate equity) count toward the financial threshold. If funds need to be consolidated into a single account to meet the threshold, this should be done well before the 28-day window begins — not within it. A transfer made within the 28-day period that artificially inflates the balance will be visible on statements and may trigger a refusal. [CITE: gov.uk/student-visa/money]",
              },
            ],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-financial",
            blocks: [
              {
                type: "paragraph",
                text: "Australia is more flexible than the UK on the form that financial evidence takes. A UAE family that holds wealth in investment accounts, fixed deposits, or property can provide a broader range of financial documents. A letter from a UAE bank confirming the family’s overall financial position is often accepted alongside bank statements. This is a meaningful practical difference for high-net-worth UAE families who do not keep large sums in liquid current accounts. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500]",
              },
            ],
          },
        ],
      },
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
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-arrival-work",
            blocks: [
              {
                type: "paragraph",
                text: "The Australian work rights during study are notably more generous than many other destinations. For families where the student is expected to contribute to living costs through part-time work, this is a meaningful practical difference. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500]",
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
                text: "UAE nationals on OPT are not subject to any nationality-specific work restrictions. The OPT experience for a UAE graduate in the US is the same as for any other nationality. The H-1B lottery — the primary path to remaining after OPT — also treats all nationalities equally in the lottery itself. The Green Card backlog, however, differs significantly by nationality and is discussed in the Getting sponsored section. [CITE: uscis.gov/h-1b]",
              },
            ],
          },
        ],
      },
    },
    "getting-sponsored": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-sponsor-salary",
            blocks: [
              {
                type: "paragraph",
                text: "The Skilled Worker visa salary threshold of £41,700 applies to most sponsored roles in the UK. For UAE families benchmarking against local salaries, UK graduate salaries in most sectors — particularly outside London — may initially fall below this threshold for entry-level roles. The new entrant rate of £33,400 mitigates this for the first few years. Students intending to remain in the UK after graduation should target roles at employers with active sponsor licences and salaries that meet the threshold — London-based roles in technology, finance, and professional services most reliably meet this bar. [CITE: gov.uk/skilled-worker-visa/your-job]",
              },
            ],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-sponsor-189",
            blocks: [
              {
                type: "paragraph",
                text: "For UAE graduates, Australia offers the most straightforward path to permanent residency of the three countries — particularly through the Subclass 189 points-tested route, which requires no employer sponsor and is not subject to a lottery. A UAE graduate with a strong academic record, high English proficiency, and Australian study experience is well-positioned to achieve a competitive points score. The absence of a nationality-based queue (unlike the US EB categories) means the timeline is predictable. This is a meaningful advantage that is frequently overlooked by Gulf families who default to comparing the US and UK. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189]",
              },
            ],
          },
        ],
      },
    },
  },
};

export default overlay;
