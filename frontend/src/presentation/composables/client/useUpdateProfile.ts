import { useAuthStore } from '@/presentation/stores/auth.store'

export interface UpdateProfileInput {
    firstname?: string
    lastname?: string
    phone?: string
}

export async function useUpdateClient(
    input: UpdateProfileInput
) {
    const authStore = useAuthStore()

    if (!authStore.profile?.id) {
        throw new Error('Update failed')
    }

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/clients/${authStore.profile.id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(input),
        }
    )

    if (!response.ok) {
        throw new Error('Update failed')
    }

    const result = await response.json()

    authStore.setProfile(result.client)

    return result.client
}