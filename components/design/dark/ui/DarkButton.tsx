import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const darkButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md whitespace-nowrap font-medium transition-colors duration-150 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-gold disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "bg-dark-gold text-dark-bg hover:bg-dark-gold-hover",
        secondary: "border border-dark-border-strong bg-transparent text-dark-text hover:border-dark-gold/60 hover:text-dark-gold",
        ghost: "px-0 h-auto text-dark-gold hover:text-dark-gold-hover underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 text-sm",
        sm: "h-9 px-4 text-[0.8125rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

interface DarkButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof darkButtonVariants> {
  isLoading?: boolean;
  showArrow?: boolean;
}

export const DarkButton = forwardRef<HTMLButtonElement, DarkButtonProps>(function DarkButton(
  { className, variant, size, isLoading, showArrow, children, disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(darkButtonVariants({ variant, size }), className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="size-4 animate-spin" aria-hidden />}
      {children}
      {!isLoading && showArrow && <ArrowRight className="size-4" aria-hidden />}
    </button>
  );
});
