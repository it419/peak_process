"use client";

import { useDesignStore } from "@/lib/design/designStore";
import { CompletionScreen } from "@/components/onboarding/CompletionScreen";
import { DarkCompletionScreen } from "@/components/design/dark/DarkCompletionScreen";
import { OrganicCompletionScreen } from "@/components/design/organic/OrganicCompletionScreen";

export function CompletionSwitcher() {
  const mode = useDesignStore((s) => s.mode);

  if (mode === "dark") return <DarkCompletionScreen />;
  if (mode === "organic") return <OrganicCompletionScreen />;
  return <CompletionScreen />;
}
