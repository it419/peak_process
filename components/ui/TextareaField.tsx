import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { FieldWrapper } from "./FieldWrapper";
import { fieldInputVariants } from "./fieldStyles";

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  function TextareaField({ label, error, helperText, required, id, name, className, rows = 3, ...props }, ref) {
    const inputId = id ?? name;
    return (
      <FieldWrapper
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
          className={cn(fieldInputVariants({ hasError: Boolean(error) }), "py-2.5 resize-none", className)}
          aria-invalid={Boolean(error)}
          {...props}
        />
      </FieldWrapper>
    );
  },
);
