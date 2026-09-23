"use client";

import { useEmergencyContactStepLogic } from "@/hooks/steps/useEmergencyContactStepLogic";
import { OrganicTextField } from "../ui/OrganicTextField";
import { OrganicTextareaField } from "../ui/OrganicTextareaField";
import { OrganicCheckbox } from "../ui/OrganicCheckbox";
import { OrganicStepShell } from "../OrganicStepShell";
import { OrganicFormSection } from "../OrganicFormSection";

export function EmergencyContactStepOrganic() {
  const { register, errors, isSubmitting, onContinue, sameAsHomeAddress, homeAddress } =
    useEmergencyContactStepLogic();

  return (
    <OrganicStepShell
      stepId="emergencyContact"
      title="Emergency Contact"
      onContinue={onContinue}
      isSubmitting={isSubmitting}
    >
      <OrganicFormSection title="Contact details" first>
        <OrganicTextField label="Full name" required error={errors.name?.message} {...register("name")} />
        <OrganicTextField
          label="Relationship"
          placeholder="e.g. Spouse, Parent, Sibling"
          required
          error={errors.relationship?.message}
          {...register("relationship")}
        />
        <OrganicTextField
          label="Primary phone"
          type="tel"
          required
          error={errors.primaryPhone?.message}
          {...register("primaryPhone")}
        />
        <OrganicTextField
          label="Secondary phone"
          type="tel"
          helperText="Optional"
          error={errors.secondaryPhone?.message}
          {...register("secondaryPhone")}
        />
      </OrganicFormSection>

      <OrganicFormSection title="Address">
        <div className="flex flex-col gap-4 sm:col-span-2">
          <OrganicCheckbox label="Same as my home address" {...register("sameAsHomeAddress")} />
          {sameAsHomeAddress ? (
            homeAddress ? (
              <p className="rounded-xl border border-organic-border bg-white/70 px-4 py-3 text-sm text-organic-ink-muted">
                {homeAddress}
              </p>
            ) : (
              <p className="text-sm text-organic-ink-faint">Add your home address in Personal Information first.</p>
            )
          ) : (
            <OrganicTextareaField
              label="Address"
              required
              placeholder="Street, City, State, PIN"
              error={errors.address?.message}
              {...register("address")}
            />
          )}
        </div>
      </OrganicFormSection>
    </OrganicStepShell>
  );
}
