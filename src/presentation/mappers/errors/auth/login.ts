import { useErrorStore } from "@/presentation/stores/error.store";
import { NetworkError, RateLimitError, ValidationError } from "@/shared/errors/errors";

const errorStore = useErrorStore()

export function handleLoginError(error: unknown, retry: () => Promise<any>){
    if(error instanceof ValidationError){
        errorStore.setError(error, "VALIDATION_ERROR", {message: "The email or password you entered is incorrect"})
        return
    }

    if(error instanceof RateLimitError){
        errorStore.setError(error, "RATE_LIMIT", {message: "Too many failed login attempts, please wait before trying again"})
        return
    }

    if(error instanceof NetworkError){
        errorStore.setError(error, "NETWORK", {message: "Unable to connect, please check your network connection", retryable: true, retry})
        return
    }

    errorStore.setError(error, "UNKNOWN", {message: "An unexpected error occured"})
}