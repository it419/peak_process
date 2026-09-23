"use client";

import type { ReactNode } from "react";
import { useOnboardingStore } from "@/lib/store/onboardingStore";
import { useCompletionPercent } from "@/lib/store/selectors";
import { OrganicWordmark } from "./OrganicWordmark";
import { OrganicStepTimeline } from "./OrganicStepTimeline";

function OrganicShellSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl animate-pulse space-y-4 px-5 py-14 sm:px-8">
      <div className="h-3 w-24 rounded bg-organic-surface" />
      <div className="h-9 w-2/3 rounded bg-organic-surface" />
      <div className="mt-8 h-64 rounded-[1.75rem] bg-organic-surface" />
    </div>
  );
}

export function OrganicShell({ children }: { children: ReactNode }) {
  const hasHydrated = useOnboardingStore((s) => s.hasHydrated);
  const percent = useCompletionPercent();

  return (
    <div className="min-h-screen bg-organic-bg font-organic-sans">
      <header className="sticky top-0 z-20 border-b border-organic-border bg-organic-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <OrganicWordmark />
          <div className="hidden shrink-0 text-right sm:block">
            <p className="text-[0.6875rem] font-semibold tracking-widest text-organic-ink-faint uppercase">
              Onboarding
            </p>
            <p className="font-organic-display text-lg leading-tight font-semibold text-organic-terracotta">
              {percent}% Complete
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-5 pb-4 sm:px-8">
          <OrganicStepTimeline variant="trail" />
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        {hasHydrated ? children : <OrganicShellSkeleton />}
      </main>
    </div>
  );
}
