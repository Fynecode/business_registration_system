import type { ClientRepository, CreateClientWithProfileInput } from "@/domain/client/client.repository"

export class CreateClientWithProfileUseCase {
    constructor(
        private readonly clientRepository: ClientRepository,
    ) {}
    
    async execute(clientInput: CreateClientWithProfileInput) {
        const exists = await this.clientRepository.getByEmail(clientInput.client.email)
        if (exists) {
            throw new Error("Client with this email already exists")
        }
        const client = await this.clientRepository.createClientWithProfile(clientInput)
        return client
    }
}