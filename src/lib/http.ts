import axios from 'axios'

export const wpHttp = axios.create({
  baseURL: acrApp.apiUrl,
  headers: {
    'X-WP-Nonce': acrApp.nonce,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
