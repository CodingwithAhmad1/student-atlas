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
                text: "Chinese nationals benefit from the US-China reciprocal 10-year B1/B2 visa agreement. Once issued, a B1/B2 visa is typically valid for 10 years with multiple entries, allowing stays of up to 6 months per visit. This makes repeated visits to a child studying in the US significantly easier than for most other nationalities. However, note that visa validity does not guarantee entry — immigration officers may still assess the purpose and duration of each visit at the port of entry.",
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
                text: "Chinese nationals apply through VFS Global centres in Beijing, Shanghai, Guangzhou, Chengdu, and several other cities. The UK offers Chinese applicants a 2-year standard visitor visa at the same fee as the 6-month visa (currently £115), and a 10-year long-term visit visa option. For parents planning multiple visits to a child studying a 3-4 year degree, the 2-year or 10-year visa represents excellent value. Processing takes approximately 15 working days; priority (5 working days) and super priority (next working day) services are available at additional cost.",
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
                text: "Chinese nationals apply for the Subclass 600 visitor visa online through ImmiAccount. Processing times for Chinese applicants are typically 20-30 business days. Australia offers Chinese nationals the option of applying for a 3-year or 10-year Frequent Traveller stream visa, which is beneficial for parents making regular visits. A health examination is not typically required for short tourist visits but may be requested based on individual circumstances. All documents in Chinese must be accompanied by certified English translations.",
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
                text: "US Embassy and Consulate posts in China (Beijing, Shanghai, Guangzhou, Shenyang, Chengdu) process B1/B2 visas. During peak travel seasons (summer, Chinese New Year), wait times for interview appointments can reach 1-3 months. Chinese applicants may also apply at third-country posts, though this is less common. The DS-160 form must be completed in English, but applicants can select Chinese as the tooltip language for guidance.",
              },
            ],
          },
          {
            afterBlockId: "us-apply-assessment",
            blocks: [
              {
                type: "paragraph",
                text: "Chinese applicants should demonstrate strong ties to China through property ownership, employment, business interests, or family obligations. The consular officer will assess whether the applicant has incentive to return. For parents visiting a child at university, include the child's I-20, enrollment verification, and a clear travel itinerary. Administrative processing under Section 221(g) may apply to applicants with backgrounds in certain advanced technology fields.",
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
                text: "Chinese applicants should provide bank statements (ideally from the last 6 months) showing consistent income. Property ownership certificates (fang chan zheng), employment contracts, and business registration documents all serve as strong evidence of ties to China. If the applicant is retired, a pension certificate and property documents are particularly important. All Chinese-language documents must be accompanied by certified English translations.",
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
                text: "China is consistently the largest source of international students in the US, with over 250,000 Chinese students enrolled annually. This large cohort means well-established support networks, Chinese student associations, and community resources at most US universities. However, it also means competition for university admissions is intense. Chinese F-1 applicants generally have high approval rates, but applicants in sensitive research fields (particularly in advanced technology, AI, semiconductors, and aerospace) may face additional screening under Presidential Proclamation 10043, which can delay or restrict visas for graduates of certain Chinese military-linked institutions.",
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
                text: "China is the UK's largest source of international students. The UK has invested heavily in attracting Chinese students, with many universities offering Chinese-language support services, dedicated orientation programmes, and direct partnerships with Chinese institutions. Chinese nationals must complete a tuberculosis (TB) test at an approved clinic in China before applying — approved clinics are available in most major cities and results take approximately 5 working days. UK student visa processing for Chinese applicants is well-established, with standard processing taking approximately 3 weeks.",
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
                text: "China is Australia's largest source of international students. The Genuine Temporary Entrant (GTE) requirement is assessed carefully for Chinese applicants — a well-written GTE statement should clearly articulate why the chosen course and institution are the best fit, and what career opportunities the qualification creates. The statement should reference specific career goals and explain how the qualification adds value beyond what is available from Chinese institutions. Processing times are typically 4-6 weeks.",
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
                text: "Chinese families typically demonstrate financial capacity through bank deposits, property ownership, and income certificates from employers. US consular officers are familiar with Chinese financial documentation formats. Key documents include: bank deposit certificates (cun kuan zheng ming) showing sufficient funds, the sponsor's income certificate from their employer, and property ownership certificates. If funds come from investments or business profits, provide supporting documentation such as company financial statements or investment account statements. Avoid last-minute large deposits — a consistent savings pattern over 6+ months is more convincing.",
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
                text: "The UK's strict 28-day financial evidence rule requires Chinese applicants to show funds in a bank account (not property or investments) for the full 28-day period before the date of application. Chinese bank certificates (cun kuan zheng ming) are accepted as evidence, but must be accompanied by certified English translations. Funds held in WeChat Pay or Alipay balances are NOT accepted — they must be in a bank account. If transferring funds from investments, ensure the full required amount has been in the bank for at least 28 days before applying.",
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
                text: "US Embassy and Consulate posts in China process a high volume of F-1 visas annually. During peak season (May-July), appointment wait times can reach 1-2 months at busy posts like Beijing and Shanghai. Guangzhou and Shenyang may offer shorter waits. Chinese applicants should apply as early as possible — F-1 visas can be issued up to 120 days before the programme start date. The interview itself is typically brief (2-5 minutes) and conducted in English or with an interpreter.",
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
                text: "VFS Global centres across China handle UK visa biometrics appointments. Centres are available in Beijing, Shanghai, Guangzhou, Chengdu, Wuhan, Shenyang, Jinan, Hangzhou, Nanjing, Fuzhou, Shenzhen, Changsha, and Kunming. During peak season (June-August), appointments book up quickly — schedule as early as possible. Priority and super priority services are available at additional cost and recommended for students with fixed term start dates.",
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
                text: "Chinese student visa applications are processed online through ImmiAccount. Processing times are typically 4-6 weeks but can extend during peak periods (October-February for the Australian academic year). Ensure the health examination (if requested) is completed promptly at an approved panel physician in China — this is a common source of processing delays. Submit a complete application with all supporting documents to avoid requests for additional information.",
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
                text: "Chinese students travelling home during breaks should allow ample time for visa renewal if their F-1 stamp has expired. Renewal at Chinese posts is generally straightforward for continuing students with good academic standing, but processing can take 1-2 weeks. Students in sensitive research fields should plan for potential additional administrative processing. Maintaining valid F-1 status (full-time enrollment, not exceeding work limits) is essential for smooth re-entry.",
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
                text: "Chinese graduates face the same H-1B lottery as all other nationalities — selection is nationality-blind. However, Chinese nationals share the worst Green Card backlog alongside Indian nationals. The EB-2 and EB-3 employment-based categories have per-country caps that create multi-year waits for Chinese applicants (currently 3-6 years for EB-2). While significantly shorter than the Indian backlog (which extends to decades), this wait still shapes the long-term immigration calculus for Chinese families. STEM OPT (3-year work authorisation) provides crucial additional time for H-1B lottery attempts.",
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
                text: "The Subclass 485 post-study work visa is processed on the same basis regardless of nationality. Chinese graduates benefit from Australia's points-based system which does not have per-country quotas — unlike the US Green Card system. This makes the Australian pathway to permanent residency more predictable for Chinese nationals. Graduates who studied in regional Australia may benefit from extended post-study work rights.",
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
                text: "Chinese nationals face a significant Green Card backlog in the employment-based categories, second only to Indian nationals. Current EB-2 wait times for Chinese-born applicants are approximately 3-6 years from I-140 approval, and EB-3 can extend further. While this is substantially shorter than the Indian backlog, it still represents a material planning consideration. Some Chinese nationals explore EB-1 (Extraordinary Ability) or EB-5 (Investor) categories which may have shorter queues, though these have higher eligibility thresholds. The National Interest Waiver (NIW) pathway under EB-2 is also popular among Chinese STEM graduates.",
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
                text: "Chinese nationals face the second-longest Green Card wait times after Indian nationals. The EB-2 category for China-born applicants currently has a 3-6 year backlog, and EB-3 can be longer. The realistic timeline from student arrival to Green Card for a Chinese national is approximately 10-16 years (including study, OPT, H-1B, and the Green Card process). Some Chinese families explore the EB-5 investor visa programme (minimum $800,000 investment in a Targeted Employment Area) as an alternative pathway, though processing backlogs affect this category too. Chinese families should carefully weigh these timelines against the more predictable Australian and UK pathways.",
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
                text: "China does NOT recognise or permit dual nationality. Under Article 9 of the Chinese Nationality Law, any Chinese national who settles abroad and acquires foreign nationality automatically loses Chinese nationality. This is strictly enforced — there is no provision for retaining Chinese nationality after naturalising in the US, UK, or Australia. This has significant practical implications: loss of Chinese hukou (household registration), inability to purchase property in China under citizen rules, and the need to obtain a Chinese visa for future visits. Some Chinese nationals choose to obtain permanent residency (Green Card, ILR, or PR) in the destination country without naturalising, thereby preserving their Chinese nationality while gaining most residency benefits. This is an important strategic consideration for Chinese families.",
              },
            ],
          },
        ],
      },
    },
  },
};

export default overlay;
