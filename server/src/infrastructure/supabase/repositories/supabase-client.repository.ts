import type { ClientRepository, CreateClientWithProfileInput } from '@/domain/client/client.repository'
import type { Client } from '@/domain/client/client'
import { supabase } from '../supabase'

export class SupabaseClientRepository implements ClientRepository {

    async getById(id: string): Promise<Client | null> {
        const { data, error } = await supabase
            .from('Clients')
            .select('*')
            .eq('id', id)
            .single()
        if (error) {
            throw new Error(error.message)
        }
        return data as Client | null
    }

    async getByProfileId(profileId: string): Promise<Client | null> {
        const { data, error } = await supabase
            .from('Clients')
            .select('*')
            .eq('profileId', profileId)
            .single()
        if (error) {
            throw new Error(error.message)
        }
        return data as Client | null
    }

    async getByEmail(email: string): Promise<Client | null> {
        const { data, error } = await supabase
            .from('Clients')
            .select('*')
            .eq('email', email)
            .maybeSingle()
        if (error) {
            throw new Error(error.message)
        }
        return data as Client | null
    }

    async createClientWithProfile(
        input: CreateClientWithProfileInput
    ): Promise<Client | null> {

        const rpcInput = {
            p_auth_id: input.profile.authId,
            p_role: input.profile.role,
            p_email: input.client.email,
            p_firstname: input.client.firstname,
            p_lastname: input.client.lastname,
            p_phone: input.client.phone,
        }

        console.log('RPC INPUT:', rpcInput)

        const { data, error } = await supabase
            .rpc('create_client_with_profile', rpcInput)
            .single()

        if (error) {
            throw new Error(error.message)
        }

        return data as Client
    }

    async getAll(): Promise<Client[]> {
        const { data, error } = await supabase
            .from('Clients')
            .select('*')
        if (error) {
            throw new Error(error.message)
        }
        return data as Client[]
    }

    async create(client: Omit<Client, 'id'>): Promise<Client> {
        const { data, error } = await supabase
            .from('Clients')
            .insert(client)
            .select('*')
            .single()
        if (error) {
            throw new Error(error.message)
        }
        return data as Client
    }

    async update(id: string, client: Partial<Client>): Promise<Client> {
        const { data, error } = await supabase
            .from('Clients')
            .update(client)
            .eq('id', id)
            .select('*')
            .single()
        if (error) {
            throw new Error(error.message)
        }
        return data as Client
    }
    
    async delete(authId: string): Promise<void> {

        const { error } =
            await supabase.auth.admin.deleteUser(authId)

        if (error) {
            throw new Error(
                `Failed to delete authentication user: ${error.message}`
            )
        }
    }
}