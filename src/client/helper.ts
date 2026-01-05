export function hasAnyItemsInCart() {
  const cookies = document.cookie.split('; ')
  return cookies.includes('woocommerce_items_in_cart=1')
}

export function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }

  return outputArray.buffer
}

export function arrayBufferToBase64(buffer: ArrayBuffer | null | undefined): string | null {
  if (!buffer) return null

  const bytes = new Uint8Array(buffer)

  const text = bytes.reduce((str, byte) => str + String.fromCharCode(byte), '')

  return btoa(text)
}
