import type { ProfileRepository } from '@/domain/profile/profile.repository'
import type { Profile } from '@/domain/profile/profile'
import { supabase } from '../supabase'

export class SupabaseProfileRepository implements ProfileRepository {

    async getById(id: string): Promise<Profile | null> {
        const { data, error } = await supabase
            .from('Profiles')
            .select('*')
            .eq('id', id)
            .single()
        if (error) {
            throw error
        }
        return data as Profile | null
    }

    async getByAuthId(authId: string): Promise<Profile | null> {
        const { data, error } = await supabase
            .from('Profiles')
            .select('*')
            .eq('authId', authId)
            .single()
        if (error) {
            throw error
        }
        return data as Profile | null
    }

    async getAll(): Promise<Profile[]> {
        const { data, error } = await supabase
            .from('Profiles')
            .select('*')
        if (error) {
            throw error
        }
        return data as Profile[]
    }

    async create(profile: Omit<Profile, 'id'>): Promise<Profile> {
        const { data, error } = await supabase
            .from('Profiles')
            .insert(profile)
            .select('*')
            .single()
        if (error) {
            throw error
        }
        return data as Profile
    }

    async update(id: string, profile: Partial<Profile>): Promise<Profile> {
        const { data, error } = await supabase
            .from('Profiles')
            .update(profile)
            .eq('id', id)
            .select('*')
            .single()
        if (error) {
            throw error
        }
        return data as Profile
    }
    
    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('Profiles')
            .delete()
            .eq('id', id)
        if (error) {
            throw error
        }
    }

    async requestPasswordReset(email: string): Promise<void> {
        const {error} = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`
        })

        if (error) {
            throw error
        }
    }

    async changePassword(password: string): Promise<void> {
        const {error} = await supabase.auth.updateUser({password: password})

        if(error){
            throw error
        }
    }
}