import jsPDF from "jspdf";
import type { Country, ContentBlock, ResolvedBlock, NationalityOverlay } from "@/data/types";
import { COUNTRY_LABELS } from "@/data/types";
import { sectionRegistry } from "@/data/sections";
import { mergeBlocks, mergeCrossCutting, splitCallouts } from "@/data/merge-content";
import { nationalityRegistry } from "@/data/nationalities/registry";
import { stripMarkup } from "@/lib/inline-markup";

// ── Brand constants ────────────────────────────────────────────
const NAVY = [27, 45, 79] as const;
const GOLD = [200, 150, 62] as const;
const GOLD_LIGHT = [212, 168, 83] as const;
const WHITE = [255, 255, 255] as const;
const WARM_BG = [252, 250, 245] as const;
const TEXT_DARK = [33, 37, 41] as const;
const TEXT_MUTED = [108, 117, 125] as const;
const RED = [192, 57, 43] as const;
const CALLOUT_BG = [255, 248, 230] as const;
const CALLOUT_BORDER = GOLD;

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 25;
const CONTENT_W = PAGE_W - MARGIN * 2;
const FOOTER_Y = PAGE_H - 12;
const USABLE_BOTTOM = FOOTER_Y - 8; // leave room above footer

type RGB = readonly [number, number, number];

/**
 * jsPDF's built-in fonts only cover WinAnsi (Latin-1 plus typographic
 * punctuation). Map common symbols to ASCII and drop anything else (emoji)
 * rather than printing garbage.
 */
const WINANSI_EXTRAS = new Set("€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ");
const SYMBOL_FALLBACKS: Record<string, string> = {
  "→": "->", "←": "<-", "↔": "<->", "≈": "~", "≤": "<=", "≥": ">=", "≠": "!=",
  "✓": "Yes", "✔": "Yes", "✗": "No", "✘": "No", "−": "-", "‑": "-",
};

function pdfText(text: string): string {
  let out = "";
  for (const ch of stripMarkup(text)) {
    const code = ch.codePointAt(0) ?? 0;
    if (code < 256 || WINANSI_EXTRAS.has(ch)) out += ch;
    else out += SYMBOL_FALLBACKS[ch] ?? "";
  }
  return out.replace(/ {2,}/g, " ");
}

const SECTION_META: Record<
  string,
  { title: string; description: string }
> = {
  visit: {
    title: "Tourist Visa",
    description:
      "Entry requirements, visa-free access, and short-stay application processes for your selected destinations.",
  },
  student: {
    title: "Student Visa",
    description:
      "Everything you need to know about applying for a student visa, from document preparation to post-arrival obligations.",
  },
  work: {
    title: "Work Visa",
    description:
      "Post-study work rights, employer sponsorship pathways, and practical guidance for transitioning into the workforce.",
  },
  residency: {
    title: "Residency Pathway",
    description:
      "Long-term settlement options including permanent residency, citizenship, and dual nationality considerations.",
  },
};

// ── Helpers ────────────────────────────────────────────────────

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

function addPageFooter(doc: jsPDF, pageNum: number) {
  const y = FOOTER_Y;
  drawLine(doc, MARGIN, y - 4, PAGE_W - MARGIN, GOLD, 0.3);
  setFont(doc, "normal", 7.5, TEXT_MUTED);
  doc.text("Student Atlas", MARGIN, y);
  doc.text(`${pageNum}`, PAGE_W - MARGIN, y, { align: "right" });
}

/** Ensure enough vertical room; if not, add a new page and return the reset Y. */
function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  if (y + needed > USABLE_BOTTOM) {
    addPageFooter(doc, doc.getNumberOfPages());
    doc.addPage();
    return 35;
  }
  return y;
}

