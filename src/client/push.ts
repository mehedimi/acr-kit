import type { PushUtilities } from '@/types/utilities.ts'

export function bootPushNotification(config: PushUtilities['config']) {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    return
  }

  registerServiceWorker()
  // @ts-ignore
  jQuery(document.body).on('added_to_cart', () => tryToSendPushInfo(config))
}

function registerServiceWorker() {
  navigator.serviceWorker.register(acrApp.assetUrl + 'sw.js').then(() => {
    //
  })
}

function tryToSendPushInfo(config: PushUtilities['config']) {
  if (!config.publicKey) {
    return
  }

  if (Notification.permission === 'denied') {
    return
  }

  if (Notification.permission === 'default' || !sessionStorage.getItem('acr_push-request-ask')) {
    askForPushPermission(config).then(() => {
      //
    })
    return
  }

  if (Notification.permission === 'granted') {
    bindCartWithPush()
  }
}

async function askForPushPermission(config: PushUtilities['config']) {
  sessionStorage.setItem('acr_push-request-ask', '1')

  const permission = await Notification.requestPermission()

  if (permission !== 'granted') {
    return
  }

  const registration = await navigator.serviceWorker.ready

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(config.publicKey as string),
  });
}

function bindCartWithPush() {}

function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }

  return outputArray.buffer
}
