import { createTwoFilesPatch } from "diff";
import { isNoiseLine } from "./normalize";

const MAX_DIFF_LINES = 400;
const MAX_DIFF_BYTES = 15_000;

export interface DiffResult {
  diff: string;
  truncated: boolean;
  /**
   * True when the change carries no new wording — every changed line is
   * recognized noise, or lines only moved around (e.g. a reordered sidebar).
   */
  noiseOnly: boolean;
}

export function diffTexts(
  oldText: string,
  newText: string,
  label: string
): DiffResult {
  const patch = createTwoFilesPatch(
    label,
    label,
    oldText,
    newText,
    "previous",
    "current",
    { context: 3 }
  );

  const lines = patch.split("\n");
  const changedLines = lines.filter(
    (line) =>
      (line.startsWith("+") || line.startsWith("-")) &&
      !line.startsWith("+++") &&
      !line.startsWith("---")
  );

  const noiseOnly =
    changedLines.every((line) => {
      const content = line.slice(1).trim();
      return content.length === 0 || isNoiseLine(content);
    }) || isPureReorder(changedLines);

  let truncated = false;
  let outLines = lines;
  if (outLines.length > MAX_DIFF_LINES) {
    outLines = outLines.slice(0, MAX_DIFF_LINES);
    truncated = true;
  }
  let diff = outLines.join("\n");
  if (Buffer.byteLength(diff, "utf8") > MAX_DIFF_BYTES) {
    diff = Buffer.from(diff, "utf8").subarray(0, MAX_DIFF_BYTES).toString("utf8");
    truncated = true;
  }
  if (truncated) {
    diff += "\n… diff truncated …";
  }

  return { diff, truncated, noiseOnly };
}

/** Removed and added lines are the same multiset — content moved, nothing new. */
function isPureReorder(changedLines: string[]): boolean {
  const counts = new Map<string, number>();
  for (const line of changedLines) {
    const content = line.slice(1).trim();
    const delta = line.startsWith("+") ? 1 : -1;
    counts.set(content, (counts.get(content) ?? 0) + delta);
  }
  return [...counts.values()].every((n) => n === 0);
}
