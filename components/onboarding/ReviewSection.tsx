import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { StepStatus } from "@/types/onboarding";

interface ReviewSectionProps {
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
  completed: "text-success",
  current: "text-paper-ink-400",
  blocked: "text-error",
  upcoming: "text-paper-ink-400",
};

export function ReviewSection({ title, status, href, summary }: ReviewSectionProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-paper-200 py-5 last:border-b-0">
      <div className="min-w-0">
        <p className="font-display text-base font-semibold text-paper-ink-900">
          {title}
          <span className={cn("ml-2.5 font-sans text-[0.8125rem] font-medium", STATUS_TONE[status])}>
            {STATUS_LABEL[status]}
          </span>
        </p>
        {summary && <p className="mt-1 truncate text-sm text-paper-ink-600">{summary}</p>}
      </div>
      <Link href={href} className="shrink-0 text-sm font-medium text-ember-700 hover:underline">
        Edit
      </Link>
    </div>
  );
}
