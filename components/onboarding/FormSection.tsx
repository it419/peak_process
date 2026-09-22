import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  first?: boolean;
}

/** A labeled group of fields within a step, separated by a rule rather than boxed as a card. */
export function FormSection({ title, description, children, className, first }: FormSectionProps) {
  return (
    <section className={cn(!first && "mt-9 border-t border-paper-200 pt-9", className)}>
      <div className="mb-5">
        <h3 className="font-display text-lg font-semibold text-paper-ink-900">{title}</h3>
        {description && <p className="mt-1 text-sm text-paper-ink-600">{description}</p>}
      </div>
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}
