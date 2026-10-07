import type { updateUserInput, UserRepository } from '@/domain/user/user.repository'

export class UpdateUserUseCase {
    constructor(private userRepository: UserRepository) {}
    async execute(id: string, data: updateUserInput) {
        
        const user = await this.userRepository.update(id, data)
        return user
    }
}