import { getRequestByIdUseCase } from "@/services/business-request.services";

export async function useGetRequestById(requestId: string | null) {
    try {
        if(!requestId){
            throw new Error('Request id not found')
        }
        const request = await getRequestByIdUseCase.execute(requestId)
        console.log('Fetched request by ID:', request)
        return request
    } catch (error) {
        console.error('Error fetching request by request ID:', error)
        throw error
    }
}