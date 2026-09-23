"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { useOnboardingStore } from "@/lib/store/onboardingStore";
import {
  useCompletionPercent,
  useCurrentStepId,
  useFullName,
  useRequiredDocumentsRemaining,
} from "@/lib/store/selectors";
import { getStepById } from "@/lib/onboarding/steps.config";
import { DarkWordmark } from "./DarkWordmark";
import { DarkStepTimeline } from "./DarkStepTimeline";

function DarkDashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-3 w-32 rounded bg-dark-surface-2" />
      <div className="h-9 w-2/3 rounded bg-dark-surface-2" />
      <div className="h-4 w-1/2 rounded bg-dark-surface-2" />
    </div>
  );
}

export function DarkDashboard() {
  const hasHydrated = useOnboardingStore((s) => s.hasHydrated);
  const submitted = useOnboardingStore((s) => s.submitted);
  const fullName = useFullName();
  const percent = useCompletionPercent();
  const currentStepId = useCurrentStepId();
  const currentStep = getStepById(currentStepId);
  const remainingDocs = useRequiredDocumentsRemaining();
  const firstName = fullName ? (fullName.trim().split(/\s+/)[0] ?? null) : null;

  return (
    <div className="min-h-screen bg-dark-bg font-sans">
      <header className="border-b border-dark-border px-5 py-5 tablet:px-10">
        <DarkWordmark />
      </header>

      <div className="mx-auto max-w-2xl px-5 py-10 tablet:px-10 tablet:py-16">
        {!hasHydrated ? (
          <DarkDashboardSkeleton />
        ) : (
          <>
            <p className="text-[0.8125rem] font-semibold tracking-widest text-dark-gold uppercase">
              Peak Process Partners
            </p>
            <h1 className="font-dark-display mt-2 text-[2rem] leading-tight font-semibold text-dark-text tablet:text-[2.375rem]">
              {submitted ? (
                <>You{"’"}re all set{firstName ? `, ${firstName}` : ""}.</>
              ) : firstName ? (
                <>
                  Welcome back, <span className="text-dark-gold">{firstName}</span>.
                </>
              ) : (
                <>Welcome to Peak Process Partners.</>
              )}
            </h1>
            <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-dark-text-muted">
              {submitted
                ? "Your onboarding has been submitted to HR. We’ll be in touch if anything else is needed."
                : `You’re ${percent}% of the way through.`}
            </p>

            <div className="mt-6 h-1.5 max-w-sm overflow-hidden rounded-full bg-dark-surface-2">
              <div
                className="h-full rounded-full bg-dark-gold transition-[width] duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>

            {!submitted && (
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <Link
                  href={fullName ? `/onboarding/${currentStep.slug}` : "/onboarding/welcome"}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-dark-gold px-5 text-sm font-medium text-dark-bg transition-colors hover:bg-dark-gold-hover"
                >
                  Continue onboarding {"→"}
                </Link>
                <p className="text-sm text-dark-text-muted">
                  Current step: <span className="font-medium text-dark-text">{currentStep.label}</span>
                </p>
              </div>
            )}

            {!submitted && percent > 0 && remainingDocs > 0 && (
              <p className="mt-5 text-sm text-dark-text-muted">
                {remainingDocs} required document{remainingDocs > 1 ? "s" : ""} still need
                {remainingDocs > 1 ? "" : "s"} uploading.
              </p>
            )}

            <div className={cn("mt-14 border-t border-dark-border pt-10")}>
              <h2 className="font-dark-display text-xl font-semibold text-dark-text">All steps</h2>
              <div className="mt-6 rounded-xl border border-dark-border bg-dark-surface p-2">
                <DarkStepTimeline />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
