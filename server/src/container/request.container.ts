import { SupabaseBusinessRequestRepository } from "@/infrastructure/supabase/repositories/supabase-business-request.repository";
import { UploadDocumentUseCase } from "@/application/document/upload-document.use-case";
import { CloudinaryDocumentRepository } from "@/infrastructure/cloudinary/cloudinary.repository";

import { CreateBusinessRequestUseCase } from "@/application/businessRequest/create-request.use-case";
import { CreateBusinessRequestController } from "@/presentation/controllers/request/create.controller";

import { GetRequestByClientIdUseCase } from "@/application/businessRequest/get-request-by-client-id.use-case";
import { GetRequestsByClientIdController } from "@/presentation/controllers/request/getByClientId.controller";

import { GetByIdController } from "@/presentation/controllers/request/getById.controller";
import { GetRequestByIdUseCase } from '@/application/businessRequest/get-request-by-id.use-case'

const businessRequestRepository = new SupabaseBusinessRequestRepository()
const documentRepository = new CloudinaryDocumentRepository()

const uploadDocumentUseCase = new UploadDocumentUseCase(documentRepository)
const createBusinessRequestUseCase = new CreateBusinessRequestUseCase(businessRequestRepository)
const getRequestByClientIdUseCase = new GetRequestByClientIdUseCase(businessRequestRepository)
const getRequestByIdUseCase = new GetRequestByIdUseCase(businessRequestRepository)

export const getRequestsByClientIdController = new GetRequestsByClientIdController(getRequestByClientIdUseCase)
export const createBusinessRequestController = new CreateBusinessRequestController(createBusinessRequestUseCase, uploadDocumentUseCase)
export const getByIdController = new GetByIdController(getRequestByIdUseCase)