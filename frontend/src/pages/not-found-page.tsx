import { Link } from "react-router-dom";
import { DASHBOARD_ROUTE } from "@/lib/routes";

export function NotFoundPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        That address doesn&apos;t match any page in Student Atlas.
      </p>
      <Link to={DASHBOARD_ROUTE.path} className="text-primary underline hover:text-primary/80">
        Go to {DASHBOARD_ROUTE.label}
      </Link>
    </div>
  );
}
