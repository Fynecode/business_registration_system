import type { BusinessRequestRepository } from "@/domain/businessRequest/business.request.repository";

export class GetRequestByRequestNumberUseCase {

    constructor(
        private readonly businessRequestRepository: BusinessRequestRepository
    ) {}

    async execute(requestNumber: string) {
        const request = await this.businessRequestRepository.getByRequestNumber(requestNumber)
        if(!request) {
            throw new Error('Request not found')
        }
        return request
    }
}