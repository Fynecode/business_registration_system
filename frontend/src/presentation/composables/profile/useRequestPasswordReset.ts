import { notifyUseCase } from "@/services/notfication.services";
import { requestPasswordResetUseCase } from "@/services/profile.services";

const notify = notifyUseCase

export async function useRequestPasswordReset(email: string){
    try {
        await requestPasswordResetUseCase.execute(email)

        await notify.execute(
                {
                    id: '1',
                    title: 'Password reset granted',
                    message: 'Please check your email',
                    type: 'SUCCESS',
                    read: true
                })
    } catch (error) {
        console.error('Error requesting password reset:', error)
        throw error
    }
}