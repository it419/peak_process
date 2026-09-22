"use client";

import { PeakWordmark } from "@/components/Logo";
import { StepTimeline } from "@/components/onboarding/StepTimeline";
import { useFullName } from "@/lib/store/selectors";
import { cn } from "@/lib/utils/cn";

export function LeftRail({ className }: { className?: string }) {
  const fullName = useFullName();

  return (
    <aside
      className={cn(
        "w-rail-left shrink-0 bg-ink-900 px-7 py-10 xl:sticky xl:top-0 xl:h-screen xl:overflow-y-auto",
        className,
      )}
    >
      <div className="flex min-h-full flex-col">
        <PeakWordmark subtitle="New Hire Onboarding" tone="dark" />
        <div className="mt-10 flex-1">
          <StepTimeline variant="rail" />
        </div>
        {fullName && (
          <div className="mt-8 border-t border-ink-700 pt-4">
            <p className="eyebrow text-ink-400">Signed in as</p>
            <p className="mt-1 truncate text-sm text-paper-200">{fullName}</p>
          </div>
        )}
      </div>
    </aside>
  );
}
