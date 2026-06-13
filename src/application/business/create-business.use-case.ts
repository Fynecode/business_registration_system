import type { BusinessRepository, CreateBusinessInput } from "../../domain/business/business.repository";

export class CreateBusinessUseCase {
    constructor(private businessRepository: BusinessRepository) {}
    async execute(data: CreateBusinessInput) {
        const business = await this.businessRepository.create(data)
        return business
    }
}