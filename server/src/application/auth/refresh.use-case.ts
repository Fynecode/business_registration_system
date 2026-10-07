import { AuthenticationRepository } from '@/domain/auth/authentication.repository'
import { AuthenticationResult } from '@/domain/auth/authenticated-user'

export class RefreshSessionUseCase {

    constructor(
        private readonly authRepository: AuthenticationRepository
    ) {}

    async execute(refreshToken: string): Promise<AuthenticationResult> {

        if (!refreshToken) {
            throw new Error('Refresh token is required')
        }

        return await this.authRepository.refresh(refreshToken)
    }
}