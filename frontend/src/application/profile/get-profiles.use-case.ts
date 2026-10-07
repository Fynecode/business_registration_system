import type { ProfileRepository } from '@/domain/profile/profile.repository'

export class GetProfilesUseCase {
    constructor(
        private readonly profileRepository: ProfileRepository
    ) {}

    async execute() {
        const profiles = await this.profileRepository.getAll()
        if(!profiles || profiles.length === 0) {
            throw new Error('No profiles found')
        }
        return profiles
    }
}