// ── Compass rose ───────────────────────────────────────────────
function drawCompassRose(doc: jsPDF, cx: number, cy: number, size: number) {
  const s = size;
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.8);
  doc.circle(cx, cy, s, "S");

  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.circle(cx, cy, s * 0.15, "S");

  const cardinals = [0, 90, 180, 270];
  for (const angle of cardinals) {
    const rad = (angle * Math.PI) / 180;
    const tipX = cx + s * 0.75 * Math.sin(rad);
    const tipY = cy - s * 0.75 * Math.cos(rad);
    const perpRad1 = ((angle - 90) * Math.PI) / 180;
    const perpRad2 = ((angle + 90) * Math.PI) / 180;
    const baseOff = s * 0.08;

    const color: RGB = angle === 0 ? RED : NAVY;
    doc.setFillColor(color[0], color[1], color[2]);
    doc.triangle(
      tipX, tipY,
      cx + baseOff * Math.sin(perpRad2), cy - baseOff * Math.cos(perpRad2),
      cx, cy, "F"
    );

    const lightColor: RGB = angle === 0 ? [231, 76, 60] : [27, 45, 79];
    doc.setFillColor(lightColor[0], lightColor[1], lightColor[2]);
    const gState = doc as jsPDF & { setGlobalAlpha?: (a: number) => void };
    gState.setGlobalAlpha?.(0.6);
    doc.triangle(
      tipX, tipY,
      cx + baseOff * Math.sin(perpRad1), cy - baseOff * Math.cos(perpRad1),
      cx, cy, "F"
    );
    gState.setGlobalAlpha?.(1);
  }

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
      tipX, tipY,
      cx + baseOff * Math.sin(perpRad2), cy - baseOff * Math.cos(perpRad2),
      cx, cy, "F"
    );
    doc.setFillColor(...GOLD_LIGHT);
    doc.triangle(
      tipX, tipY,
      cx + baseOff * Math.sin(perpRad1), cy - baseOff * Math.cos(perpRad1),
      cx, cy, "F"
    );
  }

  doc.setFillColor(...GOLD);
  doc.circle(cx, cy, s * 0.04, "F");

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
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");

  const inset = 8;
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.6);
  doc.rect(inset, inset, PAGE_W - inset * 2, PAGE_H - inset * 2);
  const inset2 = 11;
  doc.setLineWidth(0.2);
  doc.rect(inset2, inset2, PAGE_W - inset2 * 2, PAGE_H - inset2 * 2);

  drawCompassRose(doc, PAGE_W / 2, 95, 35);

  setFont(doc, "bold", 36, WHITE);
  doc.text("Student Atlas", PAGE_W / 2, 155, { align: "center" });

  drawLine(doc, 65, 163, PAGE_W - 65, GOLD, 0.8);

  setFont(doc, "normal", 13, GOLD_LIGHT);
  doc.text("Your personalised guide to studying abroad", PAGE_W / 2, 174, {
    align: "center",
  });

  const boxY = 195;
  const boxH = 42;
  doc.setFillColor(255, 255, 255);
  const coverGState = doc as jsPDF & { setGlobalAlpha?: (a: number) => void };
  coverGState.setGlobalAlpha?.(0.08);
  doc.roundedRect(MARGIN + 10, boxY, CONTENT_W - 20, boxH, 3, 3, "F");
  coverGState.setGlobalAlpha?.(1);

  setFont(doc, "normal", 9, GOLD);
  doc.text("NATIONALITY", PAGE_W / 2, boxY + 10, { align: "center" });
  setFont(doc, "bold", 14, WHITE);
  doc.text(nationality, PAGE_W / 2, boxY + 20, { align: "center" });

  setFont(doc, "normal", 9, GOLD);
  doc.text("DESTINATIONS", PAGE_W / 2, boxY + 29, { align: "center" });
  setFont(doc, "bold", 14, WHITE);
  const destStr = destinations.map((c) => COUNTRY_LABELS[c]).join("   •   ");
  doc.text(destStr, PAGE_W / 2, boxY + 39, { align: "center" });

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
// TABLE OF CONTENTS  (page numbers filled in second pass)
// ═══════════════════════════════════════════════════════════════
interface TocEntry {
  label: string;
  level: 0 | 1; // 0 = section, 1 = subsection
  pageRef: string; // key into pageMap
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
  let y = 40;

