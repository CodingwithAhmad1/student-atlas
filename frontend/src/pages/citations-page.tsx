import { citations } from "@/data/citations";

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

export function CitationsPage() {
  const allCitations = Object.values(citations);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-2xl font-semibold tracking-tight">
        Citations and sources
      </h1>

      <div className="max-w-3xl space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">
            How we source information
          </h2>
          <p className="text-muted-foreground leading-7">
            Every piece of information in Student Atlas is drawn from official
            government sources — immigration authority websites, primary
            legislation, and official guidance documents published by the
            relevant departments. We do not draw on third-party aggregators,
            immigration consultancy marketing material, or forum-based guidance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            Main sources by country
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">United States</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                {usSources.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-1">United Kingdom</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                {ukSources.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Australia</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                {auSources.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            How we keep information current
          </h2>
          <p className="text-muted-foreground leading-7">
            We review all content on a rolling basis. Each section displays a
            "last verified" date. When official guidance changes, we update the
            relevant section and log the change. We also monitor official
            government announcements and the monthly US Visa Bulletin for
            time-sensitive updates.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            What citations look like in the app
          </h2>
          <p className="text-muted-foreground leading-7">
            Within each section of Student Atlas, numbered citation markers
            appear inline next to specific facts and figures. Clicking a
            citation marker opens the source document in a new tab. Citations
            open the most specific page of the source document available — not
            just the homepage of the government website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">A note on accuracy</h2>
          <p className="text-muted-foreground leading-7">
            Immigration rules change frequently. A policy that is current when
            we write it may have changed by the time you read it. We make every
            effort to keep content accurate but we are an information resource,
            not a legal authority. Where rules have changed and we have not yet
            updated our content, we want to know — use the feedback link at the
            bottom of any page to flag a discrepancy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            We are not legal advisers
          </h2>
          <p className="text-muted-foreground leading-7">
            Nothing in Student Atlas constitutes legal advice. For complex
            individual situations — including visa refusals, prior immigration
            violations, or nationality questions involving dual citizenship — a
            qualified immigration lawyer should be consulted.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">All sources</h2>
          <ul className="space-y-2 text-sm">
            {allCitations.map((cite) => (
              <li key={cite.id} className="flex gap-2">
                <a
                  href={cite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline decoration-dotted"
                >
                  {cite.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
