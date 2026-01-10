import { defineStore } from 'pinia'
import type { UtilityList } from '@/types/utilities.ts'
import { wpHttp } from '@/lib/http.ts'
import { keyBy } from 'lodash'

export const useUtilitiesStore = defineStore('utilitiesStore', {
  state: (): { isLoaded: boolean; data: UtilityList } => ({
    isLoaded: false,
    data: [],
  }),

  actions: {
    fetch() {
      wpHttp.get<{ data: UtilityList }>('/utilities').then(({ data: { data } }) => {
        this.data = data
      })
    },
  },

  getters: {
    asKeyVal(store) {
      return keyBy(store.data, 'name')
    },
  },
})
