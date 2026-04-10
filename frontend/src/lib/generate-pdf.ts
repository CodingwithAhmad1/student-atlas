import jsPDF from "jspdf";
import type { Country } from "@/data/types";
import { COUNTRY_LABELS } from "@/data/types";

// ── Brand constants ────────────────────────────────────────────
const NAVY = [27, 45, 79] as const; // #1B2D4F
const GOLD = [200, 150, 62] as const; // #C8963E
const GOLD_LIGHT = [212, 168, 83] as const; // #D4A853
const WHITE = [255, 255, 255] as const;
const WARM_BG = [252, 250, 245] as const; // cream tint
const TEXT_DARK = [33, 37, 41] as const;
const TEXT_MUTED = [108, 117, 125] as const;
const RED = [192, 57, 43] as const; // compass red

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 25;
const CONTENT_W = PAGE_W - MARGIN * 2;

type RGB = readonly [number, number, number];

const SECTION_META: Record<
  string,
  { title: string; icon: string; description: string; subsections: string[] }
> = {
  visit: {
    title: "Tourist Visa",
    icon: "✈",
    description:
      "Entry requirements, visa-free access, and short-stay application processes for your selected destinations.",
    subsections: ["Entry requirement", "How to apply"],
  },
  student: {
    title: "Student Visa",
    icon: "🎓",
    description:
      "Everything you need to know about applying for a student visa, from document preparation to post-arrival obligations.",
    subsections: [
      "Overview",
      "Documents",
      "Application process",
      "After arrival",
    ],
  },
  work: {
    title: "Work Visa",
    icon: "💼",
    description:
      "Post-study work rights, employer sponsorship pathways, and practical guidance for transitioning into the workforce.",
    subsections: ["Post-study work", "Getting sponsored"],
  },
  residency: {
    title: "Residency Pathway",
    icon: "🏠",
    description:
      "Long-term settlement options including permanent residency, citizenship, and dual nationality considerations.",
    subsections: ["Permanent residency", "Citizenship", "Dual nationality"],
  },
};

function setFont(
  doc: jsPDF,
  style: "normal" | "bold" | "italic",
  size: number,
  color: RGB = TEXT_DARK
) {
  doc.setFont("helvetica", style);
  doc.setFontSize(size);
  doc.setTextColor(...color);
}

function drawLine(
  doc: jsPDF,
  x1: number,
  y: number,
  x2: number,
  color: RGB = GOLD,
  width = 0.5
) {
  doc.setDrawColor(...color);
  doc.setLineWidth(width);
  doc.line(x1, y, x2, y);
}

function addPageFooter(doc: jsPDF, pageNum: number, totalPlaceholder = true) {
  const y = PAGE_H - 12;
  // Gold line
  drawLine(doc, MARGIN, y - 4, PAGE_W - MARGIN, GOLD, 0.3);
  setFont(doc, "normal", 7.5, TEXT_MUTED);
  doc.text("Student Atlas", MARGIN, y);
  if (totalPlaceholder) {
    doc.text(`${pageNum}`, PAGE_W - MARGIN, y, { align: "right" });
  }
}

