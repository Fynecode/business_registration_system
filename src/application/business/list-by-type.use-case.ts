import type { BusinessRepository } from "../../domain/business/business.repository";

export class ListByTypeUseCase {
    constructor(
        private readonly businessRepository: BusinessRepository
    ) {}

    async execute(type: string) {
        const businesses = await this.businessRepository.listByType(type)

        if (!businesses || businesses.length === 0) {
            throw new Error("Business not found");
        }
        return businesses
    }
}