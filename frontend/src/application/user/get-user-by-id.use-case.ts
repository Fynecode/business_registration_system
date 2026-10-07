import type { UserRepository } from '@/domain/user/user.repository'

export class GetUserByIdUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}
    async execute(id: string) {
        const user = await this.userRepository.getById(id)
        if (!user) {
            throw new Error('User not found')
        }

        return user
    }
}