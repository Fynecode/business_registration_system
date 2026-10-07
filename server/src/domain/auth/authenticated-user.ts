import { Role } from "../profile/profile"

export interface AuthenticationSession {
    accessToken: string
    refreshToken: string
    expiresAt: number | null
}

export interface AuthenticationResult {
    id: string
    session: AuthenticationSession | null
}

export interface AuthenticatedRequestUser {
    id: string
    role: Role
}