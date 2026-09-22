"use client";

import type { ReactNode } from "react";
import { useOnboardingStore } from "@/lib/store/onboardingStore";

function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-3 w-32 rounded bg-paper-200" />
      <div className="h-9 w-2/3 rounded bg-paper-200" />
      <div className="h-4 w-1/2 rounded bg-paper-200" />
      <div className="mt-4 h-11 w-48 rounded-md bg-paper-100" />
    </div>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const hasHydrated = useOnboardingStore((s) => s.hasHydrated);
  return hasHydrated ? <>{children}</> : <DashboardSkeleton />;
}
