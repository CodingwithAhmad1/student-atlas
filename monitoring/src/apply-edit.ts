import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { FRONTEND_DIR, REPO_ROOT } from "./state";
import type { DraftEdit } from "./types";

export interface AppliedEdits {
  /** Repo-relative path -> full new file content. */
  contents: Map<string, string>;
}

/**
 * Apply validated edits to the working tree, run the type/build gate, capture
 * the resulting file contents, then restore the working tree. Throws (after
 * restoring) if anything fails — callers mark the alert "manual".
 */
export function applyAndValidate(edits: DraftEdit[]): AppliedEdits {
  const files = [...new Set(edits.map((e) => e.file))];
  const originals = new Map<string, string>(
    files.map((file) => [file, readFileSync(join(REPO_ROOT, file), "utf8")])
  );

  try {
    for (const edit of edits) {
      const abs = join(REPO_ROOT, edit.file);
      const current = readFileSync(abs, "utf8");
      const occurrences = current.split(edit.oldText).length - 1;
      if (occurrences !== 1) {
        throw new Error(
          `oldText no longer unique in ${edit.file} (${occurrences} occurrences)`
        );
      }
      writeFileSync(abs, current.replace(edit.oldText, edit.newText), "utf8");
    }

    execFileSync("npx", ["tsc", "--noEmit", "-p", "tsconfig.app.json"], {
      cwd: FRONTEND_DIR,
      stdio: "pipe",
      timeout: 300_000,
    });
    execFileSync("npm", ["run", "build"], {
      cwd: FRONTEND_DIR,
      stdio: "pipe",
      timeout: 600_000,
    });

    const contents = new Map<string, string>(
      files.map((file) => [file, readFileSync(join(REPO_ROOT, file), "utf8")])
    );
    return { contents };
  } catch (err) {
    const message =
      err && typeof err === "object" && "stdout" in err && err.stdout
        ? `${String(err)}\n${String(err.stdout).slice(0, 4000)}`
        : String(err);
    throw new Error(`Draft failed validation: ${message}`);
  } finally {
    for (const [file, content] of originals) {
      writeFileSync(join(REPO_ROOT, file), content, "utf8");
    }
  }
}
