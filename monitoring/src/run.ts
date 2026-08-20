import { readFileSync } from "node:fs";
import pLimit from "p-limit";
import { applyAndValidate } from "./apply-edit";
import { gatherCitedContent } from "./blocks";
import { draftWithClaude, validateDraft } from "./claude";
import { diffTexts } from "./diff";
import { FetchError, fetchPage } from "./fetch";
import { openDraftPr } from "./github";
import { hashText, normalizeHtml } from "./normalize";
import { loadTargets } from "./sources";
import {
  archiveOldAlerts,
  blankStatus,
  findExistingAlert,
  makeAlertId,
  readAllAlerts,
  readSnapshot,
  readStatusFile,
  removeSampleAlerts,
  writeAlert,
  writeSnapshot,
  writeStatusFile,
} from "./state";
import {
  UNHEALTHY_FAILURE_THRESHOLD,
  type ActivityAlert,
  type MonitoredTarget,
  type SourceStatus,
} from "./types";

interface CliOptions {
  dryRun: boolean;
  noLlm: boolean;
  noPr: boolean;
  source: string | null;
  fixture: string | null;
}

function parseArgs(argv: string[]): CliOptions {
  const opts: CliOptions = {
    dryRun: false,
    noLlm: false,
    noPr: false,
    source: null,
    fixture: null,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--dry-run") opts.dryRun = true;
    else if (arg === "--no-llm") opts.noLlm = true;
    else if (arg === "--no-pr") opts.noPr = true;
    else if (arg === "--source") opts.source = argv[++i] ?? null;
    else if (arg === "--fixture") opts.fixture = argv[++i] ?? null;
    else {
      console.error(`Unknown argument: ${arg}`);
      process.exit(2);
    }
  }
  if (opts.fixture && !opts.source) {
    console.error("--fixture requires --source");
    process.exit(2);
  }
  return opts;
}

interface FetchOutcome {
  target: MonitoredTarget;
  text?: string;
  httpStatus?: number;
  error?: { message: string; status: number | null };
}

async function fetchAll(
  targets: MonitoredTarget[],
  fixture: string | null
): Promise<FetchOutcome[]> {
  if (fixture) {
    const html = readFileSync(fixture, "utf8");
    return targets.map((target) => ({
      target,
      text: normalizeHtml(html, target.contentSelector, target.url),
      httpStatus: 200,
    }));
  }

  const globalLimit = pLimit(4);
  const hostLimits = new Map<string, ReturnType<typeof pLimit>>();
  const hostLimit = (url: string) => {
    const host = new URL(url).hostname;
    let limit = hostLimits.get(host);
    if (!limit) {
      limit = pLimit(1);
      hostLimits.set(host, limit);
    }
    return limit;
  };

  return Promise.all(
    targets.map((target) => {
      if (target.skipReason) {
        return Promise.resolve<FetchOutcome>({ target });
      }
      return hostLimit(target.url)(() =>
        globalLimit(async (): Promise<FetchOutcome> => {
          try {
            const { status, html } = await fetchPage(target.url);
            const text = normalizeHtml(html, target.contentSelector, target.url);
            // A blank page after normalization is a JS shell or interstitial,
            // not a monitorable baseline — treat it as a failed check.
            if (text.trim().length < 40) {
              return {
                target,
                error: {
                  message:
                    "page rendered no monitorable text (likely a JavaScript-only page)",
                  status,
                },
              };
            }
            return { target, text, httpStatus: status };
          } catch (err) {
            return {
              target,
              error: {
                message: err instanceof Error ? err.message : String(err),
                status: err instanceof FetchError ? err.status : null,
              },
            };
          }
        })
      );
    })
  );
}

