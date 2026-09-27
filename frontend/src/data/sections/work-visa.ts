import type { Section } from "../types";

export const workVisa: Section = {
  slug: "work",
  title: "Work visa",
  subSections: [
    {
      slug: "post-study-work",
      title: "Post-study work",
      countries: [
        {
          country: "US",
          blocks: [
            {
              block: {
                type: "paragraph",
                text: "The US does not have a standalone post-study work visa. Instead, the mechanism for working after graduation is called [TERM: opt|Optional Practical Training (OPT)] — a period of authorised work experience that remains part of your F-1 status. [CITE: studyinthestates.dhs.gov/students/working/optional-practical-training]",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Standard OPT",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "All F-1 graduates are eligible for 12 months of OPT. It must be in a job directly related to your field of study. You apply through your [TERM: dso|DSO], who submits the request in [TERM: sevis|SEVIS]. USCIS then issues an [TERM: ead|Employment Authorisation Document (EAD)] — the physical card you need before you can legally start work. You must apply no earlier than 90 days before graduation and no later than 60 days after. Processing currently takes 3 to 5 months, so get the application in before graduation. [CITE: uscis.gov/opt]",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "STEM OPT Extension",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "Students who graduate with a qualifying [TERM: stem|STEM] degree (Science, Technology, Engineering, or Mathematics) can apply for a 24-month extension of OPT, giving a total of 36 months. The employer must be enrolled in the [TERM: e-verify|E-Verify] system. This 36-month window is important because it overlaps with two or three [TERM: h-1b|H-1B] lottery cycles — significantly improving the chances of securing sponsorship before OPT expires. [CITE: studyinthestates.dhs.gov/students/working/stem-opt]",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "The cliff: what happens when OPT ends",
              },
            },
            {
              id: "us-psw-cliff",
              block: {
                type: "paragraph",
                text: "If a student does not secure H-1B sponsorship (or another qualifying visa status) before their OPT period ends, they must leave the US. There is no extension or grace category — it is a hard deadline. Because the H-1B lottery is genuinely unpredictable, this is a real risk worth planning for from day one, not something to worry about later. Having a backup plan is not pessimism — it is good sense.",
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
                text: "The UK has a dedicated post-study work visa called the **Graduate Route**. It is a straightforward visa specifically designed to let international students work after completing their degree. [CITE: gov.uk/graduate-visa]",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The Graduate Route gives two years of open work permission for bachelor's and master's graduates, and three years for PhD graduates. There is no requirement to have a job offer, no salary threshold, and no employer sponsorship. You can work in any job, at any level, for any employer — and you can be self-employed too.",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "You apply for the Graduate Route online before your Student visa expires. The application fee is £937, and the Immigration Health Surcharge (£1,035 per year) is paid upfront too. Applications made from 1 January 2027 are granted for 18 months rather than 2 years (PhD graduates still get 3 years). There is no points requirement and no cap on numbers. [CITE: gov.uk/graduate-visa/apply]",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "What the Graduate Route does not do",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The Graduate Route does not lead to permanent residency on its own. Time spent on the Graduate Route counts toward the five-year continuous residence requirement for [TERM: ilr|ILR], but only if the student subsequently switches to a qualifying visa (such as the Skilled Worker visa) that also counts. Two years on Graduate Route followed by three years on Skilled Worker = five years = eligible for ILR. [CITE: gov.uk/indefinite-leave-to-remain]",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "The transition point",
              },
            },
            {
              id: "uk-psw-transition",
              block: {
                type: "paragraph",
                text: "The two to three year window of the Graduate Route is the time you have to secure employer sponsorship for the Skilled Worker visa if you want to stay longer term. Unlike the US H-1B, there is no annual lottery — the Skilled Worker visa is available year-round as long as an eligible employer is willing to sponsor.",
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
                text: "Australia has a post-study work stream built into the [TERM: subclass-485|Temporary Graduate visa — Subclass 485]. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485]",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The duration of the post-study work stream depends on the qualification level and, uniquely, where in Australia the student studied. This is a deliberate incentive to encourage graduates to work in regional areas — and it can add meaningful extra time.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Duration by qualification and location:",
              },
            },
            {
              block: {
                type: "bullet-list",
                items: [
                  "Bachelor's degree or higher, studied in a major city: 2 years",
                  "Bachelor's degree or higher, studied in a regional area: 3 years",
                  "Master's by coursework: 3 years",
                  "Master's by research: 3 years",
                  "Doctoral degree (PhD): 4 years",
                  "Doctoral degree, studied in a regional area: 5 years",
                ],
              },
            },
            {
              block: {
                type: "paragraph",
                text: "[CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485]",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "Like the UK Graduate Route, there is no job offer required, no salary threshold, and no employer restriction. You can work in any role.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Application",
              },
            },
            {
              id: "au-psw-application",
              block: {
                type: "paragraph",
                text: "The Subclass 485 application must be made within six months of finishing your course. You apply online through ImmiAccount. The fee is AUD $5,750 (from 1 July 2026). [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485/fees-and-charges]",
              },
            },
          ],
        },
      ],
    },
    {
      slug: "getting-sponsored",
      title: "Getting sponsored",
      countries: [
        {
          country: "US",
          blocks: [
            {
              block: {
                type: "paragraph",
                text: "Employer sponsorship in the US for an international graduate means, in practical terms, [TERM: h-1b|H-1B visa sponsorship]. The H-1B is the primary work visa for specialty occupations — defined broadly as roles requiring at least a bachelor's degree or equivalent in a specific field. Almost all professional roles in technology, finance, consulting, healthcare, and academia qualify. [CITE: uscis.gov/h-1b]",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "The lottery — how it works",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The H-1B has an annual numerical cap of 65,000 visas, with an additional 20,000 for those holding a US master's degree or higher (the master's cap). Since demand has consistently exceeded supply — typically by a factor of three to five in recent years — USCIS selects registrations by lottery.",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The process runs annually:",
              },
            },
            {
              block: {
                type: "bullet-list",
                items: [
                  "**March:** Employers submit electronic registrations during a registration window (typically the first two weeks of March). A registration fee of $215 is paid per registration.",
                  "**Late March:** USCIS conducts the lottery and notifies selected registrations.",
                  "**April to June:** Selected registrations proceed to file the full H-1B petition with supporting documentation.",
                  "**October 1:** The H-1B employment start date. The fiscal year cap H-1B cannot start before October 1.",
                ],
              },
            },
            {
              block: {
                type: "paragraph",
                text: "A student on 12-month standard OPT who graduates in May needs their employer to submit a registration the following March — approximately 10 months after graduation. If selected and approved, work begins October 1 of that year, about 17 months after graduation. The student must remain on OPT until the H-1B starts. For STEM OPT students, the 36-month window allows participation in up to three lottery cycles, significantly improving overall selection probability.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Lottery odds",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "In recent years (2022–2024), the overall selection rate has been approximately 25% to 35% in a given year for master's cap registrants, and lower for bachelor's cap registrants. These numbers fluctuate with demand. There is no guarantee of selection regardless of qualifications or employer.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "What employers actually sponsor",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "Large employers in technology (Google, Microsoft, Amazon, Meta), finance (Goldman Sachs, JP Morgan), consulting (McKinsey, Deloitte, Accenture), and pharmaceuticals routinely sponsor H-1B visas. Most mid-size and small employers do not — either because of cost, administrative complexity, or risk aversion. The total cost of an H-1B petition to an employer is typically $5,000 to $15,000 in legal and filing fees, plus the prevailing wage obligation. A September 2025 presidential proclamation added a $100,000 payment to many new petitions for workers outside the US, which made many employers far more selective. In June 2026 a federal court vacated the guidance implementing that payment and USCIS is currently complying with the order, but DHS says it will collect the payment again if the order is lifted — check the current position on the USCIS H-1B page before relying on either.",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "It is worth checking an employer's sponsorship track record before accepting a job offer — publicly available H-1B disclosure data from the Department of Labor shows which employers sponsor, how many, and in which roles. [CITE: dol.gov/agencies/eta/foreign-labor/performance]",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "The Green Card question and nationality",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "Securing H-1B sponsorship is only the beginning of the US pathway. Most professional immigrants eventually pursue employment-based permanent residency (the Green Card) through their employer. The timeline from H-1B to Green Card approval depends heavily on nationality due to the per-country cap system.",
              },
            },
            {
              id: "us-sponsor-greencard-wait",
              block: {
                type: "paragraph",
                text: "The wait for an employment-based Green Card depends heavily on the applicant's country of birth. For most nationalities (the 'rest of the world' category), the wait is approximately 2 to 8 years. For Indian and Chinese nationals, the backlog extends to decades due to the per-country cap system.",
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
                text: "The primary employer-sponsored work visa in the UK is the **Skilled Worker visa**. It replaces the old Tier 2 General visa and operates on a points-based system. [CITE: gov.uk/skilled-worker-visa]",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "How it works",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "There is no lottery. An employer who wishes to hire an international graduate must hold a sponsor licence issued by the Home Office. The employee applies for the visa themselves, but needs a [TERM: cos|Certificate of Sponsorship (CoS)] from the employer before they can apply. The process is employer-led but not employer-exclusive — there are thousands of licensed sponsors across the UK, and that number has grown significantly since 2021.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Points requirements",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The application earns points for: having a job offer from a licensed sponsor (mandatory), the job meeting the skill threshold ([TERM: rqf|RQF] Level 6, i.e. degree level, or above since 22 July 2025; jobs at RQF 3–5 only qualify if they are on the Temporary Shortage List or Immigration Salary List), meeting the minimum salary threshold, and English language proficiency.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Salary thresholds (from 22 July 2025):",
              },
            },
            {
              block: {
                type: "bullet-list",
                items: [
                  "General threshold: £41,700 per year, or the going rate for the specific occupation code, whichever is higher",
                  "New entrant rate (for recent graduates, under-26, or switching from Graduate Route): £33,400 per year",
                ],
              },
            },
            {
              block: {
                type: "paragraph",
                text: "[CITE: gov.uk/skilled-worker-visa/your-job]",
              },
            },
            {
              id: "uk-sponsor-salary",
              block: {
                type: "paragraph",
                text: "The new entrant rate is particularly relevant for recent graduates on the Graduate Route transitioning to the Skilled Worker visa — the lower threshold acknowledges that early-career salaries are typically below the general threshold.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "No annual cap on numbers",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "Unlike the H-1B, there is no annual cap on Skilled Worker visas. You can apply at any time of year. There is no lottery — if the application meets the criteria, it will be approved.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Visa duration and renewal",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The Skilled Worker visa is typically granted for up to five years and can be extended. After five years of continuous lawful residence in the UK (combining time on the Student visa, Graduate Route, and Skilled Worker visa), the applicant becomes eligible for [TERM: ilr|Indefinite Leave to Remain (ILR)]. [CITE: gov.uk/indefinite-leave-to-remain]",
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
                text: "The primary employer-sponsored work visas in Australia for skilled graduates are the [TERM: subclass-482|Temporary Skill Shortage visa (Subclass 482)] and the [TERM: subclass-186|Employer Nomination Scheme (Subclass 186)]. The 482 is the temporary route; the 186 leads directly to permanent residency. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-skill-shortage-482] [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/employer-nomination-scheme-186]",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Subclass 482 — Temporary Skill Shortage",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The employer must be an approved sponsor. The role must be on the relevant skilled occupation list. The salary must meet the [TERM: tsmit|Temporary Skilled Migration Income Threshold (TSMIT)] — now called the Core Skills Income Threshold (CSIT) — of about AUD $79,400 per year from 1 July 2026. [CITE: immi.homeaffairs.gov.au/tsmit]",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The 482 is granted for up to four years (or two years for occupations on the short-term list). After three years on a 482 in a medium-term occupation, the applicant can apply for permanent residency through the Subclass 186.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Subclass 186 — Employer Nomination Scheme",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "This is the direct employer-sponsored permanent residency route. The employer nominates the employee, and the employee applies for the visa. No lottery. Approval rates are high for applicants who meet the requirements. The key requirements are: at least two years of relevant work experience, occupation on the relevant list, skills assessment (for some occupations), English language proficiency, and health and character checks.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Skills-independent permanent residency — Subclass 189",
              },
            },
            {
              id: "au-sponsor-189",
              block: {
                type: "paragraph",
                text: "Australia is the only one of the three countries offering a points-tested, employer-independent permanent residency pathway. The [TERM: subclass-189|Subclass 189] allows skilled graduates to apply for PR without needing an employer to nominate them, based on a points test covering age, qualifications, work experience, English proficiency, and Australian study. An Australian bachelor's degree (studied in Australia) contributes points to the test, making this a viable parallel pathway for strong candidates.",
              },
            },
          ],
        },
      ],
    },
  ],
};
