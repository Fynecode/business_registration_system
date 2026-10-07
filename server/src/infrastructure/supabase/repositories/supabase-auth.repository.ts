import type { AuthenticationRepository } from '@/domain/auth/authentication.repository';
import type { Credentials } from '@/domain/auth/credentials';
import type { AuthenticationResult } from '@/domain/auth/authenticated-user';

import { supabase } from '@/config/supabase.config';

export class SupabaseAuthRepository
    implements AuthenticationRepository {

    async signUp(
        credentials: Credentials
    ): Promise<AuthenticationResult> {

        const { data, error } = await supabase.auth.signUp({
            email: credentials.email,
            password: credentials.password,
        });

        if (error) {
            throw error;
        }

        if (!data.user) {
            throw new Error('Authentication user was not created');
        }

        return {
        id: data.user.id,
        session: data.session
            ? {
                accessToken: data.session.access_token,
                refreshToken: data.session.refresh_token,
                expiresAt: data.session.expires_at ?? null
            }
            : null
        };
    }

    async signIn(
        credentials: Credentials
    ): Promise<AuthenticationResult> {

        const { data, error } =
            await supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password,
            });

        if (error) {
            throw error;
        }

        if (!data.user) {
            throw new Error('Authentication user was not found');
        }

        return {
            id: data.user.id,
            session: data.session
            ? {
                accessToken: data.session.access_token,
                refreshToken: data.session.refresh_token,
                expiresAt: data.session.expires_at ?? null
            }
            : null
        }
    }

    async refresh(refreshToken: string): Promise<AuthenticationResult> {

        const { data, error } = await supabase.auth.refreshSession({
            refresh_token: refreshToken
        })

        if (error) {
            throw error
        }

        if (!data.user) {
            throw new Error('Authentication user was not found')
        }

        return {
            id: data.user.id,
            session: data.session
            ? {
                accessToken: data.session.access_token,
                refreshToken: data.session.refresh_token,
                expiresAt: data.session.expires_at ?? null
            }
            : null
        
        }
    }
    
}