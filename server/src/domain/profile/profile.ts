export type Role = 'admin' | 'staff' | 'client' | 'editor'

export interface Profile {
    id: string
    authId?: string
    role: Role
    password?: string
}