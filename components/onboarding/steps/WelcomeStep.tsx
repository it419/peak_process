"use client";

import { useRouter } from "next/navigation";
import { useOnboardingForm } from "@/hooks/useOnboardingForm";
import { welcomeDefaults, welcomeSchema } from "@/lib/schemas/welcome.schema";
import { TextField } from "@/components/ui/TextField";
import { StepShell } from "@/components/onboarding/StepShell";

const READY_LIST = [
  "Your Aadhaar and PAN numbers, plus your UAN if you’ve worked before",
  "A photo or scan of a government ID and an address proof",
  "Contact details for two professional references",
  "Your emergency contact’s name and phone number",
];

export function WelcomeStep() {
  const router = useRouter();
  const { form, saveNow } = useOnboardingForm({
    step: "welcome",
    schema: welcomeSchema,
    defaultValues: welcomeDefaults,
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const typedName = watch("fullName");
  const firstName = typedName?.trim().split(/\s+/)[0];

  const onContinue = handleSubmit(async (data) => {
    await saveNow(data);
    router.push("/onboarding/personal-information");
  });

  return (
    <StepShell
      stepId="welcome"
      title={
        <>
          Welcome aboard, <em className="font-display text-ember-700">{firstName || "new hire"}.</em>
        </>
      }
      description="We’re glad you’re here. This portal will guide you through every step of your onboarding — from personal details to emergency contacts and benefits enrollment. It should take about 10–15 minutes, and everything saves automatically as you go."
      onContinue={onContinue}
      continueLabel="Begin"
      isSubmitting={isSubmitting}
      size="display"
      hideBack
    >
      <div className="max-w-xl">
        <section>
          <h3 className="font-display text-lg font-semibold text-paper-ink-900">Before you begin</h3>
          <p className="mt-1 text-sm text-paper-ink-600">
            Have a few things on hand so you can get through this in one sitting:
          </p>
          <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-relaxed text-paper-ink-700">
            {READY_LIST.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="mt-9 max-w-sm border-t border-paper-200 pt-9">
          <TextField
            label="Your full name"
            required
            placeholder="e.g. Priya Sharma"
            autoComplete="name"
            autoFocus
            error={errors.fullName?.message}
            {...register("fullName")}
          />
        </div>
      </div>
    </StepShell>
  );
}
