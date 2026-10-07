export type Role = 'admin' | 'staff' | 'client' | 'editor'

export interface Profile {
    id: string
    profileId: string
    createdAt: string | Date
    email: string
    phone: string
    firstname: string
    lastname: string
    role?: Role
}