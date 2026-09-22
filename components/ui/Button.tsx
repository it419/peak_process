import { forwardRef, type ButtonHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { buttonVariants } from "./buttonVariants";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  showArrow?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, isLoading, showArrow, children, disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="size-4 animate-spin" aria-hidden />}
      {children}
      {!isLoading && showArrow && <ArrowRight className="size-4" aria-hidden />}
    </button>
  );
});
