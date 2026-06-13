import { updateProfileUseCase } from '@/services/profile.services';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/presentation/stores/auth.store'

const auth = useAuthStore()
const router = useRouter()

export async function useUpdateProfile(profileData: { first_name?: string; last_name?: string, phone?: string, email?: string }) {
    try {
        if (!auth.profile?.id) {
            router.push('/login')
            throw new Error('User not authenticated')
        }

        return await updateProfileUseCase.execute(auth.profile.id, profileData)
    } catch (error) {
        console.error('Error updating profile:', error)
        throw error
    }
}