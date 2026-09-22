"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useOnboardingStore } from "@/lib/store/onboardingStore";
import {
  useCompletionPercent,
  useCurrentStepId,
  useFullName,
  useRequiredDocumentsRemaining,
} from "@/lib/store/selectors";
import { getStepById } from "@/lib/onboarding/steps.config";

export function DashboardHero() {
  const fullName = useFullName();
  const percent = useCompletionPercent();
  const currentStepId = useCurrentStepId();
  const currentStep = getStepById(currentStepId);
  const remainingDocs = useRequiredDocumentsRemaining();
  const submitted = useOnboardingStore((s) => s.submitted);

  const firstName = fullName ? (fullName.trim().split(/\s+/)[0] ?? null) : null;

  return (
    <div>
      <p className="eyebrow text-ember-700">Peak Process Partners</p>
      <h1 className="mt-2 font-display text-[2rem] leading-tight font-semibold text-paper-ink-900 tablet:text-[2.375rem]">
        {submitted ? (
          <>
            You{"’"}re all set{firstName ? `, ${firstName}` : ""}.
          </>
        ) : firstName ? (
          <>
            Welcome back, <em className="font-display text-gold-600">{firstName}</em>.
          </>
        ) : (
          <>Welcome to Peak Process Partners.</>
        )}
      </h1>

      <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-paper-ink-600">
        {submitted
          ? "Your onboarding has been submitted to HR. We’ll be in touch if anything else is needed."
          : percent === 0
            ? "Let’s get your paperwork out of the way."
            : `You’re ${percent}% of the way through.`}
      </p>

      <div className="mt-6 max-w-sm">
        <ProgressBar percent={percent} />
      </div>

      {!submitted && (
        <div className="mt-7 flex flex-wrap items-center gap-5">
          <Link
            href={fullName ? `/onboarding/${currentStep.slug}` : "/onboarding/welcome"}
            className={cn(buttonVariants({ variant: "primary" }))}
          >
            Continue onboarding {"→"}
          </Link>
          <p className="text-sm text-paper-ink-600">
            Current step: <span className="font-medium text-paper-ink-900">{currentStep.label}</span>
          </p>
        </div>
      )}

      {!submitted && percent > 0 && remainingDocs > 0 && (
        <p className="mt-5 text-sm text-paper-ink-600">
          {remainingDocs} required document{remainingDocs > 1 ? "s" : ""} still need{remainingDocs > 1 ? "" : "s"} uploading.
        </p>
      )}
    </div>
  );
}
