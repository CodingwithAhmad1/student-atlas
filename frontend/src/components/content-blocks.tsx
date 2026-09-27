import type { ContentBlock } from "@/data/types";
import { ParsedText } from "./parsed-text";

interface BlockProps {
  block: ContentBlock;
}

function ParagraphBlock({ block }: BlockProps) {
  if (block.type !== "paragraph") return null;
  return (
    <p className="text-foreground leading-7">
      <ParsedText text={block.text} />
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

function BulletListBlock({ block }: BlockProps) {
  if (block.type !== "bullet-list") return null;
  return (
    <ul className="list-disc pl-6 space-y-1.5 text-foreground">
      {block.items.map((item, i) => (
        <li key={i} className="leading-7">
          <ParsedText text={item} />
        </li>
      ))}
    </ul>
  );
}

function OrderedListBlock({ block }: BlockProps) {
  if (block.type !== "ordered-list") return null;
  return (
    <ol className="list-decimal pl-6 space-y-1.5 text-foreground">
      {block.items.map((item, i) => (
        <li key={i} className="leading-7">
          <ParsedText text={item} />
        </li>
      ))}
    </ol>
  );
}

function KeyValueListBlock({ block }: BlockProps) {
  if (block.type !== "key-value-list") return null;
  return (
    <dl className="space-y-1 text-sm">
      {block.items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <dt className="font-medium text-foreground whitespace-nowrap">
            {item.label}:
          </dt>
          <dd className="text-foreground">
            <ParsedText text={item.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function StepBlock({ block }: BlockProps) {
  if (block.type !== "step") return null;
  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-1">
        Step {block.number} — {block.title}
      </h4>
      <p className="text-foreground leading-7">
        <ParsedText text={block.body} />
      </p>
    </div>
  );
}

export function ContentBlockRenderer({ block }: BlockProps) {
  switch (block.type) {
    case "paragraph":
      return <ParagraphBlock block={block} />;
    case "heading":
      return <HeadingBlock block={block} />;
    case "bullet-list":
      return <BulletListBlock block={block} />;
    case "ordered-list":
      return <OrderedListBlock block={block} />;
    case "key-value-list":
      return <KeyValueListBlock block={block} />;
    case "step":
      return <StepBlock block={block} />;
  }
}
