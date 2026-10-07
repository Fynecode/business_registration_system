import type { BusinessRequestRepository } from "@/domain/businessRequest/business.request.repository";

export class SubmitRequestUseCase {

    constructor(
        private readonly businessRequestRepository: BusinessRequestRepository
    ) {}
    async execute(id: string) {
        const businessRequest = await this.businessRequestRepository.getById(id)

        if (!businessRequest) {
            throw new Error("Business request not found")
        }
        return await this.businessRequestRepository.submit(id)
    }
}