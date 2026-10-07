import type { ClientRepository, CreateClientInput } from "@/domain/client/client.repository"

export class CreateClientUseCase {
    constructor(
        private readonly clientRepository: ClientRepository,
    ) {}
    
    async execute(input: CreateClientInput) {
        const exists = await this.clientRepository.getByEmail(input.email)
        if (exists) {
            throw new Error("Client with this email already exists")
        }
        const client = await this.clientRepository.create(input)
        return client
    }
}