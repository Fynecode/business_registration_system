import type { BusinessRequest, businessStatus, businessType } from "./business.request.types";

export type CreateBusinessRequestInput = Omit<BusinessRequest, 'id' |  'createdAt' | 'updatedAt'>

export type UpdateBusinessRequestInput = Partial<CreateBusinessRequestInput>

export interface BusinessRequestRepository {
    getByRequestNumber(requestNumber: string): Promise<BusinessRequest | null>

    getById(id: string): Promise<BusinessRequest | null>

    getByClientId(clientId: string): Promise<BusinessRequest[]>

    getByStatus(status: businessStatus): Promise<BusinessRequest[]>

    getAll(): Promise<BusinessRequest[]>

    getByType(type: businessType): Promise<BusinessRequest[]>

    create(input: CreateBusinessRequestInput): Promise<BusinessRequest>

    update(id: string, input: UpdateBusinessRequestInput): Promise<BusinessRequest | null>

    submit(id: string): Promise<BusinessRequest | null>

    delete(id: string): Promise<void>
}