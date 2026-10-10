import { describe, it, expect, vi } from 'vitest'
import { authenticate } from './authentication.middleware'
import { setAuthenticationCookies } from '../http/auth-cookies'

vi.mock('../http/auth-cookies', () => {
    return {
        setAuthenticationCookies: vi.fn()
    }
})

describe('authenticate middleware', () => {
    const user = {
        id: 'user-123',
        email: 'test@example.com'
    }

    const expiredError = Object.assign(
        new Error('JWT expired'),
        { code: 'ERR_JWT_EXPIRED' }
    )

    it('returns 401 when access token is expired and refresh token is invalid', async () => {
        const verifyAccessToken = {
            execute: vi.fn().mockRejectedValue(expiredError)
        }

        const refreshUseCase = {
            execute: vi.fn().mockRejectedValue(new Error('Invalid refresh token'))
        }

        const req = {
            cookies: {
                access_token: 'expired-access-token',
                refresh_token: 'invalid-refresh-token'
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis()
        } as any

        const next = vi.fn()

        const middleware = authenticate(
            verifyAccessToken as any,
            refreshUseCase as any
        )

        await middleware(req, res, next)

        expect(verifyAccessToken.execute).toHaveBeenCalledWith('expired-access-token')
        expect(refreshUseCase.execute).toHaveBeenCalledWith('invalid-refresh-token')
        expect(next).not.toHaveBeenCalled()

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({
            message: 'Session expired'
        })
    })

    it('returns 401 when refresh result has no session', async () => {

        const verifyAccessToken = {
            execute: vi.fn().mockRejectedValue(expiredError)
        }

        const refreshUseCase = {
            execute: vi.fn().mockResolvedValue({})
        }

        const req = {
            cookies: {
                access_token: 'expired-access-token',
                refresh_token: 'valid-refresh-token'
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis()
        } as any

        const next = vi.fn()

        const middleware = authenticate(
            verifyAccessToken as any,
            refreshUseCase as any
        )

        await middleware(req, res, next)

        expect(verifyAccessToken.execute).toHaveBeenCalledWith('expired-access-token')
        expect(refreshUseCase.execute).toHaveBeenCalledWith('valid-refresh-token')
        expect(next).not.toHaveBeenCalled()

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({
            message: 'Unable to refresh session'
        })
    })

    it('returns 401 when access token has expired and refresh token is missing', async () => {
        const expiredError = Object.assign(
            new Error('JWT expired'),
            { code: 'ERR_JWT_EXPIRED' }
        )

        const verifyAccessToken = {
            execute: vi.fn().mockRejectedValue(expiredError)
        }

        const refreshUseCase = {
            execute: vi.fn()
        }

        const req = {
            cookies: {
                access_token: 'expired-access-token',
                refresh_token: undefined
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis()
        } as any

        const next = vi.fn()

        const middleware = authenticate(
            verifyAccessToken as any,
            refreshUseCase as any
        )

        await middleware(req, res, next)

        expect(verifyAccessToken.execute).toHaveBeenCalledWith('expired-access-token')
        expect(refreshUseCase.execute).not.toHaveBeenCalled()
        expect(next).not.toHaveBeenCalled()

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({
            message: 'Session expired'
        })
    })

    it('refreshes the session when the access token is expired', async () => {
        const verifyAccessToken = {
            execute: vi.fn()
            .mockRejectedValueOnce(expiredError)
            .mockResolvedValue(user)
        }

        const refreshUseCase = {
            execute: vi.fn().mockResolvedValue({ session: { accessToken: 'new-access-token' } })
        }

        const req = {
            cookies: {
                access_token: 'expired-access-token',
                refresh_token: 'valid-refresh-token'
            }
        } as any

        const res = {
            cookie: vi.fn(),
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis()
        } as any

        const next = vi.fn()

        const middleware = authenticate(
            verifyAccessToken as any,
            refreshUseCase as any
        )

        await middleware(req, res, next)

        expect(verifyAccessToken.execute).toHaveBeenCalledWith('expired-access-token')

        expect(refreshUseCase.execute).toHaveBeenCalledWith('valid-refresh-token')

        expect(verifyAccessToken.execute).toHaveBeenCalledWith('new-access-token')

        expect(setAuthenticationCookies).toHaveBeenCalledOnce()
        expect(req.user).toEqual(user)
        expect(next).toHaveBeenCalledOnce()
    })

    it('returns 401 when both access and refresh tokens are missing', async () => {
        const verifyAccessToken = {
            execute: vi.fn()
        }

        const refreshUseCase = {
            execute: vi.fn()
        }

        const req = {
            cookies: {
                access_token: undefined,
                refresh_token: undefined
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis()
        } as any

        const next = vi.fn()

        const middleware = authenticate(
            verifyAccessToken as any,
            refreshUseCase as any
        )

        await middleware(req, res, next)

        expect(verifyAccessToken.execute).not.toHaveBeenCalled()
        expect(refreshUseCase.execute).not.toHaveBeenCalled()
        expect(next).not.toHaveBeenCalled()

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({
            message: 'Authentication required'
        })
    })

    it('returns 401 when the access token is invalid and has not expired', async () => {
        const verifyAccessToken = {
            execute: vi.fn().mockRejectedValue(new Error('Invalid token'))
        }

        const refreshUseCase = {
            execute: vi.fn()
        }

        const req = {
            cookies: {
                access_token: 'invalid-access-token',
                refresh_token: 'valid-refresh-token'
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis()
        } as any

        const next = vi.fn()

        const middleware = authenticate(
            verifyAccessToken as any,
            refreshUseCase as any
        )

        await middleware(req, res, next)

        expect(verifyAccessToken.execute).toHaveBeenCalledWith('invalid-access-token')
        expect(refreshUseCase.execute).not.toHaveBeenCalled()
        expect(next).not.toHaveBeenCalled()

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({
            message: 'Invalid access token'
        })
    })

    it('refreshes the session when the access token is missing', async () => {
        
        const verifyAccessToken = {
            execute: vi.fn().mockResolvedValue(user)
        }

        const refreshUseCase = {
            execute: vi.fn().mockResolvedValue({session: { accessToken: 'new-access-token' }})
        }

        const req = {
            cookies: {
                access_token: undefined,
                refresh_token: 'valid-refresh-token'
            }
        } as any

        const res = {
            cookie: vi.fn(),
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis()
        } as any

        const next = vi.fn()

        const middleware = authenticate(
            verifyAccessToken as any,
            refreshUseCase as any
        )

        await middleware(req, res, next)

        expect(refreshUseCase.execute).toHaveBeenCalledWith('valid-refresh-token')

        expect(verifyAccessToken.execute).toHaveBeenCalledWith('new-access-token')

        expect(setAuthenticationCookies).toHaveBeenCalledOnce()

        expect(req.user).toEqual(user)
        expect(next).toHaveBeenCalledOnce()

        expect(res.status).not.toHaveBeenCalled()
    })

    it('allows a request with a valid access token', async () => {
        

        const verifyAccessToken = {
            execute: vi.fn().mockResolvedValue(user)
        }

        const refreshUseCase = {
            execute: vi.fn()
        }

        const req = {
            cookies: {
                access_token: 'valid-access-token',
                refresh_token: 'valid-refresh-token'
            }
        } as any

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis()
        } as any

        const next = vi.fn()

        const middleware = authenticate(
            verifyAccessToken as any,
            refreshUseCase as any
        )

        await middleware(req, res, next)

        expect(verifyAccessToken.execute)
            .toHaveBeenCalledWith('valid-access-token')

        expect(req.user).toEqual(user)
        expect(next).toHaveBeenCalledOnce()

        expect(refreshUseCase.execute)
            .not.toHaveBeenCalled()

        expect(res.status).not.toHaveBeenCalled()
    })
})