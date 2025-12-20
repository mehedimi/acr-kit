import { ref } from 'vue'
import { defineStore } from 'pinia'
import { wpEndpoint, wpHttp } from '@/lib/http.ts'
import type { EmailSettings, EmailSettingsPayload } from '@/types/settings.ts'

export const useSettingsStore = defineStore('settingsStore', {
  state: (): { email: EmailSettings } => ({
    email: {},
  }),

  actions: {
    fetchEmail() {
      const isLoaded = ref(true)

      wpHttp
        .get<EmailSettingsPayload>('/settings/email')
        .then(({ data }) => {
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
        .finally(() => {
          isLoaded.value = false
        })

      return { isLoaded }
    },

    saveEmail() {
      const isSaving = ref(false)

      const save = async () => {
        isSaving.value = true
        return wpHttp
          .put('/settings/email', {
            from_email: this.email.fromEmail,
            from_name: this.email.fromName,
            reply_to_email: this.email.replyToEmail,
            reply_to_name: this.email.replyToName,
            unsubscribe_page_id: this.email.unsubscribePageId,
          } satisfies EmailSettingsPayload)
          .finally(() => {
            isSaving.value = false
          })
      }

      return { isSaving, save }
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
