import type { BusinessRequestRepository } from "@/domain/businessRequest/business.request.repository";

export class GetRequestByClientIdUseCase {

    constructor(
        private readonly businessRequestRepository: BusinessRequestRepository
    ) {}

    async execute(clientId: string) {
        const requests = await this.businessRequestRepository.getByClientId(clientId)
        if(!requests || requests.length === 0) {
            throw new Error('No requests found for the specified client')
        }
        return requests
    }
}