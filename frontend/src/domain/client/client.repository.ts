import type { Client } from "./client.types"

export interface CreateClientInput {
    email: string,
    firstname: string,
    lastname: string,
    phone?: string,
}

export interface UpdateClientInput {
    email?: string,
    firstname?: string,
    lastname?: string,
    phone?: string,
}

export interface ClientRepository {
    create(input: CreateClientInput): Promise<void>

    getById(id: string): Promise<Client | null>

    getByEmail(email: string): Promise<Client | null>
    
    getAll(): Promise<Client[]>
    
    update(id: string, input: UpdateClientInput): Promise<void>
    
    delete(id: string): Promise<void>
}