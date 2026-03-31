import type { NationalityMeta } from "../types";

export const nationalityRegistry: NationalityMeta[] = [
  {
    name: "United Arab Emirates",
    slug: "uae",
    load: () => import("./uae"),
  },
  {
    name: "Pakistan",
    slug: "pakistan",
    load: () => import("./pakistan"),
  },
  {
    name: "India",
    slug: "india",
    load: () => import("./india"),
  },
  {
    name: "China",
    slug: "china",
    load: () => import("./china"),
  },
  {
    name: "United Kingdom",
    slug: "uk",
    load: () => import("./uk"),
  },
];
