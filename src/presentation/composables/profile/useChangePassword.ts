import { notifyUseCase } from "@/services/notfication.services";
import { changePasswordUseCase } from "@/services/profile.services";

const notify = notifyUseCase

export async function useChangePassword(password: string){
    try {
        await changePasswordUseCase.execute(password)

        await notify.execute(
                {
                    id: '1',
                    title: 'Password reset successful',
                    message: 'Your password has successfully been reset.',
                    type: 'SUCCESS',
                    read: true
                })
    } catch (error) {
        console.error('Error changing password:', error)
        throw error
    }
}