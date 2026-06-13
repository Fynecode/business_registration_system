import { defineStore } from "pinia";
import type { Profile } from "@/domain/profile/profile.types";

interface AuthState {
    profile: Profile | null;
    loaded: boolean;
}

export const useAuthStore = defineStore("auth", {
    state: (): AuthState => ({
        profile: null,
        loaded: false
    }),
    getters: {
        getProfile: (state) => state.profile,
        isAuthenticated: (state) => !!state.profile,
    },
    
    actions: {
        setProfile(profile: Profile) {
            this.profile = profile;
            this.loaded = true;
        },
        clearProfile() {
            this.profile = null;
            this.loaded = false;
        },
    },

    persist: true,
});