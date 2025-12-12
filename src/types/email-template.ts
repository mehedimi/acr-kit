import type { Template } from '@/types/builder.ts'

export interface EmailTemplate<B = undefined> {
  id: number
  name: string
  body: B
  description: string
  thumbnail: string
  createdAt: string
  updatedAt: string
}

export type EmailTemplateShow = EmailTemplate<Template>
