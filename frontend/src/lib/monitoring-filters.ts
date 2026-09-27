import type { SourceCategory, SourceCountry } from "@/types/monitoring";

export const COUNTRY_FILTERS: (SourceCountry | "all")[] = ["all", "US", "UK", "AU", "INTL"];

export const CATEGORY_FILTERS: (SourceCategory | "all")[] = [
  "all",
  "visitor",
  "student",
  "work",
  "residency",
  "citizenship",
  "general",
];
