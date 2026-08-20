import type { MonitoredTarget } from "./types";

const API = "https://api.github.com";
export const ALERT_LABEL = "student-atlas-alert";

function repoSlug(): string {
  return process.env.GITHUB_REPOSITORY ?? "HariharRengan/Zim-Side-Quests";
}

function token(): string {
  const t = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  if (!t) throw new Error("GITHUB_TOKEN is not set — cannot open a PR");
  return t;
}

async function gh<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token()}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub ${method} ${path} failed: ${response.status} ${text.slice(0, 500)}`);
  }
  return (await response.json()) as T;
}

async function ensureLabel(): Promise<void> {
  try {
    await gh("POST", `/repos/${repoSlug()}/labels`, {
      name: ALERT_LABEL,
      color: "b60205",
      description: "Automated Student Atlas source-change draft",
    });
  } catch (err) {
    // 422 = already exists — anything else should surface.
    if (!String(err).includes("422")) throw err;
  }
}

export interface CreatedPr {
  number: number;
  url: string;
  branch: string;
}

/**
 * Create a branch off main containing only the drafted content edits and open
 * a labeled PR, entirely through the Git Data API — the local working tree and
 * branch state are untouched.
 */
export async function openDraftPr(
  alertId: string,
  target: MonitoredTarget,
  summary: string,
  rationale: string,
  diff: string,
  contents: Map<string, string>
): Promise<CreatedPr> {
  const repo = repoSlug();
  const branch = `atlas-alert/${alertId}`;

  const mainRef = await gh<{ object: { sha: string } }>(
    "GET",
    `/repos/${repo}/git/ref/${encodeURIComponent("heads/main")}`
  );
  const baseSha = mainRef.object.sha;

  const tree = await gh<{ sha: string }>("POST", `/repos/${repo}/git/trees`, {
    base_tree: baseSha,
    tree: [...contents.entries()].map(([path, content]) => ({
      path,
      mode: "100644",
      type: "blob",
      content,
    })),
  });

  const commit = await gh<{ sha: string }>("POST", `/repos/${repo}/git/commits`, {
    message: `Student Atlas draft: ${target.label}\n\nAlert: ${alertId}\nSource: ${target.url}`,
    tree: tree.sha,
    parents: [baseSha],
  });

  await gh("POST", `/repos/${repo}/git/refs`, {
    ref: `refs/heads/${branch}`,
    sha: commit.sha,
  });

  const title = `[Student Atlas] ${target.label}: ${summary.slice(0, 80)}${summary.length > 80 ? "…" : ""}`;
  const body = [
    `Automated draft for source change alert \`${alertId}\`.`,
    "",
    `**Source:** [${target.label}](${target.url})`,
    "",
    `**Summary:** ${summary}`,
    "",
    `**Rationale:** ${rationale}`,
    "",
    "<details><summary>Page diff (normalized text)</summary>",
    "",
    "```diff",
    diff,
    "```",
    "",
    "</details>",
    "",
    "Merging this PR publishes the edit; closing it rejects the draft. Either way the alert status syncs automatically.",
  ].join("\n");

  const pr = await gh<{ number: number; html_url: string }>(
    "POST",
    `/repos/${repo}/pulls`,
    { title, head: branch, base: "main", body }
  );

  await ensureLabel();
  await gh("POST", `/repos/${repo}/issues/${pr.number}/labels`, {
    labels: [ALERT_LABEL],
  });

  return { number: pr.number, url: pr.html_url, branch };
}
