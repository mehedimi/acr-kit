import axios from 'axios'

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

export const wpEndpoint = function (path: string) {
  return acrApp.apiUrl.replace(/\/wp-json\/.*$/, '/wp-json' + path)
}
