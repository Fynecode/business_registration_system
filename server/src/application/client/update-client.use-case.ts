import type { ClientRepository, UpdateClientInput } from "@/domain/client/client.repository"

export class UpdateClientUseCase {
    constructor(
        private readonly clientRepository: ClientRepository,
    ) {}
    async execute(id: string | string[], input: UpdateClientInput) {
        let client
        
        client = await this.clientRepository.getById(id)

        if(!client){
            throw new Error(`Profile not found`)
        }

        client = await this.clientRepository.update(id, input)
        return client
    }
}