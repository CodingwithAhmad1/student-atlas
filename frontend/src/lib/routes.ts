/** Central place for named routes — update label/path here to rename everywhere. */
export const DASHBOARD_ROUTE = {
  label: "Dashboard",
  path: "/dashboard",
} as const;

export const ACTIVITY_ROUTE = {
  label: "Activity",
  path: "/activity",
} as const;

export const TECHNICAL_EXPLAINER_ROUTE = {
  label: "Technical Explainer",
  path: "/technical-explainer",
} as const;

/** Source-health view of the Activity page (formerly the monitoring log). */
export const SOURCE_HEALTH_ROUTE = {
  label: "Source health",
  path: "/activity?view=sources",
} as const;

/** Old monitoring-log URL; redirects to SOURCE_HEALTH_ROUTE. */
export const LEGACY_MONITORING_LOG_PATH = "/technical-explainer/monitoring";

export const TECHNICAL_NAV_SECTION = {
  title: "Technical",
  url: TECHNICAL_EXPLAINER_ROUTE.path,
  items: [
    { title: TECHNICAL_EXPLAINER_ROUTE.label, url: TECHNICAL_EXPLAINER_ROUTE.path },
    { title: SOURCE_HEALTH_ROUTE.label, url: SOURCE_HEALTH_ROUTE.path },
  ],
} as const;
