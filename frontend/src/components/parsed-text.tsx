import { citations } from "@/data/citations";
import { glossary } from "@/data/glossary";
import { InfoTip } from "./info-tip";

interface ParsedTextProps {
  text: string;
  citationMap: Map<string, number>;
}

/**
 * Unified inline-marker regex. Handles three patterns in a single pass:
 *   1. [CITE: id]           → citation superscript
 *   2. [TERM: key]          → glossary tooltip (label from glossary)
 *      [TERM: key|display]  → glossary tooltip (custom display text)
 *   3. **bold**             → <strong>
 */
const INLINE_REGEX =
  /\[CITE:\s*([^\]]+)\]|\[TERM:\s*([^\]|]+?)(?:\|([^\]]+))?\]|(\*\*[^*]+\*\*)/g;

type Token =
  | { type: "text"; value: string }
  | { type: "cite"; citeId: string; num: number }
  | { type: "term"; key: string; display: string }
  | { type: "bold"; value: string };

function tokenize(
  text: string,
  citationMap: Map<string, number>
): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_REGEX)) {
    // Push plain text before this match
    if (match.index > lastIndex) {
      tokens.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }

    if (match[1] != null) {
      // Citation: [CITE: id]
      const citeId = match[1].trim();
      if (!citationMap.has(citeId)) {
        citationMap.set(citeId, citationMap.size + 1);
      }
      tokens.push({ type: "cite", citeId, num: citationMap.get(citeId)! });
    } else if (match[2] != null) {
      // Term: [TERM: key] or [TERM: key|display]
      const key = match[2].trim();
      const display = match[3]?.trim() ?? glossary[key]?.label ?? key;
      tokens.push({ type: "term", key, display });
    } else if (match[4] != null) {
      // Bold: **text**
      tokens.push({ type: "bold", value: match[4].slice(2, -2) });
    }

    lastIndex = match.index + match[0].length;
  }

  // Trailing plain text
  if (lastIndex < text.length) {
    tokens.push({ type: "text", value: text.slice(lastIndex) });
  }

  return tokens;
}

export function ParsedText({ text, citationMap }: ParsedTextProps) {
  const tokens = tokenize(text, citationMap);

  return (
    <>
      {tokens.map((token, i) => {
        switch (token.type) {
          case "text":
            return <span key={i}>{token.value}</span>;

          case "bold":
            return <strong key={i}>{token.value}</strong>;

          case "term":
            return (
              <InfoTip
                key={i}
                termKey={token.key}
                displayText={token.display}
              />
            );

          case "cite": {
            const cite = citations[token.citeId];
            if (!cite) {
              return (
                <sup key={i} className="text-red-500">
                  [?]
                </sup>
              );
            }
            return (
              <sup key={i}>
                <a
                  href={cite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline decoration-dotted ml-0.5"
                  title={cite.label}
                >
                  [{token.num}]
                </a>
              </sup>
            );
          }
        }
      })}
    </>
  );
}
