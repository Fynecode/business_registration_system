import type { ProfileRepository } from '@/domain/profile/profile.repository'
import type { Profile } from '@/domain/profile/profile.types'
import { supabase } from '../supabase'
import { mapSupabaseError } from '../supabase-error.mapper'

export class SupabaseProfileRepository implements ProfileRepository {

    async getById(id: string): Promise<Profile | null> {
        const { data, error } = await supabase
            .from('Profiles')
            .select('*')
            .eq('id', id)
            .single()
        if (error) {
            throw mapSupabaseError(error)
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
            throw mapSupabaseError(error)
        }
        return data as Profile | null
    }

    async getByEmail(email: string): Promise<Profile | null> {
        const { data, error } = await supabase
            .from('Profiles')
            .select('*')
            .eq('email', email)
            .single()
        if (error) {
            throw mapSupabaseError(error)
        }
        return data as Profile | null
    }

    async getAll(): Promise<Profile[]> {
        const { data, error } = await supabase
            .from('Profiles')
            .select('*')
        if (error) {
            throw mapSupabaseError(error)
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
            throw mapSupabaseError(error)
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
            throw mapSupabaseError(error)
        }
        return data as Profile
    }
    
    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('Profiles')
            .delete()
            .eq('id', id)
        if (error) {
            throw mapSupabaseError(error)
        }
    }

    async updateAuthEmail(email: string): Promise<void> {
        const { error} = await supabase.auth.updateUser({email: email})
        if (error) {
            throw mapSupabaseError(error)
        }
    }

    async login(email: string, password: string): Promise<Profile | null> {
        if(!email || !password) {
            throw new Error('Email and password are required')
        }

        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (authError) {
            throw mapSupabaseError(authError)
        }

        if (!authData?.user) {
            throw new Error('Login failed')
        }

        const profile = await this.getByAuthId(authData.user.id)

        if(!profile) {
            throw new Error('Profile not found')
        }

        return profile
    }

    async signUp(profile: Omit<Profile, 'id'>, password: string): Promise<Profile | null> {
        const role = profile.role ?? 'client'

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: profile.email,
            phone: profile.phone,
            password: password,
        })

        if (authError) {
            throw mapSupabaseError(authError)
        }

        if(!authData?.user) {
            throw new Error('User not created')
        }

        const profileData = {
            authId: authData.user.id,
            email: profile.email,
            first_name: profile.first_name,
            last_name: profile.last_name,
            phone: profile.phone,
            role: role
        }

        const { data, error } = await supabase
            .from('Profiles')
            .insert(profileData)
            .select('*')
            .single()
        if (error) {
            throw mapSupabaseError(error)
        }  

        return data as Profile
    }
}