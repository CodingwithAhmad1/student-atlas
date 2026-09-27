import type { NationalityOverlay } from "../types";
// No profile imports — China uses base content for all countries (standard visas)

const overlay: NationalityOverlay = {
  // ── Tourist visa ──────────────────────────────────────────────
  visit: {
    "entry-requirement": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-svv-kvlist",
            blocks: [
              {
                type: "paragraph",
                text: "Chinese nationals apply through VFS Global centres in Beijing, Shanghai, Guangzhou, Chengdu, and several other cities. A helpful detail: the UK offers Chinese applicants a 2-year standard visitor visa at the same fee as the 6-month visa, and there is also a longer-term visit visa option. For parents planning multiple visits over the course of a degree, the 2-year visa can save both money and hassle. [CITE: gov.uk/standard-visitor-visa]",
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
                text: "Chinese nationals apply for the Subclass 600 visitor visa online through ImmiAccount. For parents planning regular visits, Australia offers Chinese nationals a Frequent Traveller stream visa valid for three or ten years — well worth considering if you expect to visit often. All documents in Chinese must be accompanied by certified English translations. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600]",
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
            afterBlockId: "us-apply-assessment",
            practical: true,
            blocks: [
              {
                type: "paragraph",
                text: "Chinese applicants should be ready to demonstrate strong ties to China — property ownership, employment, business interests, or family obligations all help. The consular officer wants to see that you have clear reasons to return home. For parents visiting a child at university, including the child's enrollment certificate and a clear travel itinerary strengthens the application. Be aware that extra administrative processing may apply to applicants with backgrounds in certain advanced technology fields.",
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
                text: "Chinese nationals applying for the Subclass 600 may be asked to provide a health examination depending on the length of stay and individual risk assessment. If required, examinations must be completed at an approved panel physician in China. The ImmiAccount online system supports a Chinese-language interface, making the application process more accessible. [CITE: immi.homeaffairs.gov.au/health-examinations]",
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
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-financial-rule",
            blocks: [
              {
                type: "paragraph",
                text: "The UK's strict 28-day financial evidence rule requires Chinese applicants to show funds in a bank account (not property or investments) for the full 28-day period before the date of application. Chinese bank certificates (cun kuan zheng ming) are accepted, but must be accompanied by certified English translations. An important heads-up: funds held in WeChat Pay or Alipay balances are NOT accepted — they must be in a bank account. If you need to transfer funds from investments, make sure the full required amount has been sitting in the bank for at least 28 days before you apply. [CITE: gov.uk/student-visa/money]",
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
                text: "Australian immigration accepts a broader range of financial evidence than the UK for Chinese applicants. Bank deposit certificates, property valuations, investment portfolios, and income from business activities are all considered. The key requirement is demonstrating that the student has access to sufficient funds to cover tuition, living costs, and travel for the duration of the course. Provide certified English translations for all Chinese-language documents. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500]",
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
                text: "US Embassy and Consulate posts in China process a high volume of F-1 visas annually. Apply as early as possible: F-1 visas can be issued up to 120 days before the programme start date. The interview itself is typically brief and conducted in English or with an interpreter, so there is no need to be anxious about it. [CITE: studyinthestates.dhs.gov/students/the-form-i-20]",
              },
            ],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-process-biometrics",
            practical: true,
            blocks: [
              {
                type: "paragraph",
                text: "VFS Global centres across China handle UK visa biometrics appointments, with centres in many major cities, so most families will have one within reach. During peak season, appointments book up quickly, so schedule as early as you can. Priority and super priority services are available at additional cost and well worth considering if your term start date is fixed.",
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
                text: "The Subclass 485 post-study work visa is processed on the same basis regardless of nationality. This is where Australia really stands out for Chinese graduates: the points-based system has no per-country quotas, unlike the US Green Card system. This makes the Australian pathway to permanent residency more predictable. Graduates who studied in regional Australia may also benefit from extended post-study work rights. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485]",
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
                text: "Australia's points-tested Subclass 189 pathway treats all nationalities equally — there are no per-country quotas. This is a significant advantage for Chinese nationals compared to the US system where Chinese applicants face backlogs. A Chinese graduate with an Australian qualification, strong English test results, and relevant work experience can achieve a competitive points score. The Subclass 190 (state-nominated) and Subclass 491 (regional) pathways provide additional options with lower points thresholds. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189]",
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
      AU: {
        callouts: [
          {
            afterBlockId: "au-pr-timeline",
            blocks: [
              {
                type: "paragraph",
                text: "Australia's points-based permanent residency system has no per-country queues, making it the most predictable pathway for Chinese nationals among the three destination countries. The Subclass 189 (skilled independent) and Subclass 190 (state-nominated) visas assess applicants purely on points — age, English ability, qualifications, and work experience. Chinese graduates of Australian institutions receive additional points for their Australian qualification. The absence of nationality-based quotas contrasts sharply with the US per-country Green Card caps. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189]",
              },
            ],
          },
        ],
      },
    },
  },
};

export default overlay;
