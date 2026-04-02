import type { NationalityOverlay } from "../types";
import { touristVisaUsVwp } from "../profiles/tourist-visa-us-vwp";
import { touristVisaAuEta } from "../profiles/tourist-visa-au-eta";
import { domesticUkVisit } from "../profiles/domestic-uk-visit";
import { domesticUkStudent } from "../profiles/domestic-uk-student";
import { domesticUkWork } from "../profiles/domestic-uk-work";
import { domesticUkResidency } from "../profiles/domestic-uk-residency";

const overlay: NationalityOverlay = {
  // ── Tourist visa ──────────────────────────────────────────────
  visit: {
    "entry-requirement": {
      US: {
        profile: touristVisaUsVwp["entry-requirement"],
        callouts: [
          {
            afterBlockId: "us-vwp-important",
            blocks: [
              {
                type: "paragraph",
                text: "UK nationals have been part of the US Visa Waiver Program since its inception, and [TERM: esta|ESTA] approval rates for British passport holders are very high. The main reasons for denial are prior visa overstays, certain criminal convictions, or travel to Iran, Iraq, Syria, Sudan, Libya, Somalia, or Yemen since 2011. If an ESTA is denied, don't worry \u2014 you can still apply for a regular B-1/B-2 visa at the US Embassy in London.",
              },
            ],
          },
        ],
      },
      UK: {
        profile: domesticUkVisit["entry-requirement"],
        callouts: [],
      },
      AU: {
        profile: touristVisaAuEta["entry-requirement"],
        callouts: [
          {
            afterBlockId: "au-eta-details",
            blocks: [
              {
                type: "paragraph",
                text: "UK nationals are eligible for the Subclass 601 Electronic Travel Authority (ETA), which is quick, inexpensive, and straightforward \u2014 approval is typically instant. For parents planning regular visits to a child studying in Australia, the ETA\u2019s 12-month validity with stays of up to 3 months each is usually sufficient. If you need a longer stay, the Subclass 600 visitor visa allows stays of up to 12 months.",
              },
            ],
          },
        ],
      },
    },
    "how-to-apply": {
      US: {
        profile: touristVisaUsVwp["how-to-apply"],
        callouts: [],
      },
      UK: {
        profile: domesticUkVisit["how-to-apply"],
        callouts: [],
      },
      AU: {
        profile: touristVisaAuEta["how-to-apply"],
        callouts: [],
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
                text: "UK nationals have historically had high F-1 visa approval rates. The UK-US 'special relationship' extends to educational exchange \u2014 British students are well-represented at top US universities and rarely face administrative processing delays. The main consideration for UK families is the cost difference: US tuition fees are comparable to UK international fees but without the home-student discount, and the [TERM: sevis|SEVIS] fee ($350) and visa fee ($185) add to the upfront costs.",
              },
            ],
          },
        ],
      },
      UK: {
        profile: domesticUkStudent["overview"],
        callouts: [],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-overview-kvlist",
            blocks: [
              {
                type: "paragraph",
                text: "UK nationals applying for the Australian Subclass 500 student visa benefit from the UK\u2019s low immigration risk rating. Processing is typically faster (2-4 weeks) and the [TERM: gte|Genuine Temporary Entrant (GTE)] assessment is less intensive than for higher-risk nationalities. UK applicants do NOT require a tuberculosis test. The strong UK-Australia educational relationship means many Australian universities have articulation agreements with UK institutions, which can smooth the transition.",
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
                text: "UK families typically demonstrate financial capacity through UK bank statements (most major high-street banks are well-recognised by US consular officers), savings accounts, ISA statements, and property valuations. US consular officers in London are very familiar with UK financial documentation. A clear, simple presentation showing sufficient funds in a readily accessible account is most effective. Student loans from the Student Loans Company do not cover US study and cannot be used as evidence of funds.",
              },
            ],
          },
        ],
      },
      UK: {
        profile: domesticUkStudent["documents"],
        callouts: [],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-financial",
            blocks: [
              {
                type: "paragraph",
                text: "UK bank statements and financial documents are readily accepted by Australian immigration. Standard high-street bank statements in English require no translation. The financial evidence requirement is assessed less stringently for UK applicants given the UK's low immigration risk rating. A straightforward bank statement showing sufficient funds is typically sufficient.",
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
                text: "The US Embassy in London (Nine Elms) processes F-1 student visas. During peak season (June-August), interview wait times can extend to 2-4 weeks, so apply early. The interview is brief (typically 2-3 minutes) and conducted in English. UK applicants very rarely face Section 221(g) administrative processing. The Embassy is one of the busiest US posts globally but has extensive experience with student visa applications.",
              },
            ],
          },
        ],
      },
      UK: {
        profile: domesticUkStudent["application-process"],
        callouts: [],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-process-decision",
            blocks: [
              {
                type: "paragraph",
                text: "UK nationals' student visa applications are processed online through ImmiAccount. Processing is typically 2-4 weeks — faster than for many other nationalities. UK applicants are not usually required to complete a health examination unless studying certain courses (e.g. healthcare or childcare). Submit a complete application to avoid delays.",
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
                text: "UK students travelling home during breaks have a straightforward re-entry process. If the F-1 visa stamp is still valid, simply re-enter with your passport, valid visa, and current I-20. If the visa stamp has expired, renewing it at the US Embassy in London is generally quick and uncomplicated for UK nationals with a good academic record \u2014 UK students rarely face administrative processing or re-entry issues, so this should be stress-free.",
              },
            ],
          },
        ],
      },
      UK: {
        profile: domesticUkStudent["after-arrival"],
        callouts: [],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-arrival-work",
            blocks: [
              {
                type: "paragraph",
                text: "UK students in Australia can work up to 48 hours per fortnight during term time and unlimited hours during scheduled breaks. British students in Australia often find the cultural similarities make integration straightforward, and the working holiday visa (Subclass 417) offers an additional option for UK nationals aged 18-30 who wish to extend their stay after studies.",
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
                text: "UK nationals on OPT face the same H-1B lottery as all other nationalities — selection is nationality-blind. However, UK nationals benefit from the 'rest of the world' Green Card category, which has significantly shorter processing times than India or China. The E-2 Treaty Investor visa is also available to UK nationals and provides an alternative work pathway for those willing to invest in a US business — the UK has a treaty with the US for this purpose, which many nationalities do not.",
              },
            ],
          },
        ],
      },
      UK: {
        profile: domesticUkWork["post-study-work"],
        callouts: [],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-psw-application",
            blocks: [
              {
                type: "paragraph",
                text: "The Subclass 485 post-study work visa is processed on the same basis regardless of nationality. Additionally, UK nationals aged 18-30 have access to the Working Holiday visa (Subclass 417) which provides an alternative 1-year work right in Australia with the possibility of extending to 3 years. This can be used alongside or instead of the Subclass 485, providing additional flexibility in the Australian employment pathway.",
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
                text: "UK nationals benefit from the 'rest of the world' (ROW) Green Card category with relatively short wait times (typically 2-4 years for EB-2). Additionally, the E-2 Treaty Investor visa provides a unique pathway — UK nationals can invest in a US business (no minimum amount specified, but $100,000+ is typical) and receive renewable 2-year work authorisation. The E-2 is not available to Chinese or Indian nationals, making it a distinctive advantage for UK families considering the US.",
              },
            ],
          },
        ],
      },
      UK: {
        profile: domesticUkWork["getting-sponsored"],
        callouts: [],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-sponsor-189",
            blocks: [
              {
                type: "paragraph",
                text: "Australia's points-tested pathways treat UK nationals on the same basis as all other applicants — no per-country quotas. UK graduates with an Australian qualification, strong English (native speakers score maximum points on IELTS/PTE), and relevant work experience are well-positioned. The UK-Australia Free Trade Agreement (AUKFTA) also introduced the Innovation and Early Careers Skills Exchange (IECSE) programme, creating additional mobility options between the two countries.",
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
                text: "UK nationals fall into the 'rest of the world' (ROW) Green Card category with the most favourable wait times among major applicant countries. The realistic timeline from student arrival to Green Card for a UK national in the EB-2 category is approximately 8-12 years. The E-2 Treaty Investor visa can serve as a bridge during this period, providing indefinitely renewable 2-year work authorisation while waiting for the Green Card. This combination of relatively short Green Card queues and E-2 access makes the US pathway more viable for UK families than for Chinese or Indian families.",
              },
            ],
          },
        ],
      },
      UK: {
        profile: domesticUkResidency["permanent-residency"],
        callouts: [],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-pr-timeline",
            blocks: [
              {
                type: "paragraph",
                text: "The Australian PR pathway through the Subclass 189 points test treats all nationalities equally. UK nationals benefit from maximum English language points (as native speakers) and any Australian study qualification. The Working Holiday visa (Subclass 417) can also serve as a stepping stone, allowing UK nationals to gain Australian work experience which adds to their points score. The absence of per-country quotas makes Australia's PR pathway highly predictable for UK nationals.",
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
                text: "The United Kingdom **fully permits dual nationality** \u2014 and this is genuinely one of the biggest advantages UK families have in this process. British citizens who acquire US, Australian, or any other nationality retain their British citizenship automatically. No notification or permission is required. This means a British student who eventually naturalises in the US or Australia keeps full British rights, including the right to live and work in the UK, access to the NHS, and the right to vote in UK elections. There are no restrictions or conditions whatsoever on holding dual nationality as a British citizen.",
              },
            ],
          },
        ],
      },
    },
  },
};

export default overlay;
