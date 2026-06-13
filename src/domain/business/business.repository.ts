import type { Business } from "./business.types";

export interface CreateBusinessInput {
    clientId: string

    name: string
    registrationNumber: string
    businessType: string

    email?: string
    phone?: string
    address?: string

    requestId: string
}

export interface UpdateBusinessInput {
    name?: string
    registrationNumber?: string
    businessType?: string

    email?: string
    phone?: string
    address?: string
}

export interface BusinessRepository {
    getById(id: string): Promise<Business | null>

    getByClientId(clientId: string): Promise<Business[]>

    getByRegistrationNumber(registrationNumber: string): Promise<Business | null>

    getAll(): Promise<Business[]>

    listByType(type: string): Promise<Business[]>

    create(data: CreateBusinessInput): Promise<Business | null>

    submit(id: string): Promise<Business | null>

    update(id: string, data: Partial<UpdateBusinessInput>): Promise<Business>
}