/** The guide's four sections as offered in the PDF report: picker card and report text. */
export interface ReportSection {
  slug: "visit" | "student" | "work" | "residency";
  title: string;
  /** One line for the picker card on the report page. */
  summary: string;
  /** One sentence for the report's introduction and section divider. */
  description: string;
}

export const REPORT_SECTIONS: readonly ReportSection[] = [
  {
    slug: "visit",
    title: "Tourist Visa",
    summary: "Entry requirements and short-stay applications",
    description:
      "Entry requirements, visa-free access, and short-stay application processes for your selected destinations.",
  },
  {
    slug: "student",
    title: "Student Visa",
    summary: "Application process, documents, and after arrival",
    description:
      "Everything you need to know about applying for a student visa, from document preparation to post-arrival obligations.",
  },
  {
    slug: "work",
    title: "Work Visa",
    summary: "Post-study work rights and employer sponsorship",
    description:
      "Post-study work rights, employer sponsorship pathways, and practical guidance for transitioning into the workforce.",
  },
  {
    slug: "residency",
    title: "Residency Pathway",
    summary: "Permanent residency, citizenship, and dual nationality",
    description:
      "Long-term settlement options including permanent residency, citizenship, and dual nationality considerations.",
  },
];
