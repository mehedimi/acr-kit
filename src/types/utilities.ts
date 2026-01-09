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

export type PushUtilities = Utilities<Partial<{ publicKey: string }>>

export interface PushMessage {
  title: string
  body: string
  icon?: string
  actionUrl?: string
}

export type UtilityList = Array<Utilities<undefined> & { name: string }>
