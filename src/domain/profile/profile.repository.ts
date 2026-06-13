import type { Profile } from '@/domain/profile/profile.types'

export type CreateProfileInput = Omit<Profile, 'id'>

export type UpdateProfileInput = Partial<Profile>

export interface ProfileRepository {
    signUp(profile: Omit<Profile, 'id'>, password: string): Promise<Profile | null>

    login(email: string, password: string): Promise<Profile | null>

    getByAuthId(authId: string): Promise<Profile | null>

    getById(id: string): Promise<Profile | null>

    getByEmail(email: string): Promise<Profile | null>

    getAll(): Promise<Profile[]>

    create(profile: CreateProfileInput): Promise<Profile>

    update(id: string, profile: UpdateProfileInput): Promise<Profile>

    delete(id: string): Promise<void>
}