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
  template: string
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
  body: string
  template: Array<unknown>
  recovery: Pick<RecoveryOption, 'runAfter'>
}
