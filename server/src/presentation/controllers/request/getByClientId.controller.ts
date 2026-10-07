import type { Request, Response } from 'express'

import { GetRequestByClientIdUseCase } from '@/application/businessRequest/get-request-by-client-id.use-case'

export class GetRequestsByClientIdController {
    constructor(private readonly useCase: GetRequestByClientIdUseCase) {}

    async handle(req: Request, res: Response) {
        const { clientId } = req.params
        const requests = await this.useCase.execute(clientId)
        return res.status(200).json({requests: requests})
    }
}