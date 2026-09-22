"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PeakMark } from "@/components/Logo";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SaveIndicator } from "@/components/onboarding/SaveIndicator";
import { getStepBySlug, getStepIndex, stepRegistry } from "@/lib/onboarding/steps.config";
import { useCompletionPercent } from "@/lib/store/selectors";
import { cn } from "@/lib/utils/cn";

export function MobileStepBar({ className }: { className?: string }) {
  const pathname = usePathname();
  const slug = pathname.split("/").pop() ?? "";
  const step = getStepBySlug(slug);
  const index = step ? getStepIndex(step.id) : -1;
  const percent = useCompletionPercent();

  return (
    <div className={cn("sticky top-0 z-20 bg-ink-900 px-4 py-3.5", className)}>
      <div className="flex items-center justify-between gap-3">
        <Link href="/dashboard" aria-label="Back to dashboard">
          <PeakMark className="size-7" />
        </Link>
        <div className="flex items-center gap-3">
          {step && (
            <span className="eyebrow text-ink-400">
              Step {index + 1} of {stepRegistry.length}
            </span>
          )}
          <SaveIndicator tone="dark" />
        </div>
      </div>
      {step && <p className="mt-1.5 truncate font-display text-[15px] font-semibold text-paper-50">{step.label}</p>}
      <ProgressBar percent={percent} className="mt-2.5" trackClassName="bg-ink-700" fillClassName="bg-ember-500" />
    </div>
  );
}
