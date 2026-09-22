"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useOnboardingStore } from "@/lib/store/onboardingStore";
import { buttonVariants } from "@/components/ui/buttonVariants";

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function CompletionScreen() {
  const submissionId = useOnboardingStore((s) => s.submissionId);
  const submittedAt = useOnboardingStore((s) => s.submittedAt);
  const fullName = useOnboardingStore((s) => s.welcome.fullName);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-10 text-center tablet:py-16">
      <span className="flex size-14 items-center justify-center rounded-full bg-success-tint text-success">
        <Check className="size-7" strokeWidth={2.5} />
      </span>

      <p className="eyebrow mt-6 text-ember-700">Peak Process Partners</p>
      <h1 className="mt-2 font-display text-[2rem] leading-tight font-semibold text-paper-ink-900 tablet:text-[2.25rem]">
        You{"’"}re all set{fullName ? `, ${firstName(fullName)}` : ""}.
      </h1>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-paper-ink-600">
        Your onboarding information has been submitted to HR{submittedAt ? ` on ${formatDate(submittedAt)}` : ""}.
      </p>

      <div className="mt-8 w-full rounded-md border border-paper-200 bg-paper-100/60 p-5 text-left">
        <p className="eyebrow text-paper-ink-400">Next steps</p>
        <p className="mt-2 text-sm leading-relaxed text-paper-ink-600">
          HR will review your information and reach out if anything else is required. You can expect to hear from
          us within 2{"–"}3 business days.
        </p>
        {submissionId && (
          <p className="mt-3 text-xs text-paper-ink-400">
            Reference ID: <span className="font-mono">{submissionId}</span>
          </p>
        )}
      </div>

      <Link href="/dashboard" className={cn(buttonVariants({ variant: "primary" }), "mt-8")}>
        Return to dashboard
      </Link>
    </div>
  );
}
