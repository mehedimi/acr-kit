import { startPing } from '@/client/ping.ts'
import { bootTabNotification } from '@/client/tab.ts'

startPing(60)

if (acrKitApp.utilities?.tab) {
  bootTabNotification(acrKitApp.utilities?.tab)
}
