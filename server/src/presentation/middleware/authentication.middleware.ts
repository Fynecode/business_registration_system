import { Request, Response, NextFunction } from 'express'

import { setAuthenticationCookies } from '@/presentation/http/auth-cookies'
import { VerifyAccessTokenUseCase } from '@/application/auth/verify-access-token.use-case'
import { RefreshSessionUseCase } from '@/application/auth/refresh.use-case'

function isJwtExpired(error: unknown): boolean {
    return (
        error instanceof Error &&
        'code' in error &&
        error.code === 'ERR_JWT_EXPIRED'
    )
}

export const authenticate = (
    verifyAccessToken: VerifyAccessTokenUseCase,
    refreshUseCase: RefreshSessionUseCase
) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const accessToken = req.cookies?.access_token
        const refreshToken = req.cookies?.refresh_token

        /*
         * No access token.
         * Try to establish a new session using the refresh token.
         */
        if (!accessToken) {

            if (!refreshToken) {
                return res.status(401).json({
                    message: 'Authentication required'
                })
            }

            return refreshAuthentication(
                req,
                res,
                next,
                refreshUseCase,
                verifyAccessToken,
                refreshToken
            )
        }

        /*
         * Access token exists.
         * Verify it normally.
         */
        try {
            const user = await verifyAccessToken.execute(accessToken)

            req.user = user

            return next()

        } catch (error) {

            /*
             * The token failed for a reason other than expiration.
             * Do not attempt to refresh it.
             */
            if (!isJwtExpired(error)) {
                return res.status(401).json({
                    message: 'Invalid access token'
                })
            }
        }

        /*
         * The access token has expired.
         * Try to refresh the session.
         */
        if (!refreshToken) {
            return res.status(401).json({
                message: 'Session expired'
            })
        }

        return refreshAuthentication(
            req,
            res,
            next,
            refreshUseCase,
            verifyAccessToken,
            refreshToken
        )
    }
}

const refreshAuthentication = async (
    req: Request,
    res: Response,
    next: NextFunction,
    refreshUseCase: RefreshSessionUseCase,
    verifyAccessToken: VerifyAccessTokenUseCase,
    refreshToken: string
) => {
    try {
        const result = await refreshUseCase.execute(refreshToken)

        if (!result.session) {
            return res.status(401).json({
                message: 'Unable to refresh session'
            })
        }

        await setAuthenticationCookies(
            res,
            result.session
        )

        const user = await verifyAccessToken.execute(
            result.session.accessToken
        )

        req.user = user

        return next()

    } catch (error) {
        console.error('Session refresh failed:', error)

        return res.status(401).json({
            message: 'Session expired'
        })
    }
}