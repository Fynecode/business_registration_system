import type { ProfileRepository, CreateProfileInput } from '@/domain/profile/profile.repository'

export class CreateProfileUseCase {
    constructor(
        private readonly profileRepository: ProfileRepository
    ) {}

    async execute(input: CreateProfileInput) {

        const profile = await this.profileRepository.create(input)
        return profile
    }
}