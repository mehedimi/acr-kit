import { defineStore } from 'pinia'
import type { EmailTemplate, EmailTemplateShow } from '@/types/email-template.ts'
import { appHttp } from '@/lib/http.ts'
import { random } from 'lodash'

export const useEmailTemplateStore = defineStore('emailTemplateStore', {
  state: (): { data: EmailTemplate[] } => ({
    data: [],
  }),
  actions: {
    async lazyFetch() {
      if (this.data.length) {
        return
      }

      return appHttp
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

    async getRandomTemplate(): Promise<EmailTemplateShow> {
      if (this.data.length === 0) {
        await this.lazyFetch()
      }

      return this.get(this.data[random(this.data.length - 1)]?.id as number)
    },
  },
})
