import { handleGetBusinessRequestsError } from "@/presentation/mappers/errors/businessRequest/businessRequest";
import { getRequestByClientIdUseCase } from "@/services/business-request.services";

export async function useGetRequestByClientId(clientId: string | null) {
    try {
        if(!clientId){
            throw new Error('Client id not found')
        }
        const requests = await getRequestByClientIdUseCase.execute(clientId)
        return requests
    } catch (error) {
        console.error('Error fetching requests by client ID:', error)
        handleGetBusinessRequestsError(error, () => useGetRequestByClientId(clientId))
    }
}