// ── Compass rose SVG drawn as PDF lines ─────────────────────────
function drawCompassRose(doc: jsPDF, cx: number, cy: number, size: number) {
  const s = size;

  // Outer circle
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.8);
  doc.circle(cx, cy, s, "S");

  // Inner circle
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.circle(cx, cy, s * 0.15, "S");

  // Cardinal directions — filled triangles
  const cardinals = [0, 90, 180, 270];
  for (const angle of cardinals) {
    const rad = (angle * Math.PI) / 180;
    const tipX = cx + s * 0.75 * Math.sin(rad);
    const tipY = cy - s * 0.75 * Math.cos(rad);
    const perpRad1 = ((angle - 90) * Math.PI) / 180;
    const perpRad2 = ((angle + 90) * Math.PI) / 180;
    const baseOff = s * 0.08;

    // Right half (darker)
    const color = angle === 0 ? RED : NAVY;
    doc.setFillColor(...color);
    doc.triangle(
      tipX,
      tipY,
      cx + baseOff * Math.sin(perpRad2),
      cy - baseOff * Math.cos(perpRad2),
      cx,
      cy,
      "F"
    );

    // Left half (lighter)
    const lightColor: RGB = angle === 0 ? [231, 76, 60] : [27, 45, 79];
    doc.setFillColor(...lightColor);
    doc.setGlobalAlpha?.(0.6);
    doc.triangle(
      tipX,
      tipY,
      cx + baseOff * Math.sin(perpRad1),
      cy - baseOff * Math.cos(perpRad1),
      cx,
      cy,
      "F"
    );
    doc.setGlobalAlpha?.(1);
  }

  // Intercardinal — gold smaller
  const intercardinals = [45, 135, 225, 315];
  for (const angle of intercardinals) {
    const rad = (angle * Math.PI) / 180;
    const tipX = cx + s * 0.45 * Math.sin(rad);
    const tipY = cy - s * 0.45 * Math.cos(rad);
    const perpRad1 = ((angle - 90) * Math.PI) / 180;
    const perpRad2 = ((angle + 90) * Math.PI) / 180;
    const baseOff = s * 0.04;

    doc.setFillColor(...GOLD);
    doc.triangle(
      tipX,
      tipY,
      cx + baseOff * Math.sin(perpRad2),
      cy - baseOff * Math.cos(perpRad2),
      cx,
      cy,
      "F"
    );
    doc.setFillColor(...GOLD_LIGHT);
    doc.triangle(
      tipX,
      tipY,
      cx + baseOff * Math.sin(perpRad1),
      cy - baseOff * Math.cos(perpRad1),
      cx,
      cy,
      "F"
    );
  }

  // Center dot
  doc.setFillColor(...GOLD);
  doc.circle(cx, cy, s * 0.04, "F");

  // Cardinal letters
  setFont(doc, "bold", s * 0.28, NAVY);
  const letterOffset = s * 0.9;
  doc.text("N", cx, cy - letterOffset, { align: "center" });
  doc.text("S", cx, cy + letterOffset + s * 0.08, { align: "center" });
  setFont(doc, "bold", s * 0.22, TEXT_MUTED);
  doc.text("E", cx + letterOffset, cy + s * 0.07, { align: "center" });
  doc.text("W", cx - letterOffset, cy + s * 0.07, { align: "center" });
}

// ═══════════════════════════════════════════════════════════════
// COVER PAGE
// ═══════════════════════════════════════════════════════════════
function renderCoverPage(
  doc: jsPDF,
  nationality: string,
  destinations: Country[]
) {
  // Full-page navy background
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");

  // Decorative gold border inset
  const inset = 8;
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.6);
  doc.rect(inset, inset, PAGE_W - inset * 2, PAGE_H - inset * 2);

  // Inner decorative line
  const inset2 = 11;
  doc.setLineWidth(0.2);
  doc.rect(inset2, inset2, PAGE_W - inset2 * 2, PAGE_H - inset2 * 2);

  // Compass rose — centred, upper third
  drawCompassRose(doc, PAGE_W / 2, 95, 35);

  // Title
  setFont(doc, "bold", 36, WHITE);
  doc.text("Student Atlas", PAGE_W / 2, 155, { align: "center" });

  // Gold divider line
  drawLine(doc, 65, 163, PAGE_W - 65, GOLD, 0.8);

  // Subtitle
  setFont(doc, "normal", 13, GOLD_LIGHT);
  doc.text(
    "Your personalised guide to studying abroad",
    PAGE_W / 2,
    174,
    { align: "center" }
  );

  // Nationality + Destinations box
  const boxY = 195;
  const boxH = 42;
  doc.setFillColor(255, 255, 255);
  doc.setGlobalAlpha?.(0.08);
  doc.roundedRect(MARGIN + 10, boxY, CONTENT_W - 20, boxH, 3, 3, "F");
  doc.setGlobalAlpha?.(1);

  // Labels
  setFont(doc, "normal", 9, GOLD);
  doc.text("NATIONALITY", PAGE_W / 2, boxY + 10, { align: "center" });
  setFont(doc, "bold", 14, WHITE);
  doc.text(nationality, PAGE_W / 2, boxY + 20, { align: "center" });

  setFont(doc, "normal", 9, GOLD);
  doc.text("DESTINATIONS", PAGE_W / 2, boxY + 29, { align: "center" });
  setFont(doc, "bold", 14, WHITE);
  const destStr = destinations.map((c) => COUNTRY_LABELS[c]).join("   •   ");
  doc.text(destStr, PAGE_W / 2, boxY + 39, { align: "center" });

  // Bottom: date + branding
  setFont(doc, "normal", 9, GOLD);
  const dateStr = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  doc.text(dateStr, PAGE_W / 2, PAGE_H - 30, { align: "center" });

  setFont(doc, "italic", 8, [...GOLD_LIGHT] as unknown as RGB);
  doc.text(
    "Generated by Student Atlas — studentatlas.app",
    PAGE_W / 2,
    PAGE_H - 22,
    { align: "center" }
  );
}

