/**
 * Admin-mode GitHub access for the Activity tab. A fine-grained personal
 * access token (this repo only, Contents + Pull requests read/write) is kept
 * in localStorage and only ever sent to api.github.com. Without a token the
 * tab is read-only; GitHub's own UI remains the fallback for everything here.
 */
const REPO = "HariharRengan/Zim-Side-Quests";
const API = "https://api.github.com";
const PAT_STORAGE_KEY = "atlas-admin-pat";

export function getPat(): string | null {
  try {
    return localStorage.getItem(PAT_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setPat(pat: string): void {
  localStorage.setItem(PAT_STORAGE_KEY, pat.trim());
}

export function clearPat(): void {
  localStorage.removeItem(PAT_STORAGE_KEY);
}

async function gh<T>(method: string, path: string, body?: unknown): Promise<T> {
  const pat = getPat();
  if (!pat) throw new Error("No admin token configured");
  const response = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub ${response.status}: ${text.slice(0, 300)}`);
  }
  return (await response.json()) as T;
}

export interface PrState {
  number: number;
  state: "open" | "closed";
  merged: boolean;
}

export async function fetchPrState(prNumber: number): Promise<PrState> {
  const pr = await gh<{ number: number; state: "open" | "closed"; merged_at: string | null }>(
    "GET",
    `/repos/${REPO}/pulls/${prNumber}`
  );
  return { number: pr.number, state: pr.state, merged: pr.merged_at !== null };
}

/** Approve a draft: squash-merge its PR. The close-sync workflow updates the feed. */
export async function approveDraft(prNumber: number): Promise<void> {
  await gh("PUT", `/repos/${REPO}/pulls/${prNumber}/merge`, {
    merge_method: "squash",
  });
}

/** Reject a draft: close its PR without merging. */
export async function rejectDraft(prNumber: number): Promise<void> {
  await gh("PATCH", `/repos/${REPO}/pulls/${prNumber}`, { state: "closed" });
}
