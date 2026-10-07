import type { ProfileRepository } from "@/domain/profile/profile.repository";
import { NotFoundError, ValidationError } from "@/shared/errors/errors";

export class ChangeEmailUseCase{
    constructor(private readonly repository: ProfileRepository){}

    async execute(email: string){
        if(!email.trim()){
            throw new ValidationError('Email is required')
        }

        const profile = await this.repository.getByEmail(email)

        if(!profile){
            throw new NotFoundError('User')
        }

        return await this.repository.changeEmail(email)
    }
}