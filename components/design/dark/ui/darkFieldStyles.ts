import { cva } from "class-variance-authority";

export const darkFieldInputVariants = cva(
  "w-full rounded-md border bg-dark-surface-2 px-3.5 text-[0.9375rem] text-dark-text placeholder:text-dark-text-faint transition-colors duration-150 outline-none disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      hasError: {
        true: "border-dark-error focus:border-dark-error",
        false: "border-dark-border hover:border-dark-border-strong focus:border-dark-gold",
      },
    },
    defaultVariants: { hasError: false },
  },
);

export const darkFieldHeightClass = "h-11";
