import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { OrganicFieldWrapper } from "./OrganicFieldWrapper";
import { organicFieldInputVariants } from "./organicFieldStyles";

interface OrganicTextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const OrganicTextareaField = forwardRef<HTMLTextAreaElement, OrganicTextareaFieldProps>(
  function OrganicTextareaField({ label, error, helperText, required, id, name, className, rows = 3, ...props }, ref) {
    const inputId = id ?? name;
    return (
      <OrganicFieldWrapper
        label={label}
        htmlFor={inputId ?? label}
        required={required}
        error={error}
        helperText={helperText}
      >
        <textarea
          ref={ref}
          id={inputId}
          name={name}
          rows={rows}
          className={cn(organicFieldInputVariants({ hasError: Boolean(error) }), "resize-none py-3", className)}
          aria-invalid={Boolean(error)}
          {...props}
        />
      </OrganicFieldWrapper>
    );
  },
);