// ═══════════════════════════════════════════════════════════════
// TABLE OF CONTENTS
// ═══════════════════════════════════════════════════════════════
function renderTableOfContents(
  doc: jsPDF,
  sections: string[],
  pageMap: Map<string, number>
) {
  doc.addPage();
  const pageNum = doc.getNumberOfPages();

  // Page background
  doc.setFillColor(...WARM_BG);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");

  let y = 40;

  // Title
  setFont(doc, "bold", 22, NAVY);
  doc.text("Table of Contents", MARGIN, y);
  y += 4;
  drawLine(doc, MARGIN, y, MARGIN + 60, GOLD, 0.8);
  y += 16;

  // Section: Introduction
  setFont(doc, "normal", 11, TEXT_DARK);
  doc.text("Introduction", MARGIN + 4, y);
  setFont(doc, "normal", 11, TEXT_MUTED);
  const introPage = pageMap.get("introduction") ?? 3;
  // Dotted leader
  const dotsWidth = CONTENT_W - 30;
  const textWidth = doc.getTextWidth("Introduction");
  const pageNumStr = String(introPage);
  const pageNumWidth = doc.getTextWidth(pageNumStr);
  const dotsStart = MARGIN + 4 + textWidth + 3;
  const dotsEnd = PAGE_W - MARGIN - pageNumWidth - 3;
  let dotX = dotsStart;
  while (dotX < dotsEnd) {
    doc.text(".", dotX, y);
    dotX += 2.5;
  }
  doc.text(pageNumStr, PAGE_W - MARGIN, y, { align: "right" });
  y += 14;

  // Content sections
  for (const slug of sections) {
    const meta = SECTION_META[slug];
    if (!meta) continue;

    // Section title with icon
    setFont(doc, "bold", 13, NAVY);
    doc.text(`${meta.icon}  ${meta.title}`, MARGIN + 4, y);

    // Page number
    const secPage = pageMap.get(slug) ?? "—";
    setFont(doc, "normal", 11, TEXT_MUTED);
    const titleWidth = doc.getTextWidth(`${meta.icon}  ${meta.title}`);
    const secPageStr = String(secPage);
    const secPageNumWidth = doc.getTextWidth(secPageStr);
    let secDotX = MARGIN + 4 + titleWidth + 3;
    const secDotEnd = PAGE_W - MARGIN - secPageNumWidth - 3;
    setFont(doc, "normal", 11, TEXT_MUTED);
    while (secDotX < secDotEnd) {
      doc.text(".", secDotX, y);
      secDotX += 2.5;
    }
    doc.text(secPageStr, PAGE_W - MARGIN, y, { align: "right" });

    y += 8;

    // Subsections
    for (const sub of meta.subsections) {
      setFont(doc, "normal", 10, TEXT_MUTED);
      doc.text(`—  ${sub}`, MARGIN + 12, y);
      y += 6;
    }

    y += 8;
  }

  addPageFooter(doc, pageNum);
}

// ═══════════════════════════════════════════════════════════════
// INTRODUCTION PAGE
// ═══════════════════════════════════════════════════════════════
function renderIntroduction(
  doc: jsPDF,
  nationality: string,
  destinations: Country[],
  sections: string[]
) {
  doc.addPage();
  const pageNum = doc.getNumberOfPages();

  let y = 40;

  // Section header
  setFont(doc, "bold", 22, NAVY);
  doc.text("Introduction", MARGIN, y);
  y += 4;
  drawLine(doc, MARGIN, y, MARGIN + 50, GOLD, 0.8);
  y += 14;

  // Body text
  const destNames = destinations.map((c) => COUNTRY_LABELS[c]);
  const destStr =
    destNames.length === 1
      ? destNames[0]
      : destNames.slice(0, -1).join(", ") + " and " + destNames[destNames.length - 1];

  const sectionNames = sections
    .map((s) => SECTION_META[s]?.title)
    .filter(Boolean);
  const sectionStr =
    sectionNames.length === 1
      ? sectionNames[0]
      : sectionNames.slice(0, -1).join(", ") +
        " and " +
        sectionNames[sectionNames.length - 1];

  const introText = `This report has been prepared for ${nationality} nationals considering ${destStr} as study destinations. It covers ${sectionStr}, providing a structured comparison across your selected countries.`;

  setFont(doc, "normal", 11, TEXT_DARK);
  const introLines = doc.splitTextToSize(introText, CONTENT_W);
  doc.text(introLines, MARGIN, y);
  y += introLines.length * 6 + 8;

  const scopeText = `Each section is tailored to your nationality where applicable, highlighting specific requirements, exemptions, or considerations that may affect your immigration journey. The information is drawn from official government sources and is intended as a reference guide — not legal advice.`;
  const scopeLines = doc.splitTextToSize(scopeText, CONTENT_W);
  doc.text(scopeLines, MARGIN, y);
  y += scopeLines.length * 6 + 14;

  // Included sections summary
  setFont(doc, "bold", 13, NAVY);
  doc.text("Sections included in this report", MARGIN, y);
  y += 10;

  for (const slug of sections) {
    const meta = SECTION_META[slug];
    if (!meta) continue;

    // Gold bullet
    doc.setFillColor(...GOLD);
    doc.circle(MARGIN + 3, y - 1.5, 1.5, "F");

    setFont(doc, "bold", 11, NAVY);
    doc.text(meta.title, MARGIN + 9, y);
    y += 6;

    setFont(doc, "normal", 9.5, TEXT_MUTED);
    const descLines = doc.splitTextToSize(meta.description, CONTENT_W - 12);
    doc.text(descLines, MARGIN + 9, y);
    y += descLines.length * 5 + 8;
  }

  addPageFooter(doc, pageNum);
}

