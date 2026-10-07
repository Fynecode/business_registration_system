import { CreateProfileInput } from "../profile/profile.repository"
import type { Client } from "./client"

export type CreateClientInput = Omit<Client, 'id'>

export type UpdateClientInput = Partial<Omit<Client, 'id' | 'profileId'>>

export type CreateClientWithProfileInput = {
    client: CreateClientInput,
    profile: CreateProfileInput
}

export interface ClientRepository {
    create(input: CreateClientInput): Promise<Client | null>

    createClientWithProfile(input: CreateClientWithProfileInput): Promise<Client | null>

    getById(id: string | string[]): Promise<Client | null>

    getByEmail(email: string): Promise<Client | null>

    getByProfileId(profileId: string): Promise<Client | null>
    
    getAll(): Promise<Client[]>
    
    update(id: string | string[], input: UpdateClientInput): Promise<Client | null>
    
    delete(id: string | string[]): Promise<void>
}