export interface RetryOptions {
    retries?: number
    initialDelayMs?: number
    maxDelayMs?: number
    backoffFactor?: number
    onRetry?: (attempt: number, error: unknown) => void
}

export function isNetworkError(error: unknown): boolean {
    if (!error || typeof error !== 'object') {
        return false
    }

    const typedError = error as { message?: unknown; name?: unknown }
    const message = String(typedError.message ?? '').toLowerCase()
    const name = String(typedError.name ?? '').toLowerCase()

    if (name === 'aborterror' || name === 'typeerror') {
        return true
    }

    return [
        'failed to fetch',
        'networkerror',
        'network request failed',
        'offline',
        'connection reset',
        'connection refused',
        'timed out',
        'timeout',
    ].some((fragment) => message.includes(fragment))
}

function delay(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export async function retryOnNetworkError<T>(
    operation: () => Promise<T>,
    options: RetryOptions = {}
): Promise<T> {
    const {
        retries = 3,
        initialDelayMs = 300,
        maxDelayMs = 3000,
        backoffFactor = 2,
        onRetry,
    } = options

    let attempt = 0
    let delayMs = initialDelayMs

    while (true) {
        try {
            return await operation()
        } catch (error) {
            if (!isNetworkError(error) || attempt >= retries) {
                throw error
            }

            attempt += 1
            onRetry?.(attempt, error)
            await delay(delayMs)
            delayMs = Math.min(delayMs * backoffFactor, maxDelayMs)
        }
    }
}
