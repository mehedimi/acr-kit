import { defineStore } from 'pinia'
import type { PushRecovery, RecoveryOption } from '@/types/recovery-option.ts'
import { ref } from 'vue'
import { appHttp, wpHttp } from '@/lib/http.ts'
import { abandonedSchedule, ordinalWords } from '@/stores/recovery-utils.ts'
import type { Utilities } from '@/types/utilities.ts'
const BASE_ENDPOINT = '/api/v1/recovery/pushes' as const
export const usePushNotificationStore = defineStore('pushNotificationStore', {
  state: (): { data: Array<PushRecovery<RecoveryOption>>; publicKey: string } => ({
    data: [],
    publicKey: '',
  }),

  actions: {
    fetch() {
      const isLoaded = ref(false)
      this.fetchPublicKey()
      appHttp
        .get<{ data: Array<PushRecovery<RecoveryOption>> }>(BASE_ENDPOINT)
        .then(({ data: { data } }) => {
          this.data = data
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
          .post<{ data: PushRecovery<RecoveryOption> }>(BASE_ENDPOINT, {
            name: (ordinalWords[this.data.length] || 'Untitled') + ' Push Notification',
            recovery: {
              runAfter: (abandonedSchedule[this.data.length] ||
                abandonedSchedule[abandonedSchedule.length - 1]) as number,
            },
            title: 'Your cart is waiting!',
            body: 'Your cart is waiting! Don’t miss out—complete your purchase now to get your items before they’re gone.',
          })
          .then(({ data: { data } }) => {
            this.data.push(data)
          })
          .finally(() => {
            isCreating.value = false
          })
      }

      return { isCreating, create }
    },

    fetchPublicKey() {
      if (this.publicKey) {
        return
      }
      appHttp
        .get<{ publicKey: string }>(BASE_ENDPOINT + '/keys')
        .then(({ data: { publicKey } }) => (this.publicKey = publicKey))
    },

    update() {
      const isUpdating = ref(false)

      const update = async (data: PushRecovery<RecoveryOption>) => {
        isUpdating.value = true
        return Promise.all([
          appHttp.patch(`${BASE_ENDPOINT}/${data.id}`, data),
          this.updateUtilities(),
        ]).finally(() => {
          isUpdating.value = false
        })
      }

      return { isUpdating, update }
    },

    async updateUtilities() {
      return wpHttp.put(`/utilities/push`, {
        enabled: this.data.some((push) => push.recovery.enabled),
        config: {
          publicKey: this.publicKey,
        },
      } satisfies Utilities<{ publicKey: string }>)
    },

    destroy() {
      const isDeleting = ref(false)

      const destroy = async (id: string) => {
        isDeleting.value = true
        return appHttp
          .delete(`/api/v1/recovery-options/${id}`)
          .then(() => {
            const index = this.data.findIndex((push) => push.id === id)
            if (index !== -1) {
              this.data.splice(index, 1)
            }

            return this.updateUtilities()
          })
          .finally(() => {
            isDeleting.value = false
          })
      }

      return { isDeleting, destroy }
    },
  },
})
