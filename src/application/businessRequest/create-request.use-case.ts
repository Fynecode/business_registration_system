import type { BusinessRequestRepository, CreateBusinessRequestInput } from "@/domain/businessRequest/business.request.repository";

export class CreateBusinessRequestUseCase {

    constructor(
        private readonly businessRequestRepository: BusinessRequestRepository
    ) {}
    async execute(input: CreateBusinessRequestInput) {
        return await this.businessRequestRepository.create(input);
    }
}