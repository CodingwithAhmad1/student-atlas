import { CompassIcon, GlobeIcon, UsersIcon, ShieldCheckIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { TECHNICAL_EXPLAINER_ROUTE } from "@/lib/routes";

export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl py-12 px-6 w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Our Mission</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Student Atlas exists to make the path from student visa to settled life
          clearer, simpler, and less stressful. We bring together official
          immigration requirements, practical checklists, and real deadlines into
          one place — so you can focus on your studies, not on paperwork.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 mb-12">
        <MissionCard
          icon={<CompassIcon className="size-5" />}
          title="Clear guidance"
          description="Step-by-step breakdowns of visa processes, entry requirements, and post-study options — written in plain language."
        />
        <MissionCard
          icon={<GlobeIcon className="size-5" />}
          title="Country-specific"
          description="Tailored information for each destination country, covering everything from tourist visas to permanent residency."
        />
        <MissionCard
          icon={<UsersIcon className="size-5" />}
          title="Personalised"
          description="Select your nationality and destinations to see only the rules and processes that apply to you."
        />
        <MissionCard
          icon={<ShieldCheckIcon className="size-5" />}
          title="Trustworthy sources"
          description="Every fact is backed by official government sources with full citations you can verify yourself."
        />
      </div>

      <div className="rounded-lg border bg-muted/40 p-6">
        <h2 className="text-lg font-semibold mb-2">How to get started</h2>
        <ol className="list-decimal list-inside space-y-1.5 text-muted-foreground">
          <li>Head to the <strong className="text-foreground">Dashboard</strong> and set your nationality and destination countries.</li>
          <li>Browse visa categories in the sidebar — tourist, student, work, and residency.</li>
          <li>Use <strong className="text-foreground">Generate report</strong> to export a personalised PDF summary.</li>
        </ol>
      </div>

      <div className="mt-10 rounded-lg border bg-muted/40 p-6">
        <h2 className="text-lg font-semibold mb-2">How it works</h2>
        <p className="text-muted-foreground leading-relaxed">
          Curious about how Student Atlas is built and how the guidance is
          structured? Read our{" "}
          <Link
            to={TECHNICAL_EXPLAINER_ROUTE.path}
            className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
          >
            Technical Explainer
          </Link>{" "}
          for an overview of the system architecture, data model, and content
          pipeline.
        </p>
      </div>

      <div className="mt-10 rounded-lg border bg-muted/40 p-6">
        <h2 className="text-lg font-semibold mb-2">Feedback</h2>
        <p className="text-muted-foreground leading-relaxed">
          Spotted something out of date, or have an idea? Use the speech-bubble
          button at the bottom right of any page. Your message is emailed to the
          site owner through the form service Web3Forms, together with the page
          you were on and the nationality and destinations you selected. Nothing
          else is collected, and no account is needed. Every suggestion is read;
          changes to the guide still go through the same review as everything
          else.
        </p>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Student Atlas is an independent resource and is not affiliated with any
        government immigration authority. Always verify details with official
        sources before making decisions.
      </p>
    </div>
  );
}

function MissionCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border p-5">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="text-[#C8963E]">{icon}</div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
