import type { BusinessRequestRepository } from "@/domain/businessRequest/business.request.repository";
import { NotFoundError } from "@/shared/errors/errors";

export class GetRequests{
    constructor(
        private readonly businessRequestRepository: BusinessRequestRepository
    ){}

    async execute(){
        const requests = await this.businessRequestRepository.getAll()

        if(!requests || requests.length === 0) {
            throw new NotFoundError('Business request')
        }
        return requests
    }
}