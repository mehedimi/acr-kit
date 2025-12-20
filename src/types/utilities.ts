import type { TabTriggerModeType } from '@/enum/tab-trigger-mode.ts'
import type { TabFaviconType } from '@/enum/tab-favicon.ts'

export interface Utilities<C> {
  enabled: boolean
  config: C
}

export type TabUtilities = Utilities<
  Partial<{
    triggerMode: TabTriggerModeType
    delay: number
    message: string
    favicon: TabFaviconType
    emoji: string
  }>
>
