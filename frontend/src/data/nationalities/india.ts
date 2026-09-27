import type { NationalityOverlay } from "../types";

const overlay: NationalityOverlay = {
  // ── Student visa ──────────────────────────────────────────────
  student: {
    overview: {
      US: {
        callouts: [
          {
            afterBlockId: "us-overview-kvlist",
            blocks: [
              {
                type: "paragraph",
                text: "Indian nationals represent one of the largest F-1 student populations in the US. The application process is standard, but extremely long interview wait times at Indian consulates mean planning must start early. Administrative processing (221g) is less common for Indian F-1 applicants than for some other South Asian nationalities but can still occur, particularly for students in certain STEM research fields. The most common reason for F-1 refusal among Indian applicants is not sufficiently demonstrating non-immigrant intent — the consular officer must be satisfied the student intends to return to India after study, even though the F-1 pathway may eventually lead to immigration. [CITE: travel.state.gov/student-visa]",
              },
            ],
          },
        ],
      },
    },
    documents: {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-financial",
            blocks: [
              {
                type: "paragraph",
                text: "For Indian applicants, it's worth being especially thorough with financial documentation. Common issues include: reliance on agricultural income without supporting documentation, fixed deposits that appear to have been recently created specifically for the visa application, and insufficient evidence connecting the sponsor's income to the bank statements. If using a combination of savings, fixed deposits, and education loans, provide a clear summary showing how the total covers the required amount. Education loan sanction letters from Indian banks are accepted as valid financial evidence by US consulates.",
              },
            ],
            practical: true,
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
                text: "Indian families should note that only funds in bank accounts count toward the UK’s financial requirement — fixed deposits, mutual funds, PPF accounts, and property equity cannot be directly used. Indian bank statements should be on official letterhead with the bank’s stamp and signature. Online-generated statements from most major Indian banks (SBI, HDFC, ICICI) are accepted if they include security features. [CITE: gov.uk/student-visa/money]",
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
                text: "Australia accepts a broader range of financial evidence than the UK, which benefits Indian families who may hold wealth across multiple instruments. Fixed deposits, education loans from recognised Indian banks, and scholarship letters are all accepted. The financial requirement is not rigidly fixed — Australia assesses the overall financial capacity rather than applying a strict threshold. This is more flexible than both the US and UK approaches. However, the source of funds should be clearly explained — large unexplained deposits will attract scrutiny. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500]",
              },
            ],
          },
        ],
      },
    },
    "application-process": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-process-biometrics",
            blocks: [
              {
                type: "paragraph",
                text: "VFS Global centres across India handle biometrics and document submission for the UK Student visa. Book your appointment as early as possible after submitting the online application. Priority and super-priority processing are available at additional cost and are worth considering for students with tight timelines.",
              },
            ],
            practical: true,
          },
        ],
      },
    },
    "after-arrival": {
      US: {
        callouts: [
          {
            afterBlockId: "us-arrival-travel",
            blocks: [
              {
                type: "paragraph",
                text: "Indian students face the same challenge as the initial application when renewing F-1 visa stamps: extremely long wait times at Indian consulates. Many Indian students choose to get their visa stamp renewed at a US consulate in a third country (Canada and Mexico are popular choices) rather than risk delays at Indian posts. If returning to India for breaks, check wait times at your nearest consulate well in advance and consider the interview waiver option if your previous visa qualifies. [CITE: studyinthestates.dhs.gov/students/travel]",
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
      AU: {
        callouts: [
          {
            afterBlockId: "au-psw-application",
            blocks: [
              {
                type: "paragraph",
                text: "The post-study work visa provides equal treatment regardless of nationality. For Indian graduates, this is significant because Australia’s subsequent permanent residency pathway (via the points test or employer sponsorship) does NOT have a nationality-based queue. This is a sharp contrast to the US Green Card system. Many Indian graduates who initially target the US are now considering Australia specifically because the PR pathway is more predictable and achievable.",
              },
            ],
            practical: true,
          },
        ],
      },
    },
  },
};

export default overlay;
