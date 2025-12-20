import { defineStore } from 'pinia'
import type { Cart } from '@/types/cart.ts'
import type { CursorPaginated } from '@/types/cursor.ts'
import { appHttp } from '@/lib/http.ts'
import { ref } from 'vue'

export const useCartStore = defineStore('cartStore', {
  state: (): CursorPaginated<Cart> => ({
    data: [],
    links: {},
    meta: {
      per_page: 15,
      path: '/',
    },
  }),
  actions: {
    fetch(cursor?: string) {
      const isLoaded = ref(false)
      appHttp
        .get<CursorPaginated<Cart>>(`/api/v1/carts`, {
          params: {
            cursor,
          },
        })
        .then(({ data }) => {
          this.$patch(data)
        })
        .finally(() => {
          isLoaded.value = true
        })

      return { isLoaded }
    },
    async destroy(id: string) {
      await appHttp.delete(`/api/v1/carts/${id}`)
      this.fetch()
    },
  },
})
