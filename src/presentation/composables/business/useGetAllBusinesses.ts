import { handleGetBusinessError } from "@/presentation/mappers/errors/business/business"
import { getBusinessesUseCase } from "@/services/business.services"

export async function useGetAllBusinesses() {
    try {
        const businesses = await getBusinessesUseCase.execute()
        return businesses
    } catch (error) {
        console.error('Error fetching all businesses:', error)
        handleGetBusinessError(error, () => useGetAllBusinesses())
    }
}
