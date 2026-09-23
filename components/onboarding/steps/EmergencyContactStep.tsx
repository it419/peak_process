"use client";

import { useEmergencyContactStepLogic } from "@/hooks/steps/useEmergencyContactStepLogic";
import { TextField } from "@/components/ui/TextField";
import { TextareaField } from "@/components/ui/TextareaField";
import { Checkbox } from "@/components/ui/Checkbox";
import { StepShell } from "@/components/onboarding/StepShell";
import { FormSection } from "@/components/onboarding/FormSection";

export function EmergencyContactStep() {
  const { register, errors, isSubmitting, onContinue, sameAsHomeAddress, homeAddress } =
    useEmergencyContactStepLogic();

  return (
    <StepShell
      stepId="emergencyContact"
      title="Emergency contact"
      onContinue={onContinue}
      isSubmitting={isSubmitting}
    >
      <FormSection title="Contact details" first>
        <TextField label="Full name" required error={errors.name?.message} {...register("name")} />
        <TextField
          label="Relationship"
          placeholder="e.g. Spouse, Parent, Sibling"
          required
          error={errors.relationship?.message}
          {...register("relationship")}
        />
        <TextField
          label="Primary phone"
          type="tel"
          required
          error={errors.primaryPhone?.message}
          {...register("primaryPhone")}
        />
        <TextField
          label="Secondary phone"
          type="tel"
          helperText="Optional"
          error={errors.secondaryPhone?.message}
          {...register("secondaryPhone")}
        />
      </FormSection>

      <FormSection title="Address">
        <div className="flex flex-col gap-4 sm:col-span-2">
          <Checkbox label="Same as my home address" {...register("sameAsHomeAddress")} />
          {sameAsHomeAddress ? (
            homeAddress ? (
              <p className="rounded-md border border-paper-200 bg-paper-100/60 px-3.5 py-3 text-sm text-paper-ink-600">
                {homeAddress}
              </p>
            ) : (
              <p className="text-sm text-paper-ink-400">
                Add your home address in Personal Information first.
              </p>
            )
          ) : (
            <TextareaField
              label="Address"
              required
              placeholder="Street, City, State, PIN"
              error={errors.address?.message}
              {...register("address")}
            />
          )}
        </div>
      </FormSection>
    </StepShell>
  );
}
