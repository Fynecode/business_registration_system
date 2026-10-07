import type { UserRepository } from '@/domain/user/user.repository'

export class DeleteUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}
    async execute(id: string) {
        const user = await this.userRepository.delete(id)
        return user
    }
}