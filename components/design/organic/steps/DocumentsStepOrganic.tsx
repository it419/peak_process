"use client";

import { useDocumentsStepLogic } from "@/hooks/steps/useDocumentsStepLogic";
import { DOCUMENT_REQUIREMENTS } from "@/lib/onboarding/documents.config";
import { OrganicDocumentUploadRow } from "../OrganicDocumentUploadRow";
import { OrganicStepShell } from "../OrganicStepShell";

export function DocumentsStepOrganic() {
  const { documents, uploadProgress, uploadDocument, removeDocument, remaining, onContinue } =
    useDocumentsStepLogic();

  return (
    <OrganicStepShell
      stepId="documents"
      title="Documents"
      description="You can replace any file up until you submit."
      onContinue={onContinue}
      continueDisabled={remaining > 0}
      continueLabel={remaining > 0 ? `${remaining} required item${remaining > 1 ? "s" : ""} left` : "Save & Continue"}
    >
      <div>
        {DOCUMENT_REQUIREMENTS.map((requirement) => (
          <OrganicDocumentUploadRow
            key={requirement.id}
            requirement={requirement}
            meta={documents[requirement.id]}
            progress={uploadProgress[requirement.id]}
            onUpload={(file) => uploadDocument(file, requirement.id)}
            onRemove={() => removeDocument(requirement.id)}
          />
        ))}
      </div>
    </OrganicStepShell>
  );
}
