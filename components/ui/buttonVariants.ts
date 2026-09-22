import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md whitespace-nowrap font-medium transition-colors duration-150 focus-ring disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "bg-ember-600 text-paper-50 hover:bg-ember-700 active:bg-ember-800",
        secondary:
          "border border-paper-ink-900/15 bg-transparent text-paper-ink-900 hover:border-paper-ink-900/35 hover:bg-paper-100",
        ghost: "px-0 h-auto text-ember-700 hover:text-ember-800 underline-offset-4 hover:underline",
        dark: "bg-paper-50 text-ink-900 hover:bg-white",
      },
      size: {
        default: "h-11 px-5 text-sm",
        sm: "h-9 px-4 text-[0.8125rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);
