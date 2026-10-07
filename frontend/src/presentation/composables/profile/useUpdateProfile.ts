import { updateProfileUseCase } from '@/services/profile.services';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/presentation/stores/auth.store'
import { notifyUseCase } from '@/services/notfication.services';

const auth = useAuthStore()
const router = useRouter()
const notify = notifyUseCase

export async function useUpdateProfile(profileData: { first_name?: string; last_name?: string, phone?: string, email?: string }) {
    try {
        if (!auth.profile?.id) {
            router.push('/login')
            throw new Error('User not authenticated')
        }

        const profile = await updateProfileUseCase.execute(auth.profile.id, profileData)

        if(!profile){
            await notify.execute(
                {
                    id: '1',
                    title: 'Update Failed',
                    message: 'Failed to update your profile',
                    type: 'ERROR',
                    read: true

                })
            return
        }

        await notify.execute(
                {
                    id: '2',
                    title: 'Profile update success',
                    message: 'Profile update successfully',
                    type: 'SUCCESS',
                    read: true

                })

        return profile
    } catch (error) {
        console.error('Error updating profile:', error)
        throw error
    }
}