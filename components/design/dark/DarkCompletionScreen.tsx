"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useOnboardingStore } from "@/lib/store/onboardingStore";

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function DarkCompletionScreen() {
  const submissionId = useOnboardingStore((s) => s.submissionId);
  const submittedAt = useOnboardingStore((s) => s.submittedAt);
  const fullName = useOnboardingStore((s) => s.welcome.fullName);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-10 text-center tablet:py-16">
      <span className="flex size-14 items-center justify-center rounded-full bg-dark-success-tint text-dark-success">
        <Check className="size-7" strokeWidth={2.5} />
      </span>

      <p className="mt-6 text-[0.8125rem] font-semibold tracking-widest text-dark-gold uppercase">
        Peak Process Partners
      </p>
      <h1 className="font-dark-display mt-2 text-[2rem] leading-tight font-semibold text-dark-text tablet:text-[2.25rem]">
        You{"’"}re all set{fullName ? `, ${firstName(fullName)}` : ""}.
      </h1>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-dark-text-muted">
        Your onboarding information has been submitted to HR{submittedAt ? ` on ${formatDate(submittedAt)}` : ""}.
      </p>

      <div className="mt-8 w-full rounded-xl border border-dark-border bg-dark-surface p-5 text-left">
        <p className="text-[0.6875rem] font-semibold tracking-widest text-dark-text-faint uppercase">Next steps</p>
        <p className="mt-2 text-sm leading-relaxed text-dark-text-muted">
          HR will review your information and reach out if anything else is required. You can expect to hear from
          us within 2{"–"}3 business days.
        </p>
        {submissionId && (
          <p className="mt-3 text-xs text-dark-text-faint">
            Reference ID: <span className="font-mono">{submissionId}</span>
          </p>
        )}
      </div>

      <Link
        href="/dashboard"
        className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-dark-gold px-6 text-sm font-medium text-dark-bg transition-colors hover:bg-dark-gold-hover"
      >
        Return to dashboard
      </Link>
    </div>
  );
}
