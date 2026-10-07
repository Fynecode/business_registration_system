import { handleGetBusinessRequestsError } from "@/presentation/mappers/errors/businessRequest/businessRequest";
import { getBusinessRequestDetailsUseCase } from "@/services/business-request.services";

export async function useGetRequestDetails(requestId: string | null) {
    try {
        if(!requestId){
            throw new Error('Request id not found')
        }

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/requests/${requestId}`,
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
        handleGetBusinessRequestsError(error, () => useGetRequestDetails(requestId))
    }
}