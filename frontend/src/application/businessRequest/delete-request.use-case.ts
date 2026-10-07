import type { BusinessRequestRepository } from "@/domain/businessRequest/business.request.repository";

export class DeleteRequestUseCase {
    constructor(
        private readonly businessRequestRepository: BusinessRequestRepository
    ) {}
    async execute(id: string): Promise<void> {
        const businessRequest = await this.businessRequestRepository.getById(id);
        if (!businessRequest) {
            throw new Error('Business request not found');
        }
        return await this.businessRequestRepository.delete(businessRequest.id);
    }
}