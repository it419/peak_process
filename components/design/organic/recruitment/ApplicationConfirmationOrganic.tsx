import Link from "next/link";
import { Check } from "lucide-react";
import { OrganicWordmark } from "@/components/design/organic/OrganicWordmark";
import { organicButtonVariants } from "@/components/design/organic/ui/OrganicButton";
import { CurveDivider } from "@/components/design/organic/CurveDivider";

export function ApplicationConfirmationOrganic({ jobTitle, reference }: { jobTitle: string; reference: string }) {
  return (
    <div className="min-h-screen bg-organic-bg font-organic-sans">
      <header className="border-b border-organic-border px-5 py-5 sm:px-10">
        <Link href="/jobs">
          <OrganicWordmark />
        </Link>
      </header>

      <div className="flex flex-col items-center bg-organic-surface px-5 py-16 text-center sm:py-20">
        <span className="flex size-14 items-center justify-center rounded-full bg-organic-success-tint text-organic-success">
          <Check className="size-7" strokeWidth={2.5} />
        </span>
        <p className="mt-6 text-[0.8125rem] font-semibold tracking-widest text-organic-terracotta uppercase">
          Application Received
        </p>
        <h1 className="font-organic-display mt-2 max-w-lg text-[1.75rem] font-semibold text-organic-ink sm:text-[2rem]">
          Thank you for applying for {jobTitle}.
        </h1>
      </div>
      <CurveDivider fill="var(--color-organic-surface)" className="-mt-px h-8 sm:h-12 md:h-16" />

      <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-10 text-center">
        <p className="text-[0.9375rem] leading-relaxed text-organic-ink-muted">
          Your application has been successfully submitted. Our recruitment team will review your application and
          contact you if there are further steps.
        </p>
        {reference && (
          <p className="mt-6 text-sm text-organic-ink-faint">
            Application reference: <span className="font-mono text-organic-ink">{reference}</span>
          </p>
        )}
        <Link href="/jobs" className={`${organicButtonVariants({ variant: "primary" })} mt-8`}>
          Browse more positions
        </Link>
      </div>
    </div>
  );
}
