import { forwardRef, type InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface DarkCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export const DarkCheckbox = forwardRef<HTMLInputElement, DarkCheckboxProps>(function DarkCheckbox(
  { label, className, id, name, ...props },
  ref,
) {
  const inputId = id ?? name;
  return (
    <label htmlFor={inputId} className={cn("flex cursor-pointer items-start gap-2.5", className)}>
      <span className="relative mt-0.5 flex size-4.5 shrink-0">
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          name={name}
          className="peer size-full cursor-pointer appearance-none rounded border border-dark-border-strong bg-dark-surface-2 transition-colors checked:border-dark-gold checked:bg-dark-gold focus-visible:outline-2 focus-visible:outline-dark-gold focus-visible:outline-offset-2"
          {...props}
        />
        <Check
          className="pointer-events-none absolute inset-0 m-auto size-3 text-dark-bg opacity-0 transition-opacity peer-checked:opacity-100"
          strokeWidth={3}
          aria-hidden
        />
      </span>
      <span className="text-sm leading-snug text-dark-text">{label}</span>
    </label>
  );
});
