import type { BusinessRepository, UpdateBusinessInput } from "../../domain/business/business.repository";

export class UpdateBusinessUseCase {
    constructor(
        private readonly businessRepository: BusinessRepository
    ) {}
    async execute(id: string, data: Partial<UpdateBusinessInput>) {
        const business = await this.businessRepository.update(id, data)
        
        if (!business) {
            throw new Error("Business not found");
        }
        return business
    }
}