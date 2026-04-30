import { citations } from "@/data/citations";
import type { Citation } from "@/data/types";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ExternalLink } from "lucide-react";

/* ── categorisation rules ────────────────────────────────────── */

type Category =
  | "visitor"
  | "student"
  | "work"
  | "pr"
  | "citizenship"
  | "general";

interface CountryGroup {
  label: string;
  flag: string;
  categories: Record<Category, Citation[]>;
}

const categoryLabels: Record<Category, string> = {
  visitor: "Visitor & tourist visas",
  student: "Student visas",
  work: "Work visas & employment",
  pr: "Permanent residency",
  citizenship: "Citizenship",
  general: "General & other",
};

const categoryOrder: Category[] = [
  "visitor",
  "student",
  "work",
  "pr",
  "citizenship",
  "general",
];

function classifyCitation(id: string, label: string): {
  country: "us" | "uk" | "au" | "other";
  category: Category;
} {
  // Determine country
  let country: "us" | "uk" | "au" | "other" = "other";
  const lcId = id.toLowerCase();
  const lcLabel = label.toLowerCase();

  if (
    lcId.includes("state.gov") ||
    lcId.includes("uscis.gov") ||
    lcId.includes("studyinthestates") ||
    lcId.includes("cbp.gov") ||
    lcId.includes("dol.gov") ||
    lcId.includes("fmjfee") ||
    lcId.includes("usembassy") ||
    lcId.includes("ustraveldocs") ||
    lcId.includes("ceac.state")
  ) {
    country = "us";
  } else if (lcId.includes("gov.uk") || lcId.includes("ukvcas")) {
    country = "uk";
  } else if (
    lcId.includes("homeaffairs") ||
    lcId.includes("immi.") ||
    lcId.includes("privatehealth.gov.au")
  ) {
    country = "au";
  }

  // Determine category
  let category: Category = "general";

  if (
    lcLabel.includes("citizen") ||
    lcLabel.includes("citizenship") ||
    lcLabel.includes("naturaliz")
  ) {
    category = "citizenship";
  } else if (
    lcLabel.includes("permanent residen") ||
    lcLabel.includes("green card") ||
    lcLabel.includes("indefinite leave") ||
    lcLabel.includes("life in the uk") ||
    lcLabel.includes("perm labor") ||
    lcLabel.includes("visa bulletin") ||
    lcId.includes("skilled-independent") ||
    lcId.includes("skilled-nominated") ||
    lcId.includes("employer-nomination")
  ) {
    category = "pr";
  } else if (
    lcLabel.includes("h-1b") ||
    lcLabel.includes("skilled worker") ||
    lcLabel.includes("temporary skill shortage") ||
    lcLabel.includes("tsmit") ||
    lcLabel.includes("foreign labor") ||
    lcLabel.includes("opt") ||
    lcLabel.includes("practical training") ||
    lcLabel.includes("stem opt") ||
    lcLabel.includes("graduate visa") ||
    lcId.includes("temporary-graduate") ||
    lcLabel.includes("working in the us")
  ) {
    category = "work";
  } else if (
    lcLabel.includes("student") ||
    lcLabel.includes("study") ||
    lcLabel.includes("sevis") ||
    lcLabel.includes("i-20") ||
    lcLabel.includes("cas") ||
    lcLabel.includes("health surcharge") ||
    lcLabel.includes("health cover") ||
    lcLabel.includes("health requirement") ||
    lcLabel.includes("tuberculosis") ||
    lcLabel.includes("sponsor a student") ||
    lcLabel.includes("maintaining your status") ||
    lcLabel.includes("form i-20") ||
    lcId.includes("student-500") ||
    lcId.includes("fmjfee")
  ) {
    category = "student";
  } else if (
    lcLabel.includes("visitor") ||
    lcLabel.includes("b-1") ||
    lcLabel.includes("b-2") ||
    lcLabel.includes("esta") ||
    lcLabel.includes("visa waiver") ||
    lcLabel.includes("eta") ||
    lcLabel.includes("electronic travel") ||
    lcLabel.includes("standard visitor") ||
    lcId.includes("visitor-600") ||
    lcId.includes("travel-authority")
  ) {
    category = "visitor";
  }

  return { country, category };
}

function buildGroups(): Record<string, CountryGroup> {
  const groups: Record<string, CountryGroup> = {
    us: {
      label: "United States",
      flag: "🇺🇸",
      categories: {
        visitor: [],
        student: [],
        work: [],
        pr: [],
        citizenship: [],
        general: [],
      },
    },
    uk: {
      label: "United Kingdom",
      flag: "🇬🇧",
      categories: {
        visitor: [],
        student: [],
        work: [],
        pr: [],
        citizenship: [],
        general: [],
      },
    },
    au: {
      label: "Australia",
      flag: "🇦🇺",
      categories: {
        visitor: [],
        student: [],
        work: [],
        pr: [],
        citizenship: [],
        general: [],
      },
    },
    other: {
      label: "Other",
      flag: "🌐",
      categories: {
        visitor: [],
        student: [],
        work: [],
        pr: [],
        citizenship: [],
        general: [],
      },
    },
  };

  for (const cite of Object.values(citations)) {
    const { country, category } = classifyCitation(cite.id, cite.label);
    groups[country].categories[category].push(cite);
  }

  return groups;
}

