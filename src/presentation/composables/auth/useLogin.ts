import { useAuthStore } from '@/presentation/stores/auth.store'

export interface SignInInput {
    email: string
    password: string
}

const authStore = useAuthStore()

export async function useLogin(
    input: SignInInput
) {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/clients/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(input)
        }
    )

    if (!response.ok) {
        throw new Error('Login failed')
    }

    const result = await response.json()

    authStore.setProfile(result.client)

    return result.client
}