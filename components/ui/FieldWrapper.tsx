import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function FieldWrapper({
  label,
  htmlFor,
  required,
  helperText,
  error,
  children,
  className,
}: FieldWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-[0.8125rem] font-medium text-paper-ink-600">
        {label}
        {required && <span className="ml-1 text-ember-700">*</span>}
      </label>
      {children}
      {/* Fixed-height slot: reserved even when empty so a validation message
          appearing never shifts layout beneath it (which can otherwise
          "eat" a click that lands mid-shift on a control below). */}
      <p
        className={cn(
          "min-h-4.25 text-[0.8125rem] leading-snug",
          error ? "text-error" : "text-paper-ink-400",
        )}
        role={error ? "alert" : undefined}
      >
        {error || helperText || " "}
      </p>
    </div>
  );
}
