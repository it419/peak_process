import Link from "next/link";
import { Check } from "lucide-react";
import { PeakWordmark } from "@/components/Logo";
import { buttonVariants } from "@/components/ui/buttonVariants";

export function ApplicationConfirmationCurrent({ jobTitle, reference }: { jobTitle: string; reference: string }) {
  return (
    <div className="min-h-screen bg-paper-50">
      <header className="border-b border-paper-200 px-5 py-5 tablet:px-10">
        <Link href="/jobs">
          <PeakWordmark subtitle="Careers" tone="light" />
        </Link>
      </header>

      <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-20 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-success-tint text-success">
          <Check className="size-7" strokeWidth={2.5} />
        </span>
        <p className="eyebrow mt-6 text-ember-700">Application Received</p>
        <h1 className="mt-2 font-display text-[1.75rem] font-semibold text-paper-ink-900 tablet:text-[2rem]">
          Thank you for applying for {jobTitle}.
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-paper-ink-600">
          Your application has been successfully submitted. Our recruitment team will review your application and
          contact you if there are further steps.
        </p>
        {reference && (
          <p className="mt-6 text-sm text-paper-ink-400">
            Application reference: <span className="font-mono text-paper-ink-900">{reference}</span>
          </p>
        )}
        <Link href="/jobs" className={`${buttonVariants({ variant: "primary" })} mt-8`}>
          Browse more positions
        </Link>
      </div>
    </div>
  );
}
