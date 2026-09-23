"use client";

import { CircleAlert } from "lucide-react";
import { useReviewStepLogic } from "@/hooks/steps/useReviewStepLogic";
import { ReviewSection } from "@/components/onboarding/ReviewSection";
import { Checkbox } from "@/components/ui/Checkbox";
import { StepShell } from "@/components/onboarding/StepShell";

export function ReviewStep() {
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
    <StepShell
      stepId="review"
      title="Review & submit"
      description="Please review your information carefully before submitting. Once submitted, you’ll need to contact HR to make further changes."
      onContinue={onSubmit}
      continueLabel="Submit onboarding"
      continueDisabled={!confirmed || !allOtherComplete}
      isSubmitting={isSubmitting}
      size="display"
    >
      <div className="rounded-md border border-paper-200 px-5">
        {reviewSteps.map((step) => (
          <ReviewSection
            key={step.id}
            title={step.label}
            status={statuses[step.id]}
            href={`/onboarding/${step.slug}`}
            summary={summaries[step.id]}
          />
        ))}
      </div>

      {!allOtherComplete && (
        <p className="mt-4 flex items-center gap-2 text-sm text-error">
          <CircleAlert className="size-4 shrink-0" /> Finish the sections above before submitting.
        </p>
      )}

      {submitError && (
        <p className="mt-4 flex items-center gap-2 text-sm text-error">
          <CircleAlert className="size-4 shrink-0" /> {submitError}
        </p>
      )}

      <div className="mt-8 rounded-md border border-gold-500/30 bg-paper-100/60 p-4">
        <Checkbox
          label="I confirm the information provided is accurate to the best of my knowledge."
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />
      </div>
    </StepShell>
  );
}
