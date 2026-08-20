import {
  ACTIVITY_ROUTE,
  DASHBOARD_ROUTE,
  TECHNICAL_NAV_SECTION,
} from "@/lib/routes";

export interface NavPageLink {
  title: string;
  url: string;
}

export interface NavSection {
  title: string;
  url: string;
  items: NavPageLink[];
}

/** Main guide sections — same routes and hierarchy as `NavMain`. */
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
  {
    title: "Tourist visa",
    url: "/visit",
    items: [
      { title: "Entry requirement", url: "/visit/entry-requirement" },
      { title: "How to apply", url: "/visit/how-to-apply" },
    ],
  },
  {
    title: "Student visa",
    url: "/student",
    items: [
      { title: "Overview", url: "/student/overview" },
      { title: "Documents", url: "/student/documents" },
      { title: "Application process", url: "/student/application-process" },
      { title: "After arrival", url: "/student/after-arrival" },
    ],
  },
  {
    title: "Work visa",
    url: "/work",
    items: [
      { title: "Post-study work", url: "/work/post-study-work" },
      { title: "Getting sponsored", url: "/work/getting-sponsored" },
    ],
  },
  {
    title: "Residency pathway",
    url: "/residency",
    items: [
      { title: "Permanent residency", url: "/residency/permanent-residency" },
      { title: "Citizenship", url: "/residency/citizenship" },
      { title: "Dual nationality", url: "/residency/dual-nationality" },
    ],
  },
];

/** Items below `SidebarSeparator` in the app sidebar. */
export const NAV_REFERENCE_LINKS: NavPageLink[] = [
  { title: "Generate report", url: "/report" },
  { title: "Citations", url: "/citations" },
];

export const NAV_REFERENCE_GROUP_TITLE = "Reference";

/** Collapsible Technical section (explainer + monitoring log). */
export { TECHNICAL_NAV_SECTION };

/** PascalCase from nav title segments (spaces and hyphens) — no `#` prefix. */
export function titleToHashLabel(title: string): string {
  return title
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");
}
