import type { BusinessRepository } from "@/domain/business/business.repository";

export class GetBusinessByClientIdUseCase {
    constructor(
        private readonly businessRepository: BusinessRepository
    ) {}
    async execute(clientId: string) {
        const business = await this.businessRepository.getByClientId(clientId);

        if (!business) {
            throw new Error("Business not found");
        }
        return business;
    }
}