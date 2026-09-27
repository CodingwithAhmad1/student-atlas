import { monitoredSources } from "../../frontend/src/data/source-registry";
import type { MonitoredTarget } from "./types";

/** Fetch targets: one per unique cited URL (see frontend source-registry). */
export function loadTargets(): MonitoredTarget[] {
  return monitoredSources;
}
