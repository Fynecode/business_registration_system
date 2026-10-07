import { AuthenticatedRequestUser } from '@/domain/auth/authenticated-user'
import { ProfileRepository } from '@/domain/profile/profile.repository'
import { ClientRepository } from '@/domain/client/client.repository'

export class GetCurrentUserUseCase {

    constructor(
        private readonly profileRepository: ProfileRepository,
        private readonly clientRepository: ClientRepository
    ) {}

    async execute(authenticatedUser: AuthenticatedRequestUser) {

        const profile = await this.profileRepository.getByAuthId(
            authenticatedUser.id
        )

        if (!profile) {
            throw new Error('Profile not found')
        }

        if (profile.role !== 'client') {
            throw new Error('Unsupported user role')
        }

        const client = await this.clientRepository.getByProfileId(
            profile.id
        )

        if (!client) {
            throw new Error('Client not found')
        }

        return {
            ...client,
            role: profile.role
        }
    }
}