"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { getAdjacentSlug, getStepIndex, stepRegistry } from "@/lib/onboarding/steps.config";
import type { StepId } from "@/types/onboarding";
import { DarkButton } from "./ui/DarkButton";
import { DarkSaveIndicator } from "./DarkSaveIndicator";

interface DarkStepShellProps {
  stepId: StepId;
  title: ReactNode;
  description?: string;
  children: ReactNode;
  onContinue: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  isSubmitting?: boolean;
  hideBack?: boolean;
}

export function DarkStepShell({
  stepId,
  title,
  description,
  children,
  onContinue,
  continueLabel = "Save & Continue",
  continueDisabled,
  isSubmitting,
  hideBack,
}: DarkStepShellProps) {
  const router = useRouter();
  const backSlug = getAdjacentSlug(stepId, -1);
  const index = getStepIndex(stepId);

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <p className="font-dark-display text-[0.8125rem] font-semibold tracking-widest text-dark-gold uppercase">
          {String(index + 1).padStart(2, "0")} / {String(stepRegistry.length).padStart(2, "0")}
        </p>
        <DarkSaveIndicator className="hidden tablet:block" />
      </div>
      <h1 className="font-dark-display mt-2 text-[1.75rem] leading-[1.15] font-semibold text-dark-text tablet:text-[2rem]">
        {title}
      </h1>
      {description && <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-dark-text-muted">{description}</p>}

      <div className="mt-8 rounded-xl border border-dark-border bg-dark-surface p-6 tablet:p-8">{children}</div>

      <div
        className={cn(
          "mt-6 flex items-center gap-4",
          !hideBack && backSlug ? "justify-between" : "justify-end",
        )}
      >
        {!hideBack && backSlug && (
          <DarkButton variant="secondary" type="button" onClick={() => router.push(`/onboarding/${backSlug}`)}>
            <ArrowLeft className="size-4" aria-hidden /> Back
          </DarkButton>
        )}
        <DarkButton type="button" onClick={onContinue} isLoading={isSubmitting} disabled={continueDisabled} showArrow>
          {continueLabel}
        </DarkButton>
      </div>
    </div>
  );
}
