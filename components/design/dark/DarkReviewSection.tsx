import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { StepStatus } from "@/types/onboarding";

interface DarkReviewSectionProps {
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
  completed: "text-dark-success",
  current: "text-dark-text-faint",
  blocked: "text-dark-error",
  upcoming: "text-dark-text-faint",
};

export function DarkReviewSection({ title, status, href, summary }: DarkReviewSectionProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-dark-border py-5 last:border-b-0">
      <div className="min-w-0">
        <p className="font-dark-display text-base font-semibold text-dark-text">
          {title}
          <span className={cn("ml-2.5 font-sans text-[0.8125rem] font-medium", STATUS_TONE[status])}>
            {STATUS_LABEL[status]}
          </span>
        </p>
        {summary && <p className="mt-1 truncate text-sm text-dark-text-muted">{summary}</p>}
      </div>
      <Link href={href} className="shrink-0 text-sm font-medium text-dark-gold hover:underline">
        Edit
      </Link>
    </div>
  );
}
