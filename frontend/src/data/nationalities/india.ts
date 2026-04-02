import type { NationalityOverlay } from "../types";
import { touristVisaUkEta } from "../profiles/tourist-visa-uk-eta";

const overlay: NationalityOverlay = {
  // ── Tourist visa ──────────────────────────────────────────────
  visit: {
    "entry-requirement": {
      US: {
        callouts: [
          {
            afterBlockId: "us-entry-no-restriction",
            blocks: [
              {
                type: "paragraph",
                text: "Indian nationals applying for a B-2 visa generally have good approval rates, but face **extremely long interview wait times** at Indian consulates. At posts like Mumbai and New Delhi, appointment wait times can exceed 6 months during peak periods, and even Chennai, Hyderabad, and Kolkata can have waits of 3-4 months. This is driven by the sheer volume of applications from India. Planning ahead is key \u2014 it\u2019s best to begin the application process as soon as travel plans are being considered, not when they\u2019re confirmed. Some applicants with valid US visas that expired within the last 48 months may qualify for interview waiver (dropbox) processing, which is significantly faster.",
              },
            ],
          },
        ],
      },
      UK: {
        profile: touristVisaUkEta["entry-requirement"],
        callouts: [
          {
            afterBlockId: "uk-eta-context",
            blocks: [
              {
                type: "paragraph",
                text: "India was added to the UK Electronic Travel Authorisation (ETA) scheme in late 2024. This was a significant change \u2014 prior to this, Indian nationals required a Standard Visitor Visa with a full application and VAC appointment. The ETA dramatically simplifies UK visits for Indian families. If you applied for a UK visa before the ETA change, note that any existing valid Standard Visitor Visa remains usable alongside ETA eligibility.",
              },
            ],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-600-kvlist",
            blocks: [
              {
                type: "paragraph",
                text: "Indian nationals require the Subclass 600 Visitor visa (NOT the ETA). Applications are processed online through ImmiAccount. Processing times for Indian applicants are typically 15-25 working days. Indian applicants generally have straightforward processing for visitor visas, though comprehensive financial documentation and evidence of ties to India remain important. A health examination may be required for stays exceeding 3 months.",
              },
            ],
          },
        ],
      },
    },
    "how-to-apply": {
      US: {
        callouts: [
          {
            afterBlockId: "us-apply-book",
            blocks: [
              {
                type: "paragraph",
                text: "Interview wait times at Indian posts are the longest in the world for B-2 visas. As of recent data: Mumbai 6-8 months, New Delhi 5-7 months, Chennai 3-5 months, Hyderabad 3-5 months, Kolkata 3-4 months. Tips: (1) Check all five posts and book at whichever has the earliest availability. (2) If your family has a valid expired US visa (within 48 months), explore interview waiver/\u201Cdropbox\u201D processing at ustraveldocs.com. (3) Consider whether applying at a third-country post (if the applicant has valid residency elsewhere) is faster. (4) Monitor the appointment calendar regularly \u2014 cancellations create openings.",
              },
            ],
          },
          {
            afterBlockId: "us-apply-assessment",
            blocks: [
              {
                type: "paragraph",
                text: "Indian nationals generally have favourable outcomes at B-2 interviews when well-prepared. The high volume of applications from India means consular officers process interviews efficiently \u2014 be prepared for a brief, direct interview of 1-3 minutes. Having clear, organised documents and a concise explanation of the visit purpose (visiting child at university) is more effective than bringing excessive documentation.",
              },
            ],
          },
        ],
      },
      UK: {
        profile: touristVisaUkEta["how-to-apply"],
        callouts: [
          {
            afterBlockId: "uk-eta-apply-process",
            blocks: [
              {
                type: "paragraph",
                text: "Indian nationals were only recently added to the UK ETA scheme. The transition from Standard Visitor Visa to ETA represents a major simplification. If applying for the first time, use the UK ETA app \u2014 the process takes approximately 10 minutes and approval is typically within hours. For Indian families who previously went through the full visa application process, this change eliminates the need for VAC appointments, document submission, and the 15-working-day processing wait.",
              },
            ],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-600-apply-decision",
            blocks: [
              {
                type: "paragraph",
                text: "Indian nationals applying for the Subclass 600 should submit applications through ImmiAccount with comprehensive supporting documents. Processing for Indian applicants is typically 15-25 working days. Ensure financial documents clearly show consistent income \u2014 Indian bank statements should include all pages and be current within the last month. A health examination may be required and can be initiated after the application is submitted through ImmiAccount\u2019s health assessment links.",
              },
            ],
          },
        ],
      },
    },
  },

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
                text: "Indian nationals represent one of the largest F-1 student populations in the US. The application process is standard, but extremely long interview wait times at Indian consulates mean planning must start early \u2014 ideally 4-6 months before the intended travel date. Administrative processing (221g) is less common for Indian F-1 applicants than for some other South Asian nationalities but can still occur, particularly for students in certain STEM research fields. The most common reason for F-1 refusal among Indian applicants is not sufficiently demonstrating non-immigrant intent \u2014 the consular officer must be satisfied the student intends to return to India after study, even though the F-1 pathway may eventually lead to immigration.",
              },
            ],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-overview-kvlist",
            blocks: [
              {
                type: "paragraph",
                text: "Indian nationals must complete a tuberculosis (TB) test at an approved clinic before applying for a UK Student visa. The IHS (Immigration Health Surcharge) of \u00A3776 per year is a significant additional cost that Indian families should budget for from the outset \u2014 for a 3-year degree, this amounts to \u00A32,328 paid upfront. India\u2019s addition to the UK ETA scheme for tourist visits does NOT affect the student visa process \u2014 a full Student visa application with CAS and supporting documents is still required.",
              },
            ],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-overview-kvlist",
            blocks: [
              {
                type: "paragraph",
                text: "Indian nationals are one of the largest international student groups in Australia. The Genuine Temporary Entrant (GTE) requirement is assessed carefully \u2014 a specific, well-reasoned statement really matters. Processing times for Indian Subclass 500 applicants are typically 4-8 weeks. Australian immigration applies a risk-based assessment framework, and Indian applicants generally face standard (not elevated) scrutiny when documentation is complete. The 48-hour per fortnight work right is particularly valued by Indian students managing education costs.",
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
                text: "For Indian applicants, it's worth being especially thorough with financial documentation. Common issues include: reliance on agricultural income without supporting documentation, fixed deposits that appear to have been recently created specifically for the visa application, and insufficient evidence connecting the sponsor's income to the bank statements. If using a combination of savings, fixed deposits, and education loans, provide a clear summary showing how the total covers the I-20 amount. Education loan sanction letters from Indian banks are accepted as valid financial evidence by US consulates.",
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
                text: "Indian families should note that only funds in bank accounts count toward the UK\u2019s 28-day rule. Fixed deposits, mutual funds, PPF accounts, and property equity cannot be directly used. If converting assets to liquid funds, do so well in advance of the 28-day window. Indian bank statements should be on official letterhead with the bank\u2019s stamp and signature. Online-generated statements from most major Indian banks (SBI, HDFC, ICICI) are accepted if they include security features.",
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
                text: "Australia accepts a broader range of financial evidence than the UK, which benefits Indian families who may hold wealth across multiple instruments. Fixed deposits, education loans from recognised Indian banks, and scholarship letters are all accepted. The financial requirement is not rigidly fixed \u2014 Australia assesses the overall financial capacity rather than applying a strict threshold. This is more flexible than both the US and UK approaches. However, the source of funds should be clearly explained \u2014 large unexplained deposits will attract scrutiny.",
              },
            ],
          },
        ],
      },
    },
    "application-process": {
      US: {
        callouts: [
          {
            afterBlockId: "us-process-book-interview",
            blocks: [
              {
                type: "paragraph",
                text: "Check appointment availability across all five Indian posts: Mumbai, New Delhi, Chennai, Hyderabad, and Kolkata. Wait times vary significantly between posts and between seasons. For September start dates, begin the process by March at the latest \u2014 the DS-160 and SEVIS fee should be completed immediately after receiving the I-20. Some students book emergency appointments if standard slots are unavailable, though this should be reserved for genuinely urgent situations.",
              },
            ],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-process-biometrics",
            blocks: [
              {
                type: "paragraph",
                text: "VFS Global centres in major Indian cities (Mumbai, New Delhi, Chennai, Bangalore, Kolkata, Hyderabad, Chandigarh, Pune, and others) handle biometrics and document submission. During peak season (May-July), appointment availability can be limited \u2014 book as early as possible after submitting the online application. Priority and super-priority processing are available at additional cost and are worth considering for students with tight timelines.",
              },
            ],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-process-decision",
            blocks: [
              {
                type: "paragraph",
                text: "Indian applicants should ensure they complete the health examination promptly if requested. The examination results are submitted electronically by the approved physician directly to the Department of Home Affairs. Processing times are typically 4-8 weeks from submission of a complete application. Incomplete applications (missing health exam results, insufficient financial evidence) may result in significantly longer processing.",
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
            blocks: [
              {
                type: "paragraph",
                text: "Indian students face the same challenge as the initial application when renewing F-1 visa stamps: extremely long wait times at Indian consulates. Many Indian students choose to get their visa stamp renewed at a US consulate in a third country (Canada and Mexico are popular choices) rather than risk delays at Indian posts. If returning to India for breaks, check the wait times at your nearest consulate well in advance and consider the interview waiver option if your previous visa is within 48 months of expiry.",
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
                text: "Australian work rights of 48 hours per fortnight are particularly valuable for Indian students. Many Indian students work part-time in hospitality, retail, IT support, and tutoring. The unlimited work right during vacation periods allows students to work full-time during summer and winter breaks, which can meaningfully contribute to living expenses.",
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
                text: "Indian nationals on OPT face the same H-1B lottery as everyone else \u2014 the lottery is nationality-blind. However, the critical difference for Indian nationals emerges AFTER H-1B approval: the employment-based Green Card backlog for India is the longest of any nationality, with EB-2 and EB-3 wait times currently estimated at 10+ years and potentially decades. This means an Indian graduate could secure excellent employment and H-1B sponsorship but face an indefinite wait for permanent residency. This is the biggest factor Indian families should weigh when evaluating the US pathway. See the Residency pathway section for full detail.",
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
                text: "The Subclass 485 post-study work visa provides equal treatment regardless of nationality. For Indian graduates, this is significant because Australia\u2019s subsequent permanent residency pathway (via Subclass 189 points test or employer sponsorship) does NOT have a nationality-based queue. This is a sharp contrast to the US Green Card system. Many Indian graduates who initially target the US are now considering Australia specifically because the PR pathway is more predictable and achievable.",
              },
            ],
          },
        ],
      },
    },
    "getting-sponsored": {
      US: {
        callouts: [
          {
            afterBlockId: "us-sponsor-greencard-wait",
            blocks: [
              {
                type: "paragraph",
                text: "**This is the most important thing for Indian families to understand about the US pathway.** Indian nationals face the most severe employment-based Green Card backlog of any nationality. Current estimates for EB-3 (skilled workers with bachelor\u2019s degrees) exceed 10 years from I-140 approval, and some estimates suggest the backlog could extend to 40+ years at current processing rates. EB-2 (advanced degree) is somewhat shorter but still measured in many years to decades. During this wait, the applicant must maintain valid H-1B status (renewed in 3-year increments by the employer) \u2014 any job loss, company closure, or desire to change employers is significantly complicated by the pending Green Card. For Indian families, the US offers exceptional career and earning opportunities but the least predictable path to permanent settlement of the three countries.",
              },
            ],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-sponsor-salary",
            blocks: [
              {
                type: "paragraph",
                text: "The Skilled Worker visa salary threshold of \u00A338,700 translates to approximately INR 42 lakh per year at current exchange rates. UK graduate salaries in technology and professional services typically reach this threshold within 1-2 years. Critically, the UK has NO nationality-based queue for the Skilled Worker visa or ILR \u2014 an Indian graduate faces the same timeline as any other nationality. This predictability is a major advantage over the US pathway for Indian families. After 5 years of continuous residence, ILR is achievable regardless of country of birth.",
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
                text: "Australia\u2019s points-tested Subclass 189 pathway is nationality-blind and has no per-country quotas. For Indian graduates, this is a transformative advantage over the US Green Card system. An Indian graduate with an Australian qualification, strong English (IELTS 8+), and relevant work experience is assessed on exactly the same basis as graduates from any other country. Many Indian families are increasingly choosing Australia over the US specifically because the permanent residency pathway is achievable in a predictable timeframe (typically 5-8 years from student arrival) rather than the uncertain decades-long wait in the US.",
              },
            ],
          },
        ],
      },
    },
  },

  // ── Residency pathway ─────────────────────────────────────────
  residency: {
    "permanent-residency": {
      US: {
        callouts: [
          {
            afterBlockId: "us-pr-visa-bulletin",
            blocks: [
              {
                type: "paragraph",
                text: "**Indian nationals face the longest Green Card wait of any nationality.** The per-country cap system limits each country to approximately 7% of annual employment-based Green Cards, regardless of demand. Given the enormous volume of Indian applicants, the EB-2 and EB-3 queues for India-born applicants currently extend to an estimated 10-40+ years. Legislative proposals to eliminate per-country caps have been introduced multiple times but have not passed. Indian families should think of the US Green Card as something that may take decades rather than a reliable plan. During the wait, the applicant remains on H-1B (employer-dependent), which creates practical limitations around job changes, entrepreneurship, and geographic flexibility. Some Indian applicants pursue EB-1A (extraordinary ability, no queue) or the [TERM: niw|National Interest Waiver (NIW)] to bypass the standard backlog, but these have very high qualification thresholds.",
              },
            ],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-pr-timeline",
            blocks: [
              {
                type: "paragraph",
                text: "Australia\u2019s permanent residency pathway is nationality-blind \u2014 the points test and employer-nominated routes treat Indian applicants identically to all others. The realistic timeline of 5-8 years from student arrival to PR is consistent and predictable for Indian nationals. This is the most significant differentiator between Australia and the US for Indian families. An Indian graduate with strong qualifications and Australian work experience has the same opportunity as a graduate from any other country, without the decades-long queue that characterises the US system.",
              },
            ],
          },
        ],
      },
    },
    "dual-nationality": {
      _crossCutting: {
        callouts: [
          {
            afterBlockId: "dual-origin-position",
            blocks: [
              {
                type: "paragraph",
                text: "India does not permit dual nationality. An Indian national who naturalises as a citizen of the United States, United Kingdom, or Australia is required to surrender their Indian passport. However, India offers the [TERM: oci|**Overseas Citizen of India (OCI)**] card to former Indian citizens and their descendants. The OCI card provides: lifelong right to visit and work in India without a visa, exemption from foreigner registration requirements, and broadly equivalent rights to Indian citizens in most areas except voting, holding public office, and purchasing agricultural land. The OCI card is widely regarded as the practical equivalent of dual nationality for most purposes, and the vast majority of Indian-origin naturalised citizens of the US, UK, and Australia hold an OCI card. Families should apply for OCI promptly after naturalisation to maintain seamless access to India. [CITE: mha.gov.in/oci]",
              },
            ],
          },
        ],
      },
    },
  },
};

export default overlay;
