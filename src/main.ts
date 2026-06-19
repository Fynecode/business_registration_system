import './presentation/assets/main.css'
import "vue-toastification/dist/index.css"
import "./presentation/assets/toast.css"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './presentation/router'
import Toast, {type PluginOptions } from 'vue-toastification'

const options: PluginOptions = {
    position: 'top-right',
    timeout: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    hideProgressBar: false
}

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)

app.use(router)

app.use(Toast, options)

app.mount('#app')
