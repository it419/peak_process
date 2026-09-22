"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getAdjacentSlug } from "@/lib/onboarding/steps.config";
import { cn } from "@/lib/utils/cn";
import type { StepId } from "@/types/onboarding";

interface StepShellProps {
  stepId: StepId;
  title: ReactNode;
  description?: string;
  children: ReactNode;
  onContinue: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  isSubmitting?: boolean;
  hideBack?: boolean;
  /** "display" reserves the larger heading scale for the journey's two real
   *  moments (Welcome, Review). Every other step is quieter by default, so
   *  scale actually means something across the flow instead of shouting
   *  uniformly on every screen. */
  size?: "default" | "display";
}

/** Shared chrome for every onboarding step: heading, body, and a Back/Continue
 *  footer that becomes a sticky bottom bar on narrow viewports. */
export function StepShell({
  stepId,
  title,
  description,
  children,
  onContinue,
  continueLabel = "Continue",
  continueDisabled,
  isSubmitting,
  hideBack,
  size = "default",
}: StepShellProps) {
  const router = useRouter();
  const backSlug = getAdjacentSlug(stepId, -1);

  return (
    <div>
      <h1
        className={cn(
          "font-display leading-[1.2] font-semibold text-paper-ink-900",
          size === "display" ? "text-[2rem] sm:text-[2.25rem]" : "text-[1.625rem] sm:text-[1.75rem]",
        )}
      >
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-paper-ink-600">{description}</p>
      )}

      <div className="mt-9 pb-28 tablet:pb-0">{children}</div>

      <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 border-t border-paper-200 bg-paper-50/95 px-5 py-4 backdrop-blur tablet:static tablet:mt-10 tablet:border-t tablet:bg-transparent tablet:px-0 tablet:py-6 tablet:backdrop-blur-none">
        {!hideBack && backSlug ? (
          <Button
            variant="secondary"
            type="button"
            onClick={() => router.push(`/onboarding/${backSlug}`)}
          >
            <ArrowLeft className="size-4" aria-hidden /> Back
          </Button>
        ) : (
          <span />
        )}
        <Button type="button" onClick={onContinue} isLoading={isSubmitting} disabled={continueDisabled} showArrow>
          {continueLabel}
        </Button>
      </div>
    </div>
  );
}
