import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { StepStatus } from "@/types/onboarding";

interface OrganicReviewSectionProps {
  title: string;
  status: StepStatus;
  href: string;
  summary?: string;
}

const STATUS_LABEL: Record<StepStatus, string> = {
  completed: "Complete",
  current: "Not started",
  blocked: "Incomplete",
  upcoming: "Not started",
};

const STATUS_TONE: Record<StepStatus, string> = {
  completed: "text-organic-success",
  current: "text-organic-ink-faint",
  blocked: "text-organic-error",
  upcoming: "text-organic-ink-faint",
};

export function OrganicReviewSection({ title, status, href, summary }: OrganicReviewSectionProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-organic-border py-5 last:border-b-0">
      <div className="min-w-0">
        <p className="font-organic-display text-base font-semibold text-organic-ink">
          {title}
          <span className={cn("ml-2.5 font-organic-sans text-[0.8125rem] font-medium", STATUS_TONE[status])}>
            {STATUS_LABEL[status]}
          </span>
        </p>
        {summary && <p className="mt-1 truncate text-sm text-organic-ink-muted">{summary}</p>}
      </div>
      <Link href={href} className="shrink-0 text-sm font-medium text-organic-terracotta hover:underline">
        Edit
      </Link>
    </div>
  );
}
