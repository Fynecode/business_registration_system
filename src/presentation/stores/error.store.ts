import { defineStore } from "pinia"

export type ErrorType =
    | "network"
    | "validation"
    | "auth"
    | "forbidden"
    | "conflict"
    | "not_found"
    | "unknown"

export interface ErrorPayload {
    message: string
    code?: string
    type: ErrorType
    timestamp: number
    retryable?: boolean
}

interface ErrorState {
    activeError: ErrorPayload | null
    networkRetryAttempt: number
    lastNetworkError: ErrorPayload | null
}

export const useErrorStore = defineStore("error", {
    state: (): ErrorState => ({
        activeError: null,
        networkRetryAttempt: 0,
        lastNetworkError: null,
    }),
    getters: {
        hasError: (state) => !!state.activeError,
        errorMessage: (state) => state.activeError?.message ?? "",
        isNetworkError: (state) => state.activeError?.type === "network",
    },
    actions: {
        setError(error: unknown, type: ErrorType = "unknown", retryable = false) {
            const message = String(
                (error as any)?.message ?? (error as any)?.error ?? error ?? "Unknown error"
            )
            const code = String((error as any)?.code ?? "") || undefined

            const payload: ErrorPayload = {
                message,
                code,
                type,
                retryable,
                timestamp: Date.now(),
            }

            this.activeError = payload
            if (type === "network") {
                this.lastNetworkError = payload
            }
        },
        clearError() {
            this.activeError = null
            this.lastNetworkError = null
            this.networkRetryAttempt = 0
        },
        setNetworkError(error: unknown, retryable = true) {
            this.setError(error, "network", retryable)
        },
        incrementRetry() {
            this.networkRetryAttempt += 1
        },
        resetRetry() {
            this.networkRetryAttempt = 0
        },
    },
})
