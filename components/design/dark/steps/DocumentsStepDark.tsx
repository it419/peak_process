"use client";

import { useDocumentsStepLogic } from "@/hooks/steps/useDocumentsStepLogic";
import { DOCUMENT_REQUIREMENTS } from "@/lib/onboarding/documents.config";
import { DarkDocumentUploadRow } from "../DarkDocumentUploadRow";
import { DarkStepShell } from "../DarkStepShell";

export function DocumentsStepDark() {
  const { documents, uploadProgress, uploadDocument, removeDocument, remaining, onContinue } =
    useDocumentsStepLogic();

  return (
    <DarkStepShell
      stepId="documents"
      title="Documents"
      description="You can replace any file up until you submit."
      onContinue={onContinue}
      continueDisabled={remaining > 0}
      continueLabel={remaining > 0 ? `${remaining} required item${remaining > 1 ? "s" : ""} left` : "Save & Continue"}
    >
      <div className="-mx-6 px-6 tablet:-mx-8 tablet:px-8">
        {DOCUMENT_REQUIREMENTS.map((requirement) => (
          <DarkDocumentUploadRow
            key={requirement.id}
            requirement={requirement}
            meta={documents[requirement.id]}
            progress={uploadProgress[requirement.id]}
            onUpload={(file) => uploadDocument(file, requirement.id)}
            onRemove={() => removeDocument(requirement.id)}
          />
        ))}
      </div>
    </DarkStepShell>
  );
}
