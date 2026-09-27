import type {
  CalloutBlock,
  CalloutOverlay,
  CountryOverlay,
  IdentifiedBlock,
  ResolvedBlock,
} from "./types";

/**
 * Merge base blocks with a country overlay to produce the final render list.
 *
 * - No overlay → base blocks as-is
 * - Profile → profile blocks replace the base entirely
 * - Callouts → inserted after the block with the matching afterBlockId
 */
export function mergeBlocks(
  baseBlocks: IdentifiedBlock[],
  overlay: CountryOverlay | undefined,
  nationalityLabel?: string
): ResolvedBlock[] {
  return interleave(overlay?.profile ?? baseBlocks, overlay?.callouts, nationalityLabel);
}

/** Merge crossCutting blocks with an overlay's _crossCutting callouts. */
export function mergeCrossCutting(
  baseBlocks: IdentifiedBlock[],
  callouts: CalloutOverlay[] | undefined,
  nationalityLabel?: string
): ResolvedBlock[] {
  return interleave(baseBlocks, callouts, nationalityLabel);
}

/**
 * Nationality callouts are presented first, in a highlighted box, on both the
 * web page and the PDF; the rest keeps its order.
 */
export function splitCallouts(blocks: ResolvedBlock[]): {
  callouts: CalloutBlock[];
  body: ResolvedBlock[];
} {
  return {
    callouts: blocks
      .filter((b) => b.isCallout)
      .map((b) => (b.practical ? { block: b.block, practical: true } : { block: b.block })),
    body: blocks.filter((b) => !b.isCallout),
  };
}

function interleave(
  blocks: IdentifiedBlock[],
  callouts: CalloutOverlay[] | undefined,
  nationalityLabel?: string
): ResolvedBlock[] {
  const byAnchor = new Map<string, CalloutBlock[]>();
  for (const c of callouts ?? []) {
    const items = c.blocks.map((block) => (c.practical ? { block, practical: true } : { block }));
    byAnchor.set(c.afterBlockId, [...(byAnchor.get(c.afterBlockId) ?? []), ...items]);
  }

  const result: ResolvedBlock[] = [];
  for (const ib of blocks) {
    result.push({ block: ib.block });
    for (const cb of (ib.id && byAnchor.get(ib.id)) || []) {
      result.push({
        block: cb.block,
        isCallout: true,
        ...(cb.practical ? { practical: true } : {}),
        nationalityLabel,
      });
    }
  }
  return result;
}
