import type { UserRepository, createUserInput } from '@/domain/user/user.repository'

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}
    async execute(data: createUserInput) {
        const existing = await this.userRepository.getByEmail(data.email)
        if (existing) {
            throw new Error('User with this email already exists')
        }

        const user = await this.userRepository.create(data)
        
        return user
    }
}