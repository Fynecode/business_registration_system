import type { Profile } from './profile'

export type CreateProfileInput = Omit<Profile, 'id'>

export type UpdateProfileInput = Pick<Profile, 'role'>

export interface ProfileRepository {

    changePassword(password: string): Promise<void>

    getByAuthId(authId: string): Promise<Profile | null>

    getById(id: string): Promise<Profile | null>

    getAll(): Promise<Profile[]>

    create(profile: CreateProfileInput): Promise<Profile>

    update(id: string, profile: UpdateProfileInput): Promise<Profile>

    delete(id: string): Promise<void>
}