import { cn } from "@/lib/utils";
import type { ActivityStatus } from "@/types/monitoring";
import { STATUS_LABELS } from "@/types/monitoring";

export const STATUS_STYLES: Record<ActivityStatus, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  dismissed: "bg-neutral-100 text-neutral-600 border-neutral-200",
  review: "bg-purple-100 text-purple-800 border-purple-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  manual: "bg-orange-100 text-orange-800 border-orange-200",
  error: "bg-red-100 text-red-800 border-red-200",
};

export const STATUS_DOT_STYLES: Record<ActivityStatus, string> = {
  pending: "bg-amber-500",
  dismissed: "bg-neutral-400",
  review: "bg-purple-500",
  approved: "bg-green-500",
  rejected: "bg-red-500",
  manual: "bg-orange-500",
  error: "bg-red-500",
};

export function StatusBadge({ status }: { status: ActivityStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        STATUS_STYLES[status]
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export function SummaryCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      {hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function FilterTabs<T extends string>({
  options,
  value,
  onChange,
  labels,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
  labels?: Partial<Record<T, string>>;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            value === opt
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:text-foreground"
          )}
        >
          {labels?.[opt] ?? (opt === "all" ? "All" : opt)}
        </button>
      ))}
    </div>
  );
}

export function formatDateTime(iso: string | null): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(
    new Date(iso)
  );
}
