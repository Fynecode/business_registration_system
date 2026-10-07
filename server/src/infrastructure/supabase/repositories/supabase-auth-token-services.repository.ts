import { createRemoteJWKSet, jwtVerify } from 'jose'

import {
    AuthenticatedRequestUser
} from '@/domain/auth/authenticated-user'

import {
    AuthenticationTokenService
} from '@/domain/auth/authentication-verification.service'

import { environment } from '@/config/environment.config'

const JWKS = createRemoteJWKSet(
    new URL(
        `${environment.SUPABASE_URL}/auth/v1/.well-known/jwks.json`
    )
)

export class SupabaseAuthenticationTokenService
    implements AuthenticationTokenService {

    async verifyAccessToken(
        token: string
    ): Promise<AuthenticatedRequestUser> {

        const { payload } = await jwtVerify(token, JWKS, {
            issuer: `${environment.SUPABASE_URL}/auth/v1`,
            audience: 'authenticated',
            algorithms: ['ES256']
        })

        if (!payload.sub) {
            throw new Error('Invalid access token')
        }

        const role = payload.user_role

        if (
            typeof role !== 'string' ||
            !['admin', 'staff', 'client', 'editor'].includes(role)
        ) {
            throw new Error('Invalid user role')
        }

        return {
            id: payload.sub,
            role: role as AuthenticatedRequestUser['role']
        }
    }
}