import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { glossary } from "@/data/glossary";
import { useCanHover } from "@/hooks/use-can-hover";

interface InfoTipProps {
  termKey: string;
  displayText: string;
}

const TRIGGER_CLASS =
  "cursor-help underline decoration-dotted decoration-muted-foreground/40 underline-offset-2";

/**
 * Inline (not inline-flex) so a long term wraps with the sentence; the last
 * word and the icon stay together so the icon never sits on a line alone.
 */
function TermLabel({ text }: { text: string }) {
  const split = text.lastIndexOf(" ") + 1;
  return (
    <>
      {text.slice(0, split)}
      <span className="whitespace-nowrap">
        {text.slice(split)}
        <Info className="ml-0.5 inline size-3 text-muted-foreground/60 translate-y-[-1px]" />
      </span>
    </>
  );
}

export function InfoTip({ termKey, displayText }: InfoTipProps) {
  const canHover = useCanHover();
  const term = glossary[termKey];
  if (!term) {
    return <span>{displayText}</span>;
  }

  // Tooltips only open on hover or focus, so touch screens get a tap-to-open popover.
  if (!canHover) {
    return (
      <Popover>
        <PopoverTrigger
          render={<span role="button" tabIndex={0} />}
          nativeButton={false}
          className={TRIGGER_CLASS}
        >
          <TermLabel text={displayText} />
        </PopoverTrigger>
        <PopoverContent
          side="top"
          className="max-w-[min(20rem,calc(100vw-2rem))] border text-xs text-pretty"
        >
          {term.definition}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger render={<span />} className={TRIGGER_CLASS}>
        <TermLabel text={displayText} />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-pretty">
        {term.definition}
      </TooltipContent>
    </Tooltip>
  );
}
