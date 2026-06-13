import { UpdateProfileUseCase } from '@/application/profile/update-profile.use-case'
import { SupabaseProfileRepository } from '@/infrastructure/supabase/repositories/supabase-profile.repository';
import { SignUpUseCase } from "@/application/profile/sign-up.use-case";
import { LoginUseCase } from "@/application/profile/login.use-case";
import { GetProfileByAuthIdUseCase } from '@/application/profile/get-profile-by-auth-id.use-case';

const repository = new SupabaseProfileRepository()

export const updateProfileUseCase = new UpdateProfileUseCase(repository)

export const signUpProfileUseCase = new SignUpUseCase(repository)

export const loginProfileUseCase = new LoginUseCase(repository)

export const getProfileByAuthIdUseCase = new GetProfileByAuthIdUseCase(repository)