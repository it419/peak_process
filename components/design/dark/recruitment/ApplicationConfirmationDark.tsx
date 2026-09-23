import Link from "next/link";
import { Check } from "lucide-react";
import { DarkWordmark } from "@/components/design/dark/DarkWordmark";
import { darkButtonVariants } from "@/components/design/dark/ui/DarkButton";

export function ApplicationConfirmationDark({ jobTitle, reference }: { jobTitle: string; reference: string }) {
  return (
    <div className="min-h-screen bg-dark-bg font-sans">
      <header className="border-b border-dark-border px-5 py-5 tablet:px-10">
        <Link href="/jobs">
          <DarkWordmark />
        </Link>
      </header>

      <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-20 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-dark-success-tint text-dark-success">
          <Check className="size-7" strokeWidth={2.5} />
        </span>
        <p className="mt-6 text-[0.8125rem] font-semibold tracking-widest text-dark-gold uppercase">Application Received</p>
        <h1 className="font-dark-display mt-2 text-[1.75rem] font-semibold text-dark-text tablet:text-[2rem]">
          Thank you for applying for {jobTitle}.
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-dark-text-muted">
          Your application has been successfully submitted. Our recruitment team will review your application and
          contact you if there are further steps.
        </p>
        {reference && (
          <p className="mt-6 text-sm text-dark-text-faint">
            Application reference: <span className="font-mono text-dark-text">{reference}</span>
          </p>
        )}
        <Link href="/jobs" className={`${darkButtonVariants({ variant: "primary" })} mt-8`}>
          Browse more positions
        </Link>
      </div>
    </div>
  );
}
