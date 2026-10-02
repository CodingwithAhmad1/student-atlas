/**
 * Print the normalized text of one URL, exactly as the watcher would hash it.
 * Used by the MCP server's check_trait_column to re-derive a trait column.
 *
 *   npx tsx src/page-text.ts <url>
 */
import { monitoredSources } from "../../frontend/src/data/source-registry";
import { fetchPage } from "./fetch";
import { normalizeHtml } from "./normalize";

const url = process.argv[2];
if (!url) {
  console.error("usage: npx tsx src/page-text.ts <url>");
  process.exit(2);
}
// Use the source's own selectors and cap, if any, so the text matches the watcher's.
const source = monitoredSources.find((s) => s.url === url);
const { html, pdfText } = await fetchPage(url, source?.maxTextChars);
process.stdout.write(
  pdfText ??
    normalizeHtml(html, { url, contentSelector: source?.contentSelector, stripSelectors: source?.stripSelectors, maxTextChars: source?.maxTextChars })
);
