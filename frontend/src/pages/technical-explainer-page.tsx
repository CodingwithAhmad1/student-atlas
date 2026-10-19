import { Link } from "react-router-dom";
import { monitoredSourceCount } from "@/data/source-registry";
import { ACTIVITY_ROUTE, SOURCE_HEALTH_ROUTE } from "@/lib/routes";

function PipelineStage({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border p-5">
      <div className="flex items-center gap-2.5 mb-2">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
          {step}
        </span>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

function ArchitectureLayer({
  title,
  path,
  description,
}: {
  title: string;
  path: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border p-5">
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-xs font-mono text-muted-foreground mb-2">{path}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

export function TechnicalExplainerPage() {
  return (
    <div className="mx-auto max-w-3xl py-12 px-6 space-y-10 w-full">
      {/* Introduction */}
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Technical Explainer
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Student Atlas is a free immigration guidance tool for international
          students and their families. It covers pathways from tourist visas
          through student visas, post-study work, permanent residency, and
          citizenship — for the United States, United Kingdom, and Australia.
          Every fact is tied to an official government source you can verify
          yourself.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          This page explains how the system is built, how content is structured,
          and how we plan to keep guidance current as immigration policy
          changes. We believe transparency about our methods is part of earning
          your trust.
        </p>
      </header>

      {/* Content architecture */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Content architecture</h2>
        <p className="text-muted-foreground leading-relaxed">
          Guidance in Student Atlas is not a single flat document. It is built
          from four composable layers that merge at render time based on your
          selected nationality and destination countries.
        </p>
        <div className="grid gap-4">
          <ArchitectureLayer
            title="Nationality traits"
            path="data/traits/"
            description="One table with a row per nationality and a column per fact that depends on nationality — visa-free travel, TB tests, evidence rules, US entry restrictions, work-visa alternatives, dual nationality. Each column is read from exactly one official page and carries the date it was last checked; rules turn a row into the cited notes you see."
          />
          <ArchitectureLayer
            title="Base content"
            path="data/sections/"
            description="Nationality-agnostic visa guidance organised by pathway — tourist, student, work, and residency — with separate content for each destination country (US, UK, Australia). This is the foundation every user sees."
          />
          <ArchitectureLayer
            title="Profiles"
            path="data/profiles/"
            description="Shared content for specific visa paths that apply across nationalities — for example, domestic students in the US, or tourists eligible under the Visa Waiver Program. Profiles replace an entire country section when they are more accurate than the generic base."
          />
          <ArchitectureLayer
            title="Nationality overlays"
            path="data/nationalities/"
            description="Hand-written extras for a nationality, each cited or marked as practical advice. Overlays insert paragraphs after specific blocks in the base content without rewriting the guide; everything that follows from an official list (visa-free travel, TB tests, evidence rules, entry restrictions) is generated from the traits table instead."
          />
        </div>
        <p className="text-muted-foreground leading-relaxed">
          When you select a nationality, the app lazy-loads the matching overlay
          and merges it with the base content. Callouts are inserted after
          identified blocks; profiles can replace entire country sections. This
          means adding support for a new nationality does not require rewriting
          existing guidance — only adding the overlays that matter for that
          audience.
        </p>
      </section>

      {/* Citation system */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Citation system</h2>
        <p className="text-muted-foreground leading-relaxed">
          Immigration guidance is only useful if you can trust it. Every factual
          claim in Student Atlas links to a primary government source — not
          third-party aggregators, immigration consultancy marketing, or
          forum posts.
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-muted-foreground leading-relaxed">
          <li>
            <strong className="text-foreground">{monitoredSourceCount} official sources</strong>{" "}
            from immigration authorities in the US, UK, and Australia
          </li>
          <li>
            Primary domains include{" "}
            <span className="font-mono text-sm">travel.state.gov</span>,{" "}
            <span className="font-mono text-sm">uscis.gov</span>,{" "}
            <span className="font-mono text-sm">gov.uk</span>, and{" "}
            <span className="font-mono text-sm">homeaffairs.gov.au</span>
          </li>
          <li>
            Inline citation markers in the guide link directly to the source
            page that backs each claim
          </li>
          <li>
            No content is sourced from paid consultancy sites, news articles, or
            user-generated forums
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed">
          You can browse the full citation index on our{" "}
          <Link
            to="/citations"
            className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
          >
            Citations &amp; sources
          </Link>{" "}
          page, organised by country and visa category.
        </p>
      </section>

      {/* Freshness pipeline */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Keeping content current</h2>
        <p className="text-muted-foreground leading-relaxed">
          Immigration policy changes frequently — fee increases, eligibility
          criteria updates, new visa categories, processing rule changes.
          Government websites are updated without notice, and static guides can
          go months or years between revisions. Outdated guidance is not just
          inconvenient; for high-stakes immigration decisions, it can be
          harmful.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Student Atlas runs a three-stage pipeline to detect policy changes
          quickly and publish reviewed updates promptly. Automation detects and
          reviews changes; a person approves every update before it goes live.
        </p>

        <div className="grid gap-4">
          <PipelineStage step={1} title="Source monitoring">
            An automated monitor watches every URL in our citation registry —
            currently {monitoredSourceCount} government pages across the US, UK,
            and Australia. It runs every 12 hours, fetches each page, and
            compares a content hash against the previous snapshot. Layout
            shifts, cookie-banner changes, and other boilerplate updates are
            filtered out; only substantive content changes trigger an alert
            logged with the date, time, and URL. Sources that block automated
            checks are reported honestly as not monitorable.
          </PipelineStage>
          <PipelineStage step={2} title="Weekly AI review">
            Each alert records exactly what changed on the page since it was
            last reviewed. Once a week, an AI reviewer works through every open
            alert under a published review policy: it compares the change with
            every passage of the guide citing that source and drafts the precise
            wording update where one is needed. It writes only what the official
            page states; when something cannot be confirmed, it removes or
            softens the claim rather than guessing. Edits keep every citation
            intact and are type-checked and build-verified.
          </PipelineStage>
          <PipelineStage step={3} title="Human approval">
            The week&apos;s review arrives as one set of proposed changes, each
            with the official source and the evidence behind it. Nothing goes
            live until a person reads it and explicitly approves it. Every
            outcome — content updated, or no change needed — is recorded on the
            Activity feed with a timestamp, the source URL that triggered it,
            and the exact before-and-after text.
          </PipelineStage>
        </div>

        <div className="rounded-lg border bg-muted/40 p-6">
          <h3 className="font-semibold mb-2">What this means for you</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our target is to detect policy changes within 24 hours and publish
            reviewed updates within 7 days of detection. Compared to static
            immigration guides that may go months between revisions, this
            pipeline is designed to keep Student Atlas meaningfully current —
            at no cost to you.
          </p>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Every detection and review is logged publicly. See the{" "}
            <Link
              to={ACTIVITY_ROUTE.path}
              className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
            >
              Activity feed
            </Link>{" "}
            for detected changes and review outcomes, and the{" "}
            <Link
              to={SOURCE_HEALTH_ROUTE.path}
              className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
            >
              Sources view
            </Link>{" "}
            for source-by-source health.
          </p>
        </div>
      </section>

      {/* Limitations */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Transparency and limitations</h2>
        <ul className="list-disc list-inside space-y-1.5 text-muted-foreground leading-relaxed">
          <li>
            Student Atlas is an independent resource and is not affiliated with
            any government immigration authority
          </li>
          <li>
            The monitoring pipeline reduces lag but cannot eliminate it entirely
            — there will always be a window between a policy change on a
            government website and our reviewed update
          </li>
          <li>
            Policy changes can appear on pages we do not yet monitor, or in
            formats (press releases, gazette notices) that automated monitoring
            may not catch immediately
          </li>
          <li>
            AI-drafted wording is a starting point, not a final authority. A
            person approves every change before publication
          </li>
          <li>
            Always verify details with official government sources before making
            immigration decisions
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">
          If you spot something that looks outdated, we welcome reports — a
          contact channel for content corrections will be added soon.
        </p>
      </section>
    </div>
  );
}
