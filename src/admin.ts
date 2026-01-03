import { createApp } from 'vue'
import './admin.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from '@/admin-router.ts'
import { appErrorInterceptor, wpErrorInterceptor } from '@/lib/http.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#acr-kit-admin-app')

appErrorInterceptor((response) => {
  if (response.status !== 401) {
    return
  }

  router.push({
    name: 'connect',
  })
})

wpErrorInterceptor((response) => {
  if (new Set([401, 403]).has(response.status)) {
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }
})
