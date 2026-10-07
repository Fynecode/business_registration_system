import type { BusinessRequestRepository } from "@/domain/businessRequest/business.request.repository";

export class ApproveRequestUseCase {
    constructor(
        private readonly businessRequestRepository: BusinessRequestRepository
    ) {}

    async execute(id: string, reviewerId: string) {
        const request = await this.businessRequestRepository.getById(id)
        if (!request) {
            throw new Error("Business request not found")
        }

        request.status = 'approved'
        request.reviewedBy = reviewerId
        
        return await this.businessRequestRepository.update(request.id, request)
    }
}