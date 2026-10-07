import { handleGetBusinessRequestsError } from "@/presentation/mappers/errors/businessRequest/businessRequest";
import { getRequestsUseCase } from "@/services/business-request.services";

export async function useGetAllRequests() {
    try {
        const requests = await getRequestsUseCase.execute()
        return requests
    } catch (error) {
        console.error('Error fetching all requests:', error)
        handleGetBusinessRequestsError(error, () => useGetAllRequests())
    }
}
