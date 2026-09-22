import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { FieldWrapper } from "./FieldWrapper";
import { fieldHeightClass, fieldInputVariants } from "./fieldStyles";

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { label, error, helperText, required, id, name, className, options, placeholder = "Select…", ...props },
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
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          name={name}
          className={cn(
            fieldInputVariants({ hasError: Boolean(error) }),
            fieldHeightClass,
            "appearance-none pr-9",
            className,
          )}
          aria-invalid={Boolean(error)}
          defaultValue=""
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-paper-ink-400"
          aria-hidden
        />
      </div>
    </FieldWrapper>
  );
});
