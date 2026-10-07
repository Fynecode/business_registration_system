import type { Request, Response } from 'express';
import { LoginClientUseCase } from '@/application/registration/login-client.use-case';
import { setAuthenticationCookies } from '@/presentation/http/auth-cookies';

export class LoginClientController {

    constructor(
        private readonly loginClient: LoginClientUseCase
    ) {}

    async handle(req: Request, res: Response) {
        const { email, password } = req.body;
        const result = await this.loginClient.execute(email, password);
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