import type { BusinessRequest } from './business.request.types'
import type { Profile } from '../profile/profile.types'

export interface RegistrationRequestDetails {
    request: BusinessRequest | null;
    client: Profile | null;
    reviewer: Profile | null;
}