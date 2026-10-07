import { handleGetBusinessRequestsError } from "@/presentation/mappers/errors/businessRequest/businessRequest";

export async function useGetRequestByClientId(clientId: string | null) {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/requests/client/${clientId}`,
            {
                method: 'GET',
                credentials: 'include',
            }
        )

        if (!response.ok) {
            throw new Error('Failed to create business request')
        }

        const data = await response.json()
        const requests = data.requests

        return requests
    } catch (error) {
        console.error('Error fetching requests by client ID:', error)
        handleGetBusinessRequestsError(error, () => useGetRequestByClientId(clientId))
    }
}