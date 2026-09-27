/**
 * Print the normalized text of one URL, exactly as the watcher would hash it.
 * Used by the MCP server's check_trait_column to re-derive a trait column.
 *
 *   npx tsx src/page-text.ts <url>
 */
import { fetchPage } from "./fetch";
import { normalizeHtml } from "./normalize";

const url = process.argv[2];
if (!url) {
  console.error("usage: npx tsx src/page-text.ts <url>");
  process.exit(2);
}
const { html } = await fetchPage(url);
process.stdout.write(normalizeHtml(html, { url }));
