import type { Client } from "@/domain/client/client";
import type { User } from "@/domain/user/user";
import type { AuthenticationResult } from "@/domain/auth/authenticated-user";

export interface RegisterClientResult {
    user: Client | User | null,
    authentication: AuthenticationResult
}