import { defineStore } from 'pinia'
import type { RecoveryOption } from '@/types/recovery-option.ts'
import { appHttp } from '@/lib/http.ts'
import type { RecoveryType } from '@/enum/recovery-type.ts'

export const useRecoveryOptionStore = defineStore('recoveryOptionStore', {
  state: (): {
    data: RecoveryOption[]
  } => ({
    data: [],
  }),
  actions: {
    fetch() {
      appHttp
        .get<{ data: RecoveryOption[] }>('/api/v1/recovery-options')
        .then(({ data: { data } }) => {
          this.data = data
        })
    },
  },
  getters: {
    isLoaded(store): boolean {
      return store.data.length > 0
    },
    enableItems(store): Map<RecoveryType, number> {
      const data = new Map<RecoveryType, number>()
      store.data.forEach((item) => {
        if (!item.enabled) {
          return
        }

        data.set(item.type, (data.get(item.type) || 0) + 1)
      })
      return data
    },
  },
})
