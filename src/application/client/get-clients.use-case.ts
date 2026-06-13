import type { ClientRepository } from "@/domain/client/client.repository"

export class GetClientsUseCase {
    constructor(
        private readonly clientRepository: ClientRepository,
    ) {}
    async execute() {
        const clients = await this.clientRepository.getAll()

        if(!clients || clients.length === 0) {
            throw new Error("No clients found")
        }
        return clients
    }
}