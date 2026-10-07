import type { BusinessRequestRepository } from "@/domain/businessRequest/business.request.repository";

export class GetRequestByStatusUseCase {
    constructor(
        private readonly businessRequestRepository: BusinessRequestRepository
    ) {}

    async execute(status: 'draft' | 'submitted' | 'in_review' | 'approved' | 'rejected' | 'registered') {
        const requests = await this.businessRequestRepository.getByStatus(status)
        if(!requests || requests.length === 0) {
            throw new Error('No requests found for the specified status')
        }
        return requests
    }
}