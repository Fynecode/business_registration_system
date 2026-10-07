import { SupabaseBusinessRepository } from "@/infrastructure/supabase/repositories/supabase-business.repository"
import { GetBusinessesUseCase } from "@/application/business/get-businesses.use-case"
import { GetBusinessByIdUseCase } from "@/application/business/get-business-by-id.use-case"
import { GetBusinessByClientIdUseCase } from "@/application/business/get-business-by-client-id.use-case"
import { GetBusinessByRegistrationNumberUseCase } from "@/application/business/get-business-by-registration-number.use-case"
import { ListByTypeUseCase } from "@/application/business/list-by-type.use-case"
import { CreateBusinessUseCase } from "@/application/business/create-business.use-case"
import { UpdateBusinessUseCase } from "@/application/business/update-business.use-case"
import { SubmitBusinessUseCase } from "@/application/business/submit-business.use-case"

const businessRepository = new SupabaseBusinessRepository()

export const getBusinessesUseCase = new GetBusinessesUseCase(businessRepository)

export const getBusinessByIdUseCase = new GetBusinessByIdUseCase(businessRepository)

export const getBusinessByClientIdUseCase = new GetBusinessByClientIdUseCase(businessRepository)

export const getBusinessByRegistrationNumberUseCase = new GetBusinessByRegistrationNumberUseCase(businessRepository)

export const listByTypeUseCase = new ListByTypeUseCase(businessRepository)

export const createBusinessUseCase = new CreateBusinessUseCase(businessRepository)

export const updateBusinessUseCase = new UpdateBusinessUseCase(businessRepository)

export const submitBusinessUseCase = new SubmitBusinessUseCase(businessRepository)
