import { defineStore } from 'pinia'
import type { EmailSettings, EmailSettingsPayload } from '@/types/settings.ts'
import { wpEndpoint, wpHttp } from '@/lib/http.ts'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settingsStore', {
  state: (): { email: EmailSettings } => ({
    email: {},
  }),

  actions: {
    async fetchEmail() {
      wpHttp.get<EmailSettingsPayload>('/settings/email').then(({ data }) => {
        this.email = {
          unsubscribePageId: data.unsubscribe_page_id
            ? Number(data.unsubscribe_page_id)
            : undefined,
          replyToEmail: data.reply_to_email,
          replyToName: data.reply_to_name,
          fromName: data.from_name,
          fromEmail: data.from_email,
        }
      })
    },

    getPages() {
      type Page = { id: number; title: { rendered: string } }
      const pages = ref<Array<Page>>([])

      wpHttp
        .get<Array<Page>>(wpEndpoint('/wp/v2/pages?per_page=100&_fields=id,title'))
        .then(({ data }) => {
          pages.value = data
        })

      return pages
    },
  },
})
