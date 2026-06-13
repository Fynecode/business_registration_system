import type { BusinessRequestRepository } from "@/domain/businessRequest/business.request.repository";

export class GetRequests{
    constructor(
        private readonly businessRequestRepository: BusinessRequestRepository
    ){}

    async execute(){
        const requests = await this.businessRequestRepository.getAll()

        if(!requests || requests.length === 0) {
            throw new Error("No requests found")
        }
        return requests
    }
}