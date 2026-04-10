import type { Country } from "./types";

export interface VisaFacts {
  visa_name: string;
  visa_definition: string;
  total_upfront_cost: string;
  application_fee: string;
  work_hours: string;
  dependants_allowed: boolean;
  validity_model: string;
  /** Single biggest pitfall, ≤20 words */
  watch_out: string;
  processing_time: string;
  post_study_work: string;
  language_requirement: string;
  financial_proof_required: string;
}

/**
 * Structured facts per (section, subsection, country).
 * Extracted from existing prose in sections/*.ts — not fabricated.
 * `watch_out` values are editorial proposals pending user review.
 */
export const visaFacts: Record<
  string,
  Record<string, Partial<Record<Country, VisaFacts>>>
> = {
  // ── Student visa ─────────────────────────────────────────────
  student: {
    overview: {
      US: {
        visa_name: "F-1 Student Visa",
        visa_definition: "Primary visa for full-time study at accredited US universities.",
        total_upfront_cost: "~$535 (visa + SEVIS)",
        application_fee: "$185",
        work_hours: "20 hrs/week term-time",
        dependants_allowed: true,
        validity_model: "Duration of Status (D/S)",
        // WATCH OUT — proposal: visa stamp can expire mid-study; renewal needed for re-entry travel
        watch_out:
          "Visa stamp can expire during study — renewal needed before any international travel.",
        processing_time: "3–5 working days after interview",
        post_study_work: "OPT: 12 months (36 with STEM extension)",
        language_requirement: "Not specified",
        financial_proof_required: "First-year costs per I-20 + bank statements",
      },
      UK: {
        visa_name: "Student visa",
        visa_definition: "Fixed-term visa for degree study at licensed UK institutions.",
        total_upfront_cost: "~£3,300 (3-yr degree: visa + IHS)",
        application_fee: "£490",
        work_hours: "20 hrs/week term-time",
        dependants_allowed: true,
        validity_model: "Fixed: course length + 4 months",
        // WATCH OUT — proposal: IHS surcharge £776/yr paid entirely upfront, often unexpected
        watch_out:
          "IHS surcharge of £776/year is paid entirely upfront — often a surprise cost.",
        processing_time: "3 weeks standard after biometrics",
        post_study_work: "Graduate Route: 2 yrs (3 for PhD)",
        language_requirement: "IELTS Academic 6.0+ (UKVI version)",
        financial_proof_required: "£1,334/month London (9 months held 28 days continuously)",
      },
      AU: {
        visa_name: "Student visa — Subclass 500",
        visa_definition: "Visa for study at CRICOS-registered Australian institutions.",
        total_upfront_cost: "~AUD $1,400 (visa + first-year OSHC)",
        application_fee: "AUD $710",
        work_hours: "48 hrs/fortnight term-time",
        dependants_allowed: true,
        validity_model: "Fixed: course length + extra period",
        // WATCH OUT — proposal: OSHC is mandatory private insurance; must maintain course progress
        watch_out:
          "OSHC mandatory private insurance purchased separately — must maintain satisfactory course progress.",
        processing_time: "4–6 weeks from complete application",
        post_study_work: "Subclass 485: 2–5 yrs by qualification",
        language_requirement: "Not specified",
        financial_proof_required: "Tuition + AUD $29,710/yr living costs + travel",
      },
    },
  },

  // ── Work visa ────────────────────────────────────────────────
  work: {
    "post-study-work": {
      US: {
        visa_name: "Optional Practical Training (OPT)",
        visa_definition: "Post-graduation work authorisation under F-1 status.",
        total_upfront_cost: "No additional visa fee",
        application_fee: "Included in F-1 status",
        work_hours: "Full-time unrestricted",
        dependants_allowed: false,
        validity_model: "12 months (36 with STEM extension)",
        // WATCH OUT — proposal: hard deadline cliff — must secure H-1B before OPT expires or leave
        watch_out:
          "Hard deadline cliff — must secure H-1B sponsorship before OPT expires or leave the US.",
        processing_time: "3–5 months for EAD card",
        post_study_work: "OPT is the post-study mechanism",
        language_requirement: "Not applicable",
        financial_proof_required: "Not applicable",
      },
      UK: {
        visa_name: "Graduate Route",
        visa_definition: "Open work visa after graduation — no job offer needed.",
        total_upfront_cost: "£822",
        application_fee: "£822",
        work_hours: "Unlimited — any job, any employer",
        dependants_allowed: false,
        validity_model: "2 yrs (bachelor's/master's), 3 yrs (PhD)",
        // WATCH OUT — proposal: does not lead to permanent residency — must switch to Skilled Worker
        watch_out:
          "Does not count toward permanent residency — must transition to Skilled Worker visa.",
        processing_time: "Not specified",
        post_study_work: "Graduate Route is the mechanism",
        language_requirement: "Not applicable",
        financial_proof_required: "Not applicable",
      },
      AU: {
        visa_name: "Temporary Graduate — Subclass 485",
        visa_definition: "Post-study work visa with duration based on qualification and location.",
        total_upfront_cost: "AUD $1,895",
        application_fee: "AUD $1,895",
        work_hours: "Unlimited — any role, no sponsor",
        dependants_allowed: false,
        validity_model: "2–5 yrs by degree and location",
        // WATCH OUT — proposal: must apply within 6 months of course completion; regional study extends duration
        watch_out:
          "Must apply within 6 months of course completion — regional study extends duration.",
        processing_time: "Not specified",
        post_study_work: "Subclass 485 is the mechanism",
        language_requirement: "Not applicable",
        financial_proof_required: "Not applicable",
      },
    },
    "getting-sponsored": {
      US: {
        visa_name: "H-1B Visa",
        visa_definition: "Employer-sponsored work visa for specialty occupations.",
        total_upfront_cost: "~$215 registration (employer pays rest)",
        application_fee: "$215 registration fee",
        work_hours: "Full-time for sponsoring employer",
        dependants_allowed: true,
        validity_model: "3 yrs renewable; annual lottery cap",
        // WATCH OUT — proposal: annual lottery with ~25-35% selection rate — deeply unpredictable
        watch_out:
          "Annual lottery with roughly 25–35% selection rate — outcome is deeply unpredictable.",
        processing_time: "March registration → October 1 start",
        post_study_work: "Follows OPT as next work pathway",
        language_requirement: "Not specified",
        financial_proof_required: "Employer covers costs",
      },
      UK: {
        visa_name: "Skilled Worker Visa",
        visa_definition: "Points-based employer-sponsored visa — no cap or lottery.",
        total_upfront_cost: "Not specified",
        application_fee: "Not specified",
        work_hours: "Full-time for sponsoring employer",
        dependants_allowed: true,
        validity_model: "Up to 5 yrs; path to ILR after 5 yrs",
        // WATCH OUT — proposal: employer must hold sponsor licence; minimum salary £30,960 for new entrants
        watch_out:
          "Employer must hold sponsor licence; minimum salary threshold £30,960 for new entrants.",
        processing_time: "Not specified",
        post_study_work: "Follows Graduate Route",
        language_requirement: "English proficiency required",
        financial_proof_required: "Salary threshold verification",
      },
      AU: {
        visa_name: "TSS visa (Subclass 482)",
        visa_definition: "Employer-sponsored temporary work visa for skilled occupations.",
        total_upfront_cost: "Not specified",
        application_fee: "Not specified",
        work_hours: "Full-time for sponsoring employer",
        dependants_allowed: true,
        validity_model: "Up to 4 yrs; 186 route to PR",
        // WATCH OUT — proposal: role must be on skilled occupation list; salary minimum AUD $70,000/yr
        watch_out:
          "Role must appear on skilled occupation list; salary minimum AUD $70,000 per year.",
        processing_time: "Not specified",
        post_study_work: "Follows Subclass 485",
        language_requirement: "English proficiency required",
        financial_proof_required: "TSMIT salary compliance",
      },
    },
  },

  // ── Tourist / Visit visa ─────────────────────────────────────
  visit: {
    "entry-requirement": {
      US: {
        visa_name: "B-2 Tourist Visa",
        visa_definition: "Visa for tourism and family visits — no work or study.",
        total_upfront_cost: "$185",
        application_fee: "$185 (non-refundable)",
        work_hours: "Not permitted",
        dependants_allowed: false,
        validity_model: "10-year multi-entry; 6 months/visit",
        // WATCH OUT — proposal: each visit duration set by border officer; overstay has severe consequences
        watch_out:
          "Stay duration decided by border officer at entry — overstay has severe consequences.",
        processing_time: "Not specified",
        post_study_work: "Not applicable",
        language_requirement: "Not applicable",
        financial_proof_required: "Evidence of financial means and ties to home country",
      },
      UK: {
        visa_name: "Standard Visitor Visa",
        visa_definition: "Temporary visit visa for up to 6 months per stay.",
        total_upfront_cost: "£115 (2-year multi-entry)",
        application_fee: "£115",
        work_hours: "Not permitted",
        dependants_allowed: false,
        validity_model: "2-year, 5-year, or 10-year options",
        // WATCH OUT — proposal: in-person biometrics appointment at VAC required; processing can vary
        watch_out:
          "In-person biometrics at a VAC required — appointment wait times can vary significantly.",
        processing_time: "15 working days (5 with priority)",
        post_study_work: "Not applicable",
        language_requirement: "Not applicable",
        financial_proof_required: "Bank statements and ties to home country",
      },
      AU: {
        visa_name: "Visitor visa — Subclass 600",
        visa_definition: "Electronic tourist visa — fully online, no interview.",
        total_upfront_cost: "AUD $190",
        application_fee: "AUD $190",
        work_hours: "Not permitted",
        dependants_allowed: false,
        validity_model: "Up to 12 months; typically 3–6 months",
        // WATCH OUT — proposal: fully online application — processing varies by nationality; no passport stamp
        watch_out:
          "Processing time varies significantly by nationality — visa is electronic, not in passport.",
        processing_time: "20–30 working days typical",
        post_study_work: "Not applicable",
        language_requirement: "Not applicable",
        financial_proof_required: "Bank statements demonstrating financial capacity",
      },
    },
  },

  // ── Residency pathway ───────────────────────────────────────
  residency: {
    "permanent-residency": {
      US: {
        visa_name: "Green Card",
        visa_definition: "Employment-based permanent residency for indefinite US living and work.",
        total_upfront_cost: "Employer-funded (PERM + I-140 filing)",
        application_fee: "Employer covers filing fees",
        work_hours: "Unlimited — any employer",
        dependants_allowed: true,
        validity_model: "Permanent; 10-year card, renewable",
        // WATCH OUT — proposal: Indian/Chinese nationals face multi-decade waits due to per-country caps
        watch_out:
          "Indian and Chinese nationals face multi-decade waits due to per-country caps.",
        processing_time: "8–15+ years total from student arrival",
        post_study_work: "Endpoint of employment-based pathway",
        language_requirement: "Assessed at citizenship, not PR stage",
        financial_proof_required: "PERM labor certification (employer-led)",
      },
      UK: {
        visa_name: "Indefinite Leave to Remain (ILR)",
        visa_definition: "Permanent UK residency — unrestricted right to live and work.",
        total_upfront_cost: "£50 Life in the UK test",
        application_fee: "£50 (test fee)",
        work_hours: "Unlimited — any employer",
        dependants_allowed: true,
        validity_model: "Permanent; indefinite leave status",
        // WATCH OUT — proposal: strict 180-day/year travel limit during 5-year qualifying period
        watch_out:
          "Strict 180-day per year travel limit during the 5-year qualifying period.",
        processing_time: "5–7 years from student arrival",
        post_study_work: "Endpoint after 5 yrs continuous residence",
        language_requirement: "B1 English + Life in the UK test",
        financial_proof_required: "Not required at ILR stage",
      },
      AU: {
        visa_name: "Permanent Residency (Subclass 189/190/186)",
        visa_definition: "Points-tested or employer-sponsored permanent Australian residency.",
        total_upfront_cost: "Not specified",
        application_fee: "Not specified",
        work_hours: "Unlimited — any employer",
        dependants_allowed: true,
        validity_model: "Permanent; 5-year travel facility",
        // WATCH OUT — proposal: 189 is points-tested; 190 needs state nomination; 186 needs 2 yrs in role
        watch_out:
          "Multiple pathways with different requirements — 189 points-tested, 190 state-nominated, 186 employer.",
        processing_time: "5–8 years total from student arrival",
        post_study_work: "Follows Subclass 485 or employer sponsorship",
        language_requirement: "English proficiency + skills assessment",
        financial_proof_required: "Points test or employer nomination",
      },
    },
    citizenship: {
      US: {
        visa_name: "US Citizenship (Naturalisation)",
        visa_definition: "Full citizenship following Green Card and naturalisation requirements.",
        total_upfront_cost: "Not specified",
        application_fee: "Not specified",
        work_hours: "Unlimited",
        dependants_allowed: true,
        validity_model: "Permanent",
        // WATCH OUT — proposal: requires 5 years as permanent resident; civics test and oath required
        watch_out:
          "Requires 5 years as permanent resident plus civics test and oath of allegiance.",
        processing_time: "5 years after Green Card",
        post_study_work: "Endpoint — no further visa needed",
        language_requirement: "Basic English (read, write, speak)",
        financial_proof_required: "Not applicable",
      },
      UK: {
        visa_name: "British Citizenship (Naturalisation)",
        visa_definition: "Full citizenship after holding ILR and meeting residence requirements.",
        total_upfront_cost: "£50 Life in UK test (if not passed)",
        application_fee: "£50 (test fee)",
        work_hours: "Unlimited",
        dependants_allowed: true,
        validity_model: "Permanent",
        // WATCH OUT — proposal: requires 1 year as ILR holder plus 5 years continuous lawful residence
        watch_out:
          "Requires minimum 1 year as ILR holder plus 5 years prior continuous residence.",
        processing_time: "6–8 years total from student arrival",
        post_study_work: "Endpoint — no further visa needed",
        language_requirement: "English proficiency (typically already proven)",
        financial_proof_required: "Not applicable",
      },
      AU: {
        visa_name: "Australian Citizenship",
        visa_definition: "Full citizenship after 4 years residence including 1 year as PR.",
        total_upfront_cost: "Not specified",
        application_fee: "Not specified",
        work_hours: "Unlimited",
        dependants_allowed: true,
        validity_model: "Permanent",
        // WATCH OUT — proposal: 4 years lawful residence with 1 year as PR; 20-question citizenship test
        watch_out:
          "Requires 4 years lawful residence with 1 year as PR plus 20-question citizenship test.",
        processing_time: "6–8 years total from student arrival",
        post_study_work: "Endpoint — no further visa needed",
        language_requirement: "Basic English proficiency",
        financial_proof_required: "Not applicable",
      },
    },
  },
};
