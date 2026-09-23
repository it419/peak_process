import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { DarkFieldWrapper } from "./DarkFieldWrapper";
import { darkFieldHeightClass, darkFieldInputVariants } from "./darkFieldStyles";

interface DarkSelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const DarkSelectField = forwardRef<HTMLSelectElement, DarkSelectFieldProps>(function DarkSelectField(
  { label, error, helperText, required, id, name, className, options, placeholder = "Select…", ...props },
  ref,
) {
  const inputId = id ?? name;
  return (
    <DarkFieldWrapper label={label} htmlFor={inputId ?? label} required={required} error={error} helperText={helperText}>
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          name={name}
          className={cn(
            darkFieldInputVariants({ hasError: Boolean(error) }),
            darkFieldHeightClass,
            "appearance-none pr-9",
            className,
          )}
          aria-invalid={Boolean(error)}
          defaultValue=""
          {...props}
        >
          <option value="" disabled className="text-dark-text-faint">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-dark-surface-2 text-dark-text">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-dark-text-faint"
          aria-hidden
        />
      </div>
    </DarkFieldWrapper>
  );
});
