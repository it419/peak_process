"use client";

import { useEffect, useState } from "react";
import { CircleAlert, CloudCheck } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatRelativeTime } from "@/lib/utils/formatRelativeTime";
import { useSaveMeta } from "@/lib/store/selectors";

export function DarkSaveIndicator({ className }: { className?: string }) {
  const { saveStatus, saveError, lastSavedAt } = useSaveMeta();
  const [, forceTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => forceTick((n) => n + 1), 30_000);
    return () => clearInterval(interval);
  }, []);

  let content: React.ReactNode;
  if (saveStatus === "saving") {
    content = (
      <span className="flex items-center gap-1.5 text-dark-text-faint">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-dark-gold opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-dark-gold" />
        </span>
        Saving{"…"}
      </span>
    );
  } else if (saveStatus === "error") {
    content = (
      <span className="flex items-center gap-1.5 text-dark-error">
        <CircleAlert className="size-3.5" />
        {saveError ?? "Couldn’t save"}
      </span>
    );
  } else if (lastSavedAt) {
    content = (
      <span className="flex items-center gap-1.5 text-dark-text-faint">
        <CloudCheck className="size-3.5 text-dark-success" />
        Saved {formatRelativeTime(lastSavedAt)}
      </span>
    );
  } else {
    content = <span className="text-dark-text-faint">Not yet saved</span>;
  }

  return <div className={cn("text-[0.8125rem]", className)}>{content}</div>;
}
