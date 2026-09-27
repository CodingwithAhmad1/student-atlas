import { appendFileSync, readFileSync } from "node:fs";
import pLimit from "p-limit";
import { diffTexts } from "./diff";
import { FetchError, fetchPage } from "./fetch";
import { hashText, normalizeHtml } from "./normalize";
import { loadTargets } from "./sources";
import {
  archiveOldAlerts,
  blankStatus,
  findOpenAlert,
  findResolvedAlert,
  makeAlertId,
  readAlerts,
  readCandidate,
  readSnapshot,
  removeCandidate,
  readStatusFile,
  removeOrphanSnapshots,
  writeAlert,
  writeCandidate,
  writeSnapshot,
  writeStatusFile,
} from "./state";
import {
  OPEN_ALERT_STATUSES,
  UNHEALTHY_FAILURE_THRESHOLD,
  type ActivityAlert,
  type MonitoredTarget,
  type SourceStatus,
} from "./types";

interface CliOptions {
  dryRun: boolean;
  source: string | null;
  fixture: string | null;
}

function parseArgs(argv: string[]): CliOptions {
  const opts: CliOptions = { dryRun: false, source: null, fixture: null };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--dry-run") opts.dryRun = true;
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
  // A fixture is a test input; it must never overwrite real snapshots or state.
  if (opts.fixture) opts.dryRun = true;
  return opts;
}

interface FetchOutcome {
  target: MonitoredTarget;
  text?: string;
  httpStatus?: number;
  error?: { message: string; status: number | null };
}

function normalizeFor(target: MonitoredTarget, html: string): string {
  return normalizeHtml(html, {
    url: target.url,
    contentSelector: target.contentSelector,
    stripSelectors: target.stripSelectors,
  });
}

