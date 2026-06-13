import type { BusinessRepository } from "../../domain/business/business.repository";

export class GetBusinessByIdUseCase{
    constructor(
        private readonly businessRepository: BusinessRepository
    ) {}
    
    async execute(id: string) {
        const business = await this.businessRepository.getById(id)
        if (!business) {
            throw new Error("Business not found");
        }
        return business
    }
}