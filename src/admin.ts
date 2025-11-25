import { createApp } from 'vue'
import './admin.css'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from '@/routes.ts'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())
app.use(
  createRouter({
    history: createWebHashHistory(),
    routes,
    linkExactActiveClass: 'acr:!border-b-primary acr:!text-primary',
  }),
)
app.mount('#acr-admin-app')
