<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
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
import { RefreshCcw, ShoppingCart, EllipsisIcon, LoaderIcon } from 'lucide-vue-next'
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from '@/components/ui/tooltip'
import type { Cart } from '@/types/cart.ts'
import { useRoute, useRouter } from 'vue-router'
import { Badge } from '@/components/ui/badge'
import { toStatusTitle, toStatusVariant } from '@/enum/cart-status.ts'
import Date from '@/components/Date.vue'
import Header from '@/components/Header.vue'
import Content from '@/components/Content.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ref, watch } from 'vue'
import { toast } from 'vue-sonner'
import CursorPagination from '@/components/CursorPagination.vue'

const cartStore = useCartStore()
const router = useRouter()
const route = useRoute()

const { isLoaded } = cartStore.fetch(route.query.cursor as string)

watch(
  () => route.query,
  (newQuery, oldQuery) => {
    if (newQuery.cursor !== oldQuery.cursor) {
      cartStore.fetch(newQuery.cursor as string)
    }
  },
)

function openCart(cart: Cart) {
  router.push({
    name: 'cart.show',
    params: {
      id: cart.id,
    },
    query: route.query,
  })
}

const deleteCartId = ref<string | undefined>()

async function deleteCart() {
  if (!deleteCartId.value) {
    return
  }

  await cartStore.destroy(deleteCartId.value)
  toast.success('The cart is successfully deleted.')
  deleteCartId.value = undefined
}
</script>

<template>
  <AppLayout>
    <Header
      title="Carts"
      description="A centralized view of all customer carts, allowing you to monitor activity, analyze
          abandoned carts, and manage cart-related operations efficiently."
      :href="{ name: 'cart.index' }"
    />
    <Content>
      <div v-if="!isLoaded" class="acr:min-h-64 acr:flex acr:justify-center acr:items-center">
        <LoaderIcon role="status" aria-label="Loading" class="acr:size-8 acr:animate-spin" />
      </div>
      <template v-else-if="cartStore.data.length">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Identity</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead class="acr:min-w-37.5">Line Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>—</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="cart in cartStore.data"
              class="acr:cursor-pointer"
              @click="openCart(cart)"
            >
              <TableCell class="font-medium">{{
                names([cart.firstName, cart.lastName])
              }}</TableCell>
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
              <TableCell class="acr:text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger @click.stop asChild>
                    <Button size="icon-sm" variant="outline"><EllipsisIcon /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem @click="openCart(cart)">View details</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem @click="deleteCartId = cart.id" variant="destructive"
                      >Delete!</DropdownMenuItem
                    >
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <CursorPagination
          :prev="cartStore.meta.prev_cursor"
          :next="cartStore.meta.next_cursor"
          :to="{ name: 'cart.index' }"
        />
      </template>
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
    </Content>
    <AlertDialog :open="deleteCartId !== undefined">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this cart.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="deleteCartId = undefined">Cancel</AlertDialogCancel>
          <Button variant="destructive" @click="deleteCart"> Delete it! </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <RouterView />
  </AppLayout>
</template>
