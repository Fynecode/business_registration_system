import type { BusinessRepository } from "../../domain/business/business.repository";

export class GetBusinessesUseCase {
    constructor(
        private readonly businessRepository: BusinessRepository
    ) {}
    async execute() {
        const businesses = await this.businessRepository.getAll()
        if (!businesses || businesses.length === 0) {
            throw new Error("Business not found");
        }
        return businesses
    }
}