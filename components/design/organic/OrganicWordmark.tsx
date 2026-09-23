import { PeakMark } from "@/components/Logo";
import { cn } from "@/lib/utils/cn";

/** Same brand mark as the other two designs, paired with Organic's own
 *  Fraunces italic lockup instead of Design 1's Lora or Dark's Space Grotesk. */
export function OrganicWordmark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <PeakMark className="size-9 shrink-0" />
      <div className="min-w-0 leading-tight">
        <div className="font-organic-display truncate text-base font-semibold italic text-organic-ink">
          Peak Process Partners
        </div>
        <div className="mt-0.5 truncate text-[0.6875rem] font-medium tracking-widest text-organic-ink-faint uppercase">
          Employee Onboarding
        </div>
      </div>
    </div>
  );
}
