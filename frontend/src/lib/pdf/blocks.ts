import type { jsPDF } from "jspdf";
import { PRACTICAL_NOTE, type CalloutBlock, type ContentBlock, type ResolvedBlock } from "@/data/types";
import { splitCallouts } from "@/data/merge-content";
import { gap, type Box, type Row, type Writer } from "./layout";
import { CitationIndex, drawTextLine, layoutText, plain, setFont, type FontStyle, type TextLine } from "./text";
import {
  CALLOUT_BG, GAP, GOLD, GOLD_DARK, HAIRLINE, NAVY, NAVY_SOFT, PT, TEXT, TEXT_MUTED, TYPE, WHITE,
  lineHeight, type RGB,
} from "./theme";

export interface Ctx {
  doc: jsPDF;
  cites: CitationIndex;
}

function baselineOffset(size: number, lh: number): number {
  return (lh + size * PT * 0.7) / 2;
}

interface TextRowOptions {
  color?: RGB;
  /** Keep every line together (headings, short labels). */
  keepAll?: boolean;
}

/** One row per line, with orphan and widow control for longer runs. */
function textRows(
  doc: jsPDF,
  lines: TextLine[],
  x: number,
  size: number,
  { color = TEXT, keepAll = false }: TextRowOptions = {}
): Row[] {
  const lh = lineHeight(size);
  const rows: Row[] = lines.map((line) => ({
    h: lh,
    draw: (top) => drawTextLine(doc, line, x, top + baselineOffset(size, lh), size, color, GOLD_DARK),
  }));
  if (keepAll) rows.forEach((r) => (r.keep = true));
  else {
    if (rows.length >= 2) rows[0].keep = true;
    if (rows.length >= 3) rows[rows.length - 2].keep = true;
  }
  return rows;
}

/** Adds a decoration (bullet, number) to a row's drawing. */
function decorate(row: Row, extra: (top: number) => void): Row {
  const draw = row.draw;
  return { ...row, draw: (top) => { draw?.(top); extra(top); } };
}

function text(ctx: Ctx, s: string, w: number, size: number, style: FontStyle = "normal"): TextLine[] {
  return layoutText(ctx.doc, s, w, size, style, ctx.cites);
}

const HEADING_SIZE = { 2: TYPE.h2, 3: TYPE.h3, 4: TYPE.h4 } as const;
const BODY = TYPE.body;

/** Rows for one content block, followed by its trailing gap. */
export function blockRows(ctx: Ctx, block: ContentBlock, x: number, w: number): Row[] {
  const { doc } = ctx;
  const lh = lineHeight(BODY);
  const mid = baselineOffset(BODY, lh);

  switch (block.type) {
    case "heading": {
      const size = HEADING_SIZE[block.level];
      return [
        gap(GAP.beforeHeading),
        ...textRows(doc, text(ctx, block.text, w, size, "bold"), x, size, { color: NAVY, keepAll: true }),
        { ...gap(GAP.afterHeading) },
      ];
    }

    case "paragraph":
      return [...textRows(doc, text(ctx, block.text, w, BODY), x, BODY), gap(GAP.block)];

    case "bullet-list":
    case "ordered-list": {
      const ordered = block.type === "ordered-list";
      const indent = ordered ? 7 : 5.5;
      const rows: Row[] = [];
      block.items.forEach((item, i) => {
        const lines = textRows(doc, text(ctx, item, w - indent, BODY), x + indent, BODY);
        lines[0] = decorate(lines[0], (top) => {
          if (ordered) {
            setFont(doc, "bold", BODY - 0.5, GOLD_DARK);
            doc.text(`${i + 1}.`, x + 1, top + mid);
          } else {
            doc.setFillColor(...GOLD);
            doc.circle(x + 1.8, top + mid - 1.05, 0.75, "F");
          }
        });
        rows.push(...lines, gap(GAP.item));
      });
      rows.push(gap(GAP.block - GAP.item));
      return rows;
    }

    case "key-value-list": {
      const size = BODY - 0.5;
      const klh = lineHeight(size);
      const labelW = Math.min(w * 0.34, 46);
      const rows: Row[] = [];
      block.items.forEach((item, i) => {
        const labels = text(ctx, item.label, labelW - 4, size, "bold");
        const values = text(ctx, item.value, w - labelW, size);
        const n = Math.max(labels.length, values.length);
        const last = i === block.items.length - 1;
        for (let j = 0; j < n; j++) {
          const sep = j === n - 1 && !last ? 2.6 : 0;
          rows.push({
            h: klh + sep,
            keep: n <= 5 && j < n - 1,
            draw: (top) => {
              const base = top + baselineOffset(size, klh);
              if (labels[j]) drawTextLine(doc, labels[j], x, base, size, NAVY_SOFT, GOLD_DARK);
              if (values[j]) drawTextLine(doc, values[j], x + labelW, base, size, TEXT, GOLD_DARK);
              if (sep) {
                doc.setDrawColor(...HAIRLINE);
                doc.setLineWidth(0.2);
                doc.line(x, top + klh + sep / 2, x + w, top + klh + sep / 2);
              }
            },
          });
        }
      });
      rows.push(gap(GAP.block + 1));
      return rows;
    }

    case "step": {
      const indent = 9;
      const titleSize = TYPE.h4;
      const title = textRows(doc, text(ctx, block.title, w - indent, titleSize, "bold"), x + indent, titleSize, {
        color: NAVY,
        keepAll: true,
      });
      const tlh = lineHeight(titleSize);
      title[0] = decorate(title[0], (top) => {
        const cy = top + tlh / 2;
        doc.setFillColor(...NAVY);
        doc.circle(x + 3.2, cy, 3, "F");
        setFont(doc, "bold", 8, WHITE);
        doc.text(String(block.number), x + 3.2, cy + 1, { align: "center" });
      });
      return [
        gap(1),
        ...title,
        gap(0.8),
        ...textRows(doc, text(ctx, block.body, w - indent, BODY), x + indent, BODY),
        gap(GAP.block + 1),
      ];
    }
  }
}

