"use client";

import { useWelcomeStepLogic } from "@/hooks/steps/useWelcomeStepLogic";
import { OrganicTextField } from "../ui/OrganicTextField";
import { OrganicStepShell } from "../OrganicStepShell";

const READY_LIST = [
  "Your Aadhaar and PAN numbers, plus your UAN if you’ve worked before",
  "A photo or scan of a government ID and an address proof",
  "Contact details for two professional references",
  "Your emergency contact’s name and phone number",
];

export function WelcomeStepOrganic() {
  const { register, errors, isSubmitting, firstName, onContinue } = useWelcomeStepLogic();

  return (
    <OrganicStepShell
      stepId="welcome"
      title={
        <>
          Welcome aboard, <span className="text-organic-terracotta italic">{firstName || "new hire"}</span>.
        </>
      }
      description="This portal will guide you through every step of your onboarding — personal details, benefits, and required documents. It should take about 10–15 minutes."
      onContinue={onContinue}
      continueLabel="Begin"
      isSubmitting={isSubmitting}
      hideBack
    >
      <div>
        <h3 className="font-organic-display text-base font-semibold text-organic-ink">Before you begin</h3>
        <p className="mt-1 text-sm text-organic-ink-muted">Have a few things on hand:</p>
        <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-relaxed text-organic-ink-muted">
          {READY_LIST.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-organic-terracotta" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8 max-w-sm border-t border-organic-border pt-8">
          <OrganicTextField
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
    </OrganicStepShell>
  );
}
