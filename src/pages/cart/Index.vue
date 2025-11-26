<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useCartStore } from '@/stores/useCartStore.ts'
import { formatPrice, names } from '@/lib/utils.ts'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import { RefreshCcw, ShoppingCart } from 'lucide-vue-next'
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from '@/components/ui/tooltip'
import type { Cart } from '@/types/cart.ts'
import { useRouter } from 'vue-router'
import { Badge } from '@/components/ui/badge'
import { toStatusTitle, toStatusVariant } from '@/enum/cart-status.ts'
import Date from '@/components/Date.vue'

const cartStore = useCartStore()

cartStore.fetch()
const router = useRouter()

function openCart(cart: Cart) {
  router.push({ name: 'cart.show', params: { id: cart.id } })
}
</script>

<template>
  <AppLayout>
    <Item>
      <ItemContent>
        <ItemTitle>Carts</ItemTitle>
        <ItemDescription
          >A centralized view of all customer carts, allowing you to monitor activity, analyze
          abandoned carts, and manage cart-related operations efficiently.</ItemDescription
        >
      </ItemContent>
    </Item>
    <Table v-if="cartStore.data.length">
      <TableHeader>
        <TableRow>
          <TableHead>Identity</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead class="acr:min-w-[150px]">Line Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="cart in cartStore.data" class="acr:cursor-pointer" @click="openCart(cart)">
          <TableCell class="font-medium">{{ names([cart.firstName, cart.lastName]) }}</TableCell>
          <TableCell>
            <div v-if="cart.phone || cart.email" class="acr:flex acr:flex-col">
              <a v-if="cart.email" :href="`mailto:${cart.email}`">{{ cart.email }}</a>
              <a v-if="cart.phone" :href="`tel:${cart.phone}`">{{ cart.phone }}</a>
            </div>
            <span v-else>—</span>
          </TableCell>
          <TableCell>
            <div class="acr:flex acr:gap-2">
              <TooltipProvider>
                <Tooltip v-for="product in cart.lineItems">
                  <TooltipTrigger as-child>
                    <img
                      :src="product.thumbnailSm"
                      :alt="product.name"
                      class="acr:max-w-12 acr:rounded"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    {{ product.name }} - {{ formatPrice(product.price, cart.currency) }} ({{
                      product.quantity
                    }})
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </TableCell>
          <TableCell>{{ formatPrice(cart.totalPrice, cart.currency) }}</TableCell>
          <TableCell
            ><Badge :variant="toStatusVariant(cart.status)">{{
              toStatusTitle(cart.status)
            }}</Badge></TableCell
          >
          <TableCell><Date :date="cart.createdAt" /></TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <Empty v-else class="acr:bg-white acr:m-2">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingCart />
        </EmptyMedia>
        <EmptyTitle>No Carts Found</EmptyTitle>
        <EmptyDescription>
          There are currently no carts to display. New carts will appear here as customers add
          items.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" @click="cartStore.fetch()">
          <RefreshCcw />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
    <RouterView />
  </AppLayout>
</template>
