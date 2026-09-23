"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { applicationStatusLabel, educationLabel } from "@/lib/recruitment/constants";
import { availableNextStatuses, useApplicationStatusActions } from "@/hooks/recruitment/useApplicationStatusActions";
import { darkButtonVariants } from "@/components/design/dark/ui/DarkButton";
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
      <p className="text-xs font-medium tracking-wide text-dark-text-faint uppercase">{label}</p>
      <p className="mt-1 text-sm text-dark-text">{value}</p>
    </div>
  );
}

export function AdminApplicationDetailDark({ application }: { application: ApplicationDetail }) {
  const { setStatus, isUpdating, error } = useApplicationStatusActions(application.id);
  const nextStatuses = availableNextStatuses(application.status);

  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-dark-border pb-6">
        <div>
          <h1 className="font-dark-display text-2xl font-semibold text-dark-text">{application.candidateName}</h1>
          <p className="mt-1 text-sm text-dark-text-muted">
            {application.jobTitle} · Reference {application.reference}
          </p>
          <p className="mt-2 text-sm font-medium text-dark-gold">{applicationStatusLabel(application.status)}</p>
        </div>
        {nextStatuses.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {nextStatuses.map((status) => (
              <button
                key={status}
                type="button"
                disabled={isUpdating}
                onClick={() => setStatus(status)}
                className={darkButtonVariants({ variant: status === "rejected" ? "secondary" : "primary", size: "sm" })}
              >
                {status === "rejected" ? "Reject" : `Move to ${applicationStatusLabel(status)}`}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-4 text-sm text-dark-error">{error}</p>}

      <section className="mt-8 rounded-xl border border-dark-border bg-dark-surface p-6 tablet:p-8">
        <h2 className="font-dark-display text-base font-semibold text-dark-text">Candidate information</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <InfoRow label="Email" value={application.email} />
          <InfoRow label="Phone" value={application.phone} />
          <InfoRow label="Location" value={application.location} />
          <InfoRow label="Experience" value={application.experienceYears != null ? `${application.experienceYears} years` : null} />
          <InfoRow label="Education" value={application.education ? educationLabel(application.education) : null} />
          <InfoRow label="Applied" value={formatDateTime(application.appliedAt)} />
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-dark-border bg-dark-surface p-6 tablet:p-8">
        <h2 className="font-dark-display text-base font-semibold text-dark-text">Documents</h2>
        {application.documents.length === 0 ? (
          <p className="mt-3 text-sm text-dark-text-muted">No documents on file.</p>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {application.documents.map((doc) => (
              <a
                key={doc.id}
                href={`/api/admin/applications/${application.id}/documents/${doc.id}`}
                className="flex items-center gap-3 rounded-md border border-dark-border px-4 py-3 hover:bg-dark-surface-2"
              >
                <FileText className="size-4 text-dark-text-faint" aria-hidden />
                <span className="text-sm text-dark-text">
                  {doc.documentType === "resume" ? "Resume" : "Additional document"} — {doc.fileName}
                </span>
                <span className="ml-auto text-xs text-dark-text-faint">{formatBytes(doc.fileSize)}</span>
              </a>
            ))}
          </div>
        )}
      </section>

      {(application.coverLetter || application.linkedinUrl || application.portfolioUrl) && (
        <section className="mt-6 rounded-xl border border-dark-border bg-dark-surface p-6 tablet:p-8">
          <h2 className="font-dark-display text-base font-semibold text-dark-text">Additional information</h2>
          <div className="mt-4 flex flex-col gap-4">
            {application.coverLetter && (
              <div>
                <p className="text-xs font-medium tracking-wide text-dark-text-faint uppercase">Cover letter</p>
                <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-dark-text">{application.coverLetter}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-5">
              {application.linkedinUrl && (
                <Link href={application.linkedinUrl} target="_blank" className="text-sm font-medium text-dark-gold hover:underline">
                  LinkedIn profile
                </Link>
              )}
              {application.portfolioUrl && (
                <Link href={application.portfolioUrl} target="_blank" className="text-sm font-medium text-dark-gold hover:underline">
                  Portfolio / Website
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="mt-6 rounded-xl border border-dark-border bg-dark-surface p-6 tablet:p-8">
        <h2 className="font-dark-display text-base font-semibold text-dark-text">Status history</h2>
        <div className="mt-4 flex flex-col gap-3">
          {application.history.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between border-b border-dark-border pb-3 text-sm last:border-b-0">
              <span className="text-dark-text">
                {entry.oldStatus ? `${applicationStatusLabel(entry.oldStatus)} → ` : ""}
                {applicationStatusLabel(entry.newStatus)}
                {entry.changedByName && <span className="text-dark-text-faint"> · by {entry.changedByName}</span>}
              </span>
              <span className="shrink-0 text-dark-text-faint">{formatDateTime(entry.changedAt)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
