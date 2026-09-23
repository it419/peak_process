"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { applicationStatusLabel, educationLabel } from "@/lib/recruitment/constants";
import { availableNextStatuses, useApplicationStatusActions } from "@/hooks/recruitment/useApplicationStatusActions";
import { organicButtonVariants } from "@/components/design/organic/ui/OrganicButton";
import { formatBytes } from "@/lib/utils/formatBytes";
import type { ApplicationDetail } from "@/types/recruitment";

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function InfoRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-medium tracking-wide text-organic-ink-faint uppercase">{label}</p>
      <p className="mt-1 text-sm text-organic-ink">{value}</p>
    </div>
  );
}

export function AdminApplicationDetailOrganic({ application }: { application: ApplicationDetail }) {
  const { setStatus, isUpdating, error } = useApplicationStatusActions(application.id);
  const nextStatuses = availableNextStatuses(application.status);

  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-organic-border pb-6">
        <div>
          <h1 className="font-organic-display text-2xl font-semibold text-organic-ink">{application.candidateName}</h1>
          <p className="mt-1 text-sm text-organic-ink-muted">
            {application.jobTitle} · Reference {application.reference}
          </p>
          <p className="mt-2 text-sm font-medium text-organic-terracotta">{applicationStatusLabel(application.status)}</p>
        </div>
        {nextStatuses.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {nextStatuses.map((status) => (
              <button
                key={status}
                type="button"
                disabled={isUpdating}
                onClick={() => setStatus(status)}
                className={organicButtonVariants({ variant: status === "rejected" ? "secondary" : "primary", size: "sm" })}
              >
                {status === "rejected" ? "Reject" : `Move to ${applicationStatusLabel(status)}`}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-4 text-sm text-organic-error">{error}</p>}

      <section className="mt-8 rounded-[1.75rem] bg-organic-surface p-6 sm:p-8">
        <h2 className="font-organic-display text-lg font-semibold text-organic-ink">Candidate information</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <InfoRow label="Email" value={application.email} />
          <InfoRow label="Phone" value={application.phone} />
          <InfoRow label="Location" value={application.location} />
          <InfoRow label="Experience" value={application.experienceYears != null ? `${application.experienceYears} years` : null} />
          <InfoRow label="Education" value={application.education ? educationLabel(application.education) : null} />
          <InfoRow label="Applied" value={formatDateTime(application.appliedAt)} />
        </div>
      </section>

      <section className="mt-6 rounded-[1.75rem] bg-organic-surface p-6 sm:p-8">
        <h2 className="font-organic-display text-lg font-semibold text-organic-ink">Documents</h2>
        {application.documents.length === 0 ? (
          <p className="mt-3 text-sm text-organic-ink-muted">No documents on file.</p>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {application.documents.map((doc) => (
              <a
                key={doc.id}
                href={`/api/admin/applications/${application.id}/documents/${doc.id}`}
                className="flex items-center gap-3 rounded-xl border border-organic-border bg-white/60 px-4 py-3 hover:bg-white"
              >
                <FileText className="size-4 text-organic-ink-faint" aria-hidden />
                <span className="text-sm text-organic-ink">
                  {doc.documentType === "resume" ? "Resume" : "Additional document"} — {doc.fileName}
                </span>
                <span className="ml-auto text-xs text-organic-ink-faint">{formatBytes(doc.fileSize)}</span>
              </a>
            ))}
          </div>
        )}
      </section>

      {(application.coverLetter || application.linkedinUrl || application.portfolioUrl) && (
        <section className="mt-6 rounded-[1.75rem] bg-organic-surface p-6 sm:p-8">
          <h2 className="font-organic-display text-lg font-semibold text-organic-ink">Additional information</h2>
          <div className="mt-4 flex flex-col gap-4">
            {application.coverLetter && (
              <div>
                <p className="text-xs font-medium tracking-wide text-organic-ink-faint uppercase">Cover letter</p>
                <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-organic-ink">{application.coverLetter}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-5">
              {application.linkedinUrl && (
                <Link
                  href={application.linkedinUrl}
                  target="_blank"
                  className="text-sm font-medium text-organic-terracotta hover:underline"
                >
                  LinkedIn profile
                </Link>
              )}
              {application.portfolioUrl && (
                <Link
                  href={application.portfolioUrl}
                  target="_blank"
                  className="text-sm font-medium text-organic-terracotta hover:underline"
                >
                  Portfolio / Website
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="mt-6 rounded-[1.75rem] bg-organic-surface p-6 sm:p-8">
        <h2 className="font-organic-display text-lg font-semibold text-organic-ink">Status history</h2>
        <div className="mt-4 flex flex-col gap-3">
          {application.history.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between border-b border-organic-border pb-3 text-sm last:border-b-0"
            >
              <span className="text-organic-ink">
                {entry.oldStatus ? `${applicationStatusLabel(entry.oldStatus)} → ` : ""}
                {applicationStatusLabel(entry.newStatus)}
                {entry.changedByName && <span className="text-organic-ink-faint"> · by {entry.changedByName}</span>}
              </span>
              <span className="shrink-0 text-organic-ink-faint">{formatDateTime(entry.changedAt)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
