import type { Request, Response } from 'express'

import { GetCurrentUserUseCase } from '@/application/auth/get-current-user.use-case'

export class GetCurrentUserController {

    constructor(
        private readonly getCurrentUser: GetCurrentUserUseCase
    ) {}

    async handle(req: Request, res: Response) {

        if (!req.user) {
            return res.status(401).json({
                message: 'Authentication required'
            })
        }

        const user = await this.getCurrentUser.execute(req.user)

        return res.status(200).json({
            user
        })
    }
}