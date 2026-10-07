import type { ProfileRepository, CreateProfileInput } from '@/domain/profile/profile.repository'

export class SignUpUseCase {
    constructor(
        private readonly profileRepository: ProfileRepository
    ) {}

    async execute(input: CreateProfileInput) {

        if (!input.email || !input.password) {
            throw new Error('Email and password are required')
        }

        const profile = await this.profileRepository.signUp(input, input.password)

        if(!profile) {
            throw new Error('Failed to create profile')
        }

        return profile
    }
}