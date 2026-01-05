import type { PushUtilities } from '@/types/utilities.ts'
import { wpHttp } from '@/lib/http.ts'
import { arrayBufferToBase64, urlBase64ToUint8Array } from '@/client/helper.ts'

let serviceWorkerRegistration: ServiceWorkerRegistration | null = null

const PUSH_ASK_KEY = 'acr_kit_push-request-ask' as const
const BIND_PUSH_KEY = 'acr_kit_push-bind' as const

export function bootPushNotification(config: PushUtilities['config']) {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    return
  }
  // @ts-ignore
  jQuery(document.body).on('added_to_cart', () => tryToSendPushInfo(config))
}

async function getServiceWorkerRegistration() {
  if (serviceWorkerRegistration) {
    return serviceWorkerRegistration
  }

  serviceWorkerRegistration = await navigator.serviceWorker.register(acrKitApp.assetUrl + 'sw.js')

  return serviceWorkerRegistration
}

function tryToSendPushInfo(config: PushUtilities['config']) {
  if (!config.publicKey) {
    return
  }

  if (Notification.permission === 'denied') {
    return
  }

  if (Notification.permission === 'default' || !sessionStorage.getItem(PUSH_ASK_KEY)) {
    askForPushPermission(config).then(() => {
      //
    })
    return
  }

  if (Notification.permission === 'granted') {
    bindCartWithPush(config).then(() => {
      //
    })
  }
}

async function askForPushPermission(config: PushUtilities['config']) {
  sessionStorage.setItem(PUSH_ASK_KEY, '1')

  const permission = await Notification.requestPermission()

  if (permission !== 'granted') {
    return
  }

  return bindCartWithPush(config)
}

async function bindCartWithPush(config: PushUtilities['config']) {
  if (sessionStorage.getItem(BIND_PUSH_KEY)) {
    return
  }

  const registration = await getServiceWorkerRegistration()

  let subscription = await registration.pushManager.getSubscription()

  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(config.publicKey as string),
    })
  }

  await wpHttp.put('/push/subscriptions', {
    endpoint: subscription.endpoint,
    public_key: arrayBufferToBase64(subscription.getKey('p256dh')) as string,
    auth_token: arrayBufferToBase64(subscription.getKey('auth')) as string,
  } satisfies {
    endpoint: string
    public_key: string
    auth_token: string
  })

  sessionStorage.setItem(BIND_PUSH_KEY, '1')
}
