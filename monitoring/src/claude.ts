import { readFileSync } from "node:fs";
import { join } from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import type { CitedContent } from "./blocks";
import { FRONTEND_DIR, REPO_ROOT } from "./state";
import type { DraftEdit, MonitoredTarget } from "./types";

const MODEL = "claude-sonnet-5";

const DraftResponseSchema = z.object({
  significance: z.enum(["noise", "minor", "meaningful"]),
  summary: z
    .string()
    .describe("One short paragraph, for the public activity feed: what changed on the page and why it matters (or doesn't) for Zimbabwean applicants."),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe("How confident you are in the significance call and the proposed edits."),
  rationale: z
    .string()
    .describe("Why these edits (or why none): which diff lines drove them, and anything a human reviewer should double-check."),
  edits: z
    .array(
      z.object({
        file: z.string().describe("Repo-relative path exactly as shown in the excerpts."),
        blockId: z.string().nullable().describe("The id of the IdentifiedBlock being edited, if visible in the excerpt."),
        oldText: z.string().describe("Verbatim substring copied from the excerpt. Must be long enough to be unique in the file."),
        newText: z.string().describe("Replacement text. Keep the same style, markers, and TypeScript string escaping."),
      })
    )
    .describe("Empty when significance is noise, or when the change affects content not present in the excerpts."),
});

export type DraftResponse = z.infer<typeof DraftResponseSchema>;

function contentTypeDefs(): string {
  return readFileSync(join(FRONTEND_DIR, "src", "data", "types.ts"), "utf8");
}

function buildPrompt(
  target: MonitoredTarget,
  diff: string,
  cited: CitedContent
): string {
  const excerptBlocks = cited.excerpts
    .map(
      (e) =>
        `### ${e.file} (starting at line ${e.startLine})\n\`\`\`ts\n${e.text}\n\`\`\``
    )
    .join("\n\n");

  return `You maintain Student Atlas, a visa-guidance site for Zimbabwean students, and a monitored government web page has changed. Decide whether the change matters and, if it does, draft the smallest correct edit to our content.

## Changed source
- Label: ${target.label}
- URL: ${target.url}
- Citation id(s): ${[target.sourceId, ...target.relatedSourceIds].join(", ")}

## Unified diff of the page's normalized text (previous -> current)
\`\`\`diff
${diff}
\`\`\`

## Our content blocks citing this source
These are excerpts from TypeScript content files. Inline markers: \`[CITE: <id>]\` cites a source, \`[TERM: <key>]\` / \`[TERM: <key>|<display>]\` links a glossary term, \`**bold**\` is emphasis.

${excerptBlocks || "(No content blocks cite this source.)"}

## Content block type definitions (for reference)
\`\`\`ts
${contentTypeDefs()}
\`\`\`

## Rules
1. Classify the change: "noise" (tokens, styling, boilerplate, reworded but same meaning), "minor" (real change that does not affect what our content says), or "meaningful" (fees, timelines, eligibility, process steps, or anything our excerpts state that is now wrong).
2. Only propose edits when our content is now inaccurate or incomplete because of this change. A meaningful page change that our content never mentions needs no edit — say so in the rationale.
3. Edits are text-level replacements inside the excerpts shown above. "oldText" must be copied VERBATIM from an excerpt (including quotes, escapes, and markers) and must be unique within its file. Never invent new blocks, new files, or content not grounded in the diff.
4. Preserve every [CITE: ...] and [TERM: ...] marker in the text you edit. Do not add or remove citations.
5. Keep the existing tone, style, and TypeScript string formatting. Remember the text lives inside string literals — keep escaping valid.
6. If the change is meaningful but you cannot map it to a safe text edit in the excerpts, return an empty edits array and explain what a human should update (for example numeric facts in visa-facts.ts, which you cannot edit).
7. Be conservative: when unsure whether a change is meaningful, prefer "minor" with no edits and a clear rationale over speculative edits.`;
}

export async function draftWithClaude(
  target: MonitoredTarget,
  diff: string,
  cited: CitedContent
): Promise<DraftResponse> {
  const client = new Anthropic();
  const response = await client.messages.parse({
    model: MODEL,
    max_tokens: 8000,
    messages: [{ role: "user", content: buildPrompt(target, diff, cited) }],
    output_config: { format: zodOutputFormat(DraftResponseSchema) },
  });
  if (!response.parsed_output) {
    throw new Error("Claude response did not match the expected schema");
  }
  return response.parsed_output;
}

export interface DraftValidation {
  ok: boolean;
  problems: string[];
  edits: DraftEdit[];
}

const MARKER_RE = /\[(?:CITE|TERM):[^\]]*\]/g;

/**
 * Never trust the model: an edit is only applied when its file was a candidate,
 * its oldText occurs exactly once in that file, and it keeps markers intact.
 */
export function validateDraft(
  draft: DraftResponse,
  cited: CitedContent
): DraftValidation {
  const problems: string[] = [];
  const edits: DraftEdit[] = [];

  for (const [i, edit] of draft.edits.entries()) {
    const name = `edit ${i + 1} (${edit.file})`;
    if (!cited.files.includes(edit.file)) {
      problems.push(`${name}: file is not one of the cited content files`);
      continue;
    }
    if (edit.oldText.length < 8) {
      problems.push(`${name}: oldText is too short to locate safely`);
      continue;
    }
    if (edit.oldText === edit.newText) {
      problems.push(`${name}: oldText and newText are identical`);
      continue;
    }
    const content = readFileSync(join(REPO_ROOT, edit.file), "utf8");
    const occurrences = content.split(edit.oldText).length - 1;
    if (occurrences === 0) {
      problems.push(`${name}: oldText not found in file`);
      continue;
    }
    if (occurrences > 1) {
      problems.push(`${name}: oldText occurs ${occurrences} times — not unique`);
      continue;
    }
    const oldMarkers = (edit.oldText.match(MARKER_RE) ?? []).sort();
    const newMarkers = (edit.newText.match(MARKER_RE) ?? []).sort();
    if (JSON.stringify(oldMarkers) !== JSON.stringify(newMarkers)) {
      problems.push(`${name}: [CITE]/[TERM] markers were added, removed, or changed`);
      continue;
    }
    edits.push({
      file: edit.file,
      blockId: edit.blockId,
      oldText: edit.oldText,
      newText: edit.newText,
    });
  }

  return { ok: problems.length === 0, problems, edits };
}
