import { UpdateProfileUseCase } from '@/application/profile/update-profile.use-case'
import { SupabaseProfileRepository } from '@/infrastructure/supabase/repositories/supabase-profile.repository';
import { SignUpUseCase } from "@/application/profile/sign-up.use-case";
import { LoginUseCase } from "@/application/profile/login.use-case";
import { GetProfileByAuthIdUseCase } from '@/application/profile/get-profile-by-auth-id.use-case';
import { GetProfileByIdUseCase } from '@/application/profile/get-profile-by-id.use-case';
import { ChangePasswordUseCase } from '@/application/profile/change-password.use-case';
import { RequestPasswordResetUseCase } from '@/application/profile/request-password-reset.use-case';
import { ChangeEmailUseCase } from '@/application/profile/change-email.use-case';

const repository = new SupabaseProfileRepository()

export const updateProfileUseCase = new UpdateProfileUseCase(repository)

export const signUpProfileUseCase = new SignUpUseCase(repository)

export const loginProfileUseCase = new LoginUseCase(repository)

export const getProfileByAuthIdUseCase = new GetProfileByAuthIdUseCase(repository)

export const getProfileByIdUseCase = new GetProfileByIdUseCase(repository)

export const changePasswordUseCase = new ChangePasswordUseCase(repository)

export const requestPasswordResetUseCase = new RequestPasswordResetUseCase(repository)

export const changeEmailUseCase = new ChangeEmailUseCase(repository)