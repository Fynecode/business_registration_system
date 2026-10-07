import { useAuthStore } from "@/presentation/stores/auth.store";
import { handleSignUpError } from "@/presentation/mappers/errors/auth/signup";

export interface CreateProfileInput {
    email: string
    phone: string
    firstname: string
    lastname: string
    password: string
    role: string
}

const authStore = useAuthStore()

export async function useSignUp(input: CreateProfileInput) {
    try {
        
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/clients/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(input),
            }
        )

        const profile = response.client

        authStore.setProfile(profile)
        return profile
    } catch (error) {
        console.error('Sign-up error:', error)
        handleSignUpError(error, () => useSignUp(input))
    }
}