import type { ProfileRepository } from '@/domain/profile/profile.repository'

export class LoginUseCase {
    constructor(
        private readonly profileRepository: ProfileRepository
    ) {}

    async execute(email: string, password: string) {
        if(!email || !password) {
            throw new Error('Email and password are required')
        }

        const profile = await this.profileRepository.login(email, password)

        if(!profile) {
            throw new Error('Profile not found')
        }

        return profile
    }
}