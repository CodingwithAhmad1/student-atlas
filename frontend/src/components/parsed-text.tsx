import type { ReactNode } from "react";
import { INLINE_REGEX, termDisplay } from "@/lib/inline-markup";
import { InfoTip } from "./info-tip";

/**
 * Renders inline markup. Citation markers are not shown inline — the page's
 * Sources pill and footer list them instead (see collectCitations).
 */
export function ParsedText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_REGEX)) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2] != null) {
      parts.push(
        <InfoTip
          key={match.index}
          termKey={match[2].trim()}
          displayText={termDisplay(match[2], match[3])}
        />
      );
    } else if (match[4] != null) {
      parts.push(<strong key={match.index}>{match[4].slice(2, -2)}</strong>);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return <>{parts}</>;
}
