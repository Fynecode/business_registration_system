import { handleCreateBusinessRequestError } from '@/presentation/mappers/errors/businessRequest/businessRequest'
import type { BusinessRequest } from '@/domain/businessRequest/business.request.types'

export type businessStatus = 'draft' | 'submitted' | 'in_review' | 'approved' | 'rejected' | 'registered'
export type businessType = 'sole_proprietorship' | 'partnership' | 'cc' | 'pty_ltd' | 'non_profit'

export interface CreateBusinessRequestInput{

    clientId: string

    // tracking
    requestNumber: string

    proposedNames: [
        string,
        string?,
        string?,
    ]

    email: string
    phone: string
    address: string

    businessType: businessType

    status: businessStatus
}

export async function useCreateRequest(
    requestData: CreateBusinessRequestInput,
    documents: File[]
): Promise<BusinessRequest> {

    try {

        const formData = new FormData()

        formData.append(
            'clientId',
            requestData.clientId
        )

        formData.append(
            'requestNumber',
            requestData.requestNumber
        )

        formData.append(
            'status',
            requestData.status
        )

        formData.append(
            'proposedNames',
            JSON.stringify(requestData.proposedNames)
        )

        formData.append(
            'businessType',
            requestData.businessType
        )

        formData.append(
            'address',
            requestData.address
        )

        formData.append(
            'email',
            requestData.email
        )

        formData.append(
            'phone',
            requestData.phone
        )

        for (const document of documents) {
            formData.append(
                'documents',
                document
            )
        }

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/requests/`,
            {
                method: 'POST',
                credentials: 'include',
                body: formData,
            }
        )

        if (!response.ok) {
            throw new Error('Failed to create business request')
        }

        const result = await response.json()

        return result.businessRequest

    } catch (error) {

        console.error(
            'Error creating request:',
            error
        )

        handleCreateBusinessRequestError(
            error,
            () => useCreateRequest(
                requestData,
                documents
            )
        )

        return Promise.reject(error)
    }
}