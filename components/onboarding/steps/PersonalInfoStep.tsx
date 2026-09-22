"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingForm } from "@/hooks/useOnboardingForm";
import { personalInfoDefaults, personalInfoSchema } from "@/lib/schemas/personalInfo.schema";
import { genderOptions } from "@/lib/schemas/shared";
import { useOnboardingStore } from "@/lib/store/onboardingStore";
import { TextField } from "@/components/ui/TextField";
import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";
import { MaskedField } from "@/components/ui/MaskedField";
import { StepShell } from "@/components/onboarding/StepShell";
import { FormSection } from "@/components/onboarding/FormSection";

export function PersonalInfoStep() {
  const router = useRouter();
  const welcomeFullName = useOnboardingStore((s) => s.welcome.fullName);
  const { form, saveNow } = useOnboardingForm({
    step: "personalInfo",
    schema: personalInfoSchema,
    defaultValues: personalInfoDefaults,
  });
  const {
    register,
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  // Carry the name from Welcome into these fields instead of asking twice —
  // but only as a starting point, never overwriting something already typed here.
  useEffect(() => {
    if (!welcomeFullName) return;
    const hasFirst = Boolean(getValues("basicInfo.firstName"));
    const hasLast = Boolean(getValues("basicInfo.lastName"));
    if (hasFirst || hasLast) return;

    const [first, ...rest] = welcomeFullName.trim().split(/\s+/);
    if (first) setValue("basicInfo.firstName", first, { shouldDirty: false });
    if (rest.length) setValue("basicInfo.lastName", rest.join(" "), { shouldDirty: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [welcomeFullName]);

  const onContinue = handleSubmit(async (data) => {
    await saveNow(data);
    router.push("/onboarding/references");
  });

  return (
    <StepShell
      stepId="personalInfo"
      title="Personal information"
      onContinue={onContinue}
      isSubmitting={isSubmitting}
    >
      <FormSection title="Basic information" first>
        <TextField
          label="First name"
          required
          autoComplete="given-name"
          error={errors.basicInfo?.firstName?.message}
          {...register("basicInfo.firstName")}
        />
        <TextField
          label="Last name"
          required
          autoComplete="family-name"
          error={errors.basicInfo?.lastName?.message}
          {...register("basicInfo.lastName")}
        />
        <TextField
          label="Date of birth"
          type="date"
          required
          error={errors.basicInfo?.dateOfBirth?.message}
          {...register("basicInfo.dateOfBirth")}
        />
        <SelectField
          label="Gender"
          options={[...genderOptions]}
          error={errors.basicInfo?.gender?.message}
          {...register("basicInfo.gender")}
        />
      </FormSection>

      <FormSection title="Contact information">
        <TextField
          label="Personal email"
          type="email"
          required
          placeholder="you@email.com"
          autoComplete="email"
          error={errors.contactInfo?.personalEmail?.message}
          {...register("contactInfo.personalEmail")}
        />
        <TextField
          label="Phone number"
          type="tel"
          required
          placeholder="+91 98765 43210"
          autoComplete="tel"
          error={errors.contactInfo?.phone?.message}
          {...register("contactInfo.phone")}
        />
      </FormSection>

      <FormSection title="Address">
        <div className="sm:col-span-2">
          <TextareaField
            label="Home address"
            required
            placeholder="Street, City, State, PIN"
            error={errors.address?.homeAddress?.message}
            {...register("address.homeAddress")}
          />
        </div>
      </FormSection>

      <FormSection
        title="Government information"
        description="Your information is encrypted and accessible only to authorized HR personnel."
      >
        <MaskedField
          control={control}
          name="governmentIds.aadhaar"
          label="Aadhaar number"
          required
          fullLength={12}
          placeholder="XXXX XXXX XXXX"
          error={errors.governmentIds?.aadhaar?.message}
        />
        <TextField
          label="PAN number"
          required
          placeholder="ABCDE1234F"
          className="uppercase"
          error={errors.governmentIds?.pan?.message}
          {...register("governmentIds.pan", { setValueAs: (v: string) => (v ?? "").toUpperCase() })}
        />
        <div className="max-w-55 sm:col-span-2">
          <TextField
            label="UAN number"
            placeholder="12-digit UAN"
            helperText="Leave blank if this is your first job."
            error={errors.governmentIds?.uan?.message}
            {...register("governmentIds.uan")}
          />
        </div>
      </FormSection>
    </StepShell>
  );
}
