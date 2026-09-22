"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleAlert } from "lucide-react";
import { useOnboardingStore } from "@/lib/store/onboardingStore";
import { useStepStatuses } from "@/lib/store/selectors";
import { stepRegistry } from "@/lib/onboarding/steps.config";
import { DOCUMENT_REQUIREMENTS } from "@/lib/onboarding/documents.config";
import { coverageTypeOptions } from "@/lib/schemas/healthInsurance.schema";
import { ReviewSection } from "@/components/onboarding/ReviewSection";
import { Checkbox } from "@/components/ui/Checkbox";
import { StepShell } from "@/components/onboarding/StepShell";

function coverageLabel(value?: string): string | undefined {
  return coverageTypeOptions.find((o) => o.value === value)?.label;
}

export function ReviewStep() {
  const router = useRouter();
  const statuses = useStepStatuses();
  const submitOnboarding = useOnboardingStore((s) => s.submitOnboarding);
  const welcome = useOnboardingStore((s) => s.welcome);
  const personalInfo = useOnboardingStore((s) => s.personalInfo);
  const references = useOnboardingStore((s) => s.references);
  const emergencyContact = useOnboardingStore((s) => s.emergencyContact);
  const healthInsurance = useOnboardingStore((s) => s.healthInsurance);
  const documents = useOnboardingStore((s) => s.documents);

  const [confirmed, setConfirmed] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reviewSteps = stepRegistry.filter((step) => step.id !== "review");
  const allOtherComplete = reviewSteps.every((step) => statuses[step.id] === "completed");
  const uploadedDocsCount = Object.values(documents).filter(
    (d) => d.status === "uploaded" || d.status === "provided",
  ).length;

  const summaries: Partial<Record<string, string | undefined>> = {
    welcome: welcome.fullName,
    personalInfo: personalInfo.contactInfo?.personalEmail,
    references:
      references.primaryReference?.name && references.secondaryReference?.name
        ? `${references.primaryReference.name}, ${references.secondaryReference.name}`
        : undefined,
    emergencyContact: emergencyContact.name,
    healthInsurance: coverageLabel(healthInsurance.coverageType),
    documents: `${uploadedDocsCount}/${DOCUMENT_REQUIREMENTS.length} uploaded`,
  };

  const onSubmit = async () => {
    setSubmitError(null);
    setIsSubmitting(true);
    const result = await submitOnboarding();
    setIsSubmitting(false);
    if ("error" in result) {
      setSubmitError(result.error);
    } else {
      router.push("/onboarding/complete");
    }
  };

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
