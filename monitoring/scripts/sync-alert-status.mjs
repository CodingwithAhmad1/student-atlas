// Invoked by .github/workflows/student-atlas-alert-close.yml when a
// `student-atlas-alert` PR is closed: records approved/rejected on the alert.
// Plain Node, no dependencies — runs on a bare checkout.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const alertId = process.env.ALERT_ID;
const merged = process.env.PR_MERGED === "true";
if (!alertId) {
  console.error("ALERT_ID is not set");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(here, "..", "..");
const candidates = [
  join(appDir, "frontend", "src", "data", "monitoring", "alerts", `${alertId}.json`),
  join(appDir, "monitoring", "archive", `${alertId}.json`),
];

const path = candidates.find((p) => existsSync(p));
if (!path) {
  console.error(`No alert record found for ${alertId} — nothing to sync.`);
  process.exit(0);
}

const alert = JSON.parse(readFileSync(path, "utf8"));
alert.status = merged ? "approved" : "rejected";
alert.resolvedAt = new Date().toISOString();
writeFileSync(path, `${JSON.stringify(alert, null, 2)}\n`, "utf8");
console.log(`${alertId} -> ${alert.status}`);
