import type { Request, Response } from "express";

import { UpdateClientUseCase } from "@/application/client/update-client.use-case";

export class UpdateClientController{
    constructor(
        private readonly updateClientUseCase : UpdateClientUseCase
    ){}

    async handle(req: Request, res: Response){
        const { id } = req.params
        const { firstname, lastname, phone } = req.body

        const updatedClient = await this.updateClientUseCase.execute(id, {
            firstname,
            lastname,
            phone
        })
        
        return res.status(200).json({
            client: updatedClient
        })
    }
}