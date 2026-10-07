import { LoginUseCase } from '@/application/auth/login.use-case'
import { GetProfileByAuthIdUseCase } from '@/application/profile/get-profile-by-auth-id.use-case'
import { GetClientByProfileIdUseCase } from '@/application/client/get-client-by-profile-id.use-case'

export class LoginClientUseCase {

    constructor(
        private readonly login: LoginUseCase,
        private readonly getProfile: GetProfileByAuthIdUseCase,
        private readonly getClient: GetClientByProfileIdUseCase
    ) {}

    async execute(email: string, password: string) {
        try {
            const authUser = await this.login.execute(email, password)
            const profile = await this.getProfile.execute(authUser.id)
            const client = await this.getClient.execute(profile.id)
            return { client, authUser, role: profile.role }
        } catch (error) {
            throw new Error("Failed to login client")
        }
    }
}