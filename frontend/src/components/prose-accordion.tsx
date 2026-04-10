import { useMemo } from "react";
import type { ContentBlock, ResolvedBlock } from "@/data/types";
import { ResolvedBlockRenderer } from "./content-blocks";
import { Checklist } from "./checklist";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface ProseAccordionProps {
  blocks: ResolvedBlock[];
  citationMap: Map<string, number>;
  /** Key used to track first-visit open state */
  sessionKey: string;
}

interface AccordionGroup {
  title: string;
  blocks: ResolvedBlock[];
}

/**
 * Groups resolved blocks by heading (level 2 or 3).
 * Blocks before the first heading go into a default "Overview" group.
 */
function groupByHeading(blocks: ResolvedBlock[]): AccordionGroup[] {
  const groups: AccordionGroup[] = [];
  let current: AccordionGroup | null = null;

  for (const resolved of blocks) {
    const block = resolved.block;
    if (
      block.type === "heading" &&
      (block.level === 2 || block.level === 3)
    ) {
      // Start a new group from this heading
      current = { title: block.text, blocks: [] };
      groups.push(current);
    } else {
      if (!current) {
        // Blocks before any heading → "Overview"
        current = { title: "Overview", blocks: [] };
        groups.push(current);
      }
      current.blocks.push(resolved);
    }
  }

  return groups;
}

/**
 * Renders a group's blocks, collapsing contiguous `step` blocks
 * into an interactive Checklist component.
 */
function GroupContent({
  blocks,
  citationMap,
}: {
  blocks: ResolvedBlock[];
  citationMap: Map<string, number>;
}) {
  // Partition blocks into segments: either a single non-step block
  // or a contiguous run of step blocks
  type Segment =
    | { kind: "block"; resolved: ResolvedBlock }
    | { kind: "checklist"; steps: Extract<ContentBlock, { type: "step" }>[] };

  const segments: Segment[] = [];

  for (const resolved of blocks) {
    if (resolved.block.type === "step" && !resolved.isCallout) {
      const last = segments[segments.length - 1];
      if (last && last.kind === "checklist") {
        last.steps.push(resolved.block as Extract<ContentBlock, { type: "step" }>);
      } else {
        segments.push({
          kind: "checklist",
          steps: [resolved.block as Extract<ContentBlock, { type: "step" }>],
        });
      }
    } else {
      segments.push({ kind: "block", resolved });
    }
  }

  return (
    <div className="space-y-4">
      {segments.map((seg, i) =>
        seg.kind === "checklist" ? (
          <Checklist key={i} steps={seg.steps} citationMap={citationMap} />
        ) : (
          <ResolvedBlockRenderer
            key={i}
            resolved={seg.resolved}
            citationMap={citationMap}
          />
        )
      )}
    </div>
  );
}

export function ProseAccordion({
  blocks,
  citationMap,
  sessionKey,
}: ProseAccordionProps) {
  const groups = useMemo(() => groupByHeading(blocks), [blocks]);

  // On first visit to this page, default the first section open
  const isFirstVisit = !sessionStorage.getItem(sessionKey);
  if (isFirstVisit) {
    sessionStorage.setItem(sessionKey, "1");
  }

  const defaultOpen = isFirstVisit && groups.length > 0 ? [0] : [];

  if (groups.length === 0) return null;

  // If there's only one group with no heading (just "Overview"), render flat
  if (groups.length === 1 && groups[0].title === "Overview") {
    return (
      <GroupContent blocks={groups[0].blocks} citationMap={citationMap} />
    );
  }

  return (
    <Accordion defaultValue={defaultOpen}>
      {groups.map((group, idx) => (
        <AccordionItem key={idx} value={idx}>
          <AccordionTrigger>{group.title}</AccordionTrigger>
          <AccordionContent>
            <GroupContent blocks={group.blocks} citationMap={citationMap} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
