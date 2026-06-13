import { supabase } from "../supabase"
import { mapSupabaseError } from "../supabase-error.mapper"

import type {
    BusinessRequestRepository,
    CreateBusinessRequestInput,
    UpdateBusinessRequestInput,
} from "@/domain/businessRequest/business.request.repository"
import type { BusinessRequest, businessStatus, businessType } from "@/domain/businessRequest/business.request.types"
import type { Document } from "@/domain/document/document.types"

type BusinessRequestRow = {
    id: string
    client_id: string
    request_number: string
    proposed_names: [string, string?, string?]
    email?: string | null
    phone?: string | null
    address?: string | null
    business_type: businessType
    documents: Document[]
    status: businessStatus
    reviewed_by?: string | null
    rejected_reason?: string | null
    created_at: string
    updated_at: string
}

type BusinessRequestInsertRow = Omit<BusinessRequestRow, 'id' | 'created_at' | 'updated_at'>
type BusinessRequestUpdateRow = Partial<Omit<BusinessRequestRow, 'id' | 'created_at' | 'updated_at'>>

function toBusinessRequest(row: BusinessRequestRow): BusinessRequest {
    return {
        id: row.id,
        clientId: row.client_id,
        requestNumber: row.request_number,
        proposedNames: row.proposed_names,
        email: row.email ?? undefined,
        phone: row.phone ?? undefined,
        address: row.address ?? undefined,
        businessType: row.business_type,
        documents: row.documents ?? [],
        status: row.status,
        reviewedBy: row.reviewed_by ?? undefined,
        rejectedReason: row.rejected_reason ?? undefined,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    }
}

function toInsertRow(input: CreateBusinessRequestInput): BusinessRequestInsertRow {
    return {
        client_id: input.clientId,
        request_number: input.requestNumber,
        proposed_names: input.proposedNames,
        email: input.email ?? null,
        phone: input.phone ?? null,
        address: input.address ?? null,
        business_type: input.businessType,
        documents: input.documents,
        status: input.status,
        reviewed_by: input.reviewedBy ?? null,
        rejected_reason: input.rejectedReason ?? null,
    }
}

function toUpdateRow(input: UpdateBusinessRequestInput): BusinessRequestUpdateRow {
    const row: BusinessRequestUpdateRow = {}

    if (input.clientId !== undefined) row.client_id = input.clientId
    if (input.requestNumber !== undefined) row.request_number = input.requestNumber
    if (input.proposedNames !== undefined) row.proposed_names = input.proposedNames
    if (input.email !== undefined) row.email = input.email
    if (input.phone !== undefined) row.phone = input.phone
    if (input.address !== undefined) row.address = input.address
    if (input.businessType !== undefined) row.business_type = input.businessType
    if (input.documents !== undefined) row.documents = input.documents
    if (input.status !== undefined) row.status = input.status
    if (input.reviewedBy !== undefined) row.reviewed_by = input.reviewedBy
    if (input.rejectedReason !== undefined) row.rejected_reason = input.rejectedReason

    return row
}

function mapRows(rows: BusinessRequestRow[] | null): BusinessRequest[] {
    return rows?.map(toBusinessRequest) ?? []
}

export class SupabaseBusinessRequestRepository implements BusinessRequestRepository {
    async getByRequestNumber(requestNumber: string): Promise<BusinessRequest | null> {
        const { data, error } = await supabase
            .from('Business_Requests')
            .select('*')
            .eq('request_number', requestNumber)
            .single()
        if (error) {
            throw mapSupabaseError(error)
        }
        return toBusinessRequest(data as BusinessRequestRow)
    }

    async getById(id: string): Promise<BusinessRequest | null> {
        const { data, error } = await supabase
            .from('Business_Requests')
            .select('*')
            .eq('id', id)
            .single()
        if (error) {
            throw mapSupabaseError(error)
        }

        return toBusinessRequest(data as BusinessRequestRow)
    }

    async getByClientId(clientId: string): Promise<BusinessRequest[]> {
        const { data, error } = await supabase
            .from('Business_Requests')
            .select('*')
            .eq('client_id', clientId)
        if (error) {
            throw mapSupabaseError(error)
        }
        return mapRows(data as BusinessRequestRow[])
    }

    async getByStatus(status: businessStatus): Promise<BusinessRequest[]> {
        const { data, error } = await supabase
            .from('Business_Requests')
            .select('*')
            .eq('status', status)
        if (error) {
            throw mapSupabaseError(error)
        }
        return mapRows(data as BusinessRequestRow[])
    }

    async getAll(): Promise<BusinessRequest[]> {
        const { data, error } = await supabase
            .from('Business_Requests')
            .select('*')
        if (error) {
            throw mapSupabaseError(error)
        }
        return mapRows(data as BusinessRequestRow[])
    }

    async getByType(type: businessType): Promise<BusinessRequest[]> {
        const { data, error } = await supabase
            .from('Business_Requests')
            .select('*')
            .eq('business_type', type)
        if (error) {
            throw mapSupabaseError(error)
        }
        return mapRows(data as BusinessRequestRow[])
    }

    async create(input: CreateBusinessRequestInput): Promise<BusinessRequest> {
        const { data, error } = await supabase
            .from('Business_Requests')
            .insert(toInsertRow(input))
            .select('*')
            .single()
        if (error) {
            throw mapSupabaseError(error)
        }
        return toBusinessRequest(data as BusinessRequestRow)
    }

    async update(id: string, input: UpdateBusinessRequestInput): Promise<BusinessRequest | null> {
        const { data, error } = await supabase
            .from('Business_Requests')
            .update(toUpdateRow(input))
            .eq('id', id)
            .select('*')
            .single()
        if (error) {
            throw mapSupabaseError(error)
        }
        return toBusinessRequest(data as BusinessRequestRow)
    }

    async submit(id: string): Promise<BusinessRequest | null> {
        const { data, error } = await supabase
            .from('Business_Requests')
            .update({ status: 'submitted' })
            .eq('id', id)
            .select('*')
            .single()
        if (error) {
            throw mapSupabaseError(error)
        }
        return toBusinessRequest(data as BusinessRequestRow)
    }

    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('Business_Requests')
            .delete()
            .eq('id', id)
        if (error) {
            throw mapSupabaseError(error)
        }
    }
}
