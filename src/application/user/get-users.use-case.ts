import type { UserRepository } from '@/domain/user/user.repository'

export class GetUsersUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async execute() {
        const users = await this.userRepository.getAll()
        if (!users || users.length === 0) {
            throw new Error('No users found')
        }
        return users
    }
}