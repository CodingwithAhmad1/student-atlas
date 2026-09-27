import {
  ACTIVITY_ROUTE,
  DASHBOARD_ROUTE,
  TECHNICAL_NAV_SECTION,
} from "@/lib/routes";
import { sections } from "@/data/sections";

export interface NavPageLink {
  title: string;
  url: string;
}

export interface NavSection {
  title: string;
  url: string;
  items: NavPageLink[];
}

/** Main nav: dashboard, activity, then every guide section (from the content registry). */
export const MAIN_NAV_SECTIONS: NavSection[] = [
  {
    title: DASHBOARD_ROUTE.label,
    url: DASHBOARD_ROUTE.path,
    items: [],
  },
  {
    title: ACTIVITY_ROUTE.label,
    url: ACTIVITY_ROUTE.path,
    items: [],
  },
  ...sections.map((section) => ({
    title: section.title,
    url: `/${section.slug}`,
    items: section.subSections.map((sub) => ({
      title: sub.title,
      url: `/${section.slug}/${sub.slug}`,
    })),
  })),
];

/** Items below `SidebarSeparator` in the app sidebar. */
export const NAV_REFERENCE_LINKS: NavPageLink[] = [
  { title: "Generate report", url: "/report" },
  { title: "Citations", url: "/citations" },
];

export const NAV_REFERENCE_GROUP_TITLE = "Reference";

/** Collapsible Technical section (explainer + source health). */
export { TECHNICAL_NAV_SECTION };

/** PascalCase from nav title segments (spaces and hyphens) — no `#` prefix. */
export function titleToHashLabel(title: string): string {
  return title
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");
}
