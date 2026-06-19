import { defineStore } from "pinia"

export type ErrorType =
    | "NETWORK"
    | "VALIDATION_ERROR"
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "CONFLICT"
    | "NOT_FOUND"
    | "UNKNOWN"
    | "RATE_LIMIT"

export interface ErrorPayload {
    error: unknown
    message: string
    code?: string
    type: ErrorType
    timestamp: number
    retryable?: boolean
    retry?: () => Promise<void>
}

interface ErrorState {
    activeError: ErrorPayload | null
    networkRetryAttempt: number
    lastNetworkError: ErrorPayload | null
}

const MAX_RETRIES = 3

export const useErrorStore = defineStore("error", {
    state: (): ErrorState => ({
        activeError: null as ErrorPayload | null,
        networkRetryAttempt: 0,
        lastNetworkError: null,
    }),
    getters: {
        hasError: (state) => !!state.activeError,
        errorMessage: (state) => state.activeError?.message ?? "",
        isNetworkError: (state) => state.activeError?.type === "NETWORK",
    },
    actions: {
        setError(error: unknown, type: ErrorType, options?: {message?: string, retryable?: boolean, retry?: () => Promise<void>}) {
            const message = options?.message ?? (error instanceof Error? error.message : "An unexpected error has occured")
            
            this.activeError = {
                error,
                type,
                message,
                retryable : options?.retryable ?? false,
                retry: options?.retry,
                timestamp: Date.now()
            }
            
        },

        async retry(){
            if(!this.activeError?.retryable || !this.activeError?.retry){
                return
            }

            if(this.networkRetryAttempt >= MAX_RETRIES){
                return
            }

            this.incrementRetry()

            try {
                await this.activeError.retry()

                this.clearError()

                this.resetRetry()
            } catch (error) {
                this.setError(
                    error,
                    this.activeError.type,
                    {
                        retryable: true,
                        retry: this.activeError.retry

                    }
                )
            }
        },

        clearError() {
            this.activeError = null
            this.lastNetworkError = null
            this.networkRetryAttempt = 0
        },
        setNetworkError(error: unknown, retryable = true) {
            this.setError(error, "NETWORK", {retryable})
        },
        incrementRetry() {
            this.networkRetryAttempt += 1
        },
        resetRetry() {
            this.networkRetryAttempt = 0
        },
    },
})
