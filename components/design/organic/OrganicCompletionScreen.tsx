"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useOnboardingStore } from "@/lib/store/onboardingStore";
import { CurveDivider } from "./CurveDivider";

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function OrganicCompletionScreen() {
  const submissionId = useOnboardingStore((s) => s.submissionId);
  const submittedAt = useOnboardingStore((s) => s.submittedAt);
  const fullName = useOnboardingStore((s) => s.welcome.fullName);

  return (
    <div>
      <div className="flex flex-col items-center rounded-[1.75rem] bg-organic-surface px-6 py-14 text-center sm:py-20">
        <span className="flex size-14 items-center justify-center rounded-full bg-organic-success-tint text-organic-success">
          <Check className="size-7" strokeWidth={2.5} />
        </span>

        <p className="mt-6 text-[0.8125rem] font-semibold tracking-widest text-organic-terracotta uppercase">
          Peak Process Partners
        </p>
        <h1 className="font-organic-display mt-2 text-[2rem] leading-tight font-semibold text-organic-ink sm:text-[2.5rem]">
          You{"’"}re all set{fullName ? `, ${firstName(fullName)}` : ""}.
        </h1>
        <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-organic-ink-muted">
          Your onboarding information has been submitted to HR{submittedAt ? ` on ${formatDate(submittedAt)}` : ""}.
        </p>
      </div>
      <CurveDivider fill="var(--color-organic-surface)" className="-mt-px h-8 sm:h-12 md:h-16" />

      <div className="mx-auto mt-6 flex max-w-lg flex-col items-center text-center sm:mt-10">
        <div className="w-full rounded-2xl border border-organic-border bg-white/70 p-5 text-left">
          <p className="text-[0.6875rem] font-semibold tracking-widest text-organic-ink-faint uppercase">Next steps</p>
          <p className="mt-2 text-sm leading-relaxed text-organic-ink-muted">
            HR will review your information and reach out if anything else is required. You can expect to hear from
            us within 2{"–"}3 business days.
          </p>
          {submissionId && (
            <p className="mt-3 text-xs text-organic-ink-faint">
              Reference ID: <span className="font-mono">{submissionId}</span>
            </p>
          )}
        </div>

        <Link
          href="/dashboard"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-organic-terracotta px-6 text-sm font-medium text-organic-bg transition-colors hover:bg-organic-terracotta-hover"
        >
          Return to dashboard
        </Link>
      </div>
    </div>
  );
}
