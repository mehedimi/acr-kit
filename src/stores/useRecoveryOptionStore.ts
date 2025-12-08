import { defineStore } from 'pinia'
import type { RecoveryOption } from '@/types/recovery-option.ts'
import { appHttp } from '@/lib/http.ts'

export const useRecoveryOptionStore = defineStore('recoveryOptionStore', {
  state: (): {
    data: RecoveryOption<undefined>[]
  } => ({
    data: [],
  }),
  actions: {
    fetch() {
      appHttp
        .get<{ data: RecoveryOption<undefined>[] }>('/api/v1/recovery-options')
        .then(({ data: { data } }) => {
          this.data = data
        })
    },
  },
})
