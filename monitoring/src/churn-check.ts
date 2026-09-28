/**
 * Churn check: fetch every monitored source twice, 90 seconds apart, and list
 * the pages whose normalized text differs. Those pages would raise an alert on
 * every run; fix them with a stripSelectors override (source-overrides.ts) or a
 * global entry in normalize.ts. Run after adding a batch of citations.
 *
 *   npx tsx src/churn-check.ts
 */
import pLimit from "p-limit";
import { monitoredSources } from "../../frontend/src/data/source-registry";
import { fetchPage } from "./fetch";
import { hashText, normalizeHtml } from "./normalize";
import { diffLines } from "diff";
const limit = pLimit(8);
async function textOf(s: (typeof monitoredSources)[number]) {
  const { html, pdfText } = await fetchPage(s.url);
  return pdfText ?? normalizeHtml(html, { url: s.url, contentSelector: s.contentSelector, stripSelectors: s.stripSelectors });
}
const targets = monitoredSources.filter((s) => !s.skipReason);
const first = await Promise.all(targets.map((s) => limit(async () => { try { return await textOf(s); } catch { return null; } })));
await new Promise((r) => setTimeout(r, 90_000));
const second = await Promise.all(targets.map((s) => limit(async () => { try { return await textOf(s); } catch { return null; } })));
let churn = 0;
targets.forEach((s, i) => {
  const a = first[i], b = second[i];
  if (a == null || b == null || hashText(a) === hashText(b)) return;
  churn++;
  const changed = diffLines(a, b).filter((p) => p.added || p.removed).map((p) => (p.added ? "+ " : "- ") + p.value.trim().slice(0, 160)).slice(0, 4);
  console.log(`CHURN ${s.sourceId}\n  ${changed.join("\n  ")}`);
});
console.log(`${targets.length} sources compared, ${churn} changed between fetches`);
