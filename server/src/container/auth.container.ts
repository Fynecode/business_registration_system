import { SupabaseAuthenticationTokenService } from '@/infrastructure/supabase/repositories/supabase-auth-token-services.repository'
import { SupabaseAuthRepository } from '@/infrastructure/supabase/repositories/supabase-auth.repository'
import { VerifyAccessTokenUseCase } from '@/application/auth/verify-access-token.use-case'
import { authenticate } from '@/presentation/middleware/authentication.middleware'

const tokenService =
    new SupabaseAuthenticationTokenService()

const authRepository =
    new SupabaseAuthRepository()

const verifyAccessTokenUseCase =
    new VerifyAccessTokenUseCase(tokenService)

export const authenticateMiddleware =
    authenticate(verifyAccessTokenUseCase, authRepository)