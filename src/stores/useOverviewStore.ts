import { defineStore } from 'pinia'
import type { Overview } from '@/types/overview.ts'
import { appHttp } from '@/lib/http.ts'

export const useOverviewStore = defineStore('overview', {
  state(): Overview {
    return {
      abandonedCarts: 0,
      potentialRevenue: 0,
      recoveredCarts: 0,
      emailsSent: 0,
    }
  },

  actions: {
    async fetch() {
      const {
        data: { data },
      } = await appHttp.get<{ data: Overview }>('/api/v1/overview')
      this.$patch(data)
    },
  },
})
