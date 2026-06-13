import type { BusinessRepository } from "@/domain/business/business.repository";

export class SubmitBusinessUseCase {
    constructor(
        private readonly businessRepository: BusinessRepository
    ) {}

    async execute(id: string) {
        const business = await this.businessRepository.submit(id)
        if (!business) {
            throw new Error("Business not found");
        }
        return business
    }
}