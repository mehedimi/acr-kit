import { defineStore } from 'pinia'
import type {
  EmailRecovery,
  EmailRecoveryCreatePayload,
  EmailRecoveryTemplateUpdatePayload,
  RecoveryOption,
} from '@/types/recovery-option.ts'
import { appHttp, wpHttp } from '@/lib/http.ts'
import { ref } from 'vue'
import { abandonedSchedule, ordinalWords } from '@/stores/recovery-utils.ts'

const BASE_ENDPOINT = '/api/v1/recovery/emails' as const

export const useEmailStore = defineStore('email', {
  state: (): {
    data: EmailRecovery<RecoveryOption>[]
    isLoading: boolean
  } => ({
    isLoading: false,
    data: [],
  }),
  actions: {
    fetch(afterLoaded?: () => void) {
      const isLoaded = ref(false)

      appHttp
        .get<{ data: EmailRecovery<RecoveryOption>[] }>(BASE_ENDPOINT)
        .then(({ data: { data } }) => {
          this.data = data
          if (afterLoaded) {
            afterLoaded()
          }
        })
        .finally(() => {
          isLoaded.value = true
        })

      return { isLoaded }
    },
    create() {
      const isCreating = ref(false)
      const create = async () => {
        isCreating.value = true
        return appHttp
          .post<{ data: EmailRecovery<RecoveryOption> }>(BASE_ENDPOINT, {
            title: (ordinalWords[this.data.length] || 'Untitled') + ' email',
            recovery: {
              runAfter: (abandonedSchedule[this.data.length] ||
                abandonedSchedule[abandonedSchedule.length - 1]) as number,
            },
            body: 'Hello',
            subject: 'Cart recovery',
          } satisfies EmailRecoveryCreatePayload)
          .then(({ data: { data } }) => {
            this.data.push(data)
          })
          .finally(() => {
            isCreating.value = false
          })
      }

      return { isCreating, create }
    },

    async find(id: string) {
      const {
        data: { data },
      } = await appHttp.get<{ data: EmailRecovery<RecoveryOption> }>(`${BASE_ENDPOINT}/${id}`)

      this.data = [data]
    },

    async delete(id: string) {
      await appHttp.delete(`${BASE_ENDPOINT}/${id}`)
      const index = this.data.findIndex((email) => email.id === id)

      if (index !== -1) {
        this.data.splice(index, 1)
      }
    },

    async updateTemplate(data: EmailRecoveryTemplateUpdatePayload) {
      if (!this.firstEmail) {
        return
      }

      return wpHttp.patch(`emails/${this.firstEmail.id}`, data)
    },

    updateEmail(data: EmailRecovery<RecoveryOption>) {
      return appHttp.patch<{ data: EmailRecovery<RecoveryOption> }>(`${BASE_ENDPOINT}/${data.id}`, {
        title: data.title,
        recovery: data.recovery,
        subject: data.subject,
      } satisfies EmailRecoveryCreatePayload)
    },
  },
  getters: {
    firstEmail(store) {
      return store.data[0]
    },

    lastEmail(store) {
      if (store.data.length === 0) {
        return undefined
      }
      return store.data[store.data.length - 1]
    },
  },
})
