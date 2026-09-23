"use client";

import { useDesignStore } from "@/lib/design/designStore";
import type { StepConfig } from "@/lib/onboarding/steps.config";

/** Picks the right presentational variant for the current step based on
 *  the active preview design — all three read the exact same shared logic
 *  hook underneath (hooks/steps/*), so switching here never touches
 *  onboarding data. */
export function StepRenderer({ step }: { step: StepConfig }) {
  const mode = useDesignStore((s) => s.mode);

  if (mode === "dark") {
    const Component = step.DarkComponent;
    return <Component />;
  }
  if (mode === "organic") {
    const Component = step.OrganicComponent;
    return <Component />;
  }
  const Component = step.Component;
  return <Component />;
}