const usSources = [
  "U.S. Department of State (travel.state.gov)",
  "U.S. Citizenship and Immigration Services (uscis.gov)",
  "Study in the States — Department of Homeland Security (studyinthestates.dhs.gov)",
  "U.S. Customs and Border Protection (cbp.gov)",
  "Department of Labor (dol.gov)",
];

const ukSources = [
  "GOV.UK — UK Visas and Immigration (gov.uk/browse/visas-immigration)",
  "UK Visa and Citizenship Application Services (ukvcas.co.uk)",
];

const auSources = [
  "Department of Home Affairs (immi.homeaffairs.gov.au)",
  "Home Affairs citizenship portal (homeaffairs.gov.au/citizenship)",
];

function CitationLink({ cite }: { cite: Citation }) {
  return (
    <li className="group flex items-start gap-2 py-1.5">
      <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      <a
        href={cite.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-primary hover:text-primary/80 underline decoration-dotted underline-offset-2"
      >
        {cite.label}
      </a>
    </li>
  );
}

function CategorySection({
  category,
  cites,
}: {
  category: Category;
  cites: Citation[];
}) {
  if (cites.length === 0) return null;
  return (
    <div>
      <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {categoryLabels[category]}
      </h4>
      <ul className="ml-0.5 border-l-2 border-muted pl-3">
        {cites.map((cite) => (
          <CitationLink key={cite.id} cite={cite} />
        ))}
      </ul>
    </div>
  );
}

export function CitationsPage() {
  const groups = buildGroups();
  const countryOrder = ["us", "uk", "au", "other"] as const;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="mx-auto w-full max-w-3xl space-y-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          Citations & sources
        </h1>

        {/* ── Methodology ─────────────────────────────────── */}
        <section className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">
              How we source information
            </h2>
            <p className="text-muted-foreground leading-7 text-sm">
              Every piece of information in Student Atlas is drawn from official
              government sources — immigration authority websites, primary
              legislation, and official guidance documents published by the
              relevant departments. We do not draw on third-party aggregators,
              immigration consultancy marketing material, or forum-based
              guidance.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">
              Main sources by country
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border bg-card p-3">
                <h3 className="font-semibold text-sm mb-2">🇺🇸 United States</h3>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {usSources.map((s) => (
                    <li key={s} className="leading-relaxed">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <h3 className="font-semibold text-sm mb-2">🇬🇧 United Kingdom</h3>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {ukSources.map((s) => (
                    <li key={s} className="leading-relaxed">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <h3 className="font-semibold text-sm mb-2">🇦🇺 Australia</h3>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {auSources.map((s) => (
                    <li key={s} className="leading-relaxed">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Notices ─────────────────────────────────────── */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 p-4">
            <h3 className="text-sm font-semibold mb-1">A note on accuracy</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Immigration rules change frequently. We make every effort to keep
              content accurate, but we are an information resource, not a legal
              authority. Use the feedback link to flag any discrepancy.
            </p>
          </div>
          <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 p-4">
            <h3 className="text-sm font-semibold mb-1">
              We are not legal advisers
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Nothing in Student Atlas constitutes legal advice. For complex
              situations — visa refusals, immigration violations, or dual
              citizenship — consult a qualified immigration lawyer.
            </p>
          </div>
        </section>

        {/* ── How citations work ──────────────────────────── */}
        <section className="flex items-start gap-3 rounded-lg border bg-muted/40 p-4">
          <span className="mt-0.5 text-lg">📎</span>
          <div>
            <h3 className="text-sm font-semibold mb-1">
              How citations appear in the app
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Numbered citation markers appear inline next to facts and figures.
              Clicking a marker opens the most specific page of the source
              document — not just the homepage.
            </p>
          </div>
        </section>

        {/* ── All citations, grouped ─────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold mb-3">All cited sources</h2>
          <Accordion>
            {countryOrder.map((key) => {
              const group = groups[key];
              const count = categoryOrder.reduce(
                (n, cat) => n + group.categories[cat].length,
                0
              );
              if (count === 0) return null;

              return (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger className="text-base">
                    <span className="flex items-center gap-2">
                      <span>{group.flag}</span>
                      <span>{group.label}</span>
                      <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs font-normal text-muted-foreground">
                        {count}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pl-1 pt-1">
                      {categoryOrder.map((cat) => (
                        <CategorySection
                          key={cat}
                          category={cat}
                          cites={group.categories[cat]}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </section>
      </div>
    </div>
  );
}
