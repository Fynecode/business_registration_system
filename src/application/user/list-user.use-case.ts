import type { UserRepository } from '@/domain/user/user.repository'

export class ListUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}
    async execute() {
        const users = await this.userRepository.getAll()
        return users
    }
}