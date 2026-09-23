import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface OrganicFieldWrapperProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function OrganicFieldWrapper({
  label,
  htmlFor,
  required,
  helperText,
  error,
  children,
  className,
}: OrganicFieldWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-[0.8125rem] font-medium text-organic-ink-muted">
        {label}
        {required && <span className="ml-1 text-organic-terracotta">*</span>}
      </label>
      {children}
      <p
        className={cn(
          "min-h-4.25 text-[0.8125rem] leading-snug",
          error ? "text-organic-error" : "text-organic-ink-faint",
        )}
        role={error ? "alert" : undefined}
      >
        {error || helperText || " "}
      </p>
    </div>
  );
}