// ═══════════════════════════════════════════════════════════════
// CONTENT SECTION PAGES (mock)
// ═══════════════════════════════════════════════════════════════
function renderContentSection(
  doc: jsPDF,
  slug: string,
  destinations: Country[],
  nationality: string
): number {
  const meta = SECTION_META[slug];
  if (!meta) return doc.getNumberOfPages();

  doc.addPage();
  const startPage = doc.getNumberOfPages();

  // Section divider page
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");

  // Gold accent lines
  drawLine(doc, MARGIN, 80, PAGE_W - MARGIN, GOLD, 0.6);
  drawLine(doc, MARGIN, 83, PAGE_W - MARGIN, GOLD, 0.2);

  // Section title
  setFont(doc, "bold", 32, WHITE);
  doc.text(meta.title, PAGE_W / 2, 110, { align: "center" });

  // Description
  setFont(doc, "normal", 12, GOLD_LIGHT);
  const descLines = doc.splitTextToSize(meta.description, CONTENT_W - 20);
  doc.text(descLines, PAGE_W / 2, 125, { align: "center" });

  // Subsections list
  let y = 155;
  for (const sub of meta.subsections) {
    setFont(doc, "normal", 11, WHITE);
    doc.text(`•   ${sub}`, PAGE_W / 2 - 30, y);
    y += 9;
  }

  drawLine(doc, MARGIN, PAGE_H - 60, PAGE_W - MARGIN, GOLD, 0.6);
  drawLine(doc, MARGIN, PAGE_H - 57, PAGE_W - MARGIN, GOLD, 0.2);

  // Now render each subsection
  for (let i = 0; i < meta.subsections.length; i++) {
    const subTitle = meta.subsections[i];

    doc.addPage();
    const subPageNum = doc.getNumberOfPages();
    let sy = 35;

    // Section breadcrumb
    setFont(doc, "normal", 8.5, GOLD);
    doc.text(`${meta.title}  ›  ${subTitle}`, MARGIN, sy);
    sy += 10;

    // Subsection heading
    setFont(doc, "bold", 18, NAVY);
    doc.text(subTitle, MARGIN, sy);
    sy += 4;
    drawLine(doc, MARGIN, sy, MARGIN + 40, GOLD, 0.6);
    sy += 12;

    // Country columns
    if (destinations.length === 1) {
      // Single country — full width
      sy = renderMockCountryContent(
        doc,
        destinations[0],
        MARGIN,
        sy,
        CONTENT_W,
        slug,
        subTitle,
        nationality
      );
    } else {
      // Multi-country comparison layout
      const colW = (CONTENT_W - (destinations.length - 1) * 6) / destinations.length;
      for (let ci = 0; ci < destinations.length; ci++) {
        const cx = MARGIN + ci * (colW + 6);
        renderMockCountryContent(
          doc,
          destinations[ci],
          cx,
          sy,
          colW,
          slug,
          subTitle,
          nationality
        );
      }
    }

    addPageFooter(doc, subPageNum);
  }

  return startPage;
}

