import type { BusinessRequestRepository } from "@/domain/businessRequest/business.request.repository";

export class GetRequestByIdUseCase {

    constructor(
        private readonly businessRequestRepository: BusinessRequestRepository
    ) {}

    async execute(id: string) {
        const request = await this.businessRequestRepository.getById(id)
        if(!request) {
            throw new Error('Request not found')
        }
        return request
    }
}