import { wpHttp } from '@/lib/http.ts'

function pingCart() {
  const cookies = document.cookie.split('; ')
  if (!cookies.includes('woocommerce_items_in_cart=1')) {
    return
  }

  wpHttp.get('/ping')
}

export function startPing(seconds = 60) {
  setTimeout(pingCart, seconds * 1000)
}
