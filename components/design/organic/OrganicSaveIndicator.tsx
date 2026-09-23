"use client";

import { useEffect, useState } from "react";
import { CircleAlert, CloudCheck } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatRelativeTime } from "@/lib/utils/formatRelativeTime";
import { useSaveMeta } from "@/lib/store/selectors";

export function OrganicSaveIndicator({ className }: { className?: string }) {
  const { saveStatus, saveError, lastSavedAt } = useSaveMeta();
  const [, forceTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => forceTick((n) => n + 1), 30_000);
    return () => clearInterval(interval);
  }, []);

  let content: React.ReactNode;
  if (saveStatus === "saving") {
    content = (
      <span className="flex items-center gap-1.5 text-organic-ink-faint">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-organic-terracotta opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-organic-terracotta" />
        </span>
        Saving{"…"}
      </span>
    );
  } else if (saveStatus === "error") {
    content = (
      <span className="flex items-center gap-1.5 text-organic-error">
        <CircleAlert className="size-3.5" />
        {saveError ?? "Couldn’t save"}
      </span>
    );
  } else if (lastSavedAt) {
    content = (
      <span className="flex items-center gap-1.5 text-organic-ink-faint">
        <CloudCheck className="size-3.5 text-organic-success" />
        Saved {formatRelativeTime(lastSavedAt)}
      </span>
    );
  } else {
    content = <span className="text-organic-ink-faint">Not yet saved</span>;
  }

  return <div className={cn("text-[0.8125rem]", className)}>{content}</div>;
}
