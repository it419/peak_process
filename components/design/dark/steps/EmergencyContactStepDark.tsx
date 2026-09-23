"use client";

import { useEmergencyContactStepLogic } from "@/hooks/steps/useEmergencyContactStepLogic";
import { DarkTextField } from "../ui/DarkTextField";
import { DarkTextareaField } from "../ui/DarkTextareaField";
import { DarkCheckbox } from "../ui/DarkCheckbox";
import { DarkStepShell } from "../DarkStepShell";
import { DarkFormSection } from "../DarkFormSection";

export function EmergencyContactStepDark() {
  const { register, errors, isSubmitting, onContinue, sameAsHomeAddress, homeAddress } =
    useEmergencyContactStepLogic();

  return (
    <DarkStepShell stepId="emergencyContact" title="Emergency Contact" onContinue={onContinue} isSubmitting={isSubmitting}>
      <DarkFormSection title="Contact details" first>
        <DarkTextField label="Full name" required error={errors.name?.message} {...register("name")} />
        <DarkTextField
          label="Relationship"
          placeholder="e.g. Spouse, Parent, Sibling"
          required
          error={errors.relationship?.message}
          {...register("relationship")}
        />
        <DarkTextField
          label="Primary phone"
          type="tel"
          required
          error={errors.primaryPhone?.message}
          {...register("primaryPhone")}
        />
        <DarkTextField
          label="Secondary phone"
          type="tel"
          helperText="Optional"
          error={errors.secondaryPhone?.message}
          {...register("secondaryPhone")}
        />
      </DarkFormSection>

      <DarkFormSection title="Address">
        <div className="flex flex-col gap-4 sm:col-span-2">
          <DarkCheckbox label="Same as my home address" {...register("sameAsHomeAddress")} />
          {sameAsHomeAddress ? (
            homeAddress ? (
              <p className="rounded-md border border-dark-border bg-dark-surface-2 px-3.5 py-3 text-sm text-dark-text-muted">
                {homeAddress}
              </p>
            ) : (
              <p className="text-sm text-dark-text-faint">Add your home address in Personal Information first.</p>
            )
          ) : (
            <DarkTextareaField
              label="Address"
              required
              placeholder="Street, City, State, PIN"
              error={errors.address?.message}
              {...register("address")}
            />
          )}
        </div>
      </DarkFormSection>
    </DarkStepShell>
  );
}
