import type { ProfileRepository } from '@/domain/profile/profile.repository'

export class GetProfileByAuthIdUseCase {
    constructor(
        private readonly profileRepository: ProfileRepository
    ) {}

    async execute(authId: string) {
        const profile = await this.profileRepository.getByAuthId(authId)

        if (!profile) {
            throw new Error('Profile not found')
        }
        return profile
    }
}