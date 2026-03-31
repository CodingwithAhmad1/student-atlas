import type { Section } from "../types";

export const residencyPathway: Section = {
  slug: "residency",
  title: "Residency pathway",
  subSections: [
    // ── Permanent residency ─────────────────────────────────────────
    {
      slug: "permanent-residency",
      title: "Permanent residency",
      countries: [
        {
          country: "US",
          blocks: [
            {
              block: {
                type: "paragraph",
                text: "Permanent residency in the US — commonly called the **Green Card** — confers the right to live and work in the US indefinitely, without employer sponsorship or visa renewal. It is the most valuable immigration status short of citizenship. [CITE: uscis.gov/green-card]",
              },
            },
            {
              block: {
                type: "heading",
                level: 4,
                text: "Employment-based routes (most relevant for student-to-graduate pathway)",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The employment-based (EB) preference categories are the primary route for international graduates who enter the US on an F-1 and then work on H-1B sponsorship.",
              },
            },
            {
              block: {
                type: "bullet-list",
                items: [
                  "**EB-1A:** Extraordinary ability — no employer needed, self-petition. Requires international recognition in the field. Very high bar.",
                  "**EB-1B:** Outstanding researcher or professor — employer required. Requires recognised international standing in academic or research field.",
                  "**EB-2:** Advanced degree professionals or exceptional ability. Requires a master's degree or bachelor's plus five years' progressive experience, and typically employer sponsorship through the PERM labor certification process. There is a sub-category, the **National Interest Waiver (NIW)**, which allows self-petition without employer sponsorship if the applicant can demonstrate their work is in the national interest.",
                  "**EB-3:** Skilled workers and professionals. Requires a bachelor's degree and employer sponsorship. Lower bar than EB-2 but longer queues for high-demand nationalities. [CITE: uscis.gov/green-card/green-card-eligibility/green-card-through-employment]",
                ],
              },
            },
            {
              block: {
                type: "heading",
                level: 4,
                text: "The PERM process",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "For most EB-2 and EB-3 applicants, the employer must first complete a **PERM Labor Certification** through the Department of Labor — a process demonstrating that no qualified US worker was available for the role. PERM takes 8 to 18 months currently. After PERM approval, the employer files an I-140 petition. After I-140 approval, the applicant must wait for a visa number to become available — determined by their priority date and nationality category. [CITE: dol.gov/agencies/eta/foreign-labor/programs/perm]",
              },
            },
            {
              block: {
                type: "heading",
                level: 4,
                text: "Priority dates and the visa bulletin",
              },
            },
            {
              id: "us-pr-visa-bulletin",
              block: {
                type: "paragraph",
                text: 'Each month, the State Department publishes the Visa Bulletin, which shows the "priority date" that is currently being processed for each EB category and nationality. An applicant can only proceed to the final step (adjustment of status or consular processing) when their priority date is "current." [CITE: travel.state.gov/visa-bulletin]',
              },
            },
            {
              block: {
                type: "heading",
                level: 4,
                text: "Total realistic timeline from student arrival to Green Card",
              },
            },
            {
              id: "us-pr-timeline",
              block: {
                type: "paragraph",
                text: "Student visa arrival → OPT (1–3 years) → H-1B (3 years, renewable) → PERM and I-140 (1–2 years) → wait for priority date (varies by nationality) → Green Card.\nRealistic total: **8 to 15+ years** from arrival, depending heavily on country of birth. Nationalities in the 'rest of the world' category face shorter waits (8–14 years), while Indian and Chinese nationals may face significantly longer timelines.",
              },
            },
          ],
        },
        {
          country: "UK",
          blocks: [
            {
              block: {
                type: "paragraph",
                text: "Permanent residency in the UK is called **Indefinite Leave to Remain (ILR)**. It is the right to live and work in the UK without any time restriction or visa condition. [CITE: gov.uk/indefinite-leave-to-remain]",
              },
            },
            {
              block: {
                type: "heading",
                level: 4,
                text: "The five-year continuous residence requirement",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "ILR requires five years of continuous lawful residence in the UK. The five years can be made up of time on different visa categories, provided they are all qualifying categories. The Student visa, Graduate Route, and Skilled Worker visa all count. There is no lottery and no nationality-based queue — every applicant who meets the requirements is approved.",
              },
            },
            {
              block: {
                type: "heading",
                level: 4,
                text: "Continuity requirements",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The applicant must not have been outside the UK for more than 180 days in any 12-month period during the five years. This is strictly counted and can affect applicants who travel frequently. [CITE: gov.uk/indefinite-leave-to-remain/eligibility]",
              },
            },
            {
              block: {
                type: "heading",
                level: 4,
                text: "Knowledge of Life in the UK test",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "Applicants must pass the Life in the UK test — a 24-question multiple-choice test covering British history, culture, and values. The test is taken at an approved test centre and costs £50. [CITE: gov.uk/life-in-uk-test]",
              },
            },
            {
              block: {
                type: "heading",
                level: 4,
                text: "English language requirement",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "Applicants must demonstrate English language proficiency at B1 level or above. This is typically already satisfied from the original Student visa application.",
              },
            },
            {
              block: {
                type: "heading",
                level: 4,
                text: "Total realistic timeline from student arrival to ILR",
              },
            },
            {
              id: "uk-pr-timeline",
              block: {
                type: "paragraph",
                text: "Student visa (3–4 years for a bachelor's degree) → Graduate Route (2 years) → potentially one year of Skilled Worker visa if additional time is needed → apply for ILR.\nRealistic total: **5 to 7 years** from arrival.",
              },
            },
          ],
        },
        {
          country: "AU",
          blocks: [
            {
              block: {
                type: "paragraph",
                text: "Permanent residency in Australia is called **Permanent Residency (PR)** and is typically acquired through one of several visa subclasses, the most relevant of which are the Subclass 189 (skills-independent) and Subclass 186 (employer nomination). [CITE: immi.homeaffairs.gov.au/visas/permanent-residency]",
              },
            },
            {
              block: {
                type: "heading",
                level: 4,
                text: "Subclass 189 — Skilled Independent",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The points-tested, employer-independent route. The applicant submits an Expression of Interest (EOI) through SkillSelect. Points are awarded for age, English proficiency, skilled work experience, qualifications, Australian study, and partner skills. When a sufficient points score is achieved, the applicant may receive an invitation to apply. The score required fluctuates by occupation and changes quarterly. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189]",
              },
            },
            {
              block: {
                type: "heading",
                level: 4,
                text: "Subclass 190 — Skilled Nominated",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "Similar to the 189 but requires nomination from a state or territory government. State nomination typically requires working or living in that state and meeting state-specific skills needs. Nomination adds 5 points to the EOI score. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-nominated-190]",
              },
            },
            {
              block: {
                type: "heading",
                level: 4,
                text: "Subclass 186 — Employer Nomination Scheme",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "Employer-nominated PR, discussed in the Work visa section. After two years of work in the role, the employer nominates and the employee applies.",
              },
            },
            {
              block: {
                type: "heading",
                level: 4,
                text: "Total realistic timeline from student arrival to PR",
              },
            },
            {
              id: "au-pr-timeline",
              block: {
                type: "paragraph",
                text: "Student visa (3–4 years) → Subclass 485 post-study work (2–4 years) → points-test PR application (typically 6 to 12 months processing) or ENS 186 after 2 years employment.\nRealistic total: **5 to 8 years** from arrival.",
              },
            },
          ],
        },
      ],
    },

    // ── Citizenship ─────────────────────────────────────────────────
    {
      slug: "citizenship",
      title: "Citizenship",
      countries: [
        {
          country: "US",
          blocks: [
            {
              block: {
                type: "paragraph",
                text: "US citizenship through naturalisation requires the applicant to first hold a Green Card (permanent residency) and then meet the following requirements: [CITE: uscis.gov/citizenship/apply-for-citizenship]",
              },
            },
            {
              block: {
                type: "bullet-list",
                items: [
                  "**Five years** as a permanent resident (three years if married to a US citizen throughout that period)",
                  "Continuous residence — must not have been outside the US for more than 30 months total during the five years, and no single trip longer than six months",
                  "Physical presence — must have been physically present in the US for at least 30 months of the five-year period",
                  "Good moral character — no serious criminal convictions during the qualifying period",
                  "English language proficiency — ability to read, write, speak, and understand basic English",
                  "Civics knowledge — pass a civics test covering US history and government (100 possible questions; 10 are asked; 6 must be answered correctly)",
                  "Oath of allegiance",
                ],
              },
            },
            {
              block: {
                type: "heading",
                level: 4,
                text: "Total from student visa arrival to citizenship",
              },
            },
            {
              id: "us-cit-timeline",
              block: {
                type: "paragraph",
                text: "Adding the Green Card timeline (varies by nationality — see Permanent residency section) plus the 5-year naturalisation period: **varies significantly by nationality** from arrival.",
              },
            },
          ],
        },
        {
          country: "UK",
          blocks: [
            {
              block: {
                type: "paragraph",
                text: "British citizenship through naturalisation requires: [CITE: gov.uk/apply-citizenship-indefinite-leave-to-remain]",
              },
            },
            {
              block: {
                type: "bullet-list",
                items: [
                  "Holding ILR (or qualifying as the spouse of a British citizen)",
                  "**One year** as a permanent resident (ILR holder) immediately before applying",
                  "Five years of continuous lawful residence prior to the application (the ILR period counts as the final year)",
                  "Not having been outside the UK for more than 450 days during the five years, and no more than 90 days in the 12 months immediately before applying",
                  "Good character requirement",
                  "English language proficiency (typically already demonstrated)",
                  "Life in the UK test (same as for ILR — if already passed for ILR, not required again)",
                ],
              },
            },
            {
              block: {
                type: "heading",
                level: 4,
                text: "Total from student visa arrival to citizenship",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "Five years of continuous residence leading to ILR, plus one year as ILR holder: **6 to 8 years** from arrival.",
              },
            },
          ],
        },
        {
          country: "AU",
          blocks: [
            {
              block: {
                type: "paragraph",
                text: "Australian citizenship by conferral (naturalisation) requires: [CITE: homeaffairs.gov.au/citizenship/become-a-citizen/permanent-resident]",
              },
            },
            {
              block: {
                type: "bullet-list",
                items: [
                  "**Four years** of lawful residence in Australia, of which at least **12 months** must be as a permanent resident",
                  "Presence in Australia — the applicant must have been present in Australia for 4 years (1,460 days), with no more than 12 months total outside Australia during that period, and no more than 90 days outside Australia in the year before applying",
                  "Good character",
                  "Basic English proficiency",
                  "Pass the citizenship test — a 20-question online test covering Australian values, history, government, and the responsibilities and privileges of citizenship",
                  "Intention to reside or maintain a close and continuing association with Australia",
                ],
              },
            },
            {
              block: {
                type: "heading",
                level: 4,
                text: "Total from student visa arrival to citizenship",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "Approximately 3 to 4 years on temporary visas leading to PR, plus 1 year as a permanent resident: **6 to 8 years** from arrival — comparable to the UK and significantly faster than the US pathway.",
              },
            },
          ],
        },
      ],
    },

    // ── Dual nationality ────────────────────────────────────────────
    {
      slug: "dual-nationality",
      title: "Dual nationality",
      countries: [],
      crossCutting: [
        {
          block: {
            type: "heading",
            level: 4,
            text: "What dual nationality means in this context",
          },
        },
        {
          block: {
            type: "paragraph",
            text: "When a student eventually naturalises as a citizen of the US, UK, or Australia, the question arises: do they retain their original nationality, or do they formally lose it? The answer depends not on the destination country's rules but on the origin country's position on dual nationality.",
          },
        },
        {
          block: {
            type: "heading",
            level: 4,
            text: "Your country of origin's position",
          },
        },
        {
          id: "dual-origin-position",
          block: {
            type: "paragraph",
            text: "Whether your country of origin recognises dual nationality varies significantly. Some countries prohibit it entirely, others allow it with specific countries, and others permit it universally. Students and families should research their own country's rules carefully, as acquiring foreign citizenship without understanding these rules can result in the loss of original nationality, passport validity, property rights, and family law protections in the home country.",
          },
        },
        {
          block: {
            type: "heading",
            level: 4,
            text: "The destination countries' positions",
          },
        },
        {
          id: "dual-destination-position",
          block: {
            type: "paragraph",
            text: "All three destination countries — the US, UK, and Australia — permit dual nationality. None of them require applicants for naturalisation to renounce their existing citizenship. The legal obligation to renounce, if any, sits entirely on the origin country's side.",
          },
        },
        {
          block: {
            type: "heading",
            level: 4,
            text: "Other nationalities for reference",
          },
        },
        {
          id: "dual-other-nationalities",
          block: {
            type: "bullet-list",
            items: [
              "**India** does not permit dual nationality. Indian nationals who naturalise abroad must surrender their Indian passport. The Overseas Citizen of India (OCI) card is available as a long-term residency card for former Indian citizens but it is not citizenship.",
              "**Pakistan** does not officially permit dual nationality with all countries but has bilateral agreements allowing it with a specific list of countries including the US, UK, and Australia. Pakistani nationals naturalising in these three countries may in practice retain Pakistani nationality.",
              "**Saudi Arabia** does not permit dual nationality.",
              "**Egypt** does not permit dual nationality in most circumstances.",
            ],
          },
        },
      ],
    },
  ],
};
