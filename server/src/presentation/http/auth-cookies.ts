import { Response } from 'express'
import { AuthenticationSession } from '@/domain/auth/authenticated-user'

export const setAuthenticationCookies = async (
    res: Response,
    session: AuthenticationSession
) => {

    const accessTokenMaxAge = session.expiresAt
        ? Math.max(
            0,
            session.expiresAt * 1000 - Date.now()
        )
        : undefined

    res.cookie('access_token', session.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: accessTokenMaxAge,
        path: '/'
    })

    res.cookie('refresh_token', session.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
    })
}