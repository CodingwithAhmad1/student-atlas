import type { jsPDF } from "jspdf";
import { CONTENT_BOTTOM, CONTENT_TOP, type RGB } from "./theme";

/**
 * The unit of layout: a horizontal strip that is never split across pages
 * (a line of text, a country bar). Blocks become lists of rows, so heights
 * are known before anything is drawn.
 */
export interface Row {
  h: number;
  /** Draws the row with its top edge at `top`. Gap rows have none. */
  draw?: (top: number) => void;
  /** Keep on the same page as the next row (headings, first lines). */
  keep?: boolean;
}

/** A background panel drawn behind a run of rows, once per page it spans. */
export interface Box {
  x: number;
  w: number;
  padTop: number;
  padBottom: number;
  fill: RGB;
  /** Left accent bar colour. */
  accent?: RGB;
}

export type PageKind = "cover" | "front" | "divider" | "content";

export interface PageInfo {
  kind: PageKind;
  /** Section title for the running header. */
  section?: string;
}

export function gap(h: number): Row {
  return { h };
}

export class Writer {
  readonly doc: jsPDF;
  /** One entry per page, page 1 first. */
  readonly pages: PageInfo[] = [{ kind: "cover" }];
  y = CONTENT_TOP;
  /** Section shown in the running header of pages added from now on. */
  section: string | undefined;

  constructor(doc: jsPDF) {
    this.doc = doc;
  }

  get page(): number {
    return this.doc.getNumberOfPages();
  }

  get atTop(): boolean {
    return this.y <= CONTENT_TOP;
  }

  newPage(kind: PageKind = "content") {
    this.doc.addPage();
    this.pages.push({ kind, section: kind === "content" ? this.section : undefined });
    this.y = CONTENT_TOP;
  }

  /** Start a new page unless `h` mm still fit on this one. */
  ensure(h: number) {
    if (!this.atTop && this.y + h > CONTENT_BOTTOM) this.newPage();
  }

  /**
   * Lays rows out from the cursor, breaking pages where needed: a gap at a
   * page break is dropped, and a row marked `keep` moves with the next one.
   * With a box, the panel is drawn first on each page so text sits on top.
   */
  flow(rows: Row[], box?: Box) {
    const padTop = box?.padTop ?? 0;
    const padBottom = box?.padBottom ?? 0;
    const bottom = CONTENT_BOTTOM - padBottom;
    const usable = bottom - CONTENT_TOP - padTop;

    const chain = (i: number) => {
      let h = 0;
      for (let j = i; j < rows.length; j++) {
        h += rows[j].h;
        if (rows[j].draw && !rows[j].keep) break;
      }
      return Math.min(h, usable);
    };

    const placed: { page: number; top: number; row: Row }[] = [];
    const panels: { page: number; top: number; bottom: number }[] = [];
    let panelTop = this.y;
    let fresh = true; // nothing placed yet on this page (or in this panel)

    const first = rows.findIndex((r) => r.draw);
    if (first === -1) return;
    if (!this.atTop && this.y + padTop + chain(first) > bottom) this.newPage();
    panelTop = this.y;
    this.y += padTop;

    for (let i = first; i < rows.length; i++) {
      const row = rows[i];
      if (!row.draw) {
        if (!fresh) this.y += row.h;
        continue;
      }
      if (!fresh && this.y + chain(i) > bottom) {
        panels.push({ page: this.page, top: panelTop, bottom: this.y + padBottom });
        this.newPage();
        panelTop = this.y;
        this.y += padTop;
        fresh = true;
      }
      placed.push({ page: this.page, top: this.y, row });
      this.y += row.h;
      fresh = false;
    }
    this.y += padBottom;
    panels.push({ page: this.page, top: panelTop, bottom: this.y });

    const lastPage = this.page;
    if (box) {
      for (const p of panels) {
        this.doc.setPage(p.page);
        this.doc.setFillColor(...box.fill);
        this.doc.rect(box.x, p.top, box.w, p.bottom - p.top, "F");
        if (box.accent) {
          this.doc.setFillColor(...box.accent);
          this.doc.rect(box.x, p.top, 1.2, p.bottom - p.top, "F");
        }
      }
    }
    for (const p of placed) {
      this.doc.setPage(p.page);
      p.row.draw!(p.top);
    }
    this.doc.setPage(lastPage);
  }
}
