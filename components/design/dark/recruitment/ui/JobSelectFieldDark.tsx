import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { DarkFieldWrapper } from "@/components/design/dark/ui/DarkFieldWrapper";
import { darkFieldHeightClass, darkFieldInputVariants } from "@/components/design/dark/ui/darkFieldStyles";

interface JobSelectFieldDarkProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options: readonly { value: string; label: string }[];
}

/** No empty placeholder — see JobSelectField (Current) for why. */
export const JobSelectFieldDark = forwardRef<HTMLSelectElement, JobSelectFieldDarkProps>(function JobSelectFieldDark(
  { label, error, helperText, required, id, name, className, options, ...props },
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
          {...props}
        >
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
