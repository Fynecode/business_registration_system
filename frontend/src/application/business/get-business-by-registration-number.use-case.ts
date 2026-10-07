import type { BusinessRepository } from "@/domain/business/business.repository";

export class GetBusinessByRegistrationNumberUseCase {
    constructor(
        private readonly businessRepository: BusinessRepository
    ) {}
    
    async execute(registrationNumber: string) {
        const business = await this.businessRepository.getByRegistrationNumber(registrationNumber)
        if (!business) {
            throw new Error("Business not found");
        }
        return business
    }
}