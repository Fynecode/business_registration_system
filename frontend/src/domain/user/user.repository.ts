import type { User, userRole } from './user.types'

export interface createUserInput {
    id: string,
    email: string,
    name: string,
    role: userRole,
}

export interface updateUserInput {
    name: string,
    email: string,
    role: userRole,
}

export interface UserRepository {
    getById(id: string): Promise<User | null>

    getByEmail(email: string): Promise<User | null>

    getAll(): Promise<User[]>

    create(data: createUserInput): Promise<User | null>

    update(id: string, data: updateUserInput): Promise<User | null>

    delete(id: string): Promise<User | null>
}