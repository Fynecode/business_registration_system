import type { DocumentRepository, UploadedFile } from '@/domain/document/document.repository';
import type { Document } from '@/domain/document/document.types';

export class UploadDocumentUseCase {
    constructor(
        private readonly documentRepository: DocumentRepository
    ) {}

    async execute(file: UploadedFile): Promise<Document> {
        return await this.documentRepository.upload(file)
    }
}