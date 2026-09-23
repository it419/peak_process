"use client";

import { useState } from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { DarkFieldWrapper } from "./DarkFieldWrapper";
import { darkFieldHeightClass, darkFieldInputVariants } from "./darkFieldStyles";

interface DarkMaskedFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  fullLength: number;
  placeholder?: string;
}

function maskValue(value: string, fullLength: number): string {
  const visible = value.slice(-4);
  const hiddenGroups = Math.max(0, Math.ceil((fullLength - 4) / 4));
  return `${"•••• ".repeat(hiddenGroups)}${visible}`;
}

export function DarkMaskedField<T extends FieldValues>({
  control,
  name,
  label,
  error,
  helperText,
  required,
  fullLength,
  placeholder,
}: DarkMaskedFieldProps<T>) {
  const [revealed, setRevealed] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const value: string = field.value ?? "";
        const isComplete = value.replace(/\s/g, "").length >= fullLength;
        const shouldMask = isComplete && !focused && !revealed;

        return (
          <DarkFieldWrapper label={label} htmlFor={name} required={required} error={error} helperText={helperText}>
            <div className="relative">
              <input
                id={name}
                name={field.name}
                ref={field.ref}
                placeholder={placeholder}
                value={shouldMask ? maskValue(value, fullLength) : value}
                onChange={(e) => field.onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => {
                  setFocused(false);
                  field.onBlur();
                }}
                readOnly={shouldMask}
                className={cn(
                  darkFieldInputVariants({ hasError: Boolean(error) }),
                  darkFieldHeightClass,
                  "pr-11 font-mono tracking-wide",
                )}
                aria-invalid={Boolean(error)}
              />
              {isComplete && (
                <button
                  type="button"
                  onClick={() => setRevealed((r) => !r)}
                  tabIndex={-1}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dark-text-faint transition-colors hover:text-dark-text-muted"
                  aria-label={revealed ? "Hide number" : "Reveal number"}
                >
                  {revealed ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              )}
            </div>
          </DarkFieldWrapper>
        );
      }}
    />
  );
}
