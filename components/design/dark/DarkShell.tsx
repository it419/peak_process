"use client";

import type { ReactNode } from "react";
import { useOnboardingStore } from "@/lib/store/onboardingStore";
import { useCompletionPercent } from "@/lib/store/selectors";
import { DarkWordmark } from "./DarkWordmark";
import { DarkStepTimeline } from "./DarkStepTimeline";
import { DarkMobileStepBar } from "./DarkMobileStepBar";

function DarkShellSkeleton() {
  return (
    <div className="mx-auto w-full max-w-2xl animate-pulse space-y-4 px-5 py-14 tablet:px-12">
      <div className="h-3 w-24 rounded bg-dark-surface-2" />
      <div className="h-9 w-2/3 rounded bg-dark-surface-2" />
      <div className="mt-8 h-64 rounded-xl bg-dark-surface" />
    </div>
  );
}

export function DarkShell({ children }: { children: ReactNode }) {
  const hasHydrated = useOnboardingStore((s) => s.hasHydrated);
  const percent = useCompletionPercent();

  return (
    <div className="min-h-screen bg-dark-bg font-sans">
      <DarkMobileStepBar className="tablet:hidden" />
      <div className="tablet:flex">
        <aside className="hidden w-dark-rail shrink-0 flex-col border-r border-dark-border bg-dark-surface px-6 py-8 tablet:sticky tablet:top-0 tablet:z-10 tablet:flex tablet:h-screen tablet:overflow-y-auto">
          <DarkWordmark />
          <div className="mt-10 flex-1">
            <DarkStepTimeline />
          </div>
          <div className="mt-8 border-t border-dark-border pt-5">
            <p className="text-[0.6875rem] font-semibold tracking-widest text-dark-text-faint uppercase">
              Onboarding
            </p>
            <p className="font-dark-display mt-1 text-2xl font-semibold text-dark-gold">{percent}% Complete</p>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-dark-surface-2">
              <div
                className="h-full rounded-full bg-dark-gold transition-[width] duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-2xl px-5 py-10 tablet:px-12 tablet:py-16">
            {hasHydrated ? children : <DarkShellSkeleton />}
          </div>
        </main>
      </div>
    </div>
  );
}
