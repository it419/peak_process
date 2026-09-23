"use client";

import { useReferencesStepLogic } from "@/hooks/steps/useReferencesStepLogic";
import { TextField } from "@/components/ui/TextField";
import { StepShell } from "@/components/onboarding/StepShell";
import { FormSection } from "@/components/onboarding/FormSection";

export function ReferencesStep() {
  const { register, errors, isSubmitting, onContinue } = useReferencesStepLogic();

  return (
    <StepShell
      stepId="references"
      title="Professional references"
      description="Two people who can speak to your work — a former manager or senior colleague works best."
      onContinue={onContinue}
      isSubmitting={isSubmitting}
    >
      <FormSection title="Reference 1" first>
        <TextField
          label="Full name"
          required
          error={errors.primaryReference?.name?.message}
          {...register("primaryReference.name")}
        />
        <TextField
          label="Relationship"
          placeholder="e.g. Former manager"
          required
          error={errors.primaryReference?.relationship?.message}
          {...register("primaryReference.relationship")}
        />
        <TextField
          label="Company"
          required
          error={errors.primaryReference?.company?.message}
          {...register("primaryReference.company")}
        />
        <TextField
          label="Email"
          type="email"
          required
          error={errors.primaryReference?.email?.message}
          {...register("primaryReference.email")}
        />
        <TextField
          label="Phone number"
          type="tel"
          required
          error={errors.primaryReference?.phone?.message}
          {...register("primaryReference.phone")}
        />
      </FormSection>

      <FormSection title="Reference 2">
        <TextField
          label="Full name"
          required
          error={errors.secondaryReference?.name?.message}
          {...register("secondaryReference.name")}
        />
        <TextField
          label="Relationship"
          placeholder="e.g. Senior colleague"
          required
          error={errors.secondaryReference?.relationship?.message}
          {...register("secondaryReference.relationship")}
        />
        <TextField
          label="Company"
          required
          error={errors.secondaryReference?.company?.message}
          {...register("secondaryReference.company")}
        />
        <TextField
          label="Email"
          type="email"
          required
          error={errors.secondaryReference?.email?.message}
          {...register("secondaryReference.email")}
        />
        <TextField
          label="Phone number"
          type="tel"
          required
          error={errors.secondaryReference?.phone?.message}
          {...register("secondaryReference.phone")}
        />
      </FormSection>
    </StepShell>
  );
}
