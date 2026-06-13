import type { ProfileRepository, CreateProfileInput } from '@/domain/profile/profile.repository'

export class CreateProfileUseCase {
    constructor(
        private readonly profileRepository: ProfileRepository
    ) {}

    async execute(input: CreateProfileInput) {
        const existingProfile = await this.profileRepository.getByEmail(input.email)

        if (existingProfile) {
            throw new Error('Profile already exists')
        }

        const profile = await this.profileRepository.create(input)
        return profile
    }
}