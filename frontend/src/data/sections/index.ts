import type { Section } from "../types";
import { touristVisa } from "./tourist-visa";
import { studentVisa } from "./student-visa";
import { workVisa } from "./work-visa";
import { residencyPathway } from "./residency-pathway";

export const sections: Section[] = [
  touristVisa,
  studentVisa,
  workVisa,
  residencyPathway,
];

export const sectionRegistry = new Map<string, Section>(
  sections.map((s) => [s.slug, s])
);
