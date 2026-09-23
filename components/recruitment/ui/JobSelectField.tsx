import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { fieldHeightClass, fieldInputVariants } from "@/components/ui/fieldStyles";

interface JobSelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options: readonly { value: string; label: string }[];
}

/**
 * Like the onboarding SelectField, but with no disabled empty placeholder —
 * used for required enums that always have a real default (employment
 * type, work mode, status). A placeholder + register()'s uncontrolled
 * `defaultValue=""` would silently break editing an existing job: the DOM
 * would show "Select…" instead of the job's real value, forcing HR to
 * re-pick unrelated fields just to pass validation on every edit. Callers
 * pass a real `defaultValue` instead.
 */
export const JobSelectField = forwardRef<HTMLSelectElement, JobSelectFieldProps>(function JobSelectField(
  { label, error, helperText, required, id, name, className, options, ...props },
  ref,
) {
  const inputId = id ?? name;
  return (
    <FieldWrapper label={label} htmlFor={inputId ?? label} required={required} error={error} helperText={helperText}>
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
          {...props}
        >
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
