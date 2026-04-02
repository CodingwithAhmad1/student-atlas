import type { NationalityOverlay } from "../types";
// No profile imports — Pakistan uses base content for all countries

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
                text: "Pakistani nationals may face closer scrutiny during the visa process. Something called 221(g) administrative processing \u2014 essentially an extended background review \u2014 is more common for Pakistani applicants and can add 2\u20138 weeks or longer to the timeline. It\u2019s worth knowing about this upfront so travel dates can be planned with some buffer. That said, approval is certainly achievable with strong documentation. The key factors are demonstrating clear financial means, strong ties to Pakistan, and a credible reason to visit.",
              },
            ],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-svv-kvlist",
            blocks: [
              {
                type: "paragraph",
                text: "Pakistani nationals applying at VFS Global centres in Islamabad, Lahore, or Karachi should expect processing times of 15 working days standard. During peak summer months (May-August), processing can extend to 4-6 weeks. Priority processing (5 working days, additional £250) is available and recommended if travel dates are fixed. Pakistani applicants do see a somewhat higher refusal rate than some other nationalities — the most common reasons are insufficient financial evidence and weak ties to Pakistan. A well-documented application with clear bank statements showing consistent income over 6 months significantly improves approval chances.",
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
                text: "Pakistani nationals are placed in a higher assessment level by Australian immigration, which means applications go through more detailed review. Processing times are typically 20-40 working days, longer than for lower-risk nationalities. A health examination at an approved panel physician is mandatory for Pakistani applicants. Ensure all financial documentation clearly demonstrates sufficient funds — Australian immigration officers assess the genuineness of available funds, not just the total amount.",
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
                text: "Interview wait times at the US Embassy Islamabad and US Consulate Karachi can be significantly longer than at Gulf posts. During peak season, waits of 2-4 months are common. If the applicant holds valid UAE or other Gulf residency, applying at a third-country US Embassy (e.g., Abu Dhabi) may offer shorter wait times, though this can trigger additional questions about why the applicant is not applying in Pakistan.",
              },
            ],
          },
          {
            afterBlockId: "us-apply-assessment",
            blocks: [
              {
                type: "paragraph",
                text: "Pakistani applicants should expect more detailed questioning about ties to Pakistan, particularly around employment stability, property ownership, and family obligations. Applicants who are self-employed or retired tend to face closer review. Having a clearly written letter explaining the purpose of the visit (visiting a child at university), evidence of the child's enrollment, and a detailed travel itinerary significantly strengthens the application.",
              },
            ],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-svv-apply-documents",
            blocks: [
              {
                type: "paragraph",
                text: "It helps to include especially strong financial evidence. Bank statements should cover at least 6 months and show consistent salary credits, not just a lump-sum balance. Property ownership documents, employment letters on company letterhead with salary details, and tax returns all strengthen the application. If the trip is to visit a child studying in the UK, include the child's university enrollment letter, student visa copy, and accommodation details.",
              },
            ],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-600-apply-health",
            blocks: [
              {
                type: "paragraph",
                text: "Pakistani nationals MUST complete a health examination as part of the Subclass 600 application. This includes a chest X-ray and general medical examination at an approved panel physician. In Pakistan, approved physicians are listed on the ImmiAccount portal. Allow 1-2 weeks for the health examination process. The examination results are submitted directly to the Department of Home Affairs by the physician.",
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
                text: "Pakistani nationals applying for an F-1 visa should know that administrative processing under Section 221(g) is more common than for many other nationalities, particularly for students in STEM fields (science, technology, engineering, mathematics). This can add 4\u201312 weeks to the visa decision. It\u2019s best to apply as early as possible \u2014 ideally 3\u20134 months before the program start date. The refusal rate for Pakistani F-1 applicants tends to be higher than for Gulf nationals, so thorough preparation of financial documents and a clear explanation of post-graduation plans really matters.",
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
                text: "Pakistani nationals must complete a tuberculosis (TB) test at an approved clinic before applying. In Pakistan, approved clinics are listed on the gov.uk website. Allow 5-7 working days for results. The TB test certificate is valid for 6 months. Additionally, Pakistani students should expect biometrics processing to take 2-3 weeks at VFS centres in major cities.",
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
                text: "Pakistani nationals applying for the Subclass 500 student visa are placed in a higher assessment level than applicants from lower-risk countries. The Genuine Temporary Entrant (GTE) requirement is looked at more closely — a well-written, specific GTE statement really matters and should clearly explain why this particular course and institution, what career opportunities it creates in Pakistan, and evidence of intent to return. Processing times for Pakistani applicants are typically 6-8 weeks.",
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
                text: "It\u2019s worth paying close attention to financial documentation. Consular officers look at whether funds are genuine, accessible, and sufficient. Common issues include: bank statements showing sudden large deposits, reliance on business income without supporting tax documentation, and insufficient explanation of fund sources. If funds are held in a joint family account, provide a clear explanation of the account structure and the sponsor's relationship to the student.",
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
                text: "For Pakistani families, the 28-day rule requires particular attention. Funds must be held in a bank account (not prize bonds, national savings certificates, or property equity). If converting assets to liquid funds, do so well before the 28-day window. Pakistani bank statements should be on official letterhead with stamps — some UK visa officers are familiar with Pakistani bank statement formats and may question statements that appear informal.",
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
                text: "Pakistani applicants should provide comprehensive financial documentation including bank statements, sponsor's income evidence (salary slips, tax returns), and a detailed explanation of how funds will cover the full duration of study. Fixed deposits and national savings certificates are accepted by Australian immigration as evidence of financial capacity, making this more flexible than the UK requirement.",
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
                text: "The US Embassy Islamabad and US Consulate Karachi both process F-1 visas. During peak season (April-July), appointment wait times can exceed 2-3 months. Monitor appointment availability on both posts and book at whichever offers the earliest slot. Some applicants with valid third-country residency apply at posts in the Gulf — this is permitted but may result in additional scrutiny. Attend the interview with all original documents, not photocopies.",
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
                text: "VFS Global centres in Islamabad, Lahore, and Karachi handle biometrics appointments. During peak season (June-August), wait times can extend to 3-4 weeks. Priority appointments are available at an additional fee and are strongly recommended for students with fixed term start dates. All original documents should be carried to the appointment, and certified translations must be provided for any documents not in English.",
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
                text: "Processing times for Pakistani student visa applicants are typically 6-8 weeks but can extend during peak periods (November-February for the Australian academic year). Submit a complete application to avoid requests for additional information, which restart the processing clock. Ensure the health examination is completed promptly after submission — it is a common bottleneck.",
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
                text: "Pakistani students should plan ahead when travelling home during breaks. Renewing an F-1 visa stamp at the Islamabad or Karachi posts can take 2-4 weeks, and administrative processing (221g) may add further delay. Some Pakistani students choose to renew their visa at a third-country post (such as Canada or a Gulf country) to avoid potential delays at Pakistani posts. However, this carries its own risks and should be researched carefully.",
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
                text: "Pakistani students benefit from Australia's relatively generous work rights of 48 hours per fortnight. This is particularly valuable given the higher cost of living in Australian cities. Many Pakistani students work part-time in hospitality, retail, or tutoring to supplement their income.",
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
                text: 'Pakistani nationals on OPT face the same process as any other nationality — the H-1B lottery is nationality-blind. However, Pakistani graduates should be aware that their country-of-birth category for the Green Card ("rest of the world") is significantly more favourable than the Indian and Chinese categories. This means that if they successfully secure H-1B sponsorship, the path to permanent residency is substantially shorter than for Indian colleagues in the same role.',
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
                text: "The Subclass 485 post-study work visa is processed on the same basis regardless of nationality. Pakistani graduates who studied in regional Australia benefit from extended post-study work rights (up to 3 years for a bachelor's degree), which provides additional time to secure employer sponsorship or accumulate points for the Subclass 189 skilled independent visa.",
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
                text: 'Pakistani nationals benefit from the "rest of the world" (ROW) Green Card processing category. Unlike Indian nationals who face decades-long backlogs, Pakistani nationals typically see EB-2 wait times of 2-5 years from I-140 approval. This makes the US permanent residency pathway significantly more viable for Pakistani families than for Indian families, and is an important factor when comparing destination countries.',
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
                text: "The Skilled Worker visa salary threshold of £38,700 translates to approximately PKR 14 million per year at current exchange rates. For Pakistani families benchmarking against local salaries, this represents a significant premium. However, UK graduate salaries in technology and professional services, particularly in London, typically meet or exceed this threshold within 1-2 years of starting employment. The new entrant rate of £30,960 provides a more accessible starting point.",
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
                text: "Australia's points-tested Subclass 189 pathway is particularly accessible to Pakistani graduates. There is no nationality-based queue — applications are assessed purely on points. A Pakistani graduate with an Australian qualification, strong English (IELTS 8+), and relevant work experience can achieve a competitive points score. The absence of per-country quotas makes Australia's PR pathway the most predictable of the three countries for Pakistani nationals.",
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
                text: 'Pakistani nationals fall into the "rest of the world" (ROW) category, which has significantly shorter wait times than India and China. The realistic timeline from student arrival to Green Card for a Pakistani national in the EB-2 category is approximately 8-14 years. While this is long, it is substantially more achievable than the Indian timeline, which currently extends to decades. This comparatively favourable position is worth factoring into the destination country decision.',
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
                text: "The Australian PR pathway through the Subclass 189 points test does not discriminate by nationality. Pakistani graduates who score well on the points test (age, English, qualifications, Australian study) have the same opportunity as any other nationality. This is a sharp contrast to the US per-country Green Card system, and it\u2019s a big reason many Pakistani families find Australia an attractive option for long-term settlement.",
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
                text: "Pakistan does not officially permit dual nationality with all countries. However, Pakistan has bilateral agreements with a specific list of countries — and the United States, United Kingdom, and Australia are all on this list. This means a Pakistani national who naturalises in any of these three destination countries may retain their Pakistani nationality. In practice, this is a significant advantage over UAE and Indian nationals, who face restrictions on dual nationality. Pakistani families should confirm current dual nationality provisions with the Pakistani embassy at the time of naturalisation, as policies can evolve.",
              },
            ],
          },
        ],
      },
    },
  },
};

export default overlay;