  setFont(doc, "bold", 22, NAVY);
  doc.text("Introduction", MARGIN, y);
  y += 4;
  drawLine(doc, MARGIN, y, MARGIN + 50, GOLD, 0.8);
  y += 14;

  const destNames = destinations.map((c) => COUNTRY_LABELS[c]);
  const destStr =
    destNames.length === 1
      ? destNames[0]
      : destNames.slice(0, -1).join(", ") +
        " and " +
        destNames[destNames.length - 1];

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

  setFont(doc, "bold", 13, NAVY);
  doc.text("Sections included in this report", MARGIN, y);
  y += 10;

  for (const slug of sections) {
    const meta = SECTION_META[slug];
    if (!meta) continue;

    y = ensureSpace(doc, y, 20);

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

  addPageFooter(doc, doc.getNumberOfPages());
}

// ═══════════════════════════════════════════════════════════════
// CONTENT BLOCK → PDF RENDERER
// ═══════════════════════════════════════════════════════════════

const LINE_HEIGHT = 5; // mm per line at size 9.5

/** Render a single ContentBlock at the given y position, returning the new y. */
function renderContentBlock(
  doc: jsPDF,
  block: ContentBlock,
  y: number,
  width: number,
  x: number = MARGIN
): number {
  switch (block.type) {
    case "heading": {
      const sizes = { 2: 16, 3: 13, 4: 11 } as const;
      const fontSize = sizes[block.level];
      y = ensureSpace(doc, y, 12);
      setFont(doc, "bold", fontSize, NAVY);
      const lines = doc.splitTextToSize(pdfText(block.text), width);
      doc.text(lines, x, y);
      y += lines.length * (fontSize * 0.45) + 4;
      break;
    }

    case "paragraph": {
      setFont(doc, "normal", 9.5, TEXT_DARK);
      const lines = doc.splitTextToSize(pdfText(block.text), width);
      // Render line-by-line with page breaks
      for (const line of lines) {
        y = ensureSpace(doc, y, LINE_HEIGHT);
        doc.text(line, x, y);
        y += LINE_HEIGHT;
      }
      y += 2;
      break;
    }

    case "key-value-list": {
      const kvLabelWidth = Math.min(width * 0.4, 55);
      for (const item of block.items) {
        // Measure value height to ensure enough space
        setFont(doc, "normal", 9, TEXT_DARK);
        const valueLines = doc.splitTextToSize(pdfText(item.value), width - kvLabelWidth - 4);
        const neededHeight = Math.max(valueLines.length * LINE_HEIGHT, LINE_HEIGHT);
        y = ensureSpace(doc, y, neededHeight);

        setFont(doc, "bold", 9, NAVY);
        doc.text(pdfText(item.label), x + 2, y);

        setFont(doc, "normal", 9, TEXT_DARK);
        doc.text(valueLines, x + kvLabelWidth, y);
        y += neededHeight;
      }
      y += 3;
      break;
    }

    case "bullet-list": {
      for (const item of block.items) {
        setFont(doc, "normal", 9.5, TEXT_DARK);
        const bulletLines = doc.splitTextToSize(pdfText(item), width - 8);
        y = ensureSpace(doc, y, bulletLines.length * LINE_HEIGHT);

        doc.setFillColor(...GOLD);
        doc.circle(x + 3, y - 1.2, 0.8, "F");
        doc.text(bulletLines, x + 7, y);
        y += bulletLines.length * LINE_HEIGHT + 1.5;
      }
      y += 2;
      break;
    }

    case "ordered-list": {
      for (let i = 0; i < block.items.length; i++) {
        setFont(doc, "normal", 9.5, TEXT_DARK);
        const olLines = doc.splitTextToSize(pdfText(block.items[i]), width - 10);
        y = ensureSpace(doc, y, olLines.length * LINE_HEIGHT);

        setFont(doc, "bold", 9, GOLD);
        doc.text(`${i + 1}.`, x + 2, y);
        setFont(doc, "normal", 9.5, TEXT_DARK);
        doc.text(olLines, x + 9, y);
        y += olLines.length * LINE_HEIGHT + 1.5;
      }
      y += 2;
      break;
    }

    case "step": {
      y = ensureSpace(doc, y, 18);

      // Step number badge
      doc.setFillColor(...NAVY);
      doc.circle(x + 4, y - 1, 4, "F");
      setFont(doc, "bold", 8, WHITE);
      doc.text(`${block.number}`, x + 4, y, { align: "center" });

      // Step title
      setFont(doc, "bold", 10.5, NAVY);
      doc.text(pdfText(block.title), x + 12, y);
      y += 7;

      // Step body
      setFont(doc, "normal", 9.5, TEXT_DARK);
      const bodyLines = doc.splitTextToSize(pdfText(block.body), width - 12);
      for (const line of bodyLines) {
        y = ensureSpace(doc, y, LINE_HEIGHT);
        doc.text(line, x + 12, y);
        y += LINE_HEIGHT;
      }
      y += 3;
      break;
    }
  }

  return y;
}

/** Render a callout box (nationality-specific note). */
function renderCallout(
  doc: jsPDF,
  blocks: ContentBlock[],
  nationalityLabel: string | undefined,
  y: number,
  width: number,
  x: number = MARGIN
): number {
  // Pre-measure approximate height
  let estHeight = 10; // header + padding
  for (const b of blocks) {
    if (b.type === "paragraph") {
      setFont(doc, "normal", 9, TEXT_DARK);
      estHeight += doc.splitTextToSize(pdfText(b.text), width - 12).length * LINE_HEIGHT + 2;
    } else {
      estHeight += 12;
    }
  }

  y = ensureSpace(doc, y, Math.min(estHeight, 40));

  const startY = y - 3;

  // Header
  setFont(doc, "bold", 8.5, GOLD);
  const header = nationalityLabel
    ? `Note for ${nationalityLabel} nationals`
    : "Nationality-specific note";
  doc.text(header, x + 5, y + 2);
  y += 8;

  // Render inner blocks
  for (const b of blocks) {
    y = renderContentBlock(doc, b, y, width - 12, x + 6);
  }

  y += 2;

  // Draw callout box border around the rendered content
  const boxH = y - startY + 2;
  doc.setFillColor(...CALLOUT_BG);
  doc.setDrawColor(...CALLOUT_BORDER);
  doc.setLineWidth(0.5);
  // Draw filled rect behind (we do this by drawing on the same page)
  // Since we already rendered text, we use a workaround: draw the box
  // We'll render the box UNDER the text by using a GState
  // Actually, jsPDF renders in order, so we need to draw box first.
  // We'll use a simpler approach: just draw the border (no fill behind text).
  doc.roundedRect(x, startY, width, boxH, 2, 2, "S");

  // Left accent bar
  doc.setFillColor(...GOLD);
  doc.rect(x, startY, 2, boxH, "F");

  y += 4;
  return y;
}

/**
 * Render resolved blocks: nationality callouts first in one box (matching the
 * web page), then the general content in order.
 */
function renderResolvedBlocks(
  doc: jsPDF,
  blocks: ResolvedBlock[],
  nationalityLabel: string | undefined,
  y: number,
  width: number,
  x: number = MARGIN
): number {
  const { callouts, body } = splitCallouts(blocks);
  if (callouts.length > 0) {
    y = renderCallout(doc, callouts, nationalityLabel, y, width, x);
  }
  for (const rb of body) {
    y = renderContentBlock(doc, rb.block, y, width, x);
    y += 1; // small inter-block spacing
  }
  return y;
}

// ═══════════════════════════════════════════════════════════════
// SECTION DIVIDER PAGE
// ═══════════════════════════════════════════════════════════════
function renderSectionDivider(
  doc: jsPDF,
  slug: string,
  subsectionTitles: string[]
) {
  doc.addPage();

  const meta = SECTION_META[slug];
  if (!meta) return;

  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");

  drawLine(doc, MARGIN, 80, PAGE_W - MARGIN, GOLD, 0.6);
  drawLine(doc, MARGIN, 83, PAGE_W - MARGIN, GOLD, 0.2);

  setFont(doc, "bold", 32, WHITE);
  doc.text(meta.title, PAGE_W / 2, 110, { align: "center" });

  setFont(doc, "normal", 12, GOLD_LIGHT);
  const descLines = doc.splitTextToSize(meta.description, CONTENT_W - 20);
  doc.text(descLines, PAGE_W / 2, 125, { align: "center" });

  let y = 155;
  for (const sub of subsectionTitles) {
    setFont(doc, "normal", 11, WHITE);
    doc.text(`•   ${sub}`, PAGE_W / 2 - 30, y);
    y += 9;
  }

  drawLine(doc, MARGIN, PAGE_H - 60, PAGE_W - MARGIN, GOLD, 0.6);
  drawLine(doc, MARGIN, PAGE_H - 57, PAGE_W - MARGIN, GOLD, 0.2);
}

// ═══════════════════════════════════════════════════════════════
// CONTENT SECTION RENDERING (real data)
// ═══════════════════════════════════════════════════════════════
function renderContentSection(
  doc: jsPDF,
  sectionSlug: string,
  destinations: Country[],
  nationalityLabel: string | undefined,
  overlay: NationalityOverlay | null
) {
  const section = sectionRegistry.get(sectionSlug);
  const meta = SECTION_META[sectionSlug];
  if (!section || !meta) return;

  const subsectionTitles = section.subSections.map((s) => s.title);
  renderSectionDivider(doc, sectionSlug, subsectionTitles);

  const sectionOverlay = overlay?.[sectionSlug];

  for (const subSection of section.subSections) {
    doc.addPage();
    let y = 35;

    // Breadcrumb
    setFont(doc, "normal", 8.5, GOLD);
    doc.text(`${meta.title}  ›  ${subSection.title}`, MARGIN, y);
    y += 10;

    // Subsection heading
    setFont(doc, "bold", 18, NAVY);
    doc.text(subSection.title, MARGIN, y);
    y += 4;
    drawLine(doc, MARGIN, y, MARGIN + 40, GOLD, 0.6);
    y += 12;

    const subSectionOverlay = sectionOverlay?.[subSection.slug];

    // Cross-cutting content (not country-specific)
    if (subSection.crossCutting && subSection.crossCutting.length > 0) {
      const crossCuttingBlocks = mergeCrossCutting(
        subSection.crossCutting,
        subSectionOverlay?._crossCutting?.callouts,
        nationalityLabel
      );
      y = renderResolvedBlocks(doc, crossCuttingBlocks, nationalityLabel, y, CONTENT_W);
      y += 4;
    }

    // Country-specific content
    for (const country of destinations) {
      const countryData = subSection.countries.find(
        (c) => c.country === country
      );
      if (!countryData) continue;

      const countryOverlay = subSectionOverlay?.[country];
      const resolvedBlocks = mergeBlocks(
        countryData.blocks,
        countryOverlay,
        nationalityLabel
      );

      if (resolvedBlocks.length === 0) continue;

      // Country header bar
      y = ensureSpace(doc, y, 20);
      doc.setFillColor(...NAVY);
      doc.roundedRect(MARGIN, y, CONTENT_W, 10, 2, 2, "F");
      setFont(doc, "bold", 10, WHITE);
      doc.text(
        COUNTRY_LABELS[country],
        MARGIN + 4,
        y + 7
      );
      y += 16;

      // Render all content blocks
      y = renderResolvedBlocks(doc, resolvedBlocks, nationalityLabel, y, CONTENT_W);
      y += 6;
    }

    addPageFooter(doc, doc.getNumberOfPages());
  }
}

// ═══════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════
export interface ReportOptions {
  nationality: string;
  destinations: Country[];
  sections: string[]; // slugs: "visit", "student", "work", "residency"
}

export async function generateReport(options: ReportOptions) {
  const { nationality, destinations, sections } = options;

  // Load nationality overlay
  let overlay: NationalityOverlay | null = null;
  const natMeta = nationalityRegistry.find((n) => n.name === nationality);
  if (natMeta) {
    try {
      const mod = await natMeta.load();
      overlay = mod.default;
    } catch {
      // If overlay fails to load, proceed without it
    }
  }

  const doc = new jsPDF({ unit: "mm", format: "a4" });

  // ── Pass 1: Render all content ──────────────────────────────
  // Cover page (page 1)
  renderCoverPage(doc, nationality, destinations);

  // We need page numbers for TOC but don't know them yet.
  // Strategy: render TOC with placeholder, then render content,
  // then go back and re-render the TOC page with correct numbers.

  // Reserve TOC page (page 2)
  doc.addPage();
  const tocPageIndex = doc.getNumberOfPages(); // = 2

  // Introduction (page 3)
  renderIntroduction(doc, nationality, destinations, sections);

  // Record page numbers for each section
  const pageMap = new Map<string, number>();
  pageMap.set("introduction", 3);

  // Content sections
  for (const slug of sections) {
    const section = sectionRegistry.get(slug);
    if (!section) continue;

    // The divider page will be the next page added
    pageMap.set(slug, doc.getNumberOfPages() + 1);
    renderContentSection(doc, slug, destinations, natMeta?.label, overlay);
  }

  // ── Pass 2: Fill in the TOC ─────────────────────────────────
  // Build TOC entries
  const tocEntries: TocEntry[] = [];
  tocEntries.push({
    label: "Introduction",
    level: 0,
    pageRef: "introduction",
  });

  for (const slug of sections) {
    const section = sectionRegistry.get(slug);
    const meta = SECTION_META[slug];
    if (!section || !meta) continue;

    tocEntries.push({
      label: meta.title,
      level: 0,
      pageRef: slug,
    });

    for (const sub of section.subSections) {
      tocEntries.push({ label: sub.title, level: 1, pageRef: slug });
    }
  }

  // Overwrite the reserved TOC page
  doc.setPage(tocPageIndex);

  // Clear the page by drawing a white rect
  doc.setFillColor(...WARM_BG);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");

  // Render TOC content directly on this page
  let tocY = 40;

  setFont(doc, "bold", 22, NAVY);
  doc.text("Table of Contents", MARGIN, tocY);
  tocY += 4;
  drawLine(doc, MARGIN, tocY, MARGIN + 60, GOLD, 0.8);
  tocY += 16;

  for (const entry of tocEntries) {
    if (entry.level === 0) {
      setFont(doc, "bold", 13, NAVY);
    } else {
      setFont(doc, "normal", 10, TEXT_MUTED);
    }

    const indent = entry.level === 0 ? 4 : 12;
    const label = entry.level === 1 ? `—  ${entry.label}` : entry.label;
    doc.text(label, MARGIN + indent, tocY);

    if (entry.level === 0) {
      const pageNum = pageMap.get(entry.pageRef) ?? "—";
      setFont(doc, "normal", 11, TEXT_MUTED);
      const textWidth = doc.getTextWidth(label);
      const pageNumStr = String(pageNum);
      const pageNumWidth = doc.getTextWidth(pageNumStr);
      const dotsStart = MARGIN + indent + textWidth + 3;
      const dotsEnd = PAGE_W - MARGIN - pageNumWidth - 3;
      let dotX = dotsStart;
      while (dotX < dotsEnd) {
        doc.text(".", dotX, tocY);
        dotX += 2.5;
      }
      doc.text(pageNumStr, PAGE_W - MARGIN, tocY, { align: "right" });
    }

    tocY += entry.level === 0 ? 8 : 6;
  }

  addPageFooter(doc, tocPageIndex);

  // ── Save ────────────────────────────────────────────────────
  const destStr = destinations.join("-");
  const filename = `Student-Atlas-Report_${destStr}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
