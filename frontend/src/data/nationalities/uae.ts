import type { NationalityOverlay } from "../types";
import { touristVisaUkEta } from "../profiles/tourist-visa-uk-eta";
import { touristVisaAuEta } from "../profiles/tourist-visa-au-eta";

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
                text: "UAE nationals applying for a B-2 visa are generally considered lower-risk applicants by US consular officers. The UAE-US bilateral relationship is strong, and UAE passport holders have a high approval rate for B-2 applications. However, approval is never guaranteed and the application must demonstrate clear intent to return to the UAE.",
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
                text: "UAE nationals were among the first Gulf nationals included in the UK ETA scheme. The process is straightforward and refusals are uncommon for UAE passport holders. The main reasons for refusal are undisclosed criminal history or prior UK immigration violations.",
              },
            ],
          },
        ],
      },
      AU: {
        profile: touristVisaAuEta["entry-requirement"],
        callouts: [
          {
            afterBlockId: "au-eta-details",
            blocks: [
              {
                type: "paragraph",
                text: "UAE passport holders have a straightforward path to the Australian ETA. The application is made through the Australian ETA app or through a registered travel agent. It is not available directly through the Australian government website for all nationalities, so using the official app (available on iOS and Android) is the recommended route.",
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
                text: "Interview wait times at both Abu Dhabi and Dubai posts are typically shorter than at many other global posts \u2014 usually 2 to 6 weeks during normal periods, though this extends to 8 to 12 weeks during peak summer months (May to August) when demand from the Gulf region is highest. Book as early as possible if the visit is tied to a fixed date such as a graduation or term start.",
              },
            ],
          },
          {
            afterBlockId: "us-apply-assessment",
            blocks: [
              {
                type: "paragraph",
                text: "UAE nationals are generally viewed favourably at B-2 interviews. The most common reason for refusal among UAE applicants is insufficient evidence of ties to the UAE \u2014 particularly for applicants who are retired or self-employed and do not have an employment letter to provide. If this applies, provide additional evidence: property deeds, evidence of business ownership, family photographs, and a clearly written letter of intent.",
              },
            ],
          },
        ],
      },
      UK: {
        profile: touristVisaUkEta["how-to-apply"],
        callouts: [
          {
            afterBlockId: "uk-eta-refused",
            blocks: [
              {
                type: "paragraph",
                text: "UAE nationals do not need to visit a visa application centre for standard UK visits. The ETA fully replaces the previous requirement for UAE nationals to obtain a visit visa, which previously required a VAC appointment and a processing wait of 15 working days. This is a significant change that came into effect in 2024 and dramatically simplifies UK visits for UAE families.",
              },
            ],
          },
        ],
      },
      AU: {
        profile: touristVisaAuEta["how-to-apply"],
        callouts: [
          {
            afterBlockId: "au-eta-apply-process",
            blocks: [
              {
                type: "paragraph",
                text: "UAE nationals have a high ETA approval rate for Australia. The most common complication is if the applicant has previously overstayed a visa in any country \u2014 this must be disclosed during the ETA application. Non-disclosure of a prior overstay is the most frequent cause of ETA cancellation for Gulf nationals.",
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
                text: "UAE nationals applying for an F-1 visa are not subject to any additional security checks or administrative processing delays that affect some other nationalities. The consular interview is the standard process, and approval rates for UAE nationals at the Abu Dhabi and Dubai posts are high for well-prepared applicants. The most common reason for F-1 refusal among UAE applicants is insufficient financial documentation \u2014 see the Documents section for detail.",
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
                text: "UAE nationals applying for a UK Student visa do not need to attend a visa application centre for biometrics if they hold a UAE biometric passport and are applying under the UK\u2019s digital identity scheme. Standard applicants do need to attend a UKVI-approved VAC. Confirm current requirements at the time of application as this policy has been evolving. The IHS surcharge is frequently cited as a surprise cost by UAE families \u2014 factor this into the total cost of studying in the UK from the outset.",
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
                text: "UAE nationals applying for an Australian Subclass 500 visa typically experience straightforward processing. Australia does not require an in-person interview for student visa applications \u2014 the entire process is done online. Processing times for UAE applicants are typically 4 to 6 weeks, though this can extend during peak periods. Having comprehensive financial documentation prepared from the outset is the single most effective way to avoid delays.",
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
                text: "This is the area where UAE applicants most commonly encounter refusals or requests for additional evidence. The consular officer is looking for funds that are clearly available, clearly accessible by the student or their sponsor, and clearly sufficient. Common issues include: bank statements showing very recent large deposits (which officers view as money temporarily placed to meet a threshold, not genuine available funds), accounts that are primarily in investment products rather than liquid savings, and sponsor letters that are vague about the duration or amount of support. Statements should show a consistent pattern over six months, not a lump sum deposited shortly before the application.",
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
                text: "UAE families commonly hold funds across multiple accounts or in investment portfolios. For the UK application, only funds held in a bank account (not stocks, bonds, or real estate equity) count toward the financial threshold. If funds need to be consolidated into a single account to meet the threshold, this should be done well before the 28-day window begins \u2014 not within it. A transfer made within the 28-day period that artificially inflates the balance will be visible on statements and may trigger a refusal.",
              },
            ],
          },
          {
            afterBlockId: "uk-docs-identity",
            blocks: [
              {
                type: "paragraph",
                text: "The tuberculosis test requirement catches many UAE families off guard. It is mandatory for UAE nationals applying for a UK visa of more than 6 months, including all student visas for degree courses. The test must be done at an approved clinic \u2014 in the UAE, the approved clinic is the SYNLAB clinic in Dubai. Allow 3 to 5 working days for results. Book this early as part of the application timeline.",
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
                text: "Australia is more flexible than the UK on the form that financial evidence takes. A UAE family that holds wealth in investment accounts, fixed deposits, or property can provide a broader range of financial documents. A letter from a UAE bank confirming the family\u2019s overall financial position is often accepted alongside bank statements. This is a meaningful practical difference for high-net-worth UAE families who do not keep large sums in liquid current accounts.",
              },
            ],
          },
          {
            afterBlockId: "au-docs-gte",
            blocks: [
              {
                type: "paragraph",
                text: "The GTE statement is the element UAE applicants most frequently underestimate. Australian immigration officers use it to assess whether the applicant genuinely intends to be a temporary student or is using the student visa as a migration pathway. A strong GTE statement for a UAE student explains: what they will study and why this specific course and institution, what career opportunity this creates in the UAE or the region, and why they intend to return. Mentioning family ties, career prospects in the UAE, and any existing professional context strengthens the statement considerably.",
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
                text: "For F-1 applicants, the recommended post is whichever has the earlier available appointment. Both Abu Dhabi and Dubai posts process F-1 visas. During peak season (April to July, when students are preparing for September starts), appointments fill quickly. Check availability on both posts simultaneously and book as soon as the I-20 is received \u2014 ideally no later than 8 weeks before the intended travel date.",
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
                text: "Biometrics appointments at the UAE UKVCAS centres are generally available within 1 to 2 weeks during normal periods. During July and August, demand peaks significantly and wait times can extend to 3 to 4 weeks. Factor this into the overall timeline \u2014 biometrics cannot be completed before the online application is submitted, so the total time from submission to decision should be planned as: biometrics appointment (up to 4 weeks in peak) + processing time (up to 3 weeks) = allow 6 to 8 weeks total from application submission in peak season.",
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
                text: "Australia\u2019s visa grant is electronic, which occasionally causes confusion at airports. The student does not receive a stamp or sticker \u2014 their visa status is confirmed when the airline checks their travel document electronically at check-in. The grant letter is not an official travel document but it is strongly recommended to carry it. The student can also check their visa status at any time using the Visa Entitlement Verification Online (VEVO) service. [CITE: immi.homeaffairs.gov.au/visas/already-have-a-visa/check-visa-details-and-conditions/check-conditions-online]",
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
                text: "UAE students returning home for summer or winter breaks and planning to re-enter the US should check the expiry date of their F-1 visa stamp before purchasing return tickets. If the stamp expires before the return travel date, they must apply for a new F-1 visa at the Abu Dhabi Embassy or Dubai Consulate before returning. This is a routine process but requires planning \u2014 allow the same lead time as the original application.",
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
                text: "The Australian work rights are notably more generous than the US and UK. 48 hours per fortnight equates to approximately 24 hours per week \u2014 significantly more than the UK\u2019s 20 hours. For families where the student is expected to contribute to living costs through part-time work, this is a meaningful practical difference.",
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
                text: "UAE nationals on OPT are not subject to any nationality-specific work restrictions. The OPT experience for a UAE graduate in the US is the same as for any other nationality. The H-1B lottery \u2014 the primary path to remaining after OPT \u2014 also treats all nationalities equally in the lottery itself. The Green Card backlog, however, differs significantly by nationality and is discussed in the Getting sponsored section.",
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
                text: "The Australian post-study work period is the most generous of the three countries \u2014 up to 4 or 5 years for PhD graduates. For UAE families whose child is pursuing a research degree, Australia\u2019s Subclass 485 provides an extended runway to secure permanent residency without the lottery uncertainty of the US or the time pressure of the UK\u2019s 2-year Graduate Route.",
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
                text: 'UAE nationals are in the "rest of the world" category for employment-based Green Card purposes, which means they face no nationality-specific backlog. The current wait time for UAE nationals in the EB-2 category is approximately 2 to 5 years from petition approval \u2014 significantly shorter than the decades-long waits faced by Indian nationals in the same category. This is an important consideration when comparing the US to UK or Australia: for UAE nationals specifically, the Green Card backlog is not a major deterrent, unlike for Indian or Chinese nationals.',
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
                text: "The Skilled Worker visa salary threshold of \u00a338,700 translates to approximately AED 181,000 per year at current exchange rates. For UAE families benchmarking against local salaries, UK graduate salaries in most sectors \u2014 particularly outside London \u2014 may initially fall below this threshold for entry-level roles. The new entrant rate of \u00a330,960 mitigates this for the first few years. Students intending to remain in the UK after graduation should target roles at employers with active sponsor licences and salaries that meet the threshold \u2014 London-based roles in technology, finance, and professional services most reliably meet this bar.",
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
                text: "For UAE graduates, Australia offers the most straightforward path to permanent residency of the three countries \u2014 particularly through the Subclass 189 points-tested route, which requires no employer sponsor and is not subject to a lottery. A UAE graduate with a strong academic record, high English proficiency, and Australian study experience is well-positioned to achieve a competitive points score. The absence of a nationality-based queue (unlike the US EB categories) means the timeline is predictable. This is a meaningful advantage that is frequently overlooked by Gulf families who default to comparing the US and UK.",
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
                text: 'UAE nationals fall into the "rest of the world" (ROW) category for employment-based Green Card purposes. The ROW queue is significantly shorter than the India and China queues. Currently, ROW priority dates for EB-2 are approximately 1 to 4 years behind the filing date, meaning a UAE national who files an I-140 today can expect the priority date to become current within a few years. This is in stark contrast to Indian nationals, for whom the EB-2 and EB-3 wait currently extends to decades. For UAE families evaluating the US as a long-term destination, the Green Card timeline is not a significant deterrent \u2014 it is a manageable multi-year process, not an indefinite one.',
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
                text: "Australia\u2019s points-tested system benefits UAE nationals who study well and have strong English. There is no nationality-based queue \u2014 an Australian PR application for a UAE national is assessed on the same basis as any other nationality. The combination of Australian study bonus points, strong English language skills, and a professional qualification means a well-prepared UAE graduate can be in a competitive position for a Subclass 189 invitation.",
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
                text: "The UAE does not recognise dual nationality for its citizens. A UAE national who acquires foreign citizenship is considered by the UAE to have forfeited their UAE citizenship. This means the UAE passport would no longer be valid, and rights to reside and work in the UAE as a national, access public services, and hold property under national ownership rules would be affected. Family law and inheritance rights governed by UAE personal status law may also be affected. The UAE government does enforce this \u2014 UAE nationals who naturalise abroad without prior disclosure and explicit permission risk having their citizenship formally revoked. [CITE: uaecabinet.ae/en/details/federal-laws]",
              },
              {
                type: "paragraph",
                text: "This is one of the most significant and emotionally difficult realities for UAE families to confront. A child who builds their career, settles, and eventually naturalises in the US, UK, or Australia will, under current UAE law, do so at the cost of their UAE citizenship \u2014 unless the UAE government has granted explicit prior permission. Permission can in some cases be obtained, particularly where there is a compelling professional or national interest reason. Families considering this pathway long in advance should seek legal advice from a UAE-qualified lawyer with experience in nationality law, not immigration consultants. This is a decision with generational consequences and should not be addressed only when naturalisation is imminent.",
              },
            ],
          },
        ],
      },
    },
  },
};

export default overlay;
