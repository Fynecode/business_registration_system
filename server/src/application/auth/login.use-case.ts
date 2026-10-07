import type { AuthenticationRepository } from '@/domain/auth/authentication.repository'

export class LoginUseCase {
    constructor(
        private readonly authRepository: AuthenticationRepository
    ) {}

    async execute(email: string, password: string) {
        if(!email || !password) {
            throw new Error('Email and password are required')
        }

        const profile = await this.authRepository.signIn({email, password})

        if(!profile) {
            throw new Error('Invalid credentials')
        }

        return profile
    }
}