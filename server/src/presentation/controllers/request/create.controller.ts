import type { Request, Response } from 'express'

import { CreateBusinessRequestUseCase } from '@/application/businessRequest/create-request.use-case'
import { UploadDocumentUseCase } from '@/application/document/upload-document.use-case'

export class CreateBusinessRequestController {

    constructor(
        private readonly useCase: CreateBusinessRequestUseCase,
        private readonly uploadDocumentUseCase: UploadDocumentUseCase
    ) {}

    async handle(req: Request, res: Response) {

        console.log(req)

        const {
            clientId,
            requestNumber,
            status,
            proposedNames,
            address,
            email,
            businessType,
            phone
        } = req.body

        const parsedProposedNames = JSON.parse(proposedNames)

        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({
                message: 'PDF document is required'
            })
        }

    const file = req.files[0]

    const uploadedDocument =
        await this.uploadDocumentUseCase.execute({
            buffer: file.buffer,
            fileName: file.originalname,
            fileSize: file.size,
            mimeType: file.mimetype
        })

        const result = await this.useCase.execute({
            clientId,
            requestNumber,
            proposedNames: parsedProposedNames,
            email,
            phone,
            address,
            businessType,
            status,
            documents: [uploadedDocument]
        })

        return res.status(201).json({
            businessRequest: result
        })
    }
}