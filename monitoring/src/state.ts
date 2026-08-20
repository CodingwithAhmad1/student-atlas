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

const HERE = dirname(fileURLToPath(import.meta.url));

/** "<repo>/Student Atlas/monitoring" */
export const MONITORING_DIR = resolve(HERE, "..");
/** "<repo>/Student Atlas" */
export const APP_DIR = resolve(MONITORING_DIR, "..");
/** Monorepo root. */
export const REPO_ROOT = resolve(APP_DIR, "..");
export const FRONTEND_DIR = join(APP_DIR, "frontend");

export const SNAPSHOTS_DIR = join(MONITORING_DIR, "snapshots");
export const STATE_DIR = join(MONITORING_DIR, "state");
export const ARCHIVE_DIR = join(MONITORING_DIR, "archive");
export const STATUS_FILE = join(STATE_DIR, "source-status.json");

/** Alert JSONs bundled by Vite into the Activity tab. */
export const FRONTEND_MONITORING_DIR = join(FRONTEND_DIR, "src", "data", "monitoring");
export const ALERTS_DIR = join(FRONTEND_MONITORING_DIR, "alerts");
export const FRONTEND_STATUS_FILE = join(FRONTEND_MONITORING_DIR, "status.json");

/** Newest alerts kept bundled with the frontend; older ones move to archive/. */
const MAX_BUNDLED_ALERTS = 200;
/** Normalized snapshot text is capped to keep the repo lean. */
const MAX_SNAPSHOT_BYTES = 200_000;

function ensureDirs(): void {
  for (const dir of [SNAPSHOTS_DIR, STATE_DIR, ARCHIVE_DIR, ALERTS_DIR]) {
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
  let out = text;
  if (Buffer.byteLength(out, "utf8") > MAX_SNAPSHOT_BYTES) {
    out =
      Buffer.from(out, "utf8").subarray(0, MAX_SNAPSHOT_BYTES).toString("utf8") +
      "\n… snapshot truncated …";
  }
  writeFileSync(snapshotPath(key), out, "utf8");
}

export function readStatusFile(): SourceStatusFile {
  if (!existsSync(STATUS_FILE)) {
    return { generatedAt: null, sources: {} };
  }
  return JSON.parse(readFileSync(STATUS_FILE, "utf8")) as SourceStatusFile;
}

export function writeStatusFile(status: SourceStatusFile): void {
  ensureDirs();
  const json = `${JSON.stringify(status, null, 2)}\n`;
  writeFileSync(STATUS_FILE, json, "utf8");
  writeFileSync(FRONTEND_STATUS_FILE, json, "utf8");
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

export function readAllAlerts(): ActivityAlert[] {
  const alerts: ActivityAlert[] = [];
  for (const dir of [ALERTS_DIR, ARCHIVE_DIR]) {
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir)) {
      if (!file.endsWith(".json")) continue;
      try {
        alerts.push(
          JSON.parse(readFileSync(join(dir, file), "utf8")) as ActivityAlert
        );
      } catch {
        // Skip unreadable records rather than aborting the whole run.
      }
    }
  }
  return alerts;
}

/** Idempotency guard: an alert already recorded for this source + new hash. */
export function findExistingAlert(
  alerts: ActivityAlert[],
  sourceId: string,
  newHash: string
): ActivityAlert | undefined {
  return alerts.find((a) => a.sourceId === sourceId && a.newHash === newHash);
}

export function writeAlert(alert: ActivityAlert): void {
  ensureDirs();
  writeFileSync(alertPath(alert.id), `${JSON.stringify(alert, null, 2)}\n`, "utf8");
}

/** Remove the hand-written sample alert once real data exists. */
export function removeSampleAlerts(): void {
  if (!existsSync(ALERTS_DIR)) return;
  for (const file of readdirSync(ALERTS_DIR)) {
    if (file.startsWith("sample-") && file.endsWith(".json")) {
      rmSync(join(ALERTS_DIR, file));
    }
  }
}

/** Keep the bundled alert directory bounded; move overflow to archive/. */
export function archiveOldAlerts(): void {
  if (!existsSync(ALERTS_DIR)) return;
  const files = readdirSync(ALERTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort(); // ids start with a UTC timestamp, so name order = time order
  const overflow = files.slice(0, Math.max(0, files.length - MAX_BUNDLED_ALERTS));
  for (const file of overflow) {
    renameSync(join(ALERTS_DIR, file), join(ARCHIVE_DIR, file));
  }
}

export function makeAlertId(detectedAt: string, key: string): string {
  const stamp = detectedAt.replace(/[-:]/g, "").slice(0, 13).replace("T", "-");
  return `${stamp}--${key}`;
}
