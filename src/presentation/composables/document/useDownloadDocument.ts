import { downloadDocumentUseCase } from "@/services/documents.services";
import type { Document } from "@/domain/document/document.types";

export async function useDownloadDocument(document: Document) {
    try {
        await downloadDocumentUseCase.execute(document);
    } catch (error) {
        console.error("Error downloading document:", error);
    }
}