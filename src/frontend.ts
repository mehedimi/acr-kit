import { startPing } from '@/client/ping.ts'
import { bootTabNotification } from '@/client/tab.ts'
import { bootPushNotification } from '@/client/push.ts'

startPing(60)

if (acrApp.utilities?.tab) {
  bootTabNotification(acrApp.utilities?.tab)
}

if (acrApp.utilities?.push) {
  bootPushNotification(acrApp.utilities?.push)
}
