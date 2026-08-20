import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { FRONTEND_DIR, REPO_ROOT } from "./state";

/** Content files the LLM is allowed to see and edit. */
const CONTENT_DIRS = ["sections", "profiles", "nationalities"] as const;

const CONTEXT_LINES = 25;

export interface FileExcerpt {
  /** Repo-relative path with forward slashes. */
  file: string;
  /** 1-indexed line the excerpt starts at. */
  startLine: number;
  text: string;
}

export interface CitedContent {
  excerpts: FileExcerpt[];
  /** Repo-relative paths of every file containing a citation of the source. */
  files: string[];
}

function contentFiles(): string[] {
  const files: string[] = [];
  for (const dir of CONTENT_DIRS) {
    const abs = join(FRONTEND_DIR, "src", "data", dir);
    for (const file of readdirSync(abs)) {
      if (file.endsWith(".ts") && file !== "index.ts" && file !== "registry.ts") {
        files.push(join(abs, file));
      }
    }
  }
  return files;
}

function repoRelative(absPath: string): string {
  return relative(REPO_ROOT, absPath).split("\\").join("/");
}

/**
 * Find every content block citing one of the given source ids and return
 * surrounding excerpts to ground the LLM's proposed edit.
 */
export function gatherCitedContent(sourceIds: string[]): CitedContent {
  const markers = sourceIds.map((id) => `[CITE: ${id}]`);
  const excerpts: FileExcerpt[] = [];
  const filesWithMatches = new Set<string>();

  for (const absPath of contentFiles()) {
    const content = readFileSync(absPath, "utf8");
    if (!markers.some((m) => content.includes(m))) continue;

    const lines = content.split("\n");
    const matchedLines: number[] = [];
    lines.forEach((line, i) => {
      if (markers.some((m) => line.includes(m))) matchedLines.push(i);
    });
    if (matchedLines.length === 0) continue;

    const relPath = repoRelative(absPath);
    filesWithMatches.add(relPath);

    // Merge overlapping ±CONTEXT_LINES windows around each match.
    const ranges: Array<[number, number]> = [];
    for (const lineNo of matchedLines) {
      const start = Math.max(0, lineNo - CONTEXT_LINES);
      const end = Math.min(lines.length, lineNo + CONTEXT_LINES + 1);
      const last = ranges[ranges.length - 1];
      if (last && start <= last[1]) {
        last[1] = Math.max(last[1], end);
      } else {
        ranges.push([start, end]);
      }
    }

    for (const [start, end] of ranges) {
      excerpts.push({
        file: relPath,
        startLine: start + 1,
        text: lines.slice(start, end).join("\n"),
      });
    }
  }

  return { excerpts, files: [...filesWithMatches] };
}
