import { SignUpUseCase } from "@/application/auth/signup.use-case";
import { CreateClientWithProfileUseCase } from "@/application/client/create-client-with-profile.use-case";
import { Role } from "@/domain/profile/profile";

export interface SignupInput {
    email: string;
    password: string;

    firstname: string;
    lastname: string;
    phone: string;
}

export class RegisterClientUseCase {

    constructor(
        private readonly signUp: SignUpUseCase,
        private readonly createClient: CreateClientWithProfileUseCase,
    ) {}

    async execute(input: SignupInput) {

        try {

            const authUser = await this.signUp.execute(
                input.email,
                input.password
            )

            const clientInput = {
                client: {
                    email: input.email,
                    firstname: input.firstname,
                    lastname: input.lastname,
                    phone: input.phone
                },
                profile: {
                    authId: authUser.id,
                    role: 'client' as Role,
                }
            }

            const client = await this.createClient.execute(clientInput)

            return {
                client,
                authUser,
                role: clientInput.profile.role
            }

        } catch (error) {
            throw error
        }
    }
}