"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { stepRegistry } from "@/lib/onboarding/steps.config";
import { useStepStatuses } from "@/lib/store/selectors";

export function DarkStepTimeline({ className }: { className?: string }) {
  const statuses = useStepStatuses();
  const pathname = usePathname();

  return (
    <nav aria-label="Onboarding steps" className={cn("flex flex-col gap-1", className)}>
      {stepRegistry.map((step, index) => {
        const status = statuses[step.id];
        const href = `/onboarding/${step.slug}`;
        const isActive = pathname === href;
        return (
          <Link
            key={step.id}
            href={href}
            aria-current={isActive ? "step" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors",
              isActive ? "bg-dark-surface-2" : "hover:bg-dark-surface-2/60",
            )}
          >
            <span
              className={cn(
                "font-dark-display w-5 shrink-0 text-[0.8125rem] font-semibold tabular-nums",
                status === "completed" && "text-dark-gold",
                status === "current" && "text-dark-text",
                status === "blocked" && "text-dark-gold/70",
                status === "upcoming" && "text-dark-text-faint",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "flex-1 truncate text-[0.9375rem]",
                status === "current" && "font-semibold text-dark-text",
                status === "completed" && "text-dark-text",
                status === "blocked" && "text-dark-text-muted",
                status === "upcoming" && "text-dark-text-faint",
              )}
            >
              {step.shortLabel}
            </span>
            {status === "completed" && (
              <Check className="size-4 shrink-0 text-dark-gold" strokeWidth={2.5} aria-hidden />
            )}
            {status === "blocked" && (
              <span className="size-1.5 shrink-0 rounded-full bg-dark-gold/70" aria-hidden />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
