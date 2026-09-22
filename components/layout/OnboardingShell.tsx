"use client";

import type { ReactNode } from "react";
import { useOnboardingStore } from "@/lib/store/onboardingStore";
import { LeftRail } from "./LeftRail";
import { RightRail } from "./RightRail";
import { MobileStepBar } from "./MobileStepBar";

function ShellSkeleton() {
  return (
    <div className="mx-auto w-full max-w-content animate-pulse space-y-4 px-5 py-14 tablet:px-10">
      <div className="h-3 w-28 rounded bg-paper-200" />
      <div className="h-9 w-2/3 rounded bg-paper-200" />
      <div className="mt-8 space-y-3">
        <div className="h-11 rounded-md bg-paper-100" />
        <div className="h-11 rounded-md bg-paper-100" />
        <div className="h-24 rounded-md bg-paper-100" />
      </div>
    </div>
  );
}

export function OnboardingShell({ children }: { children: ReactNode }) {
  const hasHydrated = useOnboardingStore((s) => s.hasHydrated);

  return (
    <div className="min-h-screen bg-paper-50">
      <MobileStepBar className="tablet:hidden" />
      <div className="tablet:flex">
        <LeftRail className="hidden tablet:flex" />
        <div className="min-w-0 flex-1 xl:flex">
          <main className="min-w-0 flex-1">
            <div className="mx-auto w-full max-w-content px-5 py-10 tablet:px-10 tablet:py-14">
              {hasHydrated ? children : <ShellSkeleton />}
            </div>
          </main>
          <RightRail />
        </div>
      </div>
    </div>
  );
}
