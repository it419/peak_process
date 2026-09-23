import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface OrganicFormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  first?: boolean;
}

export function OrganicFormSection({ title, description, children, className, first }: OrganicFormSectionProps) {
  return (
    <section className={cn(!first && "mt-9 border-t border-organic-border pt-9", className)}>
      <div className="mb-5">
        <h3 className="font-organic-display text-lg font-semibold text-organic-ink">{title}</h3>
        {description && <p className="mt-1 text-sm text-organic-ink-muted">{description}</p>}
      </div>
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}
