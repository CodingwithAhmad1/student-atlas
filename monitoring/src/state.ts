import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type {
  ActivityAlert,
  MonitoredTarget,
  SourceStatus,
  SourceStatusFile,
} from "./types";
import { OPEN_ALERT_STATUSES } from "./types";

const HERE = dirname(fileURLToPath(import.meta.url));

/** "<repo>/Student Atlas/monitoring" */
export const MONITORING_DIR = resolve(HERE, "..");
/** "<repo>/Student Atlas" */
export const APP_DIR = resolve(MONITORING_DIR, "..");
export const FRONTEND_DIR = join(APP_DIR, "frontend");

/**
 * Reviewed baselines: a snapshot only advances when a change is resolved (or
 * turns out to be noise), so an open alert's diff always shows everything
 * that changed since the last review.
 */
export const SNAPSHOTS_DIR = join(MONITORING_DIR, "snapshots");
export const ARCHIVE_DIR = join(MONITORING_DIR, "archive");

/** Alert JSONs and source status, bundled by Vite into the Activity tab. */
export const FRONTEND_MONITORING_DIR = join(FRONTEND_DIR, "src", "data", "monitoring");
export const ALERTS_DIR = join(FRONTEND_MONITORING_DIR, "alerts");
export const STATUS_FILE = join(FRONTEND_MONITORING_DIR, "status.json");

/** Newest alerts kept bundled with the frontend; older ones move to archive/. */
const MAX_BUNDLED_ALERTS = 200;

function ensureDirs(): void {
  for (const dir of [SNAPSHOTS_DIR, ARCHIVE_DIR, ALERTS_DIR]) {
    mkdirSync(dir, { recursive: true });
  }
}

export function snapshotPath(key: string): string {
  return join(SNAPSHOTS_DIR, `${key}.txt`);
}

export function readSnapshot(key: string): string | null {
  const path = snapshotPath(key);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf8");
}

export function writeSnapshot(key: string, text: string): void {
  ensureDirs();
  writeFileSync(snapshotPath(key), text, "utf8");
}

/** Delete baselines of pages that are no longer cited. */
export function removeOrphanSnapshots(liveKeys: Set<string>): void {
  if (!existsSync(SNAPSHOTS_DIR)) return;
  for (const file of readdirSync(SNAPSHOTS_DIR)) {
    if (file.endsWith(".txt") && !liveKeys.has(file.slice(0, -4))) {
      rmSync(join(SNAPSHOTS_DIR, file));
      console.log(`- removed snapshot for uncited source: ${file}`);
    }
  }
}

export function readStatusFile(): SourceStatusFile {
  if (!existsSync(STATUS_FILE)) {
    return { generatedAt: null, sources: {} };
  }
  return JSON.parse(readFileSync(STATUS_FILE, "utf8")) as SourceStatusFile;
}

export function writeStatusFile(status: SourceStatusFile): void {
  ensureDirs();
  writeFileSync(STATUS_FILE, `${JSON.stringify(status, null, 2)}\n`, "utf8");
}

export function blankStatus(target: MonitoredTarget): SourceStatus {
  return {
    sourceId: target.sourceId,
    url: target.url,
    country: target.country,
    category: target.category,
    label: target.label,
    lastCheckedAt: null,
    lastChangedAt: null,
    lastHash: null,
    lastHttpStatus: null,
    consecutiveFailures: 0,
    lastError: null,
    skipReason: null,
  };
}

function alertPath(id: string): string {
  return join(ALERTS_DIR, `${id}.json`);
}

/** Bundled alerts only — archived alerts are history and never reopened. */
export function readAlerts(): ActivityAlert[] {
  if (!existsSync(ALERTS_DIR)) return [];
  const alerts: ActivityAlert[] = [];
  for (const file of readdirSync(ALERTS_DIR)) {
    if (!file.endsWith(".json")) continue;
    try {
      alerts.push(JSON.parse(readFileSync(join(ALERTS_DIR, file), "utf8")) as ActivityAlert);
    } catch (err) {
      console.warn(`Skipping unreadable alert ${file}: ${String(err)}`);
    }
  }
  return alerts;
}

/** The single open alert of this kind for a source, if any. */
export function findOpenAlert(
  alerts: ActivityAlert[],
  sourceId: string,
  kind: ActivityAlert["kind"]
): ActivityAlert | undefined {
  return alerts.find(
    (a) =>
      a.sourceId === sourceId &&
      a.kind === kind &&
      OPEN_ALERT_STATUSES.includes(a.status)
  );
}

/** A resolved change alert whose reviewed page text matches `newHash`. */
export function findResolvedAlert(
  alerts: ActivityAlert[],
  sourceId: string,
  newHash: string
): ActivityAlert | undefined {
  return alerts.find(
    (a) =>
      a.sourceId === sourceId &&
      a.kind === "change" &&
      a.newHash === newHash &&
      !OPEN_ALERT_STATUSES.includes(a.status)
  );
}

export function writeAlert(alert: ActivityAlert): void {
  ensureDirs();
  writeFileSync(alertPath(alert.id), `${JSON.stringify(alert, null, 2)}\n`, "utf8");
}

/** Keep the bundled alert directory bounded; move resolved overflow to archive/. */
export function archiveOldAlerts(): void {
  if (!existsSync(ALERTS_DIR)) return;
  const files = readdirSync(ALERTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort(); // ids start with a UTC timestamp, so name order = time order
  let excess = files.length - MAX_BUNDLED_ALERTS;
  for (const file of files) {
    if (excess <= 0) break;
    const alert = JSON.parse(readFileSync(join(ALERTS_DIR, file), "utf8")) as ActivityAlert;
    if (OPEN_ALERT_STATUSES.includes(alert.status)) continue; // never hide open work
    renameSync(join(ALERTS_DIR, file), join(ARCHIVE_DIR, file));
    excess -= 1;
  }
}

export function makeAlertId(detectedAt: string, key: string): string {
  const stamp = detectedAt.replace(/[-:]/g, "").slice(0, 13).replace("T", "-");
  return `${stamp}--${key}`;
}
