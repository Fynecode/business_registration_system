export interface Business{
    id: string

    name: string
    
    registrationNumber: string
    
    email?: string
    phone?: string
    address?: string

    businessType: string

    requestId: string

    createdAt: Date
    updatedAt: Date
}