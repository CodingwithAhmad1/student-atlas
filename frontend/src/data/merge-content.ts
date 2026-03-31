import type {
  IdentifiedBlock,
  ContentBlock,
  CountryOverlay,
  CalloutOverlay,
  ResolvedBlock,
} from "./types";

/**
 * Merge base blocks with a country overlay to produce final render list.
 *
 * - No overlay → base blocks rendered as-is
 * - Profile provided → profile blocks replace base entirely
 * - Callouts → inserted after the block with matching afterBlockId
 */
export function mergeBlocks(
  baseBlocks: IdentifiedBlock[],
  overlay: CountryOverlay | undefined,
  nationalityLabel?: string
): ResolvedBlock[] {
  if (!overlay) {
    return baseBlocks.map((ib) => ({ block: ib.block }));
  }

  const sourceBlocks = overlay.profile ?? baseBlocks;

  const calloutMap = buildCalloutMap(overlay.callouts);

  const result: ResolvedBlock[] = [];
  for (const ib of sourceBlocks) {
    result.push({ block: ib.block });

    if (ib.id && calloutMap.has(ib.id)) {
      for (const cb of calloutMap.get(ib.id)!) {
        result.push({ block: cb, isCallout: true, nationalityLabel });
      }
    }
  }

  return result;
}

/**
 * Merge crossCutting blocks with an overlay's _crossCutting callouts.
 */
export function mergeCrossCutting(
  baseBlocks: IdentifiedBlock[],
  callouts: CalloutOverlay[] | undefined,
  nationalityLabel?: string
): ResolvedBlock[] {
  if (!callouts || callouts.length === 0) {
    return baseBlocks.map((ib) => ({ block: ib.block }));
  }

  const calloutMap = buildCalloutMap(callouts);

  const result: ResolvedBlock[] = [];
  for (const ib of baseBlocks) {
    result.push({ block: ib.block });

    if (ib.id && calloutMap.has(ib.id)) {
      for (const cb of calloutMap.get(ib.id)!) {
        result.push({ block: cb, isCallout: true, nationalityLabel });
      }
    }
  }

  return result;
}

function buildCalloutMap(
  callouts: CalloutOverlay[] | undefined
): Map<string, ContentBlock[]> {
  const map = new Map<string, ContentBlock[]>();
  if (!callouts) return map;

  for (const c of callouts) {
    const existing = map.get(c.afterBlockId) ?? [];
    map.set(c.afterBlockId, [...existing, ...c.blocks]);
  }
  return map;
}
