"use client";

import { usePersonalInfoStepLogic } from "@/hooks/steps/usePersonalInfoStepLogic";
import { genderOptions } from "@/lib/schemas/shared";
import { DarkTextField } from "../ui/DarkTextField";
import { DarkSelectField } from "../ui/DarkSelectField";
import { DarkTextareaField } from "../ui/DarkTextareaField";
import { DarkMaskedField } from "../ui/DarkMaskedField";
import { DarkStepShell } from "../DarkStepShell";
import { DarkFormSection } from "../DarkFormSection";

export function PersonalInfoStepDark() {
  const { register, control, errors, isSubmitting, onContinue } = usePersonalInfoStepLogic();

  return (
    <DarkStepShell
      stepId="personalInfo"
      title="Personal Information"
      description="Let’s get your information in place."
      onContinue={onContinue}
      isSubmitting={isSubmitting}
    >
      <DarkFormSection title="Basic information" first>
        <DarkTextField
          label="First name"
          required
          autoComplete="given-name"
          error={errors.basicInfo?.firstName?.message}
          {...register("basicInfo.firstName")}
        />
        <DarkTextField
          label="Last name"
          required
          autoComplete="family-name"
          error={errors.basicInfo?.lastName?.message}
          {...register("basicInfo.lastName")}
        />
        <DarkTextField
          label="Date of birth"
          type="date"
          required
          error={errors.basicInfo?.dateOfBirth?.message}
          {...register("basicInfo.dateOfBirth")}
        />
        <DarkSelectField
          label="Gender"
          options={[...genderOptions]}
          error={errors.basicInfo?.gender?.message}
          {...register("basicInfo.gender")}
        />
      </DarkFormSection>

      <DarkFormSection title="Contact information">
        <DarkTextField
          label="Personal email"
          type="email"
          required
          placeholder="you@email.com"
          autoComplete="email"
          error={errors.contactInfo?.personalEmail?.message}
          {...register("contactInfo.personalEmail")}
        />
        <DarkTextField
          label="Phone number"
          type="tel"
          required
          placeholder="+91 98765 43210"
          autoComplete="tel"
          error={errors.contactInfo?.phone?.message}
          {...register("contactInfo.phone")}
        />
      </DarkFormSection>

      <DarkFormSection title="Address">
        <div className="sm:col-span-2">
          <DarkTextareaField
            label="Home address"
            required
            placeholder="Street, City, State, PIN"
            error={errors.address?.homeAddress?.message}
            {...register("address.homeAddress")}
          />
        </div>
      </DarkFormSection>

      <DarkFormSection
        title="Government information"
        description="Your information is encrypted and accessible only to authorized HR personnel."
      >
        <DarkMaskedField
          control={control}
          name="governmentIds.aadhaar"
          label="Aadhaar number"
          required
          fullLength={12}
          placeholder="XXXX XXXX XXXX"
          error={errors.governmentIds?.aadhaar?.message}
        />
        <DarkTextField
          label="PAN number"
          required
          placeholder="ABCDE1234F"
          className="uppercase"
          error={errors.governmentIds?.pan?.message}
          {...register("governmentIds.pan", { setValueAs: (v: string) => (v ?? "").toUpperCase() })}
        />
        <div className="max-w-55 sm:col-span-2">
          <DarkTextField
            label="UAN number"
            placeholder="12-digit UAN"
            helperText="Leave blank if this is your first job."
            error={errors.governmentIds?.uan?.message}
            {...register("governmentIds.uan")}
          />
        </div>
      </DarkFormSection>
    </DarkStepShell>
  );
}
