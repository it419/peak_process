"use client";

import { useWelcomeStepLogic } from "@/hooks/steps/useWelcomeStepLogic";
import { DarkTextField } from "../ui/DarkTextField";
import { DarkStepShell } from "../DarkStepShell";

const READY_LIST = [
  "Your Aadhaar and PAN numbers, plus your UAN if you’ve worked before",
  "A photo or scan of a government ID and an address proof",
  "Contact details for two professional references",
  "Your emergency contact’s name and phone number",
];

export function WelcomeStepDark() {
  const { register, errors, isSubmitting, firstName, onContinue } = useWelcomeStepLogic();

  return (
    <DarkStepShell
      stepId="welcome"
      title={
        <>
          Welcome aboard, <span className="text-dark-gold">{firstName || "new hire"}</span>.
        </>
      }
      description="This portal will guide you through every step of your onboarding — personal details, benefits, and required documents. It should take about 10–15 minutes."
      onContinue={onContinue}
      continueLabel="Begin"
      isSubmitting={isSubmitting}
      hideBack
    >
      <div>
        <h3 className="font-dark-display text-base font-semibold text-dark-text">Before you begin</h3>
        <p className="mt-1 text-sm text-dark-text-muted">Have a few things on hand:</p>
        <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-relaxed text-dark-text-muted">
          {READY_LIST.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-dark-gold" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8 max-w-sm border-t border-dark-border pt-8">
          <DarkTextField
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
    </DarkStepShell>
  );
}
