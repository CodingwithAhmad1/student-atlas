import { jsPDF } from "jspdf";
import { COUNTRY_LABELS, type Country, type NationalityOverlay } from "@/data/types";
import { citations } from "@/data/citations";
import { sectionRegistry } from "@/data/sections";
import { mergeBlocks, mergeCrossCutting } from "@/data/merge-content";
import { nationalityRegistry } from "@/data/nationalities/registry";
import { buildOverlay } from "@/data/traits/build-overlay";
import { REPORT_SECTIONS } from "@/lib/report-sections";
import { Writer, gap } from "./layout";
import { countryBarRow, flowResolved, type Ctx } from "./blocks";
import {
  formatDate, pageTitleRow, renderCover, renderDivider, renderHeadersAndFooters, renderIntroduction,
  renderSources, renderToc, SITE_URL, type TocEntry,
} from "./pages";
import { CitationIndex } from "./text";
import { CONTENT_W, GAP, MARGIN_X, TYPE } from "./theme";

export interface ReportOptions {
  nationality: string;
  destinations: Country[];
  /** Section slugs: "visit", "student", "work", "residency". */
  sections: string[];
}

/** The same overlay the website shows: trait-generated content plus the hand-written file. */
async function loadOverlay(nationality: string) {
  const meta = nationalityRegistry.find((n) => n.name === nationality);
  if (!meta) return { meta: undefined, overlay: null };
  try {
    return { meta, overlay: buildOverlay(meta, (await meta.load()).default) as NationalityOverlay };
  } catch {
    throw new Error(
      `Couldn't load the notes for ${nationality} nationals, so the report would be incomplete. Please try again.`
    );
  }
}

export async function generateReport({ nationality, destinations, sections }: ReportOptions) {
  const { meta, overlay } = await loadOverlay(nationality);
  const label = meta?.label;
  const chosen = REPORT_SECTIONS.filter((s) => sections.includes(s.slug) && sectionRegistry.has(s.slug));
  const destLabels = destinations.map((c) => COUNTRY_LABELS[c]);
  const today = new Date();
  const date = formatDate(today);

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setProperties({
    title: `Student Atlas report: ${nationality} to ${destinations.join(", ")}`,
    subject: `Visa guide for ${nationality} nationals: ${chosen.map((s) => s.title).join(", ")}`,
    author: "Student Atlas",
    creator: "Student Atlas",
  });
  doc.setLanguage("en-GB");
  const writer = new Writer(doc);
  const ctx: Ctx = { doc, cites: new CitationIndex(citations) };

  renderCover(doc, nationality, destLabels, date);
  writer.newPage("front");
  const tocPage = writer.page;

  renderIntroduction(ctx, writer, {
    nationality,
    label,
    reviewedAt: meta?.reviewedAt,
    destinations: destLabels,
    sections: chosen,
    date,
  });
  const toc: TocEntry[] = [{ label: "Introduction", level: 0, page: tocPage + 1 }];
  const dividers: (() => void)[] = [];

  chosen.forEach((rs, index) => {
    const section = sectionRegistry.get(rs.slug)!;
    const sectionOverlay = overlay?.[rs.slug];
    writer.newPage("divider");
    const dividerPage = writer.page;
    toc.push({ label: rs.title, level: 0, page: dividerPage, number: index + 1 });
    const subPages: { title: string; page: number }[] = [];

    writer.section = rs.title;
    writer.newPage();
    for (const sub of section.subSections) {
      if (!writer.atTop) {
        writer.ensure(50);
        if (!writer.atTop) writer.y += GAP.subsection;
      }
      writer.flow([pageTitleRow(doc, sub.title, TYPE.subsection), gap(3)]);
      subPages.push({ title: sub.title, page: writer.page });
      toc.push({ label: sub.title, level: 1, page: writer.page });

      const subOverlay = sectionOverlay?.[sub.slug];
      // As on the website, a cross-cutting page has no per-destination columns.
      if (sub.crossCutting?.length) {
        flowResolved(ctx, writer, mergeCrossCutting(sub.crossCutting, subOverlay?._crossCutting?.callouts, label), label, MARGIN_X, CONTENT_W);
        continue;
      }
      let first = true;
      for (const country of destinations) {
        const data = sub.countries.find((c) => c.country === country);
        if (!data) continue;
        const blocks = mergeBlocks(data.blocks, subOverlay?.[country], label);
        if (blocks.length === 0) continue;
        if (!first) writer.y += GAP.country;
        first = false;
        writer.ensure(30);
        writer.flow([countryBarRow(doc, COUNTRY_LABELS[country], MARGIN_X, CONTENT_W), gap(4.5)]);
        flowResolved(ctx, writer, blocks, label, MARGIN_X, CONTENT_W);
      }
    }
    dividers.push(() => renderDivider(doc, dividerPage, index + 1, rs.title, rs.description, subPages));
  });

  if (ctx.cites.entries.length > 0) {
    renderSources(ctx, writer, ctx.cites.entries);
    toc.push({ label: "Sources", level: 0, page: writer.pages.findIndex((p) => p.section === "Sources") + 1 });
  }

  // Pages now known: fill in the dividers and contents, then headers and footers.
  dividers.forEach((draw) => draw());
  renderToc(doc, tocPage, toc);
  renderHeadersAndFooters(
    writer,
    `${label ? `${label} nationals` : nationality} · ${destinations.join(", ")}`,
    `Student Atlas${SITE_URL ? ` · ${SITE_URL}` : ""} · Reference guide, not legal advice · ${date}`
  );

  let parent = null;
  for (const e of toc) {
    if (e.level === 0) parent = doc.outline.add(null, e.label, { pageNumber: e.page });
    else doc.outline.add(parent, e.label, { pageNumber: e.page });
  }

  const slug = (meta?.slug ?? nationality).toLowerCase().replace(/[^a-z0-9]+/g, "-");
  doc.save(`Student-Atlas_${slug}_${destinations.join("-")}_${today.toISOString().slice(0, 10)}.pdf`);
}
