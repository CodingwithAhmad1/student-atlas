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
                text: "Chinese nationals applying in mainland China under the Chinese visa scheme can get a **2-year visit visa for the 6-month visa fee**. For parents planning several visits over the course of a degree, the 2-year visa can save both money and hassle. [CITE: gov.uk/visit-visa-fees-2026]",
              },
            ],
          },
          {
            afterBlockId: "uk-svv-intro",
            blocks: [
              {
                type: "paragraph",
                text: "The UK visitor visa requirement for Chinese nationals does not apply to holders of a Hong Kong SAR or Macao SAR passport. [CITE: gov.uk/visa-national-list]",
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
      US: { callouts: [
          {
            afterBlockId: "us-entry-no-restriction",
            blocks: [
              {
                type: "paragraph",
                text: "Chinese nationals with a 10-year B-1/B-2 visa in a Chinese passport must also hold a valid **EVUS enrollment** (at evus.gov) to travel; travellers without a valid enrollment cannot get a boarding pass. [CITE: cbp.gov/evus-faq]",
              },
            ],
          },
        ] },
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
                text: "The UK's 28-day rule means the money must be held for the full 28 days before you apply. Besides bank statements, certificates of deposit and letters from the bank are accepted, but not accounts at institutions that are not regulated in their country or do not keep electronic records, and not stocks, shares or cryptocurrency. [CITE: gov.uk/student-visa/money] [CITE: gov.uk/financial-evidence-students]",
              },
            ],
          },
          {
            afterBlockId: "uk-docs-financial-rule",
            blocks: [
              {
                type: "paragraph",
                text: "China's foreign-exchange rules give each person an annual quota equivalent to US$50,000 for buying foreign currency. Study-abroad costs can be bought outside that quota by showing the bank your ID and documents that state the amount and purpose of the payment. [CITE: safe.gov.cn/tianjin-personal-fx-2026-07]",
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
          {
            afterBlockId: "au-docs-financial",
            blocks: [
              {
                type: "paragraph",
                text: "China's foreign-exchange rules give each person an annual quota equivalent to US$50,000 for buying foreign currency. Study-abroad costs can be bought outside that quota by showing the bank your ID and documents that state the amount and purpose of the payment. [CITE: safe.gov.cn/tianjin-personal-fx-2026-07]",
              },
            ],
          },
        ],
      },
      US: { callouts: [
          {
            afterBlockId: "us-docs-financial",
            blocks: [
              {
                type: "paragraph",
                text: "China's foreign-exchange rules give each person an annual quota equivalent to US$50,000 for buying foreign currency. Study-abroad costs can be bought outside that quota by showing the bank your ID and documents that state the amount and purpose of the payment. [CITE: safe.gov.cn/tianjin-personal-fx-2026-07]",
              },
            ],
          },
        ] },
    },
    "application-process": {
      US: {
        callouts: [
          {
            afterBlockId: "us-process-book-interview",
            blocks: [
              {
                type: "paragraph",
                text: "US Embassy and Consulate posts in China process a high volume of F-1 visas. Apply as early as possible: F-1 visas can be issued up to 365 days before the programme start date. [CITE: studyinthestates.dhs.gov/students/the-form-i-20]",
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
          {
            afterBlockId: "uk-process-tb",
            blocks: [
              {
                type: "paragraph",
                text: "The Home Office-approved TB clinics in mainland China are in Beijing, Chengdu, Chongqing, Dongguan, Fuzhou, Guangzhou, Hangzhou, Harbin, Jinan, Nanjing, Shanghai, Shenyang, Shenzhen, Wuhan and Xi'an. [CITE: gov.uk/tb-clinics-china] Bring your passport or ID card, and children under 17 must be accompanied by a parent or legal guardian. [CITE: gov.uk/tb-testing-china]",
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
          {
            afterBlockId: "au-psw-application",
            blocks: [
              {
                type: "paragraph",
                text: "Graduates returning to China can have a foreign degree assessed by the Ministry of Education's Chinese Service Center for Scholarly Exchange, which confirms that it is genuine and how it corresponds to Chinese qualifications. The application is made online through the national government services platform. [CITE: portal.cscse.edu.cn/degree-authentication]",
              },
            ],
          },
        ],
      },
      US: { callouts: [
          {
            afterBlockId: "us-psw-cliff",
            blocks: [
              {
                type: "paragraph",
                text: "Graduates returning to China can have a foreign degree assessed by the Ministry of Education's Chinese Service Center for Scholarly Exchange, which confirms that it is genuine and how it corresponds to Chinese qualifications. The application is made online through the national government services platform. [CITE: portal.cscse.edu.cn/degree-authentication]",
              },
            ],
          },
        ] },
      UK: { callouts: [
          {
            afterBlockId: "uk-psw-transition",
            blocks: [
              {
                type: "paragraph",
                text: "Graduates returning to China can have a foreign degree assessed by the Ministry of Education's Chinese Service Center for Scholarly Exchange, which confirms that it is genuine and how it corresponds to Chinese qualifications. The application is made online through the national government services platform. [CITE: portal.cscse.edu.cn/degree-authentication]",
              },
            ],
          },
        ] },
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
