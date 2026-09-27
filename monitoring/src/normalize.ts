import { createHash } from "node:crypto";
import * as cheerio from "cheerio";
import type { AnyNode } from "domhandler";

/** Elements whose content is never page content. */
const STRIP_SELECTORS = [
  "script",
  "style",
  "noscript",
  "iframe",
  "svg",
  "template",
  "nav",
  "header",
  "footer",
  // NOTE: never strip <form> wholesale — SharePoint sites (immi.homeaffairs)
  // wrap the entire page body in one. Strip form controls individually.
  "input",
  "textarea",
  "label",
  "button",
  "select",
  "[role=banner]",
  "[role=navigation]",
  "[role=complementary]",
  "[role=search]",
  "[aria-hidden=true]",
  "[hidden]",
  // Common cookie / consent banners on gov sites.
  "#ccc",
  "#global-cookie-message",
  ".cookie-banner",
  ".cookie-consent",
  ".gem-c-cookie-banner",
  "#cookie-banner",
  ".consent-banner",
  "#onetrust-consent-sdk",
  ".osano-cm-window",
  // GOV.UK chrome that survives inside <main> on some templates.
  ".gem-c-feedback",
  ".govuk-phase-banner",
  ".gem-c-print-link",
] as const;

/** Preferred main-content containers, in priority order. */
const MAIN_SELECTORS = ["main", "#main-content", "[role=main]", "article"] as const;

const BLOCK_TAGS = new Set([
  "p",
  "div",
  "section",
  "article",
  "aside",
  "main",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "caption",
  "figure",
  "figcaption",
  "blockquote",
  "pre",
  "dl",
  "dt",
  "dd",
  "details",
  "summary",
  "fieldset",
  "legend",
  "br",
  "hr",
]);

/**
 * Lines matching any of these are dropped before hashing — they change without
 * the page meaningfully changing.
 */
const NOISE_LINE_PATTERNS: RegExp[] = [
  /[a-f0-9]{32,}/i, // CSRF tokens, nonces, cache-buster hashes
  /^(page )?last (updated|reviewed|modified|checked)\b/i,
  /^(updated|published|reviewed):?\s+\d/i,
  /\b\d+\s+(people|users?|visitors?)\s+found this\b/i,
  /^is this page useful\b/i,
  /^(yes|no)\s+this page is (not )?useful$/i,
  /^report a problem with this page$/i,
  /^\s*©/, // copyright footers
  /session (id|token)/i,
  /^read more\s*>?$/i, // teaser-list links
  /^\d{1,2}\/\d{1,2}\/\d{4}$/, // bare "last updated" date stamps (uscis.gov)
  /^explore the new beta\.dol\.gov website\b/i, // dol.gov site-wide banner
  // GOV.UK attachment boilerplate — toggles when an accessible version is added.
  /^this file may not be suitable for users of assistive technology\.?$/i,
  /^request an accessible format\.?$/i,
  /^if you use assistive technology .* accessible format/i,
];

/** Normalized text is capped so a runaway page cannot bloat the repo. */
const MAX_TEXT_CHARS = 200_000;
const TRUNCATION_MARKER = "… text truncated …";

export function isNoiseLine(line: string): boolean {
  return NOISE_LINE_PATTERNS.some((re) => re.test(line));
}

/** Walk the DOM emitting text with newlines at block-element boundaries. */
function renderText($: cheerio.CheerioAPI, node: AnyNode, out: string[]): void {
  if (node.type === "text") {
    out.push(node.data);
    return;
  }
  if (node.type !== "tag") return;
  const isBlock = BLOCK_TAGS.has(node.name);
  if (isBlock) out.push("\n");
  for (const child of node.children) {
    renderText($, child as AnyNode, out);
  }
  if (isBlock) out.push("\n");
}

interface ImmiNavEntry {
  relativefriendlyurl?: string;
  relativepageurl?: string;
  title?: string;
  customtitle?: string;
}

/** Recursively collect nav entries from the embedded homeaffairs site JSON. */
function collectNavEntries(value: unknown, out: ImmiNavEntry[]): void {
  if (Array.isArray(value)) {
    for (const item of value) collectNavEntries(item, out);
    return;
  }
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (
      typeof obj.relativefriendlyurl === "string" &&
      typeof obj.relativepageurl === "string"
    ) {
      out.push(obj as ImmiNavEntry);
    }
    for (const child of Object.values(obj)) {
      if (child && typeof child === "object") collectNavEntries(child, out);
    }
  }
}

function textOfHtmlFragment(fragment: string): string {
  return cheerio.load(fragment).root().text().replace(/\s+/g, " ").trim();
}

/** Keys of the page-schema JSON that churn without the guidance changing. */
const IMMI_SKIP_KEYS = new Set(["recommended", "id", "itemName", "currentActor", "toggleData"]);

/**
 * Walk the page-schema JSON in document order and collect its text: HTML
 * fragments become plain text, other strings are kept when they look like
 * prose (eligibility lists, step guides, fee tables all live here).
 */
function collectPageText(value: unknown, out: string[]): void {
  if (typeof value === "string") {
    const text = /<[a-z][\s\S]*>/i.test(value) ? textOfHtmlFragment(value) : value.trim();
    if (text.length >= 20) out.push(text);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectPageText(item, out);
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      if (IMMI_SKIP_KEYS.has(key)) continue;
      collectPageText(child, out);
    }
  }
}

