import type { ProfileRepository } from "@/domain/profile/profile.repository";
import { ValidationError } from "@/shared/errors/errors";


export class RequestPasswordResetUseCase{
    constructor(private readonly repository: ProfileRepository){}

    async execute(email: string){
        if(!email.trim()){
            throw new ValidationError('Email is required')
        }

        await this.repository.requestPasswordReset(email)
    }
}