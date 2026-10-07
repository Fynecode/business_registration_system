import { CreateProfileInput } from "../profile/profile.repository"
import type { User } from "./user"

export type CreateClientInput = Omit<User, 'id'>

export type UpdateClientInput = Partial<Omit<User, 'id' | 'profileId'>>

export type CreateClientWithProfileInput = {
    client: CreateClientInput,
    profile: CreateProfileInput
}

export interface ClientRepository {
    create(input: CreateClientInput): Promise<User | null>

    createClientWithProfile(input: CreateClientWithProfileInput): Promise<User | null>

    getById(id: string): Promise<User | null>

    getByEmail(email: string): Promise<User | null>
    
    getAll(): Promise<User[]>
    
    update(id: string, input: UpdateClientInput): Promise<User | null>
    
    delete(id: string): Promise<void>
}