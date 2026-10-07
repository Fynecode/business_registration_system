import { useAuthStore } from '@/presentation/stores/auth.store'
import { useErrorStore } from '@/presentation/stores/error.store'

export async function useAuthBootstrap() {

    const authStore = useAuthStore()
    const errorStore = useErrorStore()

    try {

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/clients/me`,
            {
                method: 'GET',
                credentials: 'include'
            }
        )

        if (response.status === 401) {
            authStore.clearProfile()
            return
        }

        if (!response.ok) {
            throw new Error('Failed to bootstrap authentication')
        }

        const data = await response.json()

        authStore.setProfile(data.user)

        return

    } catch (error) {

         console.log('Error:', error)

        errorStore.setError(error, 'UNKNOWN')
        authStore.clearProfile()

    }
}