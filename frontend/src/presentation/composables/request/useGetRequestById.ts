import { handleGetBusinessRequestsError } from "@/presentation/mappers/errors/businessRequest/businessRequest";
import { getRequestByIdUseCase } from "@/services/business-request.services";

export async function useGetRequestById(id: string | null) {
    try {
        if(!requestId){
            throw new Error('Request id not found')
        }

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/requests/${id}`,
            {
                method: 'GET',
                credentials: 'include',
            }
        )

        if (!response.ok) {
            throw new Error('Failed to create business request')
        }

        const data = await response.json()
        const request = data.request
        return request
    } catch (error) {
        console.error('Error fetching request by request ID:', error)
        handleGetBusinessRequestsError(error, () => useGetRequestById(requestId))
    }
}