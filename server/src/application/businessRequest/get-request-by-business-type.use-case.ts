import type { BusinessRequestRepository } from "@/domain/businessRequest/business.request.repository";

export class GetRequestByBusinessTypeUseCase {
    constructor(
        private readonly businessRequestRepository: BusinessRequestRepository
    ) {}

    async execute(businessType: 'sole_proprietorship' | 'partnership' | 'cc' | 'pty_ltd' | 'non_profit') {
        const requests = await this.businessRequestRepository.getByType(businessType)
        if(!requests || requests.length === 0) {
            throw new Error('No requests found for the specified business type')
        }
        return requests
    }
}