import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { FieldWrapper } from "./FieldWrapper";
import { fieldHeightClass, fieldInputVariants } from "./fieldStyles";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, helperText, required, id, name, className, ...props },
  ref,
) {
  const inputId = id ?? name;
  return (
    <FieldWrapper
      label={label}
      htmlFor={inputId ?? label}
      required={required}
      error={error}
      helperText={helperText}
    >
      <input
        ref={ref}
        id={inputId}
        name={name}
        className={cn(fieldInputVariants({ hasError: Boolean(error) }), fieldHeightClass, className)}
        aria-invalid={Boolean(error)}
        {...props}
      />
    </FieldWrapper>
  );
});