async function fetchAll(
  targets: MonitoredTarget[],
  fixture: string | null
): Promise<FetchOutcome[]> {
  if (fixture) {
    const html = readFileSync(fixture, "utf8");
    return targets.map((target) => ({
      target,
      text: normalizeFor(target, html),
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
            const text = normalizeFor(target, html);
            // A blank page after normalization is a JS shell, and a short
            // maintenance/error notice is an interstitial — neither is a
            // monitorable baseline, so treat them as failed checks.
            const problem = unmonitorableReason(text);
            if (problem) {
              return { target, error: { message: problem, status } };
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

/** Short pages that say the site is down or misrouted rather than giving guidance. */
const INTERSTITIAL_PATTERNS: RegExp[] = [
  /\b(currently|temporarily) unavailable\b/i,
  /\b(undergoing|under|due to) (routine |scheduled |planned )?maintenance\b/i,
  /\bunable to redirect you\b/i,
  /\bservice unavailable\b/i,
  /\baccess denied\b/i,
];

function unmonitorableReason(text: string): string | null {
  const trimmed = text.trim();
  if (trimmed.length < 40) {
    return "page rendered no monitorable text (likely a JavaScript-only page)";
  }
  if (trimmed.length < 600 && INTERSTITIAL_PATTERNS.some((re) => re.test(trimmed))) {
    return `page served a maintenance or error notice instead of content: "${trimmed.slice(0, 120)}"`;
  }
  return null;
}

class Run {
  changes = 0;

  constructor(
    private readonly opts: CliOptions,
    private readonly alerts: ActivityAlert[],
    private readonly now: string
  ) {}

  private save(alert: ActivityAlert): void {
    if (!this.opts.dryRun) writeAlert(alert);
  }

  /** Close an open alert that no longer needs a human (page reverted, noise, reachable again). */
  private autoResolve(alert: ActivityAlert, note: string): void {
    alert.status = "dismissed";
    alert.resolution = { note, edits: [] };
    alert.resolvedAt = this.now;
    if (alert.kind === "change") alert.significance = "noise";
    console.log(`  → auto-resolved ${alert.id}: ${note}`);
    this.save(alert);
  }

  /** Close an open change alert and drop the text it was waiting on. */
  private closeChange(target: MonitoredTarget, alert: ActivityAlert, note: string): void {
    this.autoResolve(alert, note);
    if (!this.opts.dryRun) removeCandidate(target.key);
  }

  private advanceBaseline(target: MonitoredTarget, text: string, status: SourceStatus): void {
    if (this.opts.dryRun) return;
    writeSnapshot(target.key, text);
    status.lastChangedAt = this.now;
  }

  /** Remember the page text an open alert shows, so its review can later become the baseline. */
  private recordCandidate(target: MonitoredTarget, text: string): void {
    if (!this.opts.dryRun) writeCandidate(target.key, text);
  }

  handleFailure(outcome: FetchOutcome, status: SourceStatus): void {
    const { target, error } = outcome;
    status.lastCheckedAt = this.now;
    status.lastHttpStatus = error?.status ?? null;
    status.lastError = error?.message ?? "unknown error";
    status.consecutiveFailures += 1;
    console.warn(
      `✗ ${target.sourceId}: fetch failed (${status.consecutiveFailures} in a row) — ${status.lastError}`
    );

    if (
      status.consecutiveFailures < UNHEALTHY_FAILURE_THRESHOLD ||
      findOpenAlert(this.alerts, target.sourceId, "unreachable")
    ) {
      return;
    }
    const alert: ActivityAlert = {
      id: makeAlertId(this.now, `${target.key}-unreachable`),
      kind: "unreachable",
      sourceId: target.sourceId,
      relatedSourceIds: target.relatedSourceIds,
      sourceLabel: target.label,
      sourceUrl: target.url,
      country: target.country,
      category: target.category,
      detectedAt: this.now,
      updatedAt: this.now,
      oldHash: status.lastHash,
      newHash: `unreachable-${this.now.slice(0, 10)}`,
      diff: "",
      diffTruncated: false,
      significance: null,
      summary: `This source has been unreachable for ${UNHEALTHY_FAILURE_THRESHOLD} consecutive checks (${status.lastError}). The page may have moved — the citation URL needs a manual review.`,
      status: "manual",
      resolution: null,
      resolvedAt: null,
      error: status.lastError,
    };
    this.alerts.push(alert);
    this.save(alert);
    console.warn(`  → raised "needs attention" alert ${alert.id}`);
  }

  handleFetched(target: MonitoredTarget, text: string, status: SourceStatus): void {
    const unreachable = findOpenAlert(this.alerts, target.sourceId, "unreachable");
    if (unreachable) this.autoResolve(unreachable, "The source is reachable again.");

    const newHash = hashText(text);
    status.lastHash = newHash;

    const open = findOpenAlert(this.alerts, target.sourceId, "change");
    let baseline = readSnapshot(target.key);

    // The alert for this page was resolved since the last run: the text it
    // showed has been reviewed, so it is the new baseline. Any change since
    // then is diffed against it and raises a fresh alert.
    const reviewed = open ? null : readCandidate(target.key);
    if (reviewed !== null) {
      console.log(`✓ ${target.sourceId}: review finished — reviewed text is the new baseline`);
      baseline = reviewed;
      this.advanceBaseline(target, reviewed, status);
      if (!this.opts.dryRun) removeCandidate(target.key);
    }

    if (baseline === null) {
      console.log(`+ ${target.sourceId}: first snapshot recorded`);
      this.advanceBaseline(target, text, status);
      return;
    }

    if (newHash === hashText(baseline)) {
      if (open) this.closeChange(target, open, "The page returned to the last reviewed version.");
      return;
    }

    const { diff, truncated, noiseOnly } = diffTexts(baseline, text, target.sourceId);

    if (noiseOnly) {
      console.log(`~ ${target.sourceId}: only noise or reordering changed — baseline updated`);
      this.advanceBaseline(target, text, status);
      if (open) {
        this.closeChange(target, open, "What remains of the change is formatting or reordering noise.");
      }
      return;
    }

    // Already reviewed: the page is exactly what a resolved alert looked at.
    // (Fallback for alerts raised before candidates were recorded.)
    const resolved = findResolvedAlert(this.alerts, target.sourceId, newHash);
    if (resolved) {
      console.log(`✓ ${target.sourceId}: matches reviewed alert ${resolved.id} — baseline updated`);
      this.advanceBaseline(target, text, status);
      if (open) this.closeChange(target, open, `The page matches the version reviewed in ${resolved.id}.`);
      return;
    }

    this.changes += 1;

    this.recordCandidate(target, text);

    if (open) {
      if (open.newHash === newHash) {
        console.log(`! ${target.sourceId}: still awaiting review (${open.id})`);
        return;
      }
      open.newHash = newHash;
      open.diff = diff;
      open.diffTruncated = truncated;
      open.updatedAt = this.now;
      status.lastChangedAt = this.now;
      console.log(`! ${target.sourceId}: changed again — updated open alert ${open.id}`);
      this.save(open);
      return;
    }

    const alert: ActivityAlert = {
      id: makeAlertId(this.now, target.key),
      kind: "change",
      sourceId: target.sourceId,
      relatedSourceIds: target.relatedSourceIds,
      sourceLabel: target.label,
      sourceUrl: target.url,
      country: target.country,
      category: target.category,
      detectedAt: this.now,
      updatedAt: this.now,
      oldHash: hashText(baseline),
      newHash,
      diff,
      diffTruncated: truncated,
      significance: null,
      summary: null,
      status: "pending",
      resolution: null,
      resolvedAt: null,
      error: null,
    };
    status.lastChangedAt = this.now;
    this.alerts.push(alert);
    this.save(alert);
    console.log(`! ${target.sourceId}: content changed — new alert ${alert.id}`);
  }
}

function writeJobSummary(alerts: ActivityAlert[], line: string): void {
  const path = process.env.GITHUB_STEP_SUMMARY;
  if (!path) return;
  const open = alerts
    .filter((a) => OPEN_ALERT_STATUSES.includes(a.status))
    .sort((a, b) => a.detectedAt.localeCompare(b.detectedAt));
  const rows = open
    .map((a) => `| ${a.detectedAt.slice(0, 10)} | ${a.status} | ${a.sourceId} |`)
    .join("\n");
  appendFileSync(
    path,
    `## Student Atlas monitor\n\n${line}\n\n**${open.length} open alert(s)** awaiting review.\n\n` +
      (open.length ? `| Detected | Status | Source |\n|---|---|---|\n${rows}\n` : "")
  );
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
  const alerts = readAlerts();
  const outcomes = await fetchAll(targets, opts.fixture);
  const now = new Date().toISOString();

  const fetchable = outcomes.filter((o) => !o.target.skipReason);
  const failed = fetchable.filter((o) => o.error || o.text === undefined);
  if (fetchable.length > 1 && failed.length === fetchable.length) {
    // Don't record this as a failure of every source — it's the runner.
    console.error("Every fetch failed — assuming a runner network problem; no state written.");
    process.exit(1);
  }

  const run = new Run(opts, alerts, now);

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
      run.handleFailure(outcome, status);
      continue;
    }

    status.lastCheckedAt = now;
    status.lastHttpStatus = outcome.httpStatus ?? null;
    status.consecutiveFailures = 0;
    status.lastError = null;
    run.handleFetched(target, outcome.text, status);
  }

  // Drop status entries and snapshots for sources no longer cited (full real runs only).
  if (!opts.source && !opts.dryRun) {
    const live = new Set(targets.map((t) => t.sourceId));
    for (const id of Object.keys(statusFile.sources)) {
      if (!live.has(id)) delete statusFile.sources[id];
    }
    removeOrphanSnapshots(new Set(targets.map((t) => t.key)));
  }

  if (!opts.dryRun) {
    statusFile.generatedAt = now;
    writeStatusFile(statusFile);
    archiveOldAlerts();
  }

  const line = `Done: ${outcomes.length} checked, ${run.changes} with unreviewed changes, ${failed.length} fetch failure(s).`;
  console.log(line);
  if (!opts.dryRun) writeJobSummary(alerts, line);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
