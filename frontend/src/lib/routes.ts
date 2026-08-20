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

export const MONITORING_LOG_ROUTE = {
  label: "Monitoring log",
  path: "/technical-explainer/monitoring",
} as const;

export const TECHNICAL_NAV_SECTION = {
  title: "Technical",
  url: TECHNICAL_EXPLAINER_ROUTE.path,
  items: [
    { title: TECHNICAL_EXPLAINER_ROUTE.label, url: TECHNICAL_EXPLAINER_ROUTE.path },
    { title: MONITORING_LOG_ROUTE.label, url: MONITORING_LOG_ROUTE.path },
  ],
} as const;
