import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { OrganicFieldWrapper } from "./OrganicFieldWrapper";
import { organicFieldHeightClass, organicFieldInputVariants } from "./organicFieldStyles";

interface OrganicTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const OrganicTextField = forwardRef<HTMLInputElement, OrganicTextFieldProps>(function OrganicTextField(
  { label, error, helperText, required, id, name, className, ...props },
  ref,
) {
  const inputId = id ?? name;
  return (
    <OrganicFieldWrapper
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
        className={cn(organicFieldInputVariants({ hasError: Boolean(error) }), organicFieldHeightClass, className)}
        aria-invalid={Boolean(error)}
        {...props}
      />
    </OrganicFieldWrapper>
  );
});
