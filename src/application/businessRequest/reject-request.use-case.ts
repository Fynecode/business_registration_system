import type { BusinessRequestRepository } from "@/domain/businessRequest/business.request.repository";

export class RejectRequestUseCase {

    constructor(
        private readonly businessRequestRepository: BusinessRequestRepository
    ) {}
    async execute(requestId: string, reviewerId: string, reason: string) {
        const request = await this.businessRequestRepository.getById(requestId)
        if (!request) {
            throw new Error("Business request not found")
        }

        request.status = 'rejected'
        request.rejectedReason = reason
        request.reviewedBy = reviewerId
        
        return await this.businessRequestRepository.update(request.id, request)
    }
}