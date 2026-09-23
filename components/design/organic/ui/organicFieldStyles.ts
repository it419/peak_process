import { cva } from "class-variance-authority";

export const organicFieldInputVariants = cva(
  "w-full rounded-xl border bg-white/70 px-4 text-[0.9375rem] text-organic-ink placeholder:text-organic-ink-faint transition-colors duration-150 outline-none disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      hasError: {
        true: "border-organic-error focus:border-organic-error",
        false: "border-organic-border hover:border-organic-ink-faint focus:border-organic-terracotta",
      },
    },
    defaultVariants: { hasError: false },
  },
);

export const organicFieldHeightClass = "h-12";
