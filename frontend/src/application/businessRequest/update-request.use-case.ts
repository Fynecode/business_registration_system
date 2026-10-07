import type { BusinessRequestRepository, UpdateBusinessRequestInput } from "@/domain/businessRequest/business.request.repository";

export class UpdateRequestUseCase {

    constructor(
        private readonly businessRequestRepository: BusinessRequestRepository
    ) {}

    async execute(id: string, input: UpdateBusinessRequestInput) {
        const existingRequest = await this.businessRequestRepository.getById(id);
        if (!existingRequest) {
            throw new Error("Business request not found");
        }
        return await this.businessRequestRepository.update(id, input);
    }
}