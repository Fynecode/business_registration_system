import type { ProfileRepository } from "@/domain/profile/profile.repository";
import { ValidationError } from "@/shared/errors/errors";

export class ChangePasswordUseCase{
    constructor(private readonly repository: ProfileRepository){}

    async execute(password: string): Promise<void>{
        if(!password.trim()){
            throw new ValidationError('Password is required')
        }

        if(password.length < 6){
            throw new ValidationError('Password must be at least 6 characters')
        }

        await this.repository.changePassword(password)
    }
}