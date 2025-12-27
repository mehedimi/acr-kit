import axios, { type AxiosResponse } from 'axios'

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
  return acrApp.apiUrl.replace(/\/wp-json\/.*$/, '/wp-json' + path)
}
