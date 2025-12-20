import { startPing } from '@/client/ping.ts'
import { bootTabNotification } from '@/client/tab.ts'

startPing(60)

if (acrApp.utilities?.tab) {
  bootTabNotification(acrApp.utilities?.tab)
}
