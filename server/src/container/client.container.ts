import { SupabaseAuthRepository } from '@/infrastructure/supabase/repositories/supabase-auth.repository'
import { SupabaseClientRepository } from '@/infrastructure/supabase/repositories/supabase-client.repository'
import { SupabaseProfileRepository } from '@/infrastructure/supabase/repositories/supabase-profile.repository'
import { SignUpUseCase } from '@/application/auth/signup.use-case'
import { LoginUseCase } from '@/application/auth/login.use-case'
import { CreateClientWithProfileUseCase } from '@/application/client/create-client-with-profile.use-case'
import { GetProfileByAuthIdUseCase } from '@/application/profile/get-profile-by-auth-id.use-case'
import { GetClientByProfileIdUseCase } from '@/application/client/get-client-by-profile-id.use-case'
import { RegisterClientUseCase } from '@/application/registration/register-client.use-case'
import { RegisterClientController } from '@/presentation/controllers/client/register-client.controller'
import { LoginClientUseCase } from '@/application/registration/login-client.use-case'
import { LoginClientController } from '@/presentation/controllers/client/login-client.controller'
import { GetCurrentUserUseCase } from '@/application/auth/get-current-user.use-case'
import { GetCurrentUserController } from '@/presentation/controllers/client/get-current-user.controller'
import { UpdateClientController } from '@/presentation/controllers/client/update-client.controller'
import { DeleteClientUseCase } from '@/application/client/delete-client.use-case'
import { DeleteClientController } from '@/presentation/controllers/client/delete-client.controller'

import { UpdateClientUseCase } from '@/application/client/update-client.use-case'

const authRepository = new SupabaseAuthRepository()
const clientRepository = new SupabaseClientRepository()
const profileRepository = new SupabaseProfileRepository()

const signUpUseCase = new SignUpUseCase(authRepository)

const loginUseCase = new LoginUseCase(authRepository)

const getProfileUseCase = new GetProfileByAuthIdUseCase(profileRepository)

const getClientByProfileIdUseCase = new GetClientByProfileIdUseCase(clientRepository)

const getCurrentUserUseCase = new GetCurrentUserUseCase(profileRepository, clientRepository)

const updateClientUseCase = new UpdateClientUseCase(clientRepository)

const deleteClientUseCase = new DeleteClientUseCase(clientRepository)

export const getCurrentUserController =
    new GetCurrentUserController(getCurrentUserUseCase)

export const updateClientController =
    new UpdateClientController(updateClientUseCase)

const createClientUseCase =
    new CreateClientWithProfileUseCase(clientRepository)

const registerClientUseCase =
    new RegisterClientUseCase(
        signUpUseCase,
        createClientUseCase
    )

const loginClientUseCase =
    new LoginClientUseCase(
        loginUseCase,
        getProfileUseCase,
        getClientByProfileIdUseCase
    )

export const loginClientController =
    new LoginClientController(loginClientUseCase)

export const registerClientController =
    new RegisterClientController(registerClientUseCase)

export const deleteClientController = 
    new DeleteClientController(deleteClientUseCase)