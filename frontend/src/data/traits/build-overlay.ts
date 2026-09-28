import { sections } from "../sections";
import type { NationalityMeta, NationalityOverlay } from "../types";
import { nationalityTraits } from "./nationality-traits";
import { generateOverlay, mergeOverlays } from "./trait-rules";

/**
 * The overlay a reader sees: trait-generated content with the hand-written
 * file merged on top. Kept in its own module so the 100-row trait table and
 * the rules load lazily, with the nationality, instead of in the entry chunk.
 */
export function buildOverlay(meta: NationalityMeta, hand: NationalityOverlay): NationalityOverlay {
  return mergeOverlays(generateOverlay(meta, nationalityTraits[meta.slug], sections), hand);
}
