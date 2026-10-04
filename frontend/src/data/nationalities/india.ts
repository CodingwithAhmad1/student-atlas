import type { NationalityOverlay } from "../types";

const overlay: NationalityOverlay = {
  // ── Student visa ──────────────────────────────────────────────
  student: {
    overview: {
      US: {
        callouts: [],
      },
      UK: { callouts: [
          {
            afterBlockId: "uk-overview-kvlist",
            blocks: [
              {
                type: "paragraph",
                text: "Indian citizens who live permanently in India are eligible for **Commonwealth Master's Scholarships**, which pay full tuition, return airfare and a monthly stipend for a UK master's degree. Applications go through a national nominating agency, not directly to the Commonwealth Scholarship Commission, and scholars commit to returning home afterwards. [CITE: cscuk.fcdo.gov.uk/commonwealth-masters-scholarships]",
              },
            ],
          },
        ] },
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
          {
            afterBlockId: "us-docs-financial",
            blocks: [
              {
                type: "paragraph",
                text: "Under the Reserve Bank of India's **Liberalised Remittance Scheme**, every resident individual, including a minor, can send up to USD 250,000 abroad per financial year (April to March), and studies abroad is one of the permitted purposes. [CITE: rbi.org.in/lrs-faq]",
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
                text: "Under the Reserve Bank of India's **Liberalised Remittance Scheme**, every resident individual, including a minor, can send up to USD 250,000 abroad per financial year (April to March), and studies abroad is one of the permitted purposes. [CITE: rbi.org.in/lrs-faq]",
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
                text: "Under the Reserve Bank of India's **Liberalised Remittance Scheme**, every resident individual, including a minor, can send up to USD 250,000 abroad per financial year (April to March), and studies abroad is one of the permitted purposes. [CITE: rbi.org.in/lrs-faq]",
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
          {
            afterBlockId: "uk-process-tb",
            blocks: [
              {
                type: "paragraph",
                text: "GOV.UK lists Home Office-approved TB test clinics for India in Bangalore, Bathinda, Chandigarh, Chennai, Coimbatore, Goa, Gujarat, Guwahati, Hyderabad, Kerala, Kolkata, Lucknow, Ludhiana, Mumbai, Nagpur, Navi Mumbai, New Delhi, Noida and Pune. A certificate from any clinic not on the list is not accepted. [CITE: gov.uk/tb-clinics-india]",
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
                text: "Indian students can register on the Student Registration Module of the MADAD portal. [CITE: indembassy-amman.gov.in/madad-student-registration]",
              },
            ],
          },
        ],
      },
      UK: { callouts: [
          {
            afterBlockId: "uk-arrival-intro",
            blocks: [
              {
                type: "paragraph",
                text: "Indian students can register on the Student Registration Module of the MADAD portal. [CITE: indembassy-amman.gov.in/madad-student-registration]",
              },
            ],
          },
        ] },
      AU: { callouts: [
          {
            afterBlockId: "au-arrival-work",
            blocks: [
              {
                type: "paragraph",
                text: "Indian students can register on the Student Registration Module of the MADAD portal. [CITE: indembassy-amman.gov.in/madad-student-registration]",
              },
            ],
          },
        ] },
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
          {
            afterBlockId: "au-psw-application",
            blocks: [
              {
                type: "paragraph",
                text: "Back in India, a University Grants Commission **equivalence certificate** makes a foreign degree valid for further study at UGC-regulated universities and for public jobs that require a UGC-recognised qualification; applications are made online. Degrees earned through a franchising arrangement are not considered, and medicine, pharmacy, nursing, law and architecture fall under their own statutory councils instead. [CITE: ugc.gov.in/foreign-equivalence-regulations-2025]",
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
                text: "Back in India, a University Grants Commission **equivalence certificate** makes a foreign degree valid for further study at UGC-regulated universities and for public jobs that require a UGC-recognised qualification; applications are made online. Degrees earned through a franchising arrangement are not considered, and medicine, pharmacy, nursing, law and architecture fall under their own statutory councils instead. [CITE: ugc.gov.in/foreign-equivalence-regulations-2025]",
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
                text: "Back in India, a University Grants Commission **equivalence certificate** makes a foreign degree valid for further study at UGC-regulated universities and for public jobs that require a UGC-recognised qualification; applications are made online. Degrees earned through a franchising arrangement are not considered, and medicine, pharmacy, nursing, law and architecture fall under their own statutory councils instead. [CITE: ugc.gov.in/foreign-equivalence-regulations-2025]",
              },
            ],
          },
        ] },
    },
  },
};

export default overlay;
