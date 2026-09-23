"use client";

import { CircleAlert } from "lucide-react";
import { useReviewStepLogic } from "@/hooks/steps/useReviewStepLogic";
import { DarkReviewSection } from "../DarkReviewSection";
import { DarkCheckbox } from "../ui/DarkCheckbox";
import { DarkStepShell } from "../DarkStepShell";

export function ReviewStepDark() {
  const {
    statuses,
    reviewSteps,
    allOtherComplete,
    summaries,
    confirmed,
    setConfirmed,
    submitError,
    isSubmitting,
    onSubmit,
  } = useReviewStepLogic();

  return (
    <DarkStepShell
      stepId="review"
      title="Review & Submit"
      description="Please review your information carefully before submitting. Once submitted, you’ll need to contact HR to make further changes."
      onContinue={onSubmit}
      continueLabel="Submit onboarding"
      continueDisabled={!confirmed || !allOtherComplete}
      isSubmitting={isSubmitting}
    >
      <div className="-mx-6 px-6 tablet:-mx-8 tablet:px-8">
        {reviewSteps.map((step) => (
          <DarkReviewSection
            key={step.id}
            title={step.label}
            status={statuses[step.id]}
            href={`/onboarding/${step.slug}`}
            summary={summaries[step.id]}
          />
        ))}
      </div>

      {!allOtherComplete && (
        <p className="mt-5 flex items-center gap-2 text-sm text-dark-error">
          <CircleAlert className="size-4 shrink-0" /> Finish the sections above before submitting.
        </p>
      )}

      {submitError && (
        <p className="mt-5 flex items-center gap-2 text-sm text-dark-error">
          <CircleAlert className="size-4 shrink-0" /> {submitError}
        </p>
      )}

      <div className="mt-8 rounded-md border border-dark-gold/30 bg-dark-surface-2 p-4">
        <DarkCheckbox
          label="I confirm the information provided is accurate to the best of my knowledge."
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />
      </div>
    </DarkStepShell>
  );
}
