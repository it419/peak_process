import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface DarkFieldWrapperProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function DarkFieldWrapper({
  label,
  htmlFor,
  required,
  helperText,
  error,
  children,
  className,
}: DarkFieldWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-[0.75rem] font-medium tracking-wide text-dark-text-muted uppercase">
        {label}
        {required && <span className="ml-1 text-dark-gold">*</span>}
      </label>
      {children}
      <p
        className={cn("min-h-4.25 text-[0.8125rem] leading-snug", error ? "text-dark-error" : "text-dark-text-faint")}
        role={error ? "alert" : undefined}
      >
        {error || helperText || " "}
      </p>
    </div>
  );
}
