"use client";

import { useRef, type ReactNode } from "react";
import { Check, FileText, RotateCw, TriangleAlert, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatBytes } from "@/lib/utils/formatBytes";
import { DarkButton } from "./ui/DarkButton";
import type { DocumentMeta, DocumentRequirement } from "@/types/onboarding";

interface DarkDocumentUploadRowProps {
  requirement: DocumentRequirement;
  meta?: DocumentMeta;
  progress?: number;
  onUpload: (file: File) => void;
  onRemove: () => void;
}

function statusVisual(status: DocumentMeta["status"] | "pending"): { bg: string; icon: ReactNode } {
  switch (status) {
    case "uploaded":
    case "provided":
      return { bg: "bg-dark-success-tint text-dark-success", icon: <Check className="size-4" strokeWidth={2.5} /> };
    case "error":
      return { bg: "bg-dark-error-tint text-dark-error", icon: <TriangleAlert className="size-4" /> };
    case "uploading":
      return { bg: "bg-dark-gold/15 text-dark-gold", icon: <Upload className="size-4" /> };
    default:
      return { bg: "bg-dark-surface-2 text-dark-text-faint", icon: <FileText className="size-4" /> };
  }
}

function acceptAttr(formats: string[]): string {
  return formats.map((f) => `.${f.toLowerCase()}`).join(",");
}

export function DarkDocumentUploadRow({ requirement, meta, progress, onUpload, onRemove }: DarkDocumentUploadRowProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const status = meta?.status ?? "pending";
  const { bg, icon } = statusVisual(status);

  function handleChange(files: FileList | null) {
    const file = files?.[0];
    if (file) onUpload(file);
  }

  return (
    <div className="flex flex-col gap-3 border-b border-dark-border py-5 last:border-b-0 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 items-start gap-3.5">
        <span className={cn("mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md", bg)}>{icon}</span>
        <div className="min-w-0">
          <p className="font-medium text-dark-text">
            {requirement.label}
            <span className="ml-2 text-sm font-normal text-dark-text-faint">
              {requirement.providedByHR ? "Provided by HR" : requirement.required ? "Required" : "Optional"}
            </span>
          </p>

          <p className="mt-0.5 text-sm text-dark-text-muted">
            {status === "uploaded" && meta
              ? `${meta.fileName} · ${formatBytes(meta.fileSize)}`
              : requirement.description}
          </p>

          {status === "uploading" && (
            <div className="mt-2.5 h-1 max-w-56 overflow-hidden rounded-full bg-dark-surface-2">
              <div
                className="h-full rounded-full bg-dark-gold transition-[width] duration-300"
                style={{ width: `${progress ?? 0}%` }}
              />
            </div>
          )}

          {status === "error" && meta?.errorMessage && (
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-dark-error">
              <TriangleAlert className="size-3.5 shrink-0" /> {meta.errorMessage}
            </p>
          )}

          {(status === "pending" || status === "error") && requirement.acceptedFormats.length > 0 && (
            <p className="mt-1 text-xs text-dark-text-faint">
              {requirement.acceptedFormats.join(", ")} · up to {requirement.maxSizeMB}MB
            </p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 pl-[3.125rem] sm:pl-0">
        {requirement.providedByHR ? null : status === "uploaded" ? (
          <>
            <DarkButton type="button" variant="secondary" size="sm" onClick={() => inputRef.current?.click()}>
              Replace
            </DarkButton>
            <DarkButton type="button" variant="ghost" size="sm" onClick={onRemove} aria-label="Remove file">
              <X className="size-4" />
            </DarkButton>
          </>
        ) : status === "uploading" ? (
          <span className="text-[0.8125rem] font-medium text-dark-gold">Uploading{"…"}</span>
        ) : status === "error" ? (
          <DarkButton type="button" variant="secondary" size="sm" onClick={() => inputRef.current?.click()}>
            <RotateCw className="size-4" /> Retry
          </DarkButton>
        ) : (
          <DarkButton type="button" variant="secondary" size="sm" onClick={() => inputRef.current?.click()}>
            <Upload className="size-4" /> Upload
          </DarkButton>
        )}
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={acceptAttr(requirement.acceptedFormats)}
          onChange={(e) => {
            handleChange(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
