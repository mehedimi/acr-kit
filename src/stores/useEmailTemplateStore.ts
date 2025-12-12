import { defineStore } from 'pinia'
import type { EmailTemplate, EmailTemplateShow } from '@/types/email-template.ts'
import { appHttp } from '@/lib/http.ts'

export const useEmailTemplateStore = defineStore('emailTemplateStore', {
  state: (): { data: EmailTemplate[] } => ({
    data: [],
  }),
  actions: {
    lazyFetch() {
      if (this.data.length) {
        return
      }

      appHttp
        .get<{ data: EmailTemplate[] }>('/api/v1/email-templates')
        .then(({ data: { data } }) => {
          this.data = data
        })
    },

    async get(id: number) {
      const {
        data: { data },
      } = await appHttp.get<{ data: EmailTemplateShow }>('/api/v1/email-templates/' + id)

      return data
    },
  },
})
