import type { jsPDF } from "jspdf";
import type { Citation } from "@/data/types";
import { INLINE_REGEX, stripMarkup, termDisplay } from "@/lib/inline-markup";
import { PT, type RGB } from "./theme";

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

/** Text safe for the built-in fonts. Expects text without inline markup. */
export function winAnsi(text: string): string {
  let out = "";
  for (const ch of text) {
    const code = ch.codePointAt(0) ?? 0;
    if (code < 256 || WINANSI_EXTRAS.has(ch)) out += ch;
    else out += SYMBOL_FALLBACKS[ch] ?? "";
  }
  return out.replace(/ {2,}/g, " ");
}

/** Numbers citations in order of first use across the whole report. */
export class CitationIndex {
  private readonly order: Citation[] = [];
  private readonly numbers = new Map<string, number>();
  private readonly known: Record<string, Citation>;

  constructor(known: Record<string, Citation>) {
    this.known = known;
  }

  number(id: string): number | undefined {
    const existing = this.numbers.get(id);
    if (existing) return existing;
    const citation = this.known[id];
    if (!citation) return undefined;
    this.order.push(citation);
    this.numbers.set(id, this.order.length);
    return this.order.length;
  }

  get entries(): readonly Citation[] {
    return this.order;
  }
}

// ── Rich text: words with a style, wrapped into positioned lines ──

export type FontStyle = "normal" | "bold" | "italic";

interface Atom {
  text: string;
  style: FontStyle | "cite";
  /** Preceded by a space in the source. */
  space: boolean;
}

export interface PlacedAtom {
  text: string;
  style: FontStyle | "cite";
  x: number;
}

export type TextLine = PlacedAtom[];

/** Citation markers are set smaller and raised, like superscripts. */
const CITE_SCALE = 0.68;
const CITE_RAISE = 0.34;

/**
 * Splits content text into styled words: terms resolve to their display
 * text, **bold** keeps its weight and [CITE: id] becomes a "[n]" marker
 * attached to the preceding word.
 */
export function parseRich(text: string, base: FontStyle, cites?: CitationIndex): Atom[] {
  const atoms: Atom[] = [];
  let pendingSpace = false;

  const pushWords = (segment: string, style: FontStyle) => {
    for (const part of segment.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        pendingSpace = true;
        continue;
      }
      const clean = winAnsi(part);
      if (!clean) continue;
      atoms.push({ text: clean, style, space: pendingSpace && atoms.length > 0 });
      pendingSpace = false;
    }
  };

  let last = 0;
  for (const match of text.matchAll(INLINE_REGEX)) {
    pushWords(text.slice(last, match.index), base);
    last = match.index + match[0].length;
    if (match[1] != null) {
      const n = cites?.number(match[1].trim());
      if (!n) continue;
      const prev = atoms[atoms.length - 1];
      if (prev?.style === "cite") prev.text = prev.text.replace(/\]$/, `,${n}]`);
      else atoms.push({ text: `[${n}]`, style: "cite", space: false });
    } else if (match[2] != null) {
      pushWords(termDisplay(match[2], match[3]), base);
    } else if (match[4] != null) {
      pushWords(match[4].slice(2, -2), "bold");
    }
  }
  pushWords(text.slice(last), base);
  return atoms;
}

/**
 * Width in mm as drawn. getTextWidth applies the font's kerning pairs, but
 * text() draws without them, so words after "Yo" or "Te" would overlap.
 */
export function measure(doc: jsPDF, s: string): number {
  const units = (doc.getStringUnitWidth as (t: string, o: object) => number)(s, { kerning: {} });
  return (units * doc.getFontSize()) / doc.internal.scaleFactor;
}

function setStyle(doc: jsPDF, style: FontStyle | "cite", size: number) {
  doc.setFont("helvetica", style === "cite" ? "normal" : style);
  doc.setFontSize(style === "cite" ? size * CITE_SCALE : size);
}

/** Greedy line breaking of styled words within `width` mm. */
export function wrapRich(doc: jsPDF, atoms: Atom[], width: number, size: number): TextLine[] {
  setStyle(doc, "normal", size);
  const spaceW = measure(doc, " ");
  const lines: TextLine[] = [];
  let line: TextLine = [];
  let x = 0;

  const place = (text: string, style: Atom["style"], w: number, space: boolean) => {
    const gap = space && line.length > 0 ? spaceW : 0;
    if (line.length > 0 && x + gap + w > width && style !== "cite") {
      lines.push(line);
      line = [];
      x = 0;
    }
    const start = line.length > 0 ? x + (space ? spaceW : 0) : 0;
    line.push({ text, style, x: start });
    x = start + w;
  };

  for (const atom of atoms) {
    setStyle(doc, atom.style, size);
    const w = measure(doc, atom.text);
    if (w <= width) {
      place(atom.text, atom.style, w, atom.space);
      continue;
    }
    // A single word wider than the column (a long URL): break it by characters.
    let chunk = "";
    let first = true;
    for (const ch of atom.text) {
      if (chunk && measure(doc, chunk + ch) > width) {
        place(chunk, atom.style, measure(doc, chunk), first && atom.space);
        first = false;
        chunk = "";
      }
      chunk += ch;
    }
    if (chunk) place(chunk, atom.style, measure(doc, chunk), first && atom.space);
  }
  if (line.length > 0) lines.push(line);
  return lines;
}

/** Wraps content text (inline markup allowed) into lines. */
export function layoutText(
  doc: jsPDF,
  text: string,
  width: number,
  size: number,
  base: FontStyle = "normal",
  cites?: CitationIndex
): TextLine[] {
  return wrapRich(doc, parseRich(text, base, cites), width, size);
}

export function drawTextLine(
  doc: jsPDF,
  line: TextLine,
  x: number,
  baseline: number,
  size: number,
  color: RGB,
  citeColor: RGB
) {
  for (const atom of line) {
    setStyle(doc, atom.style, size);
    if (atom.style === "cite") {
      doc.setTextColor(...citeColor);
      doc.text(atom.text, x + atom.x, baseline - size * PT * CITE_RAISE);
    } else {
      doc.setTextColor(...color);
      doc.text(atom.text, x + atom.x, baseline);
    }
  }
}

/** Single-style text without markup (titles, labels), sanitised. */
export function plain(text: string): string {
  return winAnsi(stripMarkup(text));
}

export function setFont(doc: jsPDF, style: FontStyle, size: number, color: RGB) {
  doc.setFont("helvetica", style);
  doc.setFontSize(size);
  doc.setTextColor(...color);
}
