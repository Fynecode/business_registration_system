import type { ClientRepository } from "@/domain/client/client.repository"

export class GetClientByProfileIdUseCase {
    constructor(
        private readonly clientRepository: ClientRepository,
    ) {}
    async execute(profileId: string) {
        const client = await this.clientRepository.getByProfileId(profileId)

        if(!client) {
            throw new Error("Client not found")
        }
        return client
    }
}