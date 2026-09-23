import { PeakMark } from "@/components/Logo";
import { cn } from "@/lib/utils/cn";

/** Same brand mark as Design 1, paired with Dark's own Space Grotesk
 *  typography instead of the shared PeakWordmark (which is hardcoded to
 *  Lora) — keeps the icon consistent across designs while letting each
 *  design's type system stay genuinely its own. */
export function DarkWordmark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <PeakMark className="size-9 shrink-0" />
      <div className="min-w-0 leading-tight">
        <div className="font-dark-display truncate text-[15px] font-semibold text-dark-text">
          Peak Process Partners
        </div>
        <div className="mt-0.5 truncate text-[0.6875rem] font-medium tracking-widest text-dark-text-faint uppercase">
          Employee Onboarding
        </div>
      </div>
    </div>
  );
}
