"use client";

import { useReferencesStepLogic } from "@/hooks/steps/useReferencesStepLogic";
import { DarkTextField } from "../ui/DarkTextField";
import { DarkStepShell } from "../DarkStepShell";
import { DarkFormSection } from "../DarkFormSection";

export function ReferencesStepDark() {
  const { register, errors, isSubmitting, onContinue } = useReferencesStepLogic();

  return (
    <DarkStepShell
      stepId="references"
      title="Professional References"
      description="Two people who can speak to your work — a former manager or senior colleague works best."
      onContinue={onContinue}
      isSubmitting={isSubmitting}
    >
      <DarkFormSection title="Reference 1" first>
        <DarkTextField
          label="Full name"
          required
          error={errors.primaryReference?.name?.message}
          {...register("primaryReference.name")}
        />
        <DarkTextField
          label="Relationship"
          placeholder="e.g. Former manager"
          required
          error={errors.primaryReference?.relationship?.message}
          {...register("primaryReference.relationship")}
        />
        <DarkTextField
          label="Company"
          required
          error={errors.primaryReference?.company?.message}
          {...register("primaryReference.company")}
        />
        <DarkTextField
          label="Email"
          type="email"
          required
          error={errors.primaryReference?.email?.message}
          {...register("primaryReference.email")}
        />
        <DarkTextField
          label="Phone number"
          type="tel"
          required
          error={errors.primaryReference?.phone?.message}
          {...register("primaryReference.phone")}
        />
      </DarkFormSection>

      <DarkFormSection title="Reference 2">
        <DarkTextField
          label="Full name"
          required
          error={errors.secondaryReference?.name?.message}
          {...register("secondaryReference.name")}
        />
        <DarkTextField
          label="Relationship"
          placeholder="e.g. Senior colleague"
          required
          error={errors.secondaryReference?.relationship?.message}
          {...register("secondaryReference.relationship")}
        />
        <DarkTextField
          label="Company"
          required
          error={errors.secondaryReference?.company?.message}
          {...register("secondaryReference.company")}
        />
        <DarkTextField
          label="Email"
          type="email"
          required
          error={errors.secondaryReference?.email?.message}
          {...register("secondaryReference.email")}
        />
        <DarkTextField
          label="Phone number"
          type="tel"
          required
          error={errors.secondaryReference?.phone?.message}
          {...register("secondaryReference.phone")}
        />
      </DarkFormSection>
    </DarkStepShell>
  );
}
