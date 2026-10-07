import type { ClientRepository } from "@/domain/client/client.repository"

export class GetClientByIdUseCase {
    constructor(
        private readonly clientRepository: ClientRepository,
    ) {}
    async execute(id: string) {
        const client = await this.clientRepository.getById(id)

        if(!client) {
            throw new Error("Client not found")
        }
        return client
    }
}