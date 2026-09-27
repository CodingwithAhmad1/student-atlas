import { glossary } from "@/data/glossary";
import type { ContentBlock } from "@/data/types";

/**
 * Inline markers in content text, matched in a single pass:
 *   1. [CITE: id]           → citation (listed in the page's Sources footer)
 *   2. [TERM: key]          → glossary term (label from glossary)
 *      [TERM: key|display]  → glossary term (custom display text)
 *   3. **bold**
 */
export const INLINE_REGEX =
  /\[CITE:\s*([^\]]+)\]|\[TERM:\s*([^\]|]+?)(?:\|([^\]]+))?\]|(\*\*[^*]+\*\*)/g;

export function termDisplay(key: string, display?: string): string {
  return display?.trim() || glossary[key.trim()]?.label || key.trim();
}

/** Every text field of a block, in reading order. */
export function blockTexts(block: ContentBlock): string[] {
  switch (block.type) {
    case "paragraph":
    case "heading":
      return [block.text];
    case "bullet-list":
    case "ordered-list":
      return block.items;
    case "key-value-list":
      return block.items.flatMap((item) => [item.label, item.value]);
    case "step":
      return [block.title, block.body];
  }
}

/** Citation ids in first-appearance order, without duplicates. */
export function collectCitations(blocks: ContentBlock[]): string[] {
  const seen = new Set<string>();
  for (const block of blocks) {
    for (const text of blockTexts(block)) {
      for (const match of text.matchAll(INLINE_REGEX)) {
        if (match[1] != null) seen.add(match[1].trim());
      }
    }
  }
  return [...seen];
}

/** Plain text for non-React output (PDF): drops citations, resolves terms, unwraps bold. */
export function stripMarkup(text: string): string {
  return text
    .replace(INLINE_REGEX, (_m, cite, termKey, termText, bold) => {
      if (cite != null) return "";
      if (termKey != null) return termDisplay(termKey, termText);
      return (bold as string).slice(2, -2);
    })
    .replace(/[ \t]+([.,;:)])/g, "$1")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}
