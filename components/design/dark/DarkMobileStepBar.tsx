"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { PeakMark } from "@/components/Logo";
import { getStepBySlug, getStepIndex, stepRegistry } from "@/lib/onboarding/steps.config";
import { useCompletionPercent } from "@/lib/store/selectors";
import { cn } from "@/lib/utils/cn";

export function DarkMobileStepBar({ className }: { className?: string }) {
  const pathname = usePathname();
  const slug = pathname.split("/").pop() ?? "";
  const step = getStepBySlug(slug);
  const index = step ? getStepIndex(step.id) : -1;
  const percent = useCompletionPercent();

  return (
    <div className={cn("sticky top-0 z-20 border-b border-dark-border bg-dark-surface px-4 py-3.5", className)}>
      <div className="flex items-center justify-between gap-3">
        <Link href="/dashboard" aria-label="Back to dashboard">
          <PeakMark className="size-7" />
        </Link>
        {step && (
          <span className="text-[0.6875rem] font-semibold tracking-widest text-dark-text-faint uppercase">
            {String(index + 1).padStart(2, "0")} / {String(stepRegistry.length).padStart(2, "0")}
          </span>
        )}
      </div>
      {step && (
        <p className="font-dark-display mt-1.5 truncate text-[15px] font-semibold text-dark-text">{step.label}</p>
      )}
      <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-dark-surface-2">
        <div
          className="h-full rounded-full bg-dark-gold transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
