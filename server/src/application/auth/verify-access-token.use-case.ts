import { AuthenticationTokenService } from '@/domain/auth/authentication-verification.service'
import { AuthenticatedRequestUser } from '@/domain/auth/authenticated-user'

export class VerifyAccessTokenUseCase {

    constructor(
        private readonly tokenService: AuthenticationTokenService
    ) {}

    async execute(token: string): Promise<AuthenticatedRequestUser> {

        if (!token) {
            throw new Error('Access token is required')
        }

        return await this.tokenService.verifyAccessToken(token)
    }
}