import { signUpProfileUseCase } from "@/services/profile.services";
import { useAuthStore } from "@/presentation/stores/auth.store";

import type { CreateProfileInput } from "@/domain/profile/profile.repository";

const authStore = useAuthStore()

export async function useSignUp(input: CreateProfileInput) {
    try {
        const profile = await signUpProfileUseCase.execute(input)
        authStore.setProfile(profile)
        return profile
    } catch (error) {
        console.error('Sign-up error:', error)
        throw error
    }
}