import type { NationalityMeta } from "../types";

export const nationalityRegistry: NationalityMeta[] = [
  {
    name: "United Arab Emirates",
    slug: "uae",
    label: "UAE",
    load: () => import("./uae"),
  },
  {
    name: "Pakistan",
    slug: "pakistan",
    label: "Pakistani",
    load: () => import("./pakistan"),
  },
  {
    name: "India",
    slug: "india",
    label: "Indian",
    load: () => import("./india"),
  },
  {
    name: "China",
    slug: "china",
    label: "Chinese",
    load: () => import("./china"),
  },
  {
    name: "United Kingdom",
    slug: "uk",
    label: "British",
    load: () => import("./uk"),
  },
  {
    name: "United States",
    slug: "us",
    label: "American",
    load: () => import("./us"),
  },
  {
    name: "Australia",
    slug: "au",
    label: "Australian",
    load: () => import("./au"),
  },
];