function handleFailure(
  outcome: FetchOutcome,
  status: SourceStatus,
  now: string,
  opts: CliOptions
): void {
  const { target, error } = outcome;
  status.lastCheckedAt = now;
  status.lastHttpStatus = error?.status ?? null;
  status.lastError = error?.message ?? "unknown error";
  status.consecutiveFailures += 1;
  console.warn(
    `✗ ${target.sourceId}: fetch failed (${status.consecutiveFailures} in a row) — ${status.lastError}`
  );

  if (status.consecutiveFailures === UNHEALTHY_FAILURE_THRESHOLD && !opts.dryRun) {
    const alert: ActivityAlert = {
      id: makeAlertId(now, `${target.key}-unreachable`),
      sourceId: target.sourceId,
      relatedSourceIds: target.relatedSourceIds,
      sourceLabel: target.label,
      sourceUrl: target.url,
      country: target.country,
      category: target.category,
      detectedAt: now,
      oldHash: status.lastHash,
      newHash: `unreachable-${now.slice(0, 10)}`,
      diff: "",
      diffTruncated: false,
      significance: null,
      summary: `This source has been unreachable for ${UNHEALTHY_FAILURE_THRESHOLD} consecutive checks (${status.lastError}). The page may have moved — the citation URL needs a manual review.`,
      confidence: null,
      status: "manual",
      draft: null,
      pr: null,
      resolvedAt: null,
      error: status.lastError,
    };
    writeAlert(alert);
    console.warn(`  → raised "needs attention" alert ${alert.id}`);
  }
}

async function handleChange(
  outcome: FetchOutcome & { text: string },
  status: SourceStatus,
  oldText: string,
  existingAlerts: ActivityAlert[],
  now: string,
  opts: CliOptions
): Promise<void> {
  const { target, text } = outcome;
  const newHash = hashText(text);
  const { diff, truncated, noiseOnly } = diffTexts(oldText, text, target.sourceId);

  if (noiseOnly) {
    console.log(`~ ${target.sourceId}: changed, but only recognized noise — snapshot updated silently`);
    if (!opts.dryRun) {
      writeSnapshot(target.key, text);
      status.lastHash = newHash;
    }
    return;
  }

  console.log(`! ${target.sourceId}: content changed`);

  const existing = findExistingAlert(existingAlerts, target.sourceId, newHash);
  if (existing && existing.status !== "pending") {
    // Already fully processed in an earlier run (e.g. re-run after a crash
    // before the snapshot write landed). Just catch the snapshot up.
    console.log(`  → alert ${existing.id} already recorded (${existing.status})`);
    if (!opts.dryRun) {
      writeSnapshot(target.key, text);
      status.lastHash = newHash;
      status.lastChangedAt = existing.detectedAt;
    }
    return;
  }

  const alert: ActivityAlert = existing ?? {
    id: makeAlertId(now, target.key),
    sourceId: target.sourceId,
    relatedSourceIds: target.relatedSourceIds,
    sourceLabel: target.label,
    sourceUrl: target.url,
    country: target.country,
    category: target.category,
    detectedAt: now,
    oldHash: hashText(oldText),
    newHash,
    diff,
    diffTruncated: truncated,
    significance: null,
    summary: null,
    confidence: null,
    status: "pending",
    draft: null,
    pr: null,
    resolvedAt: null,
    error: null,
  };
  alert.diff = diff;
  alert.diffTruncated = truncated;
  alert.error = null;

  if (opts.noLlm) {
    console.log(`  → recorded as pending (--no-llm)`);
    if (!opts.dryRun) writeAlert(alert);
    return;
  }

  try {
    const cited = gatherCitedContent([target.sourceId, ...target.relatedSourceIds]);
    const draft = await draftWithClaude(target, alert.diff, cited);
    alert.significance = draft.significance;
    alert.summary = draft.summary;
    alert.confidence = draft.confidence;

    if (draft.significance === "noise") {
      alert.status = "dismissed";
      alert.resolvedAt = now;
      console.log(`  → LLM classified as noise; dismissed`);
    } else if (draft.edits.length === 0) {
      alert.status = "manual";
      alert.draft = { rationale: draft.rationale, edits: [] };
      console.log(`  → ${draft.significance}, no safe auto-edit; marked for manual attention`);
    } else {
      const validation = validateDraft(draft, cited);
      if (!validation.ok) {
        alert.status = "manual";
        alert.draft = { rationale: draft.rationale, edits: [] };
        alert.error = `Draft rejected by validation: ${validation.problems.join("; ")}`;
        console.warn(`  → draft failed validation: ${validation.problems.join("; ")}`);
      } else {
        alert.draft = { rationale: draft.rationale, edits: validation.edits };
        if (opts.noPr || opts.dryRun) {
          alert.status = "manual";
          console.log(`  → draft ready (${validation.edits.length} edit(s)); PR skipped (${opts.dryRun ? "--dry-run" : "--no-pr"})`);
        } else {
          const applied = applyAndValidate(validation.edits);
          const pr = await openDraftPr(
            alert.id,
            target,
            draft.summary,
            draft.rationale,
            alert.diff,
            applied.contents
          );
          alert.pr = pr;
          alert.status = "review";
          console.log(`  → opened PR #${pr.number}: ${pr.url}`);
        }
      }
    }
  } catch (err) {
    // Leave the alert pending and the snapshot untouched — the next run will
    // recompute the same diff, find this alert by (sourceId, newHash), and retry.
    alert.status = "pending";
    alert.error = err instanceof Error ? err.message : String(err);
    console.error(`  → pipeline error (will retry next run): ${alert.error}`);
    if (!opts.dryRun) writeAlert(alert);
    return;
  }

  if (!opts.dryRun) {
    writeAlert(alert);
    writeSnapshot(target.key, text);
    status.lastHash = newHash;
    status.lastChangedAt = now;
  }
}

