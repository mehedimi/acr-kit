import { defineStore } from 'pinia'
import type { Cart } from '@/types/cart.ts'
import type { CursorPaginated } from '@/types/cursor.ts'
import { appHttp } from '@/lib/http.ts'

export const useCartStore = defineStore('cartStore', {
  state: (): CursorPaginated<Cart> => ({ data: [], links: {}, meta: { per_page: 15, path: '/' } }),
  actions: {
    fetch(cursor?: string) {
      appHttp
        .get<CursorPaginated<Cart>>(`/api/v1/carts`, {
          params: {
            cursor,
          },
        })
        .then(({ data }) => {
          this.data = data.data
          this.links = data.links
          this.meta = data.meta
        })
    },
  },
})
