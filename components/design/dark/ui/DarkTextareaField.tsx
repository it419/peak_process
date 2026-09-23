import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { DarkFieldWrapper } from "./DarkFieldWrapper";
import { darkFieldInputVariants } from "./darkFieldStyles";

interface DarkTextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const DarkTextareaField = forwardRef<HTMLTextAreaElement, DarkTextareaFieldProps>(
  function DarkTextareaField({ label, error, helperText, required, id, name, className, rows = 3, ...props }, ref) {
    const inputId = id ?? name;
    return (
      <DarkFieldWrapper label={label} htmlFor={inputId ?? label} required={required} error={error} helperText={helperText}>
        <textarea
          ref={ref}
          id={inputId}
          name={name}
          rows={rows}
          className={cn(darkFieldInputVariants({ hasError: Boolean(error) }), "resize-none py-2.5", className)}
          aria-invalid={Boolean(error)}
          {...props}
        />
      </DarkFieldWrapper>
    );
  },
);
