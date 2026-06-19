import { loginProfileUseCase } from "@/services/profile.services";
import { useAuthStore } from "@/presentation/stores/auth.store";
import { handleLoginError } from "@/presentation/mappers/errors/auth/login";

const authStore = useAuthStore()

export async function useLogin(email: string, password: string) {
    try {
        const profile = await loginProfileUseCase.execute(email, password)
        authStore.setProfile(profile)
        return profile
    } catch (error) {
        console.error('Login error:', error)
        handleLoginError(error, () => useLogin(email, password))
    }
}