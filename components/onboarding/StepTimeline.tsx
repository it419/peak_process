"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { stepRegistry } from "@/lib/onboarding/steps.config";
import { useStepStatuses } from "@/lib/store/selectors";
import type { StepStatus } from "@/types/onboarding";

const STATUS_LABEL: Record<StepStatus, string> = {
  completed: "Complete",
  current: "In progress",
  blocked: "In progress",
  upcoming: "Not started",
};

const STATUS_TEXT_TONE: Record<StepStatus, string> = {
  completed: "text-success",
  current: "text-ember-700",
  blocked: "text-gold-600",
  upcoming: "text-paper-ink-400",
};

interface StepTimelineProps {
  variant?: "rail" | "expanded";
  className?: string;
}

export function StepTimeline({ variant = "rail", className }: StepTimelineProps) {
  const statuses = useStepStatuses();
  const pathname = usePathname();

  return (
    <nav aria-label="Onboarding steps" className={cn("flex flex-col", className)}>
      {stepRegistry.map((step, index) => {
        const status = statuses[step.id];
        const isLast = index === stepRegistry.length - 1;
        const href = `/onboarding/${step.slug}`;
        const isActivePath = pathname === href;
        // "current" already carries a strong marker; only layer the
        // viewing-highlight on top when it's telling you something the
        // marker doesn't (i.e. you're looking at a step that isn't next).
        const showViewingHighlight = isActivePath && status !== "current";

        const markerBase =
          "relative z-10 flex shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors";

        if (variant === "rail") {
          return (
            <Link
              key={step.id}
              href={href}
              aria-current={isActivePath ? "step" : undefined}
              className={cn("group relative flex gap-3", !isLast && "pb-6")}
            >
              {showViewingHighlight && (
                // Sized to the marker's own content height, not the row's
                // padding box (which includes the pb-6 gap to the next row) —
                // an inset on all sides bled the highlight into the next item.
                <span
                  aria-hidden
                  className="absolute -inset-x-2.5 -top-1 h-7.5 -z-10 rounded-md bg-ink-800"
                />
              )}
              {!isLast && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-2.75 top-6 h-[calc(100%-1.25rem)] w-px",
                    status === "completed" ? "bg-gold-500/50" : "bg-ink-700",
                  )}
                />
              )}
              <span
                className={cn(
                  markerBase,
                  "size-5.5 border",
                  status === "completed" && "border-gold-500 bg-gold-500 text-ink-950",
                  status === "current" && "border-ember-500 bg-ink-900 text-ember-500 ring-2 ring-ember-500/25",
                  status === "blocked" && "border-gold-500/60 bg-ink-900 text-gold-500",
                  status === "upcoming" && "border-ink-700 bg-ink-900 text-ink-400",
                )}
              >
                {status === "completed" ? <Check className="size-3" strokeWidth={3} /> : index + 1}
              </span>
              <span className="flex min-w-0 flex-col justify-center pb-0.5">
                <span
                  className={cn(
                    "truncate text-[0.8125rem] leading-tight transition-colors",
                    status === "current" && "font-semibold text-paper-50",
                    status === "completed" && "text-paper-200",
                    status === "upcoming" && "text-ink-400 group-hover:text-ink-200",
                    status === "blocked" && "text-gold-400",
                  )}
                >
                  {step.shortLabel}
                </span>
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={step.id}
            href={href}
            className={cn("group relative flex items-center gap-4", !isLast && "pb-5")}
          >
            {!isLast && (
              <span
                aria-hidden
                className={cn(
                  "absolute left-[15px] top-8 h-[calc(100%-1.25rem)] w-px",
                  status === "completed" ? "bg-gold-500/60" : "bg-paper-200",
                )}
              />
            )}
            <span
              className={cn(
                markerBase,
                "size-[30px] border text-[13px]",
                status === "completed" && "border-gold-600 bg-gold-500 text-ink-950",
                status === "current" && "border-ember-600 bg-paper-50 text-ember-700 ring-2 ring-ember-600/20",
                status === "blocked" && "border-gold-500/60 bg-paper-50 text-gold-600",
                status === "upcoming" && "border-paper-200 bg-paper-50 text-paper-ink-400",
              )}
            >
              {status === "completed" ? <Check className="size-3.5" strokeWidth={3} /> : index + 1}
            </span>
            <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
              <span
                className={cn(
                  "font-display text-base",
                  status === "current" ? "font-semibold text-paper-ink-900" : "text-paper-ink-900",
                )}
              >
                {step.label}
              </span>
              <span className={cn("text-[0.8125rem] font-medium", STATUS_TEXT_TONE[status])}>
                {STATUS_LABEL[status]}
              </span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
