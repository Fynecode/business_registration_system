import type { DocumentRepository } from "@/domain/document/document.repository";

export class DeleteDocumentUseCase {
    constructor(
        private readonly documentRepository: DocumentRepository
    ) {}

    async execute(publicId: string): Promise<void> {
        await this.documentRepository.delete(publicId);
    }
}