import type { TabUtilities } from '@/types/utilities.ts'
import { hasAnyItemsInCart } from '@/client/helper.ts'
import { TabTriggerMode } from '@/enum/tab-trigger-mode.ts'

let originalTitle: string
let timer: number

export function bootTabNotification(params: TabUtilities['config']) {
  document.addEventListener('visibilitychange', () => {
    if (
      (params.triggerMode || TabTriggerMode.CART_ITEM) === TabTriggerMode.CART_ITEM &&
      !hasAnyItemsInCart()
    ) {
      return
    }

    if (document.hidden) {
      timer = setTimeout(() => onHiddenTab(params), (params.delay || 5) * 1000)
    } else {
      onShownTab()
    }
  })

  originalTitle = document.title
}

function onHiddenTab(params: TabUtilities['config']) {
  if (!document.hidden) {
    return
  }

  document.title = params.message as string

  setTimeout(() => {
    document.title = originalTitle
    setTimeout(() => onHiddenTab(params), 1000)
  }, 1000)
}

function onShownTab() {
  document.title = originalTitle
  clearTimeout(timer)
}
