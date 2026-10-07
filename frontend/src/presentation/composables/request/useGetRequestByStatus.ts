import { getRequestByStatusUseCase } from "@/services/business-request.services"

export async function useGetRequestByStatus(status: 'draft' | 'submitted' | 'in_review' | 'approved' | 'rejected' | 'registered') {
    try {
        const requests = await getRequestByStatusUseCase.execute(status)
        return requests
    } catch (error) {
        console.error(`Error fetching requests with status ${status}:`, error)
        throw error
    }
}
