import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { DASHBOARD_ROUTE } from "@/lib/routes";

/** Empty state for pages that need a nationality and destinations first. */
export function SetupRequired({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h2 className="text-xl font-semibold">Set up your preferences first</h2>
      <p className="max-w-md text-muted-foreground">{children}</p>
      <Link to={DASHBOARD_ROUTE.path} className="text-primary underline hover:text-primary/80">
        Go to {DASHBOARD_ROUTE.label}
      </Link>
    </div>
  );
}
