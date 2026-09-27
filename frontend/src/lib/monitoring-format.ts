import type { ActivityStatus } from "@/types/monitoring";

export const STATUS_STYLES: Record<ActivityStatus, string> = {
  pending:
    "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900",
  manual:
    "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-900",
  approved:
    "bg-green-100 text-green-800 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-900",
  dismissed:
    "bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800/60 dark:text-neutral-300 dark:border-neutral-700",
};

export const STATUS_DOT_STYLES: Record<ActivityStatus, string> = {
  pending: "bg-amber-500",
  manual: "bg-orange-500",
  approved: "bg-green-500",
  dismissed: "bg-neutral-400",
};

export function formatDateTime(iso: string | null): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

/** Local calendar day ("2026-09-27") — groups match the times shown. */
export function localDayKey(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function formatDayKey(day: string): string {
  const [y, m, d] = day.split("-").map(Number);
  return new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(
    new Date(y, m - 1, d)
  );
}
