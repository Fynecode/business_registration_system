import type { BusinessRequestRepository } from "@/domain/businessRequest/business.request.repository";

export class UpdateRequestStatusUseCase {
    constructor(
        private businessRequestRepository: BusinessRequestRepository
    ) {}
    
    async execute(id: string, status: 'draft' | 'submitted' | 'in_review' | 'registered', reviewerId: string, reason?: string) {
        const request = await this.businessRequestRepository.getById(id);
        if (!request) {
            throw new Error('Business request not found');
        }

        request.status = status
        request.reviewedBy = reviewerId
        request.rejectedReason = reason ? reason : ''
        return await this.businessRequestRepository.update(request.id, request);
    }
}