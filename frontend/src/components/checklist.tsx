import { useState, useCallback } from "react";
import type { ContentBlock } from "@/data/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ParsedText } from "./parsed-text";
import { cn } from "@/lib/utils";

interface ChecklistProps {
  /** Contiguous run of step blocks to render as a checklist */
  steps: Extract<ContentBlock, { type: "step" }>[];
}

export function Checklist({ steps }: ChecklistProps) {
  const [checked, setChecked] = useState<Set<number>>(() => new Set());
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set());

  const toggle = useCallback((idx: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  const toggleExpand = useCallback((idx: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  const completedCount = checked.size;

  return (
    <div className="space-y-3">
      {/* Progress indicator */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-medium">
          {completedCount} of {steps.length} completed
        </span>
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-200"
            style={{
              width: `${steps.length > 0 ? (completedCount / steps.length) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* Checklist items */}
      <ol className="space-y-1">
        {steps.map((step, idx) => {
          const isChecked = checked.has(idx);
          const isExpanded = expanded.has(idx);
          const hasBody = step.body.trim().length > 0;

          return (
            <li key={idx}>
              <label
                className={cn(
                  "flex items-start gap-3 rounded-md px-2 py-2.5 min-h-[44px] cursor-pointer transition-colors hover:bg-muted/50",
                  isChecked && "opacity-40"
                )}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggle(idx)}
                  className="mt-0.5"
                />
                <span
                  className={cn(
                    "text-sm text-foreground leading-snug flex-1",
                    isChecked && "line-through"
                  )}
                >
                  <span className="font-medium">
                    Step {step.number}: {step.title}
                  </span>
                  {hasBody && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleExpand(idx);
                      }}
                      className="inline-flex ml-1.5 text-muted-foreground hover:text-foreground"
                      title="More details"
                    >
                      <span className="text-xs border rounded-full w-4 h-4 inline-flex items-center justify-center">
                        i
                      </span>
                    </button>
                  )}
                </span>
              </label>

              {/* Expandable detail */}
              {hasBody && isExpanded && (
                <div className="ml-10 mb-2 pl-2 border-l-2 border-muted text-sm text-muted-foreground leading-relaxed">
                  <ParsedText text={step.body} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
