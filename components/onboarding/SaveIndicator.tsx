"use client";

import { useEffect, useState } from "react";
import { CircleAlert, CloudCheck } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatRelativeTime } from "@/lib/utils/formatRelativeTime";
import { useSaveMeta } from "@/lib/store/selectors";

interface SaveIndicatorProps {
  tone?: "dark" | "light";
  className?: string;
}

export function SaveIndicator({ tone = "light", className }: SaveIndicatorProps) {
  const { saveStatus, saveError, lastSavedAt } = useSaveMeta();
  const [, forceTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => forceTick((n) => n + 1), 30_000);
    return () => clearInterval(interval);
  }, []);

  const mutedClass = tone === "dark" ? "text-ink-400" : "text-paper-ink-400";

  let content: React.ReactNode;
  if (saveStatus === "saving") {
    content = (
      <span className={cn("flex items-center gap-1.5", mutedClass)}>
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-ember-500 opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-ember-500" />
        </span>
        Saving{"…"}
      </span>
    );
  } else if (saveStatus === "error") {
    content = (
      <span className="flex items-center gap-1.5 text-error">
        <CircleAlert className="size-3.5" />
        {saveError ?? "Couldn’t save your changes"}
      </span>
    );
  } else if (lastSavedAt) {
    content = (
      <span className={cn("flex items-center gap-1.5", mutedClass)}>
        <CloudCheck className="size-3.5 text-success" />
        Saved {formatRelativeTime(lastSavedAt)}
      </span>
    );
  } else {
    content = <span className={mutedClass}>Not yet saved</span>;
  }

  return <div className={cn("text-[0.8125rem]", className)}>{content}</div>;
}
