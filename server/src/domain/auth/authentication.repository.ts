import type { Credentials } from './credentials';
import type { AuthenticationResult } from './authenticated-user';

export interface AuthenticationRepository {
    signUp(credentials: Credentials): Promise<AuthenticationResult>;
    signIn(credentials: Credentials): Promise<AuthenticationResult>;
    refresh(refreshToken: string): Promise<AuthenticationResult>
}