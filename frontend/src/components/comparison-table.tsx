import type { Country } from "@/data/types";
import { COUNTRY_LABELS } from "@/data/types";
import type { VisaFacts } from "@/data/visa-facts";
import { cn } from "@/lib/utils";

interface ComparisonTableProps {
  countries: Country[];
  facts: Partial<Record<Country, VisaFacts>> | undefined;
}

interface RowDef {
  label: string;
  key: keyof VisaFacts;
  isBoolean?: boolean;
  isCost?: boolean;
}

const ROWS: RowDef[] = [
  { label: "Visa name", key: "visa_name" },
  { label: "Processing time", key: "processing_time" },
  { label: "Application fee", key: "application_fee", isCost: true },
  { label: "Total upfront cost", key: "total_upfront_cost", isCost: true },
  { label: "Work rights", key: "work_hours" },
  { label: "Dependants allowed", key: "dependants_allowed", isBoolean: true },
  { label: "Post-study work", key: "post_study_work" },
  { label: "Language requirement", key: "language_requirement" },
  { label: "Financial proof", key: "financial_proof_required" },
  { label: "Validity", key: "validity_model" },
];

/**
 * Parse a rough numeric value from a cost string for comparison.
 * Returns Infinity if unparseable (so it's never "best").
 */
function parseCostNumber(value: string): number {
  const match = value.replace(/,/g, "").match(/[\d.]+/);
  return match ? parseFloat(match[0]) : Infinity;
}

/** Currency of a cost string; costs in different currencies aren't comparable. */
function currencyOf(value: string): string | null {
  if (/AUD/.test(value)) return "AUD";
  if (value.includes("£")) return "GBP";
  if (value.includes("$")) return "USD";
  return null;
}

function CellValue({
  value,
  isBoolean,
  isBest,
}: {
  value: string | boolean;
  isBoolean?: boolean;
  isBest?: boolean;
}) {
  if (isBoolean && typeof value === "boolean") {
    return (
      <span
        className={
          value
            ? "text-green-600 dark:text-green-400 font-medium"
            : "text-red-400 dark:text-red-500 font-medium"
        }
      >
        {value ? "\u2713" : "\u2717"}
      </span>
    );
  }

  return (
    <span className={cn("text-sm", isBest && "font-semibold")}>
      {String(value)}
    </span>
  );
}

export function ComparisonTable({ countries, facts }: ComparisonTableProps) {
  if (!facts || countries.length < 2) return null;

  // Pre-compute "best" (cheapest) for cost rows
  const bestCostMap = new Map<string, Country>();
  for (const row of ROWS) {
    if (!row.isCost) continue;
    let bestCountry: Country | null = null;
    let bestVal = Infinity;
    const currencies = new Set<string | null>();
    for (const c of countries) {
      const f = facts[c];
      if (!f) continue;
      const raw = f[row.key];
      if (typeof raw !== "string") continue;
      currencies.add(currencyOf(raw));
      const num = parseCostNumber(raw);
      if (num < bestVal) {
        bestVal = num;
        bestCountry = c;
      }
    }
    if (bestCountry && bestVal < Infinity && currencies.size === 1 && !currencies.has(null)) {
      bestCostMap.set(row.key, bestCountry);
    }
  }

  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <table className="w-full text-sm border-collapse min-w-[500px]">
        <thead>
          <tr>
            <th className="sticky left-0 bg-background text-left py-2 pr-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
              Attribute
            </th>
            {countries.map((c) => (
              <th
                key={c}
                className="text-left py-2 px-3 font-semibold text-xs uppercase tracking-wide"
              >
                {COUNTRY_LABELS[c]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, idx) => (
            <tr
              key={row.key}
              className={cn(idx % 2 === 0 && "bg-muted/30")}
            >
              <td className="sticky left-0 bg-inherit py-2.5 pr-4 font-medium text-foreground whitespace-nowrap">
                {row.label}
              </td>
              {countries.map((c) => {
                const f = facts[c];
                const rawValue = f ? f[row.key] : "—";
                const isBest =
                  row.isCost && bestCostMap.get(row.key) === c;

                return (
                  <td key={c} className="py-2.5 px-3 text-foreground">
                    <CellValue
                      value={rawValue ?? "—"}
                      isBoolean={row.isBoolean}
                      isBest={isBest}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
