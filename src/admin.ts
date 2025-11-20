import { createApp } from 'vue'
import './admin.css'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from '@/routes.ts'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
const app = createApp(App)
app.use(router)
app.mount('#acr-admin-app')
