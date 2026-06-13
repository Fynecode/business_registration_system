import './assets/main.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useAuthBootstrap } from '@/presentation/composables/supabase/useAuthBootstrap';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './presentation/router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)

await useAuthBootstrap();

app.use(router)

app.mount('#app')
