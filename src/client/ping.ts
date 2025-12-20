import { wpHttp } from '@/lib/http.ts'
import { hasAnyItemsInCart } from '@/client/helper.ts'

function pingCart() {
  if (!hasAnyItemsInCart()) {
    return
  }

  wpHttp.get('/ping')
}

export function startPing(seconds = 60) {
  setTimeout(pingCart, seconds * 1000)
}
