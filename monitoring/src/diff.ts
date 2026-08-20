import { createTwoFilesPatch } from "diff";
import { isNoiseLine } from "./normalize";

const MAX_DIFF_LINES = 400;
const MAX_DIFF_BYTES = 15_000;

export interface DiffResult {
  diff: string;
  truncated: boolean;
  /** True when every changed line is recognized noise — no alert needed. */
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
    changedLines.length > 0 &&
    changedLines.every((line) => {
      const content = line.slice(1).trim();
      return content.length === 0 || isNoiseLine(content);
    });

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
