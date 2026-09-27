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
        total_upfront_cost: "~$535 (visa + SEVIS; +$250 integrity fee where charged)",
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
        total_upfront_cost: "~£3,275 (3-yr degree: visa + IHS)",
        application_fee: "£558",
        work_hours: "20 hrs/week term-time",
        dependants_allowed: true,
        validity_model: "Fixed: course length + 4 months",
        // WATCH OUT — proposal: IHS surcharge £776/yr paid entirely upfront, often unexpected
        watch_out:
          "IHS surcharge of £776/year is paid entirely upfront — often a surprise cost.",
        processing_time: "3 weeks standard after biometrics",
        post_study_work: "Graduate Route: 2 yrs (18 months from 2027; 3 for PhD)",
        language_requirement: "IELTS Academic 6.0+ (UKVI version)",
        financial_proof_required: "£1,529/month London, £1,171 elsewhere (up to 9 months, held 28 days)",
      },
      AU: {
        visa_name: "Student visa — Subclass 500",
        visa_definition: "Visa for study at CRICOS-registered Australian institutions.",
        total_upfront_cost: "~AUD $3,100 (visa + first-year OSHC)",
        application_fee: "AUD $2,500",
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
        total_upfront_cost: "$470 (Form I-765, online)",
        application_fee: "$470 online / $520 paper (I-765)",
        work_hours: "Full-time unrestricted",
        dependants_allowed: false,
        validity_model: "12 months (36 with STEM extension)",
        // WATCH OUT — hard deadline: without H-1B (or another status) you get 60 days after OPT ends, then must leave
        watch_out:
          "Hard deadline — without H-1B or another status, you have 60 days after OPT ends to leave the US.",
        processing_time: "3–5 months for EAD card",
        post_study_work: "OPT is the post-study mechanism",
        language_requirement: "Not applicable",
        financial_proof_required: "Not applicable",
      },
      UK: {
        visa_name: "Graduate Route",
        visa_definition: "Open work visa after graduation — no job offer needed.",
        total_upfront_cost: "~£3,000 (£937 fee + IHS £1,035/yr)",
        application_fee: "£937",
        work_hours: "Unlimited — any job, any employer",
        dependants_allowed: false,
        validity_model: "2 yrs (18 months if applying from 1 Jan 2027); 3 yrs PhD",
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
        total_upfront_cost: "AUD $5,750",
        application_fee: "AUD $5,750",
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
        total_upfront_cost: "£819–£1,865 fee + IHS £1,035/yr",
        application_fee: "£819–£1,865 by length and location",
        work_hours: "Full-time for sponsoring employer",
        dependants_allowed: true,
        validity_model: "Up to 5 yrs; path to ILR after 5 yrs",
        // WATCH OUT — proposal: employer must hold sponsor licence; minimum salary £41,700 (£33,400 new entrants)
        watch_out:
          "Employer must hold sponsor licence; minimum salary £41,700 (£33,400 for new entrants).",
        processing_time: "Not specified",
        post_study_work: "Follows Graduate Route",
        language_requirement: "English proficiency required",
        financial_proof_required: "Salary threshold verification",
      },
      AU: {
        visa_name: "Skills in Demand visa (Subclass 482)",
        visa_definition: "Employer-sponsored temporary work visa for skilled occupations.",
        total_upfront_cost: "AUD $4,015 (employer usually pays)",
        application_fee: "AUD $4,015",
        work_hours: "Full-time for sponsoring employer",
        dependants_allowed: true,
        validity_model: "Up to 4 yrs; 186 route to PR",
        // WATCH OUT — proposal: occupation must be on Core Skills Occupation List; salary at least CSIT (~AUD $79,400)
        watch_out:
          "Core Skills stream: occupation must be on the Core Skills Occupation List; salary at least the Core Skills Income Threshold (~AUD $79,400).",
        processing_time: "Not specified",
        post_study_work: "Follows Subclass 485",
        language_requirement: "English proficiency required",
        financial_proof_required: "Core Skills Income Threshold (CSIT) compliance",
      },
    },
  },

  // ── Tourist / Visit visa ─────────────────────────────────────
  visit: {
    "entry-requirement": {
      US: {
        visa_name: "B-2 Tourist Visa",
        visa_definition: "Visa for tourism and family visits — no work or study.",
        total_upfront_cost: "$185 (+$250 integrity fee where charged)",
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
        total_upfront_cost: "£135 (up to 6 months)",
        application_fee: "£135",
        work_hours: "Not permitted",
        dependants_allowed: false,
        validity_model: "6 months; long-term 2, 5 or 10 years (£506–£1,128)",
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
        total_upfront_cost: "AUD $250 (outside Australia)",
        application_fee: "AUD $250",
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
        total_upfront_cost: "~£3,276 (£3,226 ILR fee + £50 test)",
        application_fee: "£3,226",
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
        total_upfront_cost: "~AUD $6,140 (189/190/186)",
        application_fee: "AUD $6,135–$6,140",
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
        total_upfront_cost: "~£1,839 (£1,709 fee + £130 ceremony) + £50 test",
        application_fee: "£1,709",
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
        total_upfront_cost: "AUD $595",
        application_fee: "AUD $595",
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
