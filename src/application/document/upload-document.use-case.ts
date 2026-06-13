import type { DocumentRepository } from '@/domain/document/document.repository';
import type { Document } from '@/domain/document/document.types';

export class UploadDocumentUseCase {
    constructor(
        private readonly documentRepository: DocumentRepository
    ) {}

    async execute(file: File): Promise<Document> {
        return await this.documentRepository.upload(file)
    }
    
    async executeMany(files: File[]): Promise<Document[]> {
        return await this.documentRepository.uploadMany(files)
    }
}