import { useAuthStore } from '@/presentation/stores/auth.store'

export async function useDeleteProfile() {
    const authStore = useAuthStore()

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/clients/`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }
    )

    if (!response.ok) {
        throw new Error('Delete failed')
    }

    const result = await response.json()

    authStore.clearProfile()

    return
}