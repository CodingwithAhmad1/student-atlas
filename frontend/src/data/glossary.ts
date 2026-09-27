export interface GlossaryTerm {
  /** Display label shown inline when no custom display text is provided */
  label: string;
  /** Friendly definition shown in the tooltip */
  definition: string;
}

export const glossary: Record<string, GlossaryTerm> = {
  // ── US Student Visa ────────────────────────────────────────
  "f-1": {
    label: "F-1",
    definition:
      "The main US visa for international students at accredited universities. Allows full-time study and limited on-campus work.",
  },
  sevis: {
    label: "SEVIS",
    definition:
      "Student and Exchange Visitor Information System — the US government database that tracks international students throughout their stay.",
  },
  sevp: {
    label: "SEVP",
    definition:
      "Student and Exchange Visitor Program — the US Department of Homeland Security program that oversees schools enrolling international students.",
  },
  "i-20": {
    label: "I-20",
    definition:
      "The official document from a US university confirming a student's acceptance and program details. Required before applying for an F-1 visa.",
  },
  "d-s": {
    label: "D/S",
    definition:
      "Duration of Status — means the visa stays valid as long as you maintain your student status, rather than expiring on a fixed date.",
  },
  "mrv-fee": {
    label: "MRV fee",
    definition:
      "Machine Readable Visa fee — the standard US visa application fee paid before the interview.",
  },
  "ds-160": {
    label: "DS-160",
    definition:
      "The online US nonimmigrant visa application form. Must be completed before scheduling a visa interview.",
  },
  dso: {
    label: "DSO",
    definition:
      "Designated School Official — the university staff member who manages international student records in SEVIS and signs I-20 forms.",
  },
  "i-94": {
    label: "I-94",
    definition:
      "The US arrival/departure record confirming your admission class and how long you are authorized to stay.",
  },

  // ── UK Student Visa ────────────────────────────────────────
  cas: {
    label: "CAS",
    definition:
      "Confirmation of Acceptance for Studies — a unique reference number from a UK university, needed to apply for a Student visa.",
  },
  brp: {
    label: "BRP",
    definition:
      "Biometric Residence Permit — a card issued in the UK as proof of your immigration status. Must be collected within 10 days of arrival.",
  },
  ihs: {
    label: "IHS",
    definition:
      "Immigration Health Surcharge — an annual fee UK visa applicants pay to access the National Health Service (NHS).",
  },
  ukvi: {
    label: "UKVI",
    definition:
      "UK Visas and Immigration — the Home Office department that processes visa and immigration applications.",
  },
  cos: {
    label: "CoS",
    definition:
      "Certificate of Sponsorship — a reference number from a UK employer needed to apply for a Skilled Worker visa.",
  },
  rqf: {
    label: "RQF",
    definition:
      "Regulated Qualifications Framework — the UK system for classifying job skill levels. Since 22 July 2025, Skilled Worker visa roles must generally be Level 6 (degree level) or above.",
  },
  ilr: {
    label: "ILR",
    definition:
      "Indefinite Leave to Remain — the UK equivalent of permanent residency. Grants the right to live and work in the UK without time limits.",
  },

  // ── Australian Student Visa ────────────────────────────────
  coe: {
    label: "CoE",
    definition:
      "Confirmation of Enrolment — issued by an Australian university after a student accepts their offer. Required for the visa application.",
  },
  oshc: {
    label: "OSHC",
    definition:
      "Overseas Student Health Cover — mandatory health insurance for international students in Australia, purchased before the visa is granted.",
  },
  cricos: {
    label: "CRICOS",
    definition:
      "The Australian government register of education institutions approved to teach international students.",
  },
  gte: {
    label: "GTE",
    definition:
      "Genuine Temporary Entrant — an Australian visa requirement where the student explains in writing why they intend to study temporarily.",
  },
  vevo: {
    label: "VEVO",
    definition:
      "Visa Entitlement Verification Online — an Australian system for checking visa status and conditions electronically.",
  },
  smartgates: {
    label: "SmartGates",
    definition:
      "Automated border control gates at Australian airports that allow faster entry processing for eligible passport holders.",
  },
  tsmit: {
    label: "TSMIT",
    definition:
      "Temporary Skilled Migration Income Threshold, renamed the Core Skills Income Threshold (CSIT) — the minimum salary an Australian employer must pay a sponsored worker.",
  },
  "subclass-500": {
    label: "Subclass 500",
    definition:
      "The Australian student visa, covering all international students from bachelor's through PhD level.",
  },
  "subclass-485": {
    label: "Subclass 485",
    definition:
      "The Australian Temporary Graduate visa — lets international graduates live and work in Australia after completing their studies.",
  },
  "subclass-482": {
    label: "Subclass 482",
    definition:
      "The Australian Skills in Demand visa (formerly Temporary Skill Shortage) — an employer-sponsored temporary work visa.",
  },
  "subclass-186": {
    label: "Subclass 186",
    definition:
      "The Australian Employer Nomination Scheme visa — an employer-sponsored pathway to permanent residency.",
  },
  "subclass-189": {
    label: "Subclass 189",
    definition:
      "The Australian Skilled Independent visa — a points-tested permanent residency pathway that does not require employer sponsorship.",
  },

  // ── Work & Post-Study ──────────────────────────────────────
  opt: {
    label: "OPT",
    definition:
      "Optional Practical Training — authorized work in the US after graduation. Lasts 12 months, or up to 36 months for STEM graduates.",
  },
  cpt: {
    label: "CPT",
    definition:
      "Curricular Practical Training — authorized off-campus work for F-1 students as part of their degree program, such as internships or co-ops.",
  },
  ead: {
    label: "EAD",
    definition:
      "Employment Authorization Document — the physical work permit card issued to F-1 students on OPT.",
  },
  "h-1b": {
    label: "H-1B",
    definition:
      "The primary US work visa for professional roles requiring at least a bachelor's degree. Subject to an annual lottery due to high demand.",
  },
  "e-verify": {
    label: "E-Verify",
    definition:
      "A US government system employers use to confirm an employee's work authorization. Required for employers hiring STEM OPT workers.",
  },
  stem: {
    label: "STEM",
    definition:
      "Science, Technology, Engineering, and Mathematics — a classification of academic fields. STEM graduates in the US qualify for an extended work period.",
  },

  // ── Residency & Green Card ─────────────────────────────────
  perm: {
    label: "PERM",
    definition:
      "The US Department of Labor process where an employer proves no qualified US worker is available. Required for most employment-based Green Cards.",
  },
  "i-140": {
    label: "I-140",
    definition:
      "The US immigration petition filed by an employer as part of the employment-based Green Card process.",
  },
  "eb-1": {
    label: "EB-1",
    definition:
      "First preference US employment-based Green Card — for people with extraordinary ability, outstanding researchers, or multinational executives.",
  },
  "eb-2": {
    label: "EB-2",
    definition:
      "Second preference US Green Card — for advanced degree professionals or those with exceptional ability. Includes the National Interest Waiver.",
  },
  "eb-3": {
    label: "EB-3",
    definition:
      "Third preference US Green Card — for skilled workers and professionals with a bachelor's degree.",
  },
  niw: {
    label: "NIW",
    definition:
      "National Interest Waiver — lets you self-petition for a US Green Card without employer sponsorship if your work benefits the national interest.",
  },

  // ── Travel & Entry ─────────────────────────────────────────
  esta: {
    label: "ESTA",
    definition:
      "Electronic System for Travel Authorization — online authorization for Visa Waiver Program nationals visiting the US for up to 90 days.",
  },
  eta: {
    label: "ETA",
    definition:
      "Electronic Travel Authorisation — a lightweight online travel permit for eligible nationalities visiting the UK or Australia for short stays.",
  },
  vac: {
    label: "VAC",
    definition:
      "Visa Application Centre — a physical office (usually run by VFS Global) where applicants submit biometrics and documents.",
  },

  // ── Tests & Qualifications ─────────────────────────────────
  ielts: {
    label: "IELTS",
    definition:
      "International English Language Testing System — a widely accepted English proficiency test, often required for UK and Australian visa applications.",
  },

  // ── Other ──────────────────────────────────────────────────
  oci: {
    label: "OCI",
    definition:
      "Overseas Citizen of India — a lifelong card granting the right to visit and work in India without a visa. It is not actual Indian citizenship.",
  },
};
