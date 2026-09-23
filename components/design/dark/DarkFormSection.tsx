import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface DarkFormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  first?: boolean;
}

export function DarkFormSection({ title, description, children, className, first }: DarkFormSectionProps) {
  return (
    <section className={cn(!first && "mt-8 border-t border-dark-border pt-8", className)}>
      <div className="mb-5">
        <h3 className="font-dark-display text-base font-semibold text-dark-text">{title}</h3>
        {description && <p className="mt-1 text-sm text-dark-text-muted">{description}</p>}
      </div>
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}
