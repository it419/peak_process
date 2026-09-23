"use client";

import type { ReactNode } from "react";
import { useDesignStore } from "@/lib/design/designStore";
import { OnboardingShell } from "@/components/layout/OnboardingShell";
import { DarkShell } from "@/components/design/dark/DarkShell";
import { OrganicShell } from "@/components/design/organic/OrganicShell";

export function OnboardingShellSwitcher({ children }: { children: ReactNode }) {
  const mode = useDesignStore((s) => s.mode);

  if (mode === "dark") return <DarkShell>{children}</DarkShell>;
  if (mode === "organic") return <OrganicShell>{children}</OrganicShell>;
  return <OnboardingShell>{children}</OnboardingShell>;
}
