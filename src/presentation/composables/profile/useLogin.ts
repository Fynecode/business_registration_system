import { loginProfileUseCase } from "@/services/profile.services";
import { useAuthStore } from "@/presentation/stores/auth.store";

const authStore = useAuthStore()

export async function useLogin(email: string, password: string) {
    try {
        const profile = await loginProfileUseCase.execute(email, password)
        authStore.setProfile(profile)
        return profile
    } catch (error) {
        console.error('Login error:', error)
        throw error
    }
}