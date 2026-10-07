export type businessStatus = 'draft' | 'submitted' | 'in_review' | 'approved' | 'rejected' | 'registered'
export type businessType = 'sole_proprietorship' | 'partnership' | 'cc' | 'pty_ltd' | 'non_profit'
import type { Document } from "@/domain/document/document.types";

export interface BusinessRequest{
    id: string

    clientId: string

    // tracking
    requestNumber: string

    proposedNames: [
        string,
        string?,
        string?,
    ]

    email?: string
    phone?: string
    address?: string

    businessType: businessType

    documents: Document[]

    status: businessStatus

    reviewedBy?: string
    rejectedReason?: string

    createdAt: Date
    updatedAt: Date
}