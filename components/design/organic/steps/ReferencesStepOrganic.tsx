"use client";

import { useReferencesStepLogic } from "@/hooks/steps/useReferencesStepLogic";
import { OrganicTextField } from "../ui/OrganicTextField";
import { OrganicStepShell } from "../OrganicStepShell";
import { OrganicFormSection } from "../OrganicFormSection";

export function ReferencesStepOrganic() {
  const { register, errors, isSubmitting, onContinue } = useReferencesStepLogic();

  return (
    <OrganicStepShell
      stepId="references"
      title="Professional References"
      description="Two people who can speak to your work — a former manager or senior colleague works best."
      onContinue={onContinue}
      isSubmitting={isSubmitting}
    >
      <OrganicFormSection title="Reference 1" first>
        <OrganicTextField
          label="Full name"
          required
          error={errors.primaryReference?.name?.message}
          {...register("primaryReference.name")}
        />
        <OrganicTextField
          label="Relationship"
          placeholder="e.g. Former manager"
          required
          error={errors.primaryReference?.relationship?.message}
          {...register("primaryReference.relationship")}
        />
        <OrganicTextField
          label="Company"
          required
          error={errors.primaryReference?.company?.message}
          {...register("primaryReference.company")}
        />
        <OrganicTextField
          label="Email"
          type="email"
          required
          error={errors.primaryReference?.email?.message}
          {...register("primaryReference.email")}
        />
        <OrganicTextField
          label="Phone number"
          type="tel"
          required
          error={errors.primaryReference?.phone?.message}
          {...register("primaryReference.phone")}
        />
      </OrganicFormSection>

      <OrganicFormSection title="Reference 2">
        <OrganicTextField
          label="Full name"
          required
          error={errors.secondaryReference?.name?.message}
          {...register("secondaryReference.name")}
        />
        <OrganicTextField
          label="Relationship"
          placeholder="e.g. Senior colleague"
          required
          error={errors.secondaryReference?.relationship?.message}
          {...register("secondaryReference.relationship")}
        />
        <OrganicTextField
          label="Company"
          required
          error={errors.secondaryReference?.company?.message}
          {...register("secondaryReference.company")}
        />
        <OrganicTextField
          label="Email"
          type="email"
          required
          error={errors.secondaryReference?.email?.message}
          {...register("secondaryReference.email")}
        />
        <OrganicTextField
          label="Phone number"
          type="tel"
          required
          error={errors.secondaryReference?.phone?.message}
          {...register("secondaryReference.phone")}
        />
      </OrganicFormSection>
    </OrganicStepShell>
  );
}
