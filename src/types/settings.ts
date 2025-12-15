import type { SnakeCase } from '@/types/global'

export interface EmailSettings {
  unsubscribePageId?: number
  fromEmail?: string
  fromName?: string
  replyToEmail?: string
  replyToName?: string
}

export type EmailSettingsPayload = {
  [K in keyof EmailSettings as SnakeCase<K & string>]: EmailSettings[K]
}
