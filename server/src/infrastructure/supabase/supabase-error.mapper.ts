import type { AppError } from "@/shared/errors/AppError";
import { ValidationError, ConflictError, UnauthorizedError, ForbiddenError, NotFoundError, RateLimitError, NetworkError } from "@/shared/errors/errors";

export function mapSupabaseError(error: any): AppError{
    const rawMessage = error?.message ?? error?.error ?? "Unknown error"
    const message = String(rawMessage)
    const messageLower = message.toLowerCase()

    const status = error?.status ?? error?.statusCode ?? null
    const code = String(error?.code ?? "").toLowerCase()

    // Forbidden / Row level security
    if (
        status === 403 ||
        messageLower.includes("row-level security") ||
        messageLower.includes("rls") ||
        code === "42501"
    ) {
        return new ForbiddenError()
    }

    // Conflict / Unique violation
    if (
        status === 409 ||
        code === "23505" ||
        messageLower.includes("duplicate key") ||
        messageLower.includes("unique constraint") ||
        messageLower.includes("already exists")
    ) {
        return new ConflictError("Resource already exists")
    }

    // Unauthorized (auth/jwt errors)
    if (
        status === 401 ||
        messageLower.includes("jwt") ||
        messageLower.includes("invalid token") ||
        messageLower.includes("expired") ||
        messageLower.includes("unauthorized")
    ) {
        return new UnauthorizedError()
    }

    // Not found
    if (
        status === 404 ||
        messageLower.includes("not found") ||
        messageLower.includes("no rows") ||
        messageLower.includes("no results")
    ) {
        return new NotFoundError("Resource")
    }

    // Validation / bad request
    if (
        status === 400 ||
        status === 422 ||
        messageLower.includes("invalid input") ||
        messageLower.includes("null value") ||
        messageLower.includes("invalid")
    ) {
        return new ValidationError(message)
    }

    // Rate limiting
    if(
        status === 429 ||
        messageLower.includes("rate limit") ||
        messageLower.includes("too many requests")
    ){
        return new RateLimitError()
    }

    // Network
    if(
        messageLower.includes("failed to fetch") ||
        messageLower.includes("networkerror") ||
        messageLower.includes("network request failed")
    ){
        return new NetworkError()
    }

    // Fallback to validation error with original message
    return new ValidationError(message)
}