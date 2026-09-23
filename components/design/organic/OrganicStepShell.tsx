"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { getAdjacentSlug, getStepIndex, stepRegistry } from "@/lib/onboarding/steps.config";
import type { StepId } from "@/types/onboarding";
import { OrganicButton } from "./ui/OrganicButton";
import { OrganicSaveIndicator } from "./OrganicSaveIndicator";
import { CurveDivider } from "./CurveDivider";

interface OrganicStepShellProps {
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

export function OrganicStepShell({
  stepId,
  title,
  description,
  children,
  onContinue,
  continueLabel = "Continue",
  continueDisabled,
  isSubmitting,
  hideBack,
}: OrganicStepShellProps) {
  const router = useRouter();
  const backSlug = getAdjacentSlug(stepId, -1);
  const index = getStepIndex(stepId);

  return (
    <div>
      <div className="rounded-[1.75rem] bg-organic-surface px-6 py-10 sm:px-12 sm:py-14">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[0.8125rem] font-semibold tracking-widest text-organic-terracotta uppercase">
            Step {String(index + 1).padStart(2, "0")} of {String(stepRegistry.length).padStart(2, "0")}
          </p>
          <OrganicSaveIndicator className="hidden sm:block" />
        </div>
        <h1 className="font-organic-display mt-3 text-[2rem] leading-[1.1] font-semibold text-organic-ink sm:text-[2.5rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-organic-ink-muted">{description}</p>
        )}
      </div>
      <CurveDivider fill="var(--color-organic-surface)" className="-mt-px h-8 sm:h-12 md:h-16" />

      <div className="mt-2 sm:mt-4 sm:pl-10 lg:pl-16">{children}</div>

      <div
        className={cn(
          "mt-10 flex items-center gap-4 sm:pl-10 lg:pl-16",
          !hideBack && backSlug ? "justify-between" : "justify-end",
        )}
      >
        {!hideBack && backSlug && (
          <OrganicButton variant="secondary" type="button" onClick={() => router.push(`/onboarding/${backSlug}`)}>
            <ArrowLeft className="size-4" aria-hidden /> Back
          </OrganicButton>
        )}
        <OrganicButton type="button" onClick={onContinue} isLoading={isSubmitting} disabled={continueDisabled} showArrow>
          {continueLabel}
        </OrganicButton>
      </div>
    </div>
  );
}
