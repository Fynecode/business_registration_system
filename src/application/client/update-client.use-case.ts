import type { ClientRepository, UpdateClientInput } from "@/domain/client/client.repository"

export class UpdateClientUseCase {
    constructor(
        private readonly clientRepository: ClientRepository,
    ) {}
    async execute(id: string, input: UpdateClientInput) {
        const client = await this.clientRepository.update(id, input)
        return client
    }
}