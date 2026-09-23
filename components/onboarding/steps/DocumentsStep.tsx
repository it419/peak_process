"use client";

import { useDocumentsStepLogic } from "@/hooks/steps/useDocumentsStepLogic";
import { DOCUMENT_REQUIREMENTS } from "@/lib/onboarding/documents.config";
import { DocumentUploadRow } from "@/components/onboarding/DocumentUploadRow";
import { StepShell } from "@/components/onboarding/StepShell";

export function DocumentsStep() {
  const { documents, uploadProgress, uploadDocument, removeDocument, remaining, onContinue } =
    useDocumentsStepLogic();

  return (
    <StepShell
      stepId="documents"
      title="Documents"
      description="You can replace any file up until you submit."
      onContinue={onContinue}
      continueDisabled={remaining > 0}
      continueLabel={remaining > 0 ? `${remaining} required item${remaining > 1 ? "s" : ""} left` : "Continue"}
    >
      <div className="rounded-md border border-paper-200 px-5">
        {DOCUMENT_REQUIREMENTS.map((requirement) => (
          <DocumentUploadRow
            key={requirement.id}
            requirement={requirement}
            meta={documents[requirement.id]}
            progress={uploadProgress[requirement.id]}
            onUpload={(file) => uploadDocument(file, requirement.id)}
            onRemove={() => removeDocument(requirement.id)}
          />
        ))}
      </div>
    </StepShell>
  );
}
