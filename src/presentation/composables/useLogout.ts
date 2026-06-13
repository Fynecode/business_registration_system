import { supabase } from '@/infrastructure/supabase/supabase';
import { useAuthStore } from '@/presentation/stores/auth.store';
import { useRouter } from 'vue-router';

export async function useLogout() {
    const authStore = useAuthStore();
    const router = useRouter();

    await supabase.auth.signOut();
    authStore.clearProfile();
    router.push('/login');
}