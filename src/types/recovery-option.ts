import type { Template } from '@/types/builder.ts'

export interface RecoveryOption {
  id: string
  enabled: boolean
  runAfter: number
  createdAt: string
  updatedAt: string
}

export interface EmailRecovery<R = undefined> {
  id: string
  title: string
  subject: string
  body: string
  template: Template
  queued: number
  sent: number
  failed: number
  opened: number
  clicked: number
  unsubscribed: number
  recovered: number
  recovery: R
  createdAt: string
  updatedAt: string
}

export interface EmailRecoveryCreatePayload {
  title: string
  subject: string
  body?: string
  template?: Template
  recovery: Pick<RecoveryOption, 'runAfter'>
}

export interface EmailRecoveryTemplateUpdatePayload {
  body: string
  template: Template
}
