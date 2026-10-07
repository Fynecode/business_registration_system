import type { DocumentRepository } from '@/domain/document/document.repository';
import type { Document } from '@/domain/document/document.types';

export class DownloadDocumentUseCase {
    constructor(private readonly documentRepository: DocumentRepository) {}

    async execute(document: Document): Promise<void> {
        return this.documentRepository.download(document);
    }
}