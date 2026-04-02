import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { glossary } from "@/data/glossary";

interface InfoTipProps {
  termKey: string;
  displayText: string;
}

export function InfoTip({ termKey, displayText }: InfoTipProps) {
  const term = glossary[termKey];
  if (!term) {
    return <span>{displayText}</span>;
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={<span />}
        className="inline-flex items-baseline gap-0.5 cursor-help underline decoration-dotted decoration-muted-foreground/40 underline-offset-2"
      >
        {displayText}
        <Info className="inline size-3 text-muted-foreground/60 shrink-0 translate-y-[-1px]" />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-pretty">
        {term.definition}
      </TooltipContent>
    </Tooltip>
  );
}