/** Drops trailing gaps so a box or section ends on content. */
function trim(rows: Row[]): Row[] {
  let end = rows.length;
  while (end > 0 && !rows[end - 1].draw) end--;
  return rows.slice(0, end);
}

const CALLOUT_PAD = 5;

/** The nationality box: header, callout blocks (practical ones starred), small print. */
export function flowCallouts(
  ctx: Ctx,
  writer: Writer,
  callouts: CalloutBlock[],
  label: string | undefined,
  x: number,
  w: number
) {
  const { doc } = ctx;
  const innerX = x + CALLOUT_PAD;
  const innerW = w - CALLOUT_PAD * 2 - 3;
  const size = TYPE.tiny;
  const header: Row = {
    h: lineHeight(size) + 1,
    keep: true,
    draw: (top) => {
      setFont(doc, "bold", size, GOLD_DARK);
      doc.setCharSpace(0.25);
      doc.text(`FOR ${(label ?? "your nationality").toUpperCase()} APPLICANTS`, innerX, top + baselineOffset(size, lineHeight(size)));
      doc.setCharSpace(0);
    },
  };

  const rows: Row[] = [header];
  for (const c of callouts) {
    const own = blockRows(ctx, c.block, innerX, innerW);
    if (c.practical) {
      const i = own.findIndex((r) => r.draw);
      own[i] = decorate(own[i], (top) => {
        setFont(doc, "bold", 10, GOLD_DARK);
        doc.text("*", x + w - CALLOUT_PAD, top + 3.4, { align: "right" });
      });
    }
    rows.push(...own);
  }
  if (callouts.some((c) => c.practical)) {
    rows.splice(trim(rows).length);
    rows[rows.length - 1].keep = true; // the small print never starts a page alone
    rows.push(
      gap(2),
      ...textRows(doc, layoutText(doc, PRACTICAL_NOTE, innerW, TYPE.tiny, "italic"), innerX, TYPE.tiny, {
        color: TEXT_MUTED,
      })
    );
  }
  const box: Box = { x, w, padTop: 3.5, padBottom: 2.5, fill: CALLOUT_BG, accent: GOLD };
  writer.flow(trim(rows), box);
  writer.y += GAP.block + 1;
}

/**
 * Resolved blocks as on the web page: nationality callouts first, in one box,
 * then the general content in order.
 */
export function flowResolved(
  ctx: Ctx,
  writer: Writer,
  blocks: ResolvedBlock[],
  label: string | undefined,
  x: number,
  w: number
) {
  const { callouts, body } = splitCallouts(blocks);
  if (callouts.length > 0) flowCallouts(ctx, writer, foldCitationOnly(callouts), label, x, w);
  writer.flow(foldCitationOnly(body).flatMap((b) => blockRows(ctx, b.block, x, w)));
}

/** Appends `extra` to the block's last text field. */
function appendToBlock(block: ContentBlock, extra: string): ContentBlock {
  const last = <T,>(items: T[], f: (t: T) => T) => [...items.slice(0, -1), f(items[items.length - 1])];
  switch (block.type) {
    case "paragraph":
    case "heading":
      return { ...block, text: block.text + extra };
    case "bullet-list":
    case "ordered-list":
      return { ...block, items: last(block.items, (t) => t + extra) };
    case "key-value-list":
      return { ...block, items: last(block.items, (i) => ({ ...i, value: i.value + extra })) };
    case "step":
      return { ...block, body: block.body + extra };
  }
}

/**
 * A paragraph holding only citations (sourcing the list above it) would print
 * as a bare "[12]" line; its markers move to the end of the previous block.
 */
function foldCitationOnly<T extends { block: ContentBlock }>(items: T[]): T[] {
  const out: T[] = [];
  for (const item of items) {
    const prev = out[out.length - 1];
    if (prev && item.block.type === "paragraph" && plain(item.block.text) === "") {
      out[out.length - 1] = { ...prev, block: appendToBlock(prev.block, ` ${item.block.text}`) };
    } else out.push(item);
  }
  return out;
}

/** Navy bar naming the destination a run of content applies to. */
export function countryBarRow(doc: jsPDF, label: string, x: number, w: number): Row {
  return {
    h: 7,
    keep: true,
    draw: (top) => {
      doc.setFillColor(...NAVY);
      doc.roundedRect(x, top, w, 7, 1.2, 1.2, "F");
      doc.setFillColor(...GOLD);
      doc.rect(x + 3.5, top + 2.6, 1.8, 1.8, "F");
      setFont(doc, "bold", 9.5, WHITE);
      doc.text(label, x + 7.5, top + 4.7);
    },
  };
}
