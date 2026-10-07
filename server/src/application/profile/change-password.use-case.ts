import type { ProfileRepository } from "@/domain/profile/profile.repository";

export class ChangePasswordUseCase{
    constructor(private readonly repository: ProfileRepository){}

    async execute(password: string): Promise<void>{
        if(!password.trim()){
            throw new Error('Password is required')
        }

        if(password.length < 6){
            throw new Error('Password must be at least 6 characters')
        }

        await this.repository.changePassword(password)
    }
}