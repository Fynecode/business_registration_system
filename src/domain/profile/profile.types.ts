export type Role = 'admin' | 'staff' | 'client' | 'editor'

export interface Profile {
    id: string
    authId?: string
    email: string
    phone: string
    first_name: string
    last_name: string
    password?: string
    role: Role
}