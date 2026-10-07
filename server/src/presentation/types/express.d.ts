import { AuthenticatedUser } from '@/domain/auth/authenticated-user'

declare global {
    namespace Express {
        interface Request {
            user?: AuthenticatedUser
        }
    }
}