async function main(): Promise<void> {
  const opts = parseArgs(process.argv.slice(2));
  let targets = loadTargets();

  if (opts.source) {
    targets = targets.filter(
      (t) =>
        t.sourceId === opts.source ||
        t.key === opts.source ||
        t.relatedSourceIds.includes(opts.source as string)
    );
    if (targets.length === 0) {
      console.error(`No monitored source matches "${opts.source}"`);
      process.exit(2);
    }
  }

  console.log(
    `Checking ${targets.length} source URL(s)${opts.dryRun ? " [dry-run]" : ""}${opts.fixture ? ` [fixture: ${opts.fixture}]` : ""}`
  );

  const statusFile = readStatusFile();
  const existingAlerts = readAllAlerts();
  const outcomes = await fetchAll(targets, opts.fixture);
  const now = new Date().toISOString();

  let failures = 0;
  let changes = 0;

  for (const outcome of outcomes) {
    const { target } = outcome;
    const status = statusFile.sources[target.sourceId] ?? blankStatus(target);
    // Refresh registry-derived fields in case the citation was re-labeled.
    status.url = target.url;
    status.label = target.label;
    status.country = target.country;
    status.category = target.category;
    status.skipReason = target.skipReason ?? null;
    statusFile.sources[target.sourceId] = status;

    if (target.skipReason) {
      status.lastError = null;
      status.consecutiveFailures = 0;
      continue;
    }

    if (outcome.error || outcome.text === undefined) {
      failures += 1;
      handleFailure(outcome, status, now, opts);
      continue;
    }

    status.lastCheckedAt = now;
    status.lastHttpStatus = outcome.httpStatus ?? null;
    status.consecutiveFailures = 0;
    status.lastError = null;

    const oldText = readSnapshot(target.key);
    if (oldText === null) {
      console.log(`+ ${target.sourceId}: first snapshot recorded`);
      if (!opts.dryRun) {
        writeSnapshot(target.key, outcome.text);
        status.lastHash = hashText(outcome.text);
      }
      continue;
    }

    if (hashText(outcome.text) === hashText(oldText)) {
      continue; // unchanged
    }

    changes += 1;
    await handleChange(
      { ...outcome, text: outcome.text },
      status,
      oldText,
      existingAlerts,
      now,
      opts
    );
  }

  if (!opts.dryRun) {
    statusFile.generatedAt = now;
    writeStatusFile(statusFile);
    removeSampleAlerts();
    archiveOldAlerts();
  }

  console.log(
    `Done: ${outcomes.length} checked, ${changes} changed, ${failures} fetch failure(s).`
  );

  if (failures === outcomes.length && outcomes.length > 1) {
    console.error("Every fetch failed — assuming a runner network problem.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
