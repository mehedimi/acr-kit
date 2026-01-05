import type { PushMessage } from '@/types/utilities.ts'

declare const self: ServiceWorkerGlobalScope

self.addEventListener('push', (event: PushEvent) => {
  if (!event.data) return

  const payload = event.data.json() as PushMessage

  if (Notification.permission !== 'granted') {
    console.warn("Notification permission isn't granted, can't show notification")
    return
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      icon: payload.icon,
      body: payload.body,
      data: { actionUrl: payload.actionUrl },
    }),
  )
})

self.addEventListener('notificationclick', (event: NotificationEvent) => {
  event.notification.close()

  const data = event.notification.data as Pick<PushMessage, 'actionUrl'>

  if (!data.actionUrl) {
    return
  }

  event.waitUntil(self.clients.openWindow(data.actionUrl))
})
