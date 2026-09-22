import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  percent: number;
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
}

export function ProgressBar({ percent, className, trackClassName, fillClassName }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-1.5 w-full overflow-hidden rounded-full", trackClassName ?? "bg-paper-200", className)}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-500 ease-out", fillClassName ?? "bg-ember-600")}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
