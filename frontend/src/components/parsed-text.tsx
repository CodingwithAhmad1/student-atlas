import { citations } from "@/data/citations";

interface ParsedTextProps {
  text: string;
  citationMap: Map<string, number>;
}

const CITE_REGEX = /\[CITE:\s*([^\]]+)\]/g;

export function ParsedText({ text, citationMap }: ParsedTextProps) {
  const parts: (string | { citeId: string; num: number })[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(CITE_REGEX)) {
    const before = text.slice(lastIndex, match.index);
    if (before) parts.push(before);

    const citeId = match[1].trim();
    if (!citationMap.has(citeId)) {
      citationMap.set(citeId, citationMap.size + 1);
    }
    parts.push({ citeId, num: citationMap.get(citeId)! });
    lastIndex = match.index + match[0].length;
  }

  const remaining = text.slice(lastIndex);
  if (remaining) parts.push(remaining);

  return (
    <>
      {parts.map((part, i) => {
        if (typeof part === "string") {
          // Handle bold markdown **text**
          const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
          return (
            <span key={i}>
              {boldParts.map((bp, j) => {
                if (bp.startsWith("**") && bp.endsWith("**")) {
                  return (
                    <strong key={j}>{bp.slice(2, -2)}</strong>
                  );
                }
                return <span key={j}>{bp}</span>;
              })}
            </span>
          );
        }
        const cite = citations[part.citeId];
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
              [{part.num}]
            </a>
          </sup>
        );
      })}
    </>
  );
}
