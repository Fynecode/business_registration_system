import { SupabaseBusinessRequestRepository } from "@/infrastructure/supabase/repositories/supabase-business-request.repository";
import { CreateBusinessRequestUseCase } from "@/application/businessRequest/create-request.use-case";
import { GetRequestByIdUseCase } from "@/application/businessRequest/get-request-by-id.use-case";
import { GetRequestByClientIdUseCase } from "@/application/businessRequest/get-request-by-client-id.use-case";
import { GetRequestByStatusUseCase } from "@/application/businessRequest/get-request-by-status.use-case";
import { GetRequestByRequestNumberUseCase } from "@/application/businessRequest/get-request-by-request-number.use-case";
import { GetRequestByBusinessTypeUseCase } from "@/application/businessRequest/get-request-by-business-type.use-case";
import { GetRequests } from "@/application/businessRequest/get-requests.use-case";
import { UpdateRequestStatusUseCase } from "@/application/businessRequest/update-request-status.use-case";
import { DeleteRequestUseCase } from "@/application/businessRequest/delete-request.use-case";
import { ApproveRequestUseCase } from "@/application/businessRequest/approve-request.use-case";
import { RejectRequestUseCase } from "@/application/businessRequest/reject-request.use-case";
import { AssignRequestReviewerUseCase } from "@/application/businessRequest/assign-request-reviewer.use-case";
import { SubmitRequestUseCase } from "@/application/businessRequest/submit-request.use-case";
import { UpdateRequestUseCase } from "@/application/businessRequest/update-request.use-case";

const businessRequestRepository = new SupabaseBusinessRequestRepository()

export const createBusinessRequestUseCase = new CreateBusinessRequestUseCase(businessRequestRepository)

export const getRequestByIdUseCase = new GetRequestByIdUseCase(businessRequestRepository)

export const getRequestByClientIdUseCase = new GetRequestByClientIdUseCase(businessRequestRepository)

export const getRequestByStatusUseCase = new GetRequestByStatusUseCase(businessRequestRepository)

export const getRequestByRequestNumberUseCase = new GetRequestByRequestNumberUseCase(businessRequestRepository)

export const getRequestByBusinessTypeUseCase = new GetRequestByBusinessTypeUseCase(businessRequestRepository)

export const getRequestsUseCase = new GetRequests(businessRequestRepository)

export const updateRequestStatusUseCase = new UpdateRequestStatusUseCase(businessRequestRepository)

export const deleteRequestUseCase = new DeleteRequestUseCase(businessRequestRepository)

export const approveRequestUseCase = new ApproveRequestUseCase(businessRequestRepository)

export const rejectRequestUseCase = new RejectRequestUseCase(businessRequestRepository)

export const assignRequestReviewerUseCase = new AssignRequestReviewerUseCase(businessRequestRepository)

export const submitRequestUseCase = new SubmitRequestUseCase(businessRequestRepository)

export const updateRequestUseCase = new UpdateRequestUseCase(businessRequestRepository)