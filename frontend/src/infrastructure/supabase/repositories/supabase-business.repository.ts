import { supabase } from "../supabase"
import { mapSupabaseError } from "../supabase-error.mapper"

import type { BusinessRepository, CreateBusinessInput, UpdateBusinessInput } from "@/domain/business/business.repository"
import type { Business } from "@/domain/business/business.types"

type BusinessRow = {
    id: string
    client_id: string
    name: string
    registration_number: string
    business_type: string
    email?: string | null
    phone?: string | null
    address?: string | null
    request_id: string
    created_at: string
    updated_at: string
}

type BusinessInsertRow = Omit<BusinessRow, 'id' | 'created_at' | 'updated_at'>
type BusinessUpdateRow = Partial<Omit<BusinessRow, 'id' | 'created_at' | 'updated_at'>>

function toBusiness(row: BusinessRow): Business {
    return {
        id: row.id,
        name: row.name,
        registrationNumber: row.registration_number,
        businessType: row.business_type,
        email: row.email ?? undefined,
        phone: row.phone ?? undefined,
        address: row.address ?? undefined,
        requestId: row.request_id,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
    }
}

function toInsertRow(input: CreateBusinessInput): BusinessInsertRow {
    return {
        client_id: input.clientId,
        name: input.name,
        registration_number: input.registrationNumber,
        business_type: input.businessType,
        email: input.email ?? null,
        phone: input.phone ?? null,
        address: input.address ?? null,
        request_id: input.requestId,
    }
}

function toUpdateRow(input: Partial<UpdateBusinessInput>): BusinessUpdateRow {
    const row: BusinessUpdateRow = {}

    if (input.name !== undefined) row.name = input.name
    if (input.registrationNumber !== undefined) row.registration_number = input.registrationNumber
    if (input.businessType !== undefined) row.business_type = input.businessType
    if (input.email !== undefined) row.email = input.email
    if (input.phone !== undefined) row.phone = input.phone
    if (input.address !== undefined) row.address = input.address

    return row
}

function mapRows(rows: BusinessRow[] | null): Business[] {
    return rows?.map(toBusiness) ?? []
}

export class SupabaseBusinessRepository implements BusinessRepository {
    async getById(id: string): Promise<Business | null> {
        const { data, error } = await supabase
            .from('Businesses')
            .select('*')
            .eq('id', id)
            .single()
        if (error) {
            throw mapSupabaseError(error)
        }
        return toBusiness(data as BusinessRow)
    }

    async getByClientId(clientId: string): Promise<Business[]> {
        const { data, error } = await supabase
            .from('Businesses')
            .select('*')
            .eq('client_id', clientId)
        if (error) {
            throw mapSupabaseError(error)
        }
        return mapRows(data as BusinessRow[])
    }

    async getByRegistrationNumber(registrationNumber: string): Promise<Business | null> {
        const { data, error } = await supabase
            .from('Businesses')
            .select('*')
            .eq('registration_number', registrationNumber)
            .single()
        if (error) {
            throw mapSupabaseError(error)
        }
        return toBusiness(data as BusinessRow)
    }

    async getAll(): Promise<Business[]> {
        const { data, error } = await supabase
            .from('Businesses')
            .select('*')
        if (error) {
            throw mapSupabaseError(error)
        }
        return mapRows(data as BusinessRow[])
    }

    async listByType(type: string): Promise<Business[]> {
        const { data, error } = await supabase
            .from('Businesses')
            .select('*')
            .eq('business_type', type)
        if (error) {
            throw mapSupabaseError(error)
        }
        return mapRows(data as BusinessRow[])
    }

    async create(data: CreateBusinessInput): Promise<Business | null> {
        const { data: result, error } = await supabase
            .from('Businesses')
            .insert([toInsertRow(data)])
            .select()
            .single()
        if (error) {
            throw mapSupabaseError(error)
        }
        return result ? toBusiness(result as BusinessRow) : null
    }

    async submit(id: string): Promise<Business | null> {
        const { data, error } = await supabase
            .from('Businesses')
            .update({ updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single()
        if (error) {
            throw mapSupabaseError(error)
        }
        return data ? toBusiness(data as BusinessRow) : null
    }

    async update(id: string, input: Partial<UpdateBusinessInput>): Promise<Business> {
        const { data, error } = await supabase
            .from('Businesses')
            .update(toUpdateRow(input))
            .eq('id', id)
            .select()
            .single()
        if (error) {
            throw mapSupabaseError(error)
        }
        return toBusiness(data as BusinessRow)
    }
}
