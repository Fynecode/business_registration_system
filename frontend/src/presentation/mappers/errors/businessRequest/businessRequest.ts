import { useErrorStore } from "@/presentation/stores/error.store"
import { ConflictError, ForbiddenError, NetworkError, NotFoundError, RateLimitError, UnauthorizedError, ValidationError } from "@/shared/errors/errors"

const errorStore = useErrorStore()

export function handleCreateBusinessRequestError(error: unknown, retry: () => Promise<any>) {
    if (error instanceof ValidationError) {
        errorStore.setError(error, "VALIDATION_ERROR", { message: "Please verify the business request details and try again." })
        return
    }

    if (error instanceof ConflictError) {
        errorStore.setError(error, "CONFLICT", { message: "A similar business request already exists or conflicts with existing data." })
        return
    }

    if (error instanceof UnauthorizedError) {
        errorStore.setError(error, "UNAUTHORIZED", { message: "You are not authorized to create a business request." })
        return
    }

    if (error instanceof ForbiddenError) {
        errorStore.setError(error, "FORBIDDEN", { message: "You do not have permission to create this business request." })
        return
    }

    if (error instanceof RateLimitError) {
        errorStore.setError(error, "RATE_LIMIT", { message: "Too many attempts. Please wait a moment before trying again." })
        return
    }

    if (error instanceof NetworkError) {
        errorStore.setError(error, "NETWORK", { message: "Unable to connect, please check your network connection.", retryable: true, retry })
        return
    }

    errorStore.setError(error, "UNKNOWN", { message: "An unexpected error occurred while creating the business request." })
}

export function handleGetBusinessRequestsError(error: unknown, retry: () => Promise<any>) {
    if (error instanceof NotFoundError) {
        errorStore.setError(error, "NOT_FOUND", { message: "No business requests were found." })
        return
    }

    if (error instanceof UnauthorizedError) {
        errorStore.setError(error, "UNAUTHORIZED", { message: "You are not authorized to view business requests." })
        return
    }

    if (error instanceof ForbiddenError) {
        errorStore.setError(error, "FORBIDDEN", { message: "You do not have permission to view these business requests." })
        return
    }

    if (error instanceof RateLimitError) {
        errorStore.setError(error, "RATE_LIMIT", { message: "Too many requests. Please try again shortly." })
        return
    }

    if (error instanceof NetworkError) {
        errorStore.setError(error, "NETWORK", { message: "Unable to connect, please check your network connection.", retryable: true, retry })
        return
    }

    errorStore.setError(error, "UNKNOWN", { message: "An unexpected error occurred while loading business requests." })
}
