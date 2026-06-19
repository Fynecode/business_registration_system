import { createBusinessRequestUseCase } from "@/services/business-request.services";
import { uploadDocumentsUseCase } from "@/services/documents.services";
import type { CreateBusinessRequestInput } from "@/domain/businessRequest/business.request.repository";
import { handleCreateBusinessRequestError } from "@/presentation/mappers/errors/businessRequest/businessRequest";

export async function useCreateRequest(requestData: CreateBusinessRequestInput, documents: File[]) {
    try {
        const uploadedDocuments = await uploadDocumentsUseCase.execute(documents)

        if(!uploadedDocuments){
            throw new Error('Could not upload documents')
        }

        const requestPayload: CreateBusinessRequestInput = {
            ...requestData,
            documents: uploadedDocuments,
        }

        const request = await createBusinessRequestUseCase.execute(requestPayload)
        return request
    } catch (error) {
        console.error('Error creating request:', error)
        handleCreateBusinessRequestError(error, () => useCreateRequest(requestData, documents))
    }
}
