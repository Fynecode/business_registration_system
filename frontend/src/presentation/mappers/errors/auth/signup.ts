import { useErrorStore } from "@/presentation/stores/error.store";
import { ConflictError, NetworkError, RateLimitError, ValidationError } from "@/shared/errors/errors";

const errorStore = useErrorStore()

export function handleSignUpError(error: unknown, retry: () => Promise<any>){
    if(error instanceof ConflictError){
        errorStore.setError(error, "CONFLICT", {message: "The email you entered already exists"})
        return
    }

    if(error instanceof RateLimitError){
        errorStore.setError(error, "RATE_LIMIT", {message: "Too many failed signup attempts, please wait before trying again"})
        return
    }

    if(error instanceof NetworkError){
        errorStore.setError(error, "NETWORK", {message: "Unable to connect, please check your network connection", retryable: true, retry})
        return
    }

    errorStore.setError(error, "UNKNOWN", {message: "An unexpected error occured"})
}