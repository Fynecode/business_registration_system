import type { ProfileRepository } from '@/domain/profile/profile.repository'

export class GetProfileByIdUseCase {
    constructor(
        private readonly profileRepository: ProfileRepository
    ) {}

    async execute(id: string) {
        const profile = await this.profileRepository.getById(id)
        if (!profile) {
            throw new Error('Profile not found')
        }
        return profile
    }
}