function renderMockCountryContent(
  doc: jsPDF,
  country: Country,
  x: number,
  y: number,
  width: number,
  _sectionSlug: string,
  _subTitle: string,
  _nationality: string
): number {
  const countryName = COUNTRY_LABELS[country];
  const flagEmoji: Record<Country, string> = {
    US: "🇺🇸",
    UK: "🇬🇧",
    AU: "🇦🇺",
  };

  // Country header
  doc.setFillColor(...NAVY);
  doc.roundedRect(x, y, width, 10, 2, 2, "F");
  setFont(doc, "bold", 10, WHITE);
  doc.text(`${flagEmoji[country]}  ${countryName}`, x + 4, y + 7);
  y += 16;

  // Mock key-value list
  const mockKV = [
    ["Visa type", "Standard visa pathway"],
    ["Processing time", "3–8 weeks"],
    ["Application fee", "Varies by category"],
  ];
  for (const [label, value] of mockKV) {
    setFont(doc, "bold", 8.5, NAVY);
    doc.text(label, x + 2, y);
    setFont(doc, "normal", 8.5, TEXT_DARK);
    doc.text(value, x + 2 + Math.min(width * 0.38, 40), y);
    y += 6;
  }
  y += 4;

  // Mock paragraph
  drawLine(doc, x, y - 2, x + width, [230, 228, 222] as unknown as RGB, 0.3);
  y += 4;

  setFont(doc, "normal", 9, TEXT_DARK);
  const mockParagraph = `This section will contain detailed information about the ${countryName} visa pathway, including specific requirements, timelines, and procedures relevant to your application. Content is personalised based on your nationality and selected destinations.`;
  const lines = doc.splitTextToSize(mockParagraph, width - 4);
  doc.text(lines, x + 2, y);
  y += lines.length * 4.5 + 6;

  // Mock bullet list
  setFont(doc, "bold", 9, NAVY);
  doc.text("Key requirements:", x + 2, y);
  y += 6;

  const bullets = [
    "Valid passport with minimum 6 months validity",
    "Proof of financial support for duration of stay",
    "Acceptance letter from recognised institution",
    "Health insurance or medical examination",
  ];
  for (const bullet of bullets) {
    setFont(doc, "normal", 8.5, TEXT_DARK);
    doc.setFillColor(...GOLD);
    doc.circle(x + 4.5, y - 1.2, 0.8, "F");
    const bulletLines = doc.splitTextToSize(bullet, width - 10);
    doc.text(bulletLines, x + 8, y);
    y += bulletLines.length * 4.5 + 2;
  }

  y += 4;

  // Nationality callout box (mock)
  doc.setFillColor(255, 248, 230); // light amber
  doc.roundedRect(x, y, width, 22, 2, 2, "F");
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4);
  doc.roundedRect(x, y, width, 22, 2, 2, "S");

  setFont(doc, "bold", 8, GOLD);
  doc.text("⚠  Nationality-specific note", x + 4, y + 6);
  setFont(doc, "italic", 8, TEXT_MUTED);
  const calloutText = `Additional requirements or exemptions may apply based on your nationality. This callout will display personalised information.`;
  const calloutLines = doc.splitTextToSize(calloutText, width - 8);
  doc.text(calloutLines, x + 4, y + 12);

  y += 30;

  return y;
}

// ═══════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════
export interface ReportOptions {
  nationality: string;
  destinations: Country[];
  sections: string[]; // slugs: "visit", "student", "work", "residency"
}

export function generateReport(options: ReportOptions) {
  const { nationality, destinations, sections } = options;

  const doc = new jsPDF({ unit: "mm", format: "a4" });

  // 1. Cover page
  renderCoverPage(doc, nationality, destinations);

  // Pre-calculate page numbers for TOC
  // Cover=1, TOC=2, Intro=3, then sections
  const pageMap = new Map<string, number>();
  pageMap.set("introduction", 3);
  // Each section: 1 divider + N subsection pages
  let currentPage = 4;
  for (const slug of sections) {
    const meta = SECTION_META[slug];
    if (!meta) continue;
    pageMap.set(slug, currentPage);
    currentPage += 1 + meta.subsections.length; // divider + subsection pages
  }

  // 2. Table of Contents
  renderTableOfContents(doc, sections, pageMap);

  // 3. Introduction
  renderIntroduction(doc, nationality, destinations, sections);

  // 4. Content sections
  for (const slug of sections) {
    renderContentSection(doc, slug, destinations, nationality);
  }

  // Save
  const destStr = destinations.join("-");
  const filename = `Student-Atlas-Report_${destStr}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
