import type { RegistrationRequestDetails } from '@/domain/businessRequest/registration-request-details.type'
import type { BusinessRequestRepository } from '@/domain/businessRequest/business.request.repository.ts';
import type { ProfileRepository } from '@/domain/profile/profile.repository.ts';

export class GetRegistrationRequestDetailsUseCase {
    constructor(
        private readonly businessRequestRepository: BusinessRequestRepository,
        private readonly profileRepository: ProfileRepository
    ) {}

    async execute(id: string): Promise<RegistrationRequestDetails> {
        const request = await this.businessRequestRepository.getById(id);

        const client = await this.profileRepository.getById(request.clientId);

        const reviewer = request.reviewedBy
            ? await this.profileRepository.getById(request.reviewedBy)
            : null;

        return {
            request,
            client,
            reviewer,
        };
    }
}