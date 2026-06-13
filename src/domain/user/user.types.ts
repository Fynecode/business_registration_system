export type userRole = 'admin' | 'staff' | 'editor'

export interface User {
    id: string,
    email: string,
    name: string,
    role: userRole,
    createdAt: Date,
    updatedAt: Date
}