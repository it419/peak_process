"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { applicationStatusLabel, educationLabel } from "@/lib/recruitment/constants";
import { availableNextStatuses, useApplicationStatusActions } from "@/hooks/recruitment/useApplicationStatusActions";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { formatBytes } from "@/lib/utils/formatBytes";
import type { ApplicationDetail } from "@/types/recruitment";

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
}

function InfoRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-medium tracking-wide text-paper-ink-400 uppercase">{label}</p>
      <p className="mt-1 text-sm text-paper-ink-900">{value}</p>
    </div>
  );
}

export function AdminApplicationDetailCurrent({ application }: { application: ApplicationDetail }) {
  const { setStatus, isUpdating, error } = useApplicationStatusActions(application.id);
  const nextStatuses = availableNextStatuses(application.status);

  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-paper-200 pb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-paper-ink-900">{application.candidateName}</h1>
          <p className="mt-1 text-sm text-paper-ink-600">
            {application.jobTitle} · Reference {application.reference}
          </p>
          <p className="mt-2 text-sm font-medium text-paper-ink-900">{applicationStatusLabel(application.status)}</p>
        </div>
        {nextStatuses.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {nextStatuses.map((status) => (
              <button
                key={status}
                type="button"
                disabled={isUpdating}
                onClick={() => setStatus(status)}
                className={buttonVariants({ variant: status === "rejected" ? "secondary" : "primary", size: "sm" })}
              >
                {status === "rejected" ? "Reject" : `Move to ${applicationStatusLabel(status)}`}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-4 text-sm text-error">{error}</p>}

      <section className="mt-8 border-t border-paper-200 pt-8">
        <h2 className="font-display text-lg font-semibold text-paper-ink-900">Candidate information</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <InfoRow label="Email" value={application.email} />
          <InfoRow label="Phone" value={application.phone} />
          <InfoRow label="Location" value={application.location} />
          <InfoRow label="Experience" value={application.experienceYears != null ? `${application.experienceYears} years` : null} />
          <InfoRow label="Education" value={application.education ? educationLabel(application.education) : null} />
          <InfoRow label="Applied" value={formatDateTime(application.appliedAt)} />
        </div>
      </section>

      <section className="mt-9 border-t border-paper-200 pt-8">
        <h2 className="font-display text-lg font-semibold text-paper-ink-900">Documents</h2>
        {application.documents.length === 0 ? (
          <p className="mt-3 text-sm text-paper-ink-600">No documents on file.</p>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {application.documents.map((doc) => (
              <a
                key={doc.id}
                href={`/api/admin/applications/${application.id}/documents/${doc.id}`}
                className="flex items-center gap-3 rounded-md border border-paper-200 px-4 py-3 hover:bg-paper-100"
              >
                <FileText className="size-4 text-paper-ink-400" aria-hidden />
                <span className="text-sm text-paper-ink-900">
                  {doc.documentType === "resume" ? "Resume" : "Additional document"} — {doc.fileName}
                </span>
                <span className="ml-auto text-xs text-paper-ink-400">{formatBytes(doc.fileSize)}</span>
              </a>
            ))}
          </div>
        )}
      </section>

      {(application.coverLetter || application.linkedinUrl || application.portfolioUrl) && (
        <section className="mt-9 border-t border-paper-200 pt-8">
          <h2 className="font-display text-lg font-semibold text-paper-ink-900">Additional information</h2>
          <div className="mt-4 flex flex-col gap-4">
            {application.coverLetter && (
              <div>
                <p className="text-xs font-medium tracking-wide text-paper-ink-400 uppercase">Cover letter</p>
                <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-paper-ink-900">{application.coverLetter}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-5">
              {application.linkedinUrl && (
                <Link href={application.linkedinUrl} target="_blank" className="text-sm font-medium text-ember-700 hover:underline">
                  LinkedIn profile
                </Link>
              )}
              {application.portfolioUrl && (
                <Link href={application.portfolioUrl} target="_blank" className="text-sm font-medium text-ember-700 hover:underline">
                  Portfolio / Website
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="mt-9 border-t border-paper-200 pt-8">
        <h2 className="font-display text-lg font-semibold text-paper-ink-900">Status history</h2>
        <div className="mt-4 flex flex-col gap-3">
          {application.history.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between border-b border-paper-200 pb-3 text-sm last:border-b-0">
              <span className="text-paper-ink-900">
                {entry.oldStatus ? `${applicationStatusLabel(entry.oldStatus)} → ` : ""}
                {applicationStatusLabel(entry.newStatus)}
                {entry.changedByName && <span className="text-paper-ink-400"> · by {entry.changedByName}</span>}
              </span>
              <span className="shrink-0 text-paper-ink-400">{formatDateTime(entry.changedAt)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
