import type { DocumentRepository } from '@/domain/document/document.repository';
import type { Document } from '@/domain/document/document.types';

export class UploadDocumentsUseCase {
    constructor(
        private readonly documentRepository: DocumentRepository
    ) {}
    
    async execute(files: File[]): Promise<Document[]> {
        return await this.documentRepository.uploadMany(files)
    }
}