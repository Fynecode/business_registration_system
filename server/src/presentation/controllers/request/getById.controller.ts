import type { Request, Response } from "express";

import { GetRequestByIdUseCase } from '@/application/businessRequest/get-request-by-id.use-case'

export class GetByIdController{
    constructor(
        private readonly getByIdUseCase: GetRequestByIdUseCase
    ){}

    async handle(req: Request, res: Response){
        const {id} = req.params

        const result = await this.getByIdUseCase.execute(id)

        res.status(200).json({request: result})
    }
}