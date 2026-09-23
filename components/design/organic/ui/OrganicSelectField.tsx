import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { OrganicFieldWrapper } from "./OrganicFieldWrapper";
import { organicFieldHeightClass, organicFieldInputVariants } from "./organicFieldStyles";

interface OrganicSelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const OrganicSelectField = forwardRef<HTMLSelectElement, OrganicSelectFieldProps>(function OrganicSelectField(
  { label, error, helperText, required, id, name, className, options, placeholder = "Select…", ...props },
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
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          name={name}
          className={cn(
            organicFieldInputVariants({ hasError: Boolean(error) }),
            organicFieldHeightClass,
            "appearance-none pr-9",
            className,
          )}
          aria-invalid={Boolean(error)}
          defaultValue=""
          {...props}
        >
          <option value="" disabled className="text-organic-ink-faint">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-organic-ink">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-organic-ink-faint"
          aria-hidden
        />
      </div>
    </OrganicFieldWrapper>
  );
});