/**
 * immi.homeaffairs.gov.au renders visa-listing and help pages from a JSON
 * "page schema" carried in a hidden form field (the visible HTML is an empty
 * shell). This is where eligible-passport lists, fees and step guides live.
 */
function extractHomeAffairsBody($: cheerio.CheerioAPI): string[] {
  const out: string[] = [];
  for (const el of $("input[type=hidden]").toArray()) {
    const raw = $(el).attr("value") ?? "";
    if (raw.length < 500 || !raw.startsWith("{")) continue;
    try {
      collectPageText(JSON.parse(raw), out);
    } catch {
      // Not the page schema (some hidden fields hold view-state blobs).
    }
  }
  return out;
}

/**
 * immi.homeaffairs.gov.au / homeaffairs.gov.au render page bodies with
 * client-side JS, so the fetched HTML has no main content. It does embed a
 * site JSON blob with per-page alert entries — extract the ones for this page
 * (plus title/description) as the monitorable text. Site-wide chrome is
 * deliberately excluded so a menu change does not alert every AU source.
 */
function extractHomeAffairs(html: string, pagePath: string): string | null {
  const $ = cheerio.load(html);
  const script = $("script")
    .toArray()
    .map((el) => $(el).text().trim())
    .find((text) => text.startsWith('{"menuItems"'));
  if (!script) return null;

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(script) as Record<string, unknown>;
  } catch {
    return null;
  }

  const clean = (p: string) => p.toLowerCase().replace(/\/+$/, "");
  const wanted = clean(pagePath);

  const navEntries: ImmiNavEntry[] = [];
  collectNavEntries(data.menuItems, navEntries);
  const nav = navEntries.find(
    (entry) => clean(entry.relativefriendlyurl ?? "") === wanted
  );

  const lines: string[] = [];
  const title = $("title").first().text().trim();
  if (title) lines.push(`Title: ${title}`);
  const description = $('meta[name="description"]').attr("content")?.trim();
  if (description) lines.push(`Description: ${description}`);
  if (nav?.title || nav?.customtitle) {
    lines.push(`Page: ${nav.customtitle || nav.title}`);
  }

  const pageUrl = nav?.relativepageurl ? clean(nav.relativepageurl) : null;
  const alertItems = Array.isArray(data.alertItems) ? data.alertItems : [];
  const matched = alertItems
    .filter((item): item is Record<string, unknown> => {
      if (!item || typeof item !== "object") return false;
      const urls = (item as Record<string, unknown>).urls;
      if (!Array.isArray(urls)) return false;
      return urls.some(
        (u) =>
          typeof u === "string" &&
          (clean(u) === pageUrl || clean(u) === wanted)
      );
    })
    .map((item) => ({
      title: typeof item.title === "string" ? item.title : "",
      content:
        typeof item.content === "string" ? textOfHtmlFragment(item.content) : "",
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  // The alert's updateDate is deliberately omitted: it bumps on re-saves
  // that leave the text unchanged.
  for (const alert of matched) {
    lines.push(`Alert: ${alert.title}`);
    if (alert.content) lines.push(alert.content);
  }

  lines.push(...extractHomeAffairsBody($));

  return lines.length > 0 ? lines.join("\n") : null;
}

/**
 * Text-level cleanup shared by every extractor: strips invisible characters,
 * collapses whitespace, drops noise lines, and caps the length. Idempotent, so
 * it is also safe to re-apply to stored snapshots.
 */
export function cleanText(text: string): string {
  const lines = text
    .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, "") // zero-width chars, soft hyphens
    .replace(/\u00A0/g, " ") // non-breaking spaces
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 0)
    .filter((line) => !isNoiseLine(line));

  const out = lines.join("\n");
  return out.length > MAX_TEXT_CHARS
    ? `${out.slice(0, MAX_TEXT_CHARS)}\n${TRUNCATION_MARKER}`
    : out;
}

export interface NormalizeOptions {
  url?: string;
  contentSelector?: string;
  stripSelectors?: string[];
}

/**
 * HTML -> stable normalized text. Strips chrome/noise, targets the main
 * content region, collapses whitespace, and drops noise lines so that dynamic
 * tokens and feedback widgets do not produce spurious change alerts.
 */
export function normalizeHtml(html: string, opts: NormalizeOptions = {}): string {
  if (opts.url) {
    const parsed = new URL(opts.url);
    if (parsed.hostname.endsWith("homeaffairs.gov.au")) {
      const extracted = extractHomeAffairs(html, parsed.pathname);
      if (extracted !== null) return cleanText(extracted);
    }
  }
  return cleanText(normalizeGeneric(html, opts.contentSelector, opts.stripSelectors));
}

function normalizeGeneric(
  html: string,
  contentSelector?: string,
  stripSelectors: string[] = []
): string {
  const $ = cheerio.load(html);

  for (const selector of [...STRIP_SELECTORS, ...stripSelectors]) {
    $(selector).remove();
  }

  let root = contentSelector ? $(contentSelector).first() : $();
  if (root.length === 0) {
    for (const selector of MAIN_SELECTORS) {
      const candidate = $(selector).first();
      if (candidate.length > 0 && candidate.text().trim().length > 200) {
        root = candidate;
        break;
      }
    }
  }
  if (root.length === 0) root = $("body").first();
  if (root.length === 0) root = $.root() as unknown as typeof root;

  const parts: string[] = [];
  for (const node of root.contents().toArray()) {
    renderText($, node, parts);
  }

  return parts.join("");
}

export function hashText(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}
