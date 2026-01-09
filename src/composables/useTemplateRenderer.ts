import type { Template } from '@/types/builder.ts'
import { render as renderEmail } from '@vue-email/render'
import EmailPreview from '@/components/builder/EmailPreview.vue'

export function useTemplateRenderer() {
  const render = async (template: Template) => {
    return renderEmail(EmailPreview, {
      template,
    })
  }

  return { render }
}
