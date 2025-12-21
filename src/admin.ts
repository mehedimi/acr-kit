import { createApp } from 'vue'
import './admin.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from '@/admin-router.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#acr-admin-app')
