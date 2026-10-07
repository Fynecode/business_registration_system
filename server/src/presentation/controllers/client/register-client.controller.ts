import type { Request, Response } from 'express'

import { RegisterClientUseCase } from '@/application/registration/register-client.use-case'
import { setAuthenticationCookies } from '@/presentation/http/auth-cookies'

export class RegisterClientController {

    constructor(
        private readonly registerClient: RegisterClientUseCase
    ) {}

    async handle(req: Request, res: Response) {

        const {
            email,
            password,
            firstname,
            lastname,
            phone
        } = req.body

        const result = await this.registerClient.execute({
            email,
            password,
            firstname,
            lastname,
            phone
        })

        if (result.authUser.session) {
            setAuthenticationCookies(
                res,
                result.authUser.session
            )
        }

        return res.status(201).json({
            client: {
                ...result.client,
                role: result.role
            }
        })
    }
}