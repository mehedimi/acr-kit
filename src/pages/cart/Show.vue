<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogScrollContent,
} from '@/components/ui/dialog'
import { useCartStore } from '@/stores/useCartStore.ts'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatPrice, names } from '@/lib/utils.ts'
import { Badge } from '@/components/ui/badge'
import { toStatusTitle, toStatusVariant } from '@/enum/cart-status.ts'
import Date from '@/components/Date.vue'

const open = ref(true)

const cartStore = useCartStore()
const router = useRouter()

const cart = computed(() => {
  return cartStore.data.find((c) => c.id === router.currentRoute.value.params.id)
})

watch(open, () => {
  if (!open.value) {
    setTimeout(() => {
      router.push({
        name: 'cart.index',
        query: router.currentRoute.value.query,
      })
    }, 200)
  }
})
</script>

<template>
  <Dialog v-model:open="open">
    <form>
      <DialogScrollContent class="acr:w-full acr:lg:w-lg" v-if="cart">
        <DialogHeader>
          <DialogTitle>Cart Summary</DialogTitle>
          <DialogDescription
            >Take a quick look at what the customer was planning to buy before leaving. These
            insights help you personalize recovery emails and improve the shopping
            experience.</DialogDescription
          >
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Tax</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in cart.lineItems" :key="item.id">
              <TableCell class="font-medium">
                <div class="acr:flex acr:items-start acr:gap-2">
                  <img
                    class="acr:max-w-[60px] acr:rounded-sm"
                    :src="item.thumbnailSm"
                    :alt="item.name"
                  />
                  <div>
                    <span>{{ item.name }}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{{ item.quantity }}</TableCell>
              <TableCell>{{ formatPrice(item.tax, cart.currency) }}</TableCell>
              <TableCell>{{ formatPrice(item.price, cart.currency) }}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colspan="3" class="acr:!font-semibold acr:text-right">Total</TableCell>
              <TableCell>{{ formatPrice(cart.totalPrice, cart.currency) }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <hr />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell class="acr:!font-semibold">Name</TableCell>
              <TableCell
                >{{ names([cart.firstName, cart.lastName]) }}
                <Badge v-if="cart.isGuest">Guest</Badge></TableCell
              >
            </TableRow>
            <TableRow>
              <TableCell class="acr:!font-semibold">Email</TableCell>
              <TableCell>{{ cart.email ?? '—' }}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="acr:!font-semibold">Phone</TableCell>
              <TableCell>{{ cart.phone ?? '—' }}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="acr:!font-semibold">IP Address</TableCell>
              <TableCell>{{ cart.ipAddress ?? '—' }}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="acr:!font-semibold">Status</TableCell>
              <TableCell
                ><Badge :variant="toStatusVariant(cart.status)">{{
                  toStatusTitle(cart.status)
                }}</Badge></TableCell
              >
            </TableRow>
            <TableRow>
              <TableCell class="acr:!font-semibold">Last Active At</TableCell>
              <TableCell><Date :date="cart.lastActiveAt" /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="acr:!font-semibold">Created At</TableCell>
              <TableCell><Date :date="cart.createdAt" /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="acr:!font-semibold">Update At</TableCell>
              <TableCell><Date :date="cart.updatedAt" /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogScrollContent>
    </form>
  </Dialog>
</template>
