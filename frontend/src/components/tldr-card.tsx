import type { VisaFacts } from "@/data/visa-facts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TLDRCardProps {
  facts: VisaFacts;
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 py-1.5">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="text-foreground font-medium text-right">{value}</span>
    </div>
  );
}

function BooleanRow({ label, value }: { label: string; value: boolean }) {
  return (
    <div className="flex justify-between gap-3 py-1.5">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span
        className={value ? "text-green-600 dark:text-green-400 font-medium" : "text-red-400 dark:text-red-500 font-medium"}
      >
        {value ? "\u2713" : "\u2717"}
      </span>
    </div>
  );
}

export function TLDRCard({ facts }: TLDRCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          {facts.visa_name}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{facts.visa_definition}</p>
      </CardHeader>

      <CardContent className="space-y-0 divide-y divide-border text-sm">
        <FactRow label="Total cost" value={facts.total_upfront_cost} />
        <FactRow label="Work rights" value={facts.work_hours} />
        <BooleanRow label="Dependants" value={facts.dependants_allowed} />
        <FactRow label="Validity" value={facts.validity_model} />
      </CardContent>

      {/* Watch-out row — amber warning treatment */}
      <div className="mx-4 mb-1 border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-950/20 rounded-r-md px-3 py-2">
        <p className="text-xs font-medium text-amber-700 dark:text-amber-400 leading-snug">
          {facts.watch_out}
        </p>
      </div>
    </Card>
  );
}
