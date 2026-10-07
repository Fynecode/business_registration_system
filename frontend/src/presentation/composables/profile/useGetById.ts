import {getProfileByIdUseCase} from '@/services/profile.services'

export async function useGetById(id: string) {
    try {
        const profile = await getProfileByIdUseCase.execute(id)
        return profile
    } catch (error) {
        console.error('Error fetching profile by ID:', error)
        throw error
    }
}