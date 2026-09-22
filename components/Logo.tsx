import { cn } from "@/lib/utils/cn";

export function PeakMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="7" className="fill-ink-800" />
      <path d="M7 22.5L13.5 10L17 16.2L19.8 11.6L25 22.5H7Z" className="fill-gold-500" />
    </svg>
  );
}

interface PeakWordmarkProps {
  subtitle?: string;
  tone?: "dark" | "light";
  className?: string;
}

/** Full lockup: mark + "Peak Process Partners" + optional small-caps subtitle. */
export function PeakWordmark({ subtitle, tone = "dark", className }: PeakWordmarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <PeakMark className="size-9 shrink-0" />
      <div className="min-w-0 leading-tight">
        <div
          className={cn(
            "truncate font-display text-[15px] font-semibold",
            tone === "dark" ? "text-paper-50" : "text-paper-ink-900",
          )}
        >
          Peak Process Partners
        </div>
        {subtitle && (
          <div className={cn("eyebrow mt-0.5 truncate", tone === "dark" ? "text-ink-400" : "text-paper-ink-400")}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
