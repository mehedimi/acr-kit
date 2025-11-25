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

const cartStore = useCartStore()

cartStore.fetch()
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
          <TableHead>Created At</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="cart in cartStore.data">
          <TableCell class="font-medium">{{ names([cart.firstName, cart.lastName]) }}</TableCell>
          <TableCell>
            <template v-if="cart.phone || cart.email">
              <a v-if="cart.email" :href="`mailto:${cart.email}`">{{ cart.email }}</a>
              <a v-if="cart.phone" :href="`tel:${cart.phone}`">{{ cart.phone }}</a>
            </template>
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
          <TableCell>{{ cart.createdAt }}</TableCell>
          <TableCell>{{ cart.updatedAt }}</TableCell>
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
        <Button variant="outline" size="sm" @click="cartStore.fetch()">
          <RefreshCcw />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  </AppLayout>
</template>
