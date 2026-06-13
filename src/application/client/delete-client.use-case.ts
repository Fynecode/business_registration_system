import type { ClientRepository } from "@/domain/client/client.repository"

export class DeleteClientUseCase {
    constructor(
        private readonly clientRepository: ClientRepository,
    ) {}
    async execute(id: string) {
        const client = await this.clientRepository.delete(id)
        return client
    }
}