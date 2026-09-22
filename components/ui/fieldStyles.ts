import { cva } from "class-variance-authority";

export const fieldInputVariants = cva(
  "w-full rounded-md border bg-paper-50 px-3.5 text-[0.95rem] text-paper-ink-900 placeholder:text-paper-ink-400/80 transition-colors duration-150 focus-ring disabled:cursor-not-allowed disabled:bg-paper-100 disabled:text-paper-ink-400",
  {
    variants: {
      hasError: {
        true: "border-error",
        false: "border-paper-200 hover:border-paper-300 focus:border-ember-600",
      },
    },
    defaultVariants: { hasError: false },
  },
);

export const fieldHeightClass = "h-11";
