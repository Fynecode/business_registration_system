import type { Request, Response } from "express";

import { DeleteClientUseCase } from "@/application/client/delete-client.use-case";

export class DeleteClientController{
    constructor(
        private readonly deleteClientUseCase : DeleteClientUseCase
    ){}

    async handle(req: Request, res:Response){
        const authId = req.user!.id

        await this.deleteClientUseCase.execute(authId)

        return res.status(200).json({
            message: "Client deleted successfully"
        })
    }
}