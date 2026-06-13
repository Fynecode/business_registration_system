import type { ProfileRepository, UpdateProfileInput } from '@/domain/profile/profile.repository'

export class UpdateProfileUseCase {
    constructor(
        private readonly profileRepository: ProfileRepository
    ) {}

    async execute(id: string, input: UpdateProfileInput) {
        const profile = await this.profileRepository.getById(id)
        if (!profile) {
            throw new Error('Profile not found')
        }
        const updatedProfile = await this.profileRepository.update(id, input)
        return updatedProfile
    }
}