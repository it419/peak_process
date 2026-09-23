import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { DarkFieldWrapper } from "./DarkFieldWrapper";
import { darkFieldHeightClass, darkFieldInputVariants } from "./darkFieldStyles";

interface DarkTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const DarkTextField = forwardRef<HTMLInputElement, DarkTextFieldProps>(function DarkTextField(
  { label, error, helperText, required, id, name, className, ...props },
  ref,
) {
  const inputId = id ?? name;
  return (
    <DarkFieldWrapper label={label} htmlFor={inputId ?? label} required={required} error={error} helperText={helperText}>
      <input
        ref={ref}
        id={inputId}
        name={name}
        className={cn(darkFieldInputVariants({ hasError: Boolean(error) }), darkFieldHeightClass, className)}
        aria-invalid={Boolean(error)}
        {...props}
      />
    </DarkFieldWrapper>
  );
});
