import axios from 'axios'
import { router } from '@/admin-router.ts'

export const wpHttp = axios.create({
  baseURL: acrApp.apiUrl,
  headers: {
    'X-WP-Nonce': acrApp.nonce,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export const appHttp = axios.create({
  baseURL: acrApp.appUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${acrApp.appToken}`,
  },
})

appHttp.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      router.push({
        name: 'connect',
      })
    }
    return Promise.reject(error)
  },
)

export const wpEndpoint = function (path: string) {
  return acrApp.apiUrl.replace(/\/wp-json\/.*$/, '/wp-json' + path)
}
