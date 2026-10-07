import { AuthenticatedRequestUser } from "./authenticated-user"

export interface AuthenticationTokenService {
    verifyAccessToken(token: string): Promise<AuthenticatedRequestUser>
}