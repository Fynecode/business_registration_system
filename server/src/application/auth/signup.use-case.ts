import type { AuthenticationRepository } from '@/domain/auth/authentication.repository'

export class SignUpUseCase {
    constructor(
        private readonly authRepository: AuthenticationRepository
    ) {}

    async execute(email: string, password: string) {

        if (!email || !password) {
            throw new Error('Email and password are required')
        }

        const user = await this.authRepository.signUp({email, password})

        if(!user) {
            throw new Error('Failed to create auth user')
        }

        return user
    }
}