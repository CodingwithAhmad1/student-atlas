import type { NationalityOverlay } from "../types";
// No profile imports — China uses base content for all countries (standard visas)

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
                text: "Good news for families planning regular visits: Chinese nationals benefit from the US-China reciprocal 10-year B1/B2 visa agreement. Once issued, a B1/B2 visa is typically valid for 10 years with multiple entries, allowing stays of up to 6 months per visit. This makes repeated trips to see your child at university significantly easier than for most other nationalities. Do keep in mind that visa validity does not guarantee entry — immigration officers may still assess the purpose and duration of each visit at the port of entry.",
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
                text: "Chinese nationals apply through VFS Global centres in Beijing, Shanghai, Guangzhou, Chengdu, and several other cities. A helpful detail: the UK offers Chinese applicants a 2-year standard visitor visa at the same fee as the 6-month visa (currently £115), and there is also a 10-year long-term visit visa option. For parents planning multiple visits over a 3-4 year degree, the 2-year or 10-year visa can save both money and hassle. Processing takes approximately 15 working days; priority (5 working days) and super priority (next working day) services are available at additional cost.",
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
                text: "Chinese nationals apply for the Subclass 600 visitor visa online through ImmiAccount. Processing times are typically 20-30 business days. For parents planning regular visits, Australia offers Chinese nationals a 3-year or 10-year Frequent Traveller stream visa — well worth considering if you expect to visit often. A health examination is not typically required for short tourist visits but may be requested based on individual circumstances. All documents in Chinese must be accompanied by certified English translations.",
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
                text: "US Embassy and Consulate posts in China (Beijing, Shanghai, Guangzhou, Shenyang, Chengdu) all process B1/B2 visas. During peak travel seasons (summer and Chinese New Year), wait times for interview appointments can reach 1-3 months, so plan ahead. Chinese applicants may also apply at third-country posts, though this is less common. The DS-160 form must be completed in English, but you can select Chinese as the tooltip language for guidance while filling it in.",
              },
            ],
          },
          {
            afterBlockId: "us-apply-assessment",
            blocks: [
              {
                type: "paragraph",
                text: "Chinese applicants should be ready to demonstrate strong ties to China — property ownership, employment, business interests, or family obligations all help. The consular officer wants to see that you have clear reasons to return home. For parents visiting a child at university, including the child's I-20, enrollment verification, and a clear travel itinerary strengthens the application. Be aware that administrative processing under Section 221(g) may apply to applicants with backgrounds in certain advanced technology fields.",
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
                text: "Chinese applicants should provide bank statements (ideally covering the last 6 months) showing consistent income. Property ownership certificates (fang chan zheng), employment contracts, and business registration documents all work well as evidence of ties to China. If the applicant is retired, a pension certificate and property documents are especially helpful. Remember: all Chinese-language documents must be accompanied by certified English translations.",
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
                text: "Chinese nationals applying for the Subclass 600 may be asked to provide a health examination depending on the length of stay and individual risk assessment. If required, examinations must be completed at an approved panel physician in China — available in most major cities. The ImmiAccount online system supports Chinese-language interface, making the application process more accessible. Ensure the passport has at least 6 months validity from the planned entry date.",
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
                text: "China is consistently the largest source of international students in the US, with over 250,000 Chinese students enrolled annually. The good side of this: well-established support networks, Chinese student associations, and community resources at most US universities. The flip side: competition for admissions is intense. Chinese F-1 applicants generally have high approval rates, but applicants in sensitive research fields (particularly advanced technology, AI, semiconductors, and aerospace) may face additional screening under Presidential Proclamation 10043, which can delay or restrict visas for graduates of certain Chinese military-linked institutions.",
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
                text: "China is the UK's largest source of international students, and UK universities have invested heavily in welcoming Chinese students — many offer Chinese-language support services, dedicated orientation programmes, and direct partnerships with Chinese institutions. One step to plan for: Chinese nationals must complete a tuberculosis (TB) test at an approved clinic in China before applying. Approved clinics are available in most major cities and results take approximately 5 working days. Standard visa processing takes approximately 3 weeks.",
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
                text: "China is Australia's largest source of international students. The [TERM: gte|Genuine Temporary Entrant (GTE)] requirement deserves careful attention for Chinese applicants — a well-written GTE statement should clearly explain why this course and institution are the right fit, and what career opportunities the qualification opens up. Reference specific career goals and explain how the qualification adds value beyond what is available from Chinese institutions. Processing times are typically 4-6 weeks.",
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
                text: "Chinese families typically demonstrate financial capacity through bank deposits, property ownership, and income certificates from employers. US consular officers are familiar with Chinese financial documentation formats. Key documents include: bank deposit certificates (cun kuan zheng ming) showing sufficient funds, the sponsor's income certificate from their employer, and property ownership certificates. If funds come from investments or business profits, include supporting documentation such as company financial statements or investment account statements. A practical tip: avoid last-minute large deposits. A consistent savings pattern over 6+ months is far more convincing than a lump sum that appeared recently.",
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
                text: "The UK's strict 28-day financial evidence rule requires Chinese applicants to show funds in a bank account (not property or investments) for the full 28-day period before the date of application. Chinese bank certificates (cun kuan zheng ming) are accepted, but must be accompanied by certified English translations. An important heads-up: funds held in WeChat Pay or Alipay balances are NOT accepted — they must be in a bank account. If you need to transfer funds from investments, make sure the full required amount has been sitting in the bank for at least 28 days before you apply.",
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
                text: "Australian immigration accepts a broader range of financial evidence than the UK for Chinese applicants. Bank deposit certificates, property valuations, investment portfolios, and income from business activities are all considered. The key requirement is demonstrating that the student has access to sufficient funds to cover tuition, living costs, and travel for the duration of the course. Provide certified English translations for all Chinese-language documents.",
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
                text: "US Embassy and Consulate posts in China process a high volume of F-1 visas annually. During peak season (May-July), appointment wait times can reach 1-2 months at busy posts like Beijing and Shanghai — Guangzhou and Shenyang may offer shorter waits. Apply as early as possible: F-1 visas can be issued up to 120 days before the programme start date. The interview itself is typically brief (2-5 minutes) and conducted in English or with an interpreter, so there is no need to be anxious about it.",
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
                text: "VFS Global centres across China handle UK visa biometrics appointments. There are centres in Beijing, Shanghai, Guangzhou, Chengdu, Wuhan, Shenyang, Jinan, Hangzhou, Nanjing, Fuzhou, Shenzhen, Changsha, and Kunming — so most families will have one within reach. During peak season (June-August), appointments book up quickly, so schedule as early as you can. Priority and super priority services are available at additional cost and well worth considering if your term start date is fixed.",
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
                text: "Chinese student visa applications are processed online through ImmiAccount. Processing times are typically 4-6 weeks but can extend during peak periods (October-February for the Australian academic year). If a health examination is requested, complete it promptly at an approved panel physician in China — delays here are one of the most common reasons applications take longer than expected. Submitting a complete application with all supporting documents from the start is the best way to keep things on track.",
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
                text: "Chinese students travelling home during breaks should allow ample time for visa renewal if their F-1 stamp has expired. The good news is that renewal at Chinese posts is generally straightforward for continuing students with good academic standing, though processing can take 1-2 weeks. Students in sensitive research fields should plan for potential additional administrative processing. Keeping your F-1 status in good standing (full-time enrollment, staying within work limits) is the best thing you can do for smooth re-entry.",
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
                text: "Chinese students in Australia benefit from the 48-hour fortnightly work limit during term time and unlimited hours during scheduled breaks. Many Chinese students find part-time work in hospitality, retail, tutoring (particularly in-demand for Mandarin and maths tutoring), or translation services. Australia's strong Chinese community, particularly in Sydney and Melbourne, provides additional employment networks and social support.",
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
                text: "Chinese graduates face the same H-1B lottery as all other nationalities — selection is nationality-blind. However, Chinese nationals do face one of the longer Green Card backlogs. The EB-2 and EB-3 employment-based categories have per-country caps that create multi-year waits for Chinese applicants (currently 3-6 years for EB-2). While significantly shorter than the Indian backlog (which extends to decades), this wait still shapes the long-term planning for Chinese families. The silver lining: [TERM: stem|STEM] OPT (3-year work authorisation) provides crucial additional time for H-1B lottery attempts.",
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
                text: "The Subclass 485 post-study work visa is processed on the same basis regardless of nationality. This is where Australia really stands out for Chinese graduates: the points-based system has no per-country quotas, unlike the US Green Card system. This makes the Australian pathway to permanent residency much more predictable. Graduates who studied in regional Australia may also benefit from extended post-study work rights.",
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
                text: "Chinese nationals face a significant Green Card backlog in the employment-based categories, second only to Indian nationals. Current EB-2 wait times for Chinese-born applicants are approximately 3-6 years from [TERM: i-140|I-140] approval, and EB-3 can extend further. While this is substantially shorter than the Indian backlog, it still represents a real planning consideration. Some Chinese nationals explore EB-1 (Extraordinary Ability) or EB-5 (Investor) categories which may have shorter queues, though these have higher eligibility thresholds. The [TERM: niw|National Interest Waiver (NIW)] pathway under EB-2 is also popular among Chinese STEM graduates and worth researching early.",
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
                text: "The Skilled Worker visa salary threshold of £38,700 translates to approximately CNY 350,000 per year at current exchange rates. UK graduate salaries in technology, finance, and professional services typically meet or exceed this threshold within 1-2 years. The new entrant rate of £30,960 provides a more accessible starting point for recent graduates. The UK's Skilled Worker route has no nationality-based caps or quotas, making it more predictable than the US H-1B lottery system.",
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
                text: "Australia's points-tested Subclass 189 pathway treats all nationalities equally — there are no per-country quotas. This is a significant advantage for Chinese nationals compared to the US system where Chinese applicants face backlogs. A Chinese graduate with an Australian qualification, strong English (IELTS 8+), and relevant work experience can achieve a competitive points score. The Subclass 190 (state-nominated) and Subclass 491 (regional) pathways provide additional options with lower points thresholds.",
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
                text: "Chinese nationals face the second-longest Green Card wait times after Indian nationals. The EB-2 category for China-born applicants currently has a 3-6 year backlog, and EB-3 can be longer. To set realistic expectations: the timeline from student arrival to Green Card for a Chinese national is approximately 10-16 years (including study, OPT, H-1B, and the Green Card process). Some families explore the EB-5 investor visa programme (minimum $800,000 investment in a Targeted Employment Area) as an alternative, though processing backlogs affect this category too. It is well worth weighing these US timelines against the more predictable Australian and UK pathways.",
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
                text: "Australia's points-based permanent residency system has no per-country queues, making it the most predictable pathway for Chinese nationals among the three destination countries. The Subclass 189 (skilled independent) and Subclass 190 (state-nominated) visas assess applicants purely on points — age, English ability, qualifications, and work experience. Chinese graduates of Australian institutions receive additional points for their Australian qualification. The absence of nationality-based quotas contrasts sharply with the US per-country Green Card caps.",
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
                text: "This is one of the most important things for Chinese families to understand: China does NOT recognise or permit dual nationality. Under Article 9 of the Chinese Nationality Law, any Chinese national who settles abroad and acquires foreign nationality automatically loses Chinese nationality. This is strictly enforced — there is no provision for retaining Chinese nationality after naturalising in the US, UK, or Australia. The practical implications are significant: loss of Chinese hukou (household registration), inability to purchase property in China under citizen rules, and the need to obtain a Chinese visa for future visits home. Many Chinese nationals choose a middle path — obtaining permanent residency (Green Card, ILR, or PR) in the destination country without naturalising. This preserves Chinese nationality while granting most residency benefits, and is a strategy well worth discussing as a family early in the process.",
              },
            ],
          },
        ],
      },
    },
  },
};

export default overlay;
