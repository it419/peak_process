"use client";

import { usePersonalInfoStepLogic } from "@/hooks/steps/usePersonalInfoStepLogic";
import { genderOptions } from "@/lib/schemas/shared";
import { OrganicTextField } from "../ui/OrganicTextField";
import { OrganicSelectField } from "../ui/OrganicSelectField";
import { OrganicTextareaField } from "../ui/OrganicTextareaField";
import { OrganicMaskedField } from "../ui/OrganicMaskedField";
import { OrganicStepShell } from "../OrganicStepShell";
import { OrganicFormSection } from "../OrganicFormSection";

export function PersonalInfoStepOrganic() {
  const { register, control, errors, isSubmitting, onContinue } = usePersonalInfoStepLogic();

  return (
    <OrganicStepShell
      stepId="personalInfo"
      title="Personal Information"
      description="Let’s get your information in place."
      onContinue={onContinue}
      isSubmitting={isSubmitting}
    >
      <OrganicFormSection title="Basic information" first>
        <OrganicTextField
          label="First name"
          required
          autoComplete="given-name"
          error={errors.basicInfo?.firstName?.message}
          {...register("basicInfo.firstName")}
        />
        <OrganicTextField
          label="Last name"
          required
          autoComplete="family-name"
          error={errors.basicInfo?.lastName?.message}
          {...register("basicInfo.lastName")}
        />
        <OrganicTextField
          label="Date of birth"
          type="date"
          required
          error={errors.basicInfo?.dateOfBirth?.message}
          {...register("basicInfo.dateOfBirth")}
        />
        <OrganicSelectField
          label="Gender"
          options={[...genderOptions]}
          error={errors.basicInfo?.gender?.message}
          {...register("basicInfo.gender")}
        />
      </OrganicFormSection>

      <OrganicFormSection title="Contact information">
        <OrganicTextField
          label="Personal email"
          type="email"
          required
          placeholder="you@email.com"
          autoComplete="email"
          error={errors.contactInfo?.personalEmail?.message}
          {...register("contactInfo.personalEmail")}
        />
        <OrganicTextField
          label="Phone number"
          type="tel"
          required
          placeholder="+91 98765 43210"
          autoComplete="tel"
          error={errors.contactInfo?.phone?.message}
          {...register("contactInfo.phone")}
        />
      </OrganicFormSection>

      <OrganicFormSection title="Address">
        <div className="sm:col-span-2">
          <OrganicTextareaField
            label="Home address"
            required
            placeholder="Street, City, State, PIN"
            error={errors.address?.homeAddress?.message}
            {...register("address.homeAddress")}
          />
        </div>
      </OrganicFormSection>

      <OrganicFormSection
        title="Government information"
        description="Your information is encrypted and accessible only to authorized HR personnel."
      >
        <OrganicMaskedField
          control={control}
          name="governmentIds.aadhaar"
          label="Aadhaar number"
          required
          fullLength={12}
          placeholder="XXXX XXXX XXXX"
          error={errors.governmentIds?.aadhaar?.message}
        />
        <OrganicTextField
          label="PAN number"
          required
          placeholder="ABCDE1234F"
          className="uppercase"
          error={errors.governmentIds?.pan?.message}
          {...register("governmentIds.pan", { setValueAs: (v: string) => (v ?? "").toUpperCase() })}
        />
        <div className="max-w-55 sm:col-span-2">
          <OrganicTextField
            label="UAN number"
            placeholder="12-digit UAN"
            helperText="Leave blank if this is your first job."
            error={errors.governmentIds?.uan?.message}
            {...register("governmentIds.uan")}
          />
        </div>
      </OrganicFormSection>
    </OrganicStepShell>
  );
}
