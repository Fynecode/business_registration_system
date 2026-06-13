import { supabase } from '@/infrastructure/supabase/supabase';
import { useAuthStore } from '@/presentation/stores/auth.store';
import { useErrorStore } from '@/presentation/stores/error.store';
import { getProfileByAuthIdUseCase } from '@/services/profile.services';

import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

export async function useAuthBootstrap() {
    const authStore = useAuthStore();
    const errorStore = useErrorStore();
    const router = useRouter();
    const getProfileByAuthId = getProfileByAuthIdUseCase;

    onMounted(async () => {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session) {
            errorStore.setNetworkError(error ?? new Error('Session unavailable'));
            authStore.clearProfile();
            router.push('/login');
            return;
        }

        try {
            const authId = session.user.id;
            const profile = await getProfileByAuthId.execute(authId);
            authStore.setProfile(profile);
        } catch (error) {
            errorStore.setError(error, 'unknown');
            authStore.clearProfile();
            router.push('/login');
        }
    });
}