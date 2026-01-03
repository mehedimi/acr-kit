import axios, { type AxiosResponse } from 'axios'

export const wpHttp = axios.create({
  baseURL: acrKitApp.apiUrl,
  headers: {
    'X-WP-Nonce': acrKitApp.nonce,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export const appHttp = axios.create({
  baseURL: acrKitApp.appUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${acrKitApp.appToken}`,
  },
})

export function appErrorInterceptor(callback: (error: AxiosResponse) => void) {
  appHttp.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        callback(error.response)
      }
      return Promise.reject(error)
    },
  )
}

export function wpErrorInterceptor(callback: (error: AxiosResponse) => void) {
  wpHttp.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        callback(error.response)
      }
      return Promise.reject(error)
    },
  )
}

export const wpEndpoint = function (path: string) {
  return acrKitApp.apiUrl.replace(/\/wp-json\/.*$/, '/wp-json' + path)
}
