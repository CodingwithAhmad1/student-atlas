import type { ContentBlock, ResolvedBlock } from "@/data/types";
import { ParsedText } from "./parsed-text";

interface BlockProps {
  block: ContentBlock;
  citationMap: Map<string, number>;
}

function ParagraphBlock({ block, citationMap }: BlockProps) {
  if (block.type !== "paragraph") return null;
  return (
    <p className="text-foreground leading-7">
      <ParsedText text={block.text} citationMap={citationMap} />
    </p>
  );
}

function HeadingBlock({ block }: { block: ContentBlock }) {
  if (block.type !== "heading") return null;
  const Tag = `h${block.level}` as "h2" | "h3" | "h4";
  const sizes = {
    2: "text-xl font-bold mt-8 mb-3",
    3: "text-lg font-semibold mt-6 mb-2",
    4: "text-base font-semibold mt-5 mb-2",
  };
  return <Tag className={sizes[block.level]}>{block.text}</Tag>;
}

function BulletListBlock({ block, citationMap }: BlockProps) {
  if (block.type !== "bullet-list") return null;
  return (
    <ul className="list-disc pl-6 space-y-1.5 text-foreground">
      {block.items.map((item, i) => (
        <li key={i} className="leading-7">
          <ParsedText text={item} citationMap={citationMap} />
        </li>
      ))}
    </ul>
  );
}

function OrderedListBlock({ block, citationMap }: BlockProps) {
  if (block.type !== "ordered-list") return null;
  return (
    <ol className="list-decimal pl-6 space-y-1.5 text-foreground">
      {block.items.map((item, i) => (
        <li key={i} className="leading-7">
          <ParsedText text={item} citationMap={citationMap} />
        </li>
      ))}
    </ol>
  );
}

function KeyValueListBlock({ block, citationMap }: BlockProps) {
  if (block.type !== "key-value-list") return null;
  return (
    <dl className="space-y-1 text-sm">
      {block.items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <dt className="font-medium text-foreground whitespace-nowrap">
            {item.label}:
          </dt>
          <dd className="text-foreground">
            <ParsedText text={item.value} citationMap={citationMap} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function StepBlock({ block, citationMap }: BlockProps) {
  if (block.type !== "step") return null;
  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-1">
        Step {block.number} — {block.title}
      </h4>
      <p className="text-foreground leading-7">
        <ParsedText text={block.body} citationMap={citationMap} />
      </p>
    </div>
  );
}

export function ContentBlockRenderer({ block, citationMap }: BlockProps) {
  switch (block.type) {
    case "paragraph":
      return <ParagraphBlock block={block} citationMap={citationMap} />;
    case "heading":
      return <HeadingBlock block={block} />;
    case "bullet-list":
      return <BulletListBlock block={block} citationMap={citationMap} />;
    case "ordered-list":
      return <OrderedListBlock block={block} citationMap={citationMap} />;
    case "key-value-list":
      return <KeyValueListBlock block={block} citationMap={citationMap} />;
    case "step":
      return <StepBlock block={block} citationMap={citationMap} />;
  }
}

/**
 * Renders a ResolvedBlock — either as a normal content block or
 * wrapped in a nationality callout aside.
 */
export function ResolvedBlockRenderer({
  resolved,
  citationMap,
}: {
  resolved: ResolvedBlock;
  citationMap: Map<string, number>;
}) {
  if (resolved.isCallout) {
    return (
      <aside className="border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-950/20 p-4 rounded-r-lg my-4">
        <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1 uppercase tracking-wide">
          {resolved.nationalityLabel ?? "Nationality"}-specific
        </p>
        <div className="text-sm text-amber-900 dark:text-amber-200 leading-6">
          <ContentBlockRenderer
            block={resolved.block}
            citationMap={citationMap}
          />
        </div>
      </aside>
    );
  }
  return <ContentBlockRenderer block={resolved.block} citationMap={citationMap} />;
}
