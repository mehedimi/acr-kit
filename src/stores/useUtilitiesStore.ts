import { defineStore } from 'pinia'
import type { TabUtilities } from '@/types/utilities.ts'
import { wpHttp } from '@/lib/http.ts'
import { ref } from 'vue'

export const useUtilitiesStore = defineStore('utilitiesStore', {
  state(): { tab: TabUtilities } {
    return {
      tab: {
        enabled: false,
        config: {},
      },
    }
  },

  actions: {
    fetchTab() {
      const isLoading = ref(true)

      wpHttp
        .get<TabUtilities>('/utilities/tab')
        .then(({ data }) => {
          this.tab = data
        })
        .finally(() => {
          isLoading.value = false
        })

      return { isLoading }
    },
    saveTab() {
      const isSubmitted = ref(false)

      const save = async () => {
        isSubmitted.value = true
        return wpHttp.put('/utilities/tab', this.tab satisfies TabUtilities).finally(() => {
          isSubmitted.value = false
        })
      }

      return { isSubmitted, save }
    },
  },
})
