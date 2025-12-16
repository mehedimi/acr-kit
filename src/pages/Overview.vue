<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import Content from '@/components/Content.vue'
import Header from '@/components/Header.vue'
import {
  ShoppingBagIcon,
  BadgeEuroIcon,
  ShoppingBasketIcon,
  MailCheckIcon,
  BadgeInfoIcon,
} from 'lucide-vue-next'
import { useOverviewStore } from '@/stores/useOverviewStore.ts'
import Help from '@/pages/recover/components/Help.vue'
import { formatPrice } from '@/lib/utils.ts'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const store = useOverviewStore()

store.fetch()

const blocks = [
  {
    title: 'Abandoned Carts',
    icon: ShoppingBasketIcon,
    value: store.abandonedCarts,
    help: 'Total number of carts left incomplete with valid emails.',
  },
  {
    title: 'Potential Revenue',
    icon: BadgeEuroIcon,
    value: formatPrice(store.potentialRevenue),
    help: 'Total money sitting in abandoned carts.',
  },
  {
    title: 'Recovered Carts',
    icon: ShoppingBagIcon,
    value: store.recoveredCarts,
    help: 'Number of carts successfully converted to orders.',
  },
  {
    title: 'Emails Sent',
    icon: MailCheckIcon,
    value: store.emailsSent,
    help: 'Automated emails sent to recover abandoned carts.',
  },
]
</script>

<template>
  <AppLayout>
    <Header
      title="Overview"
      description="Monitor your cart recovery performance and key metrics, and its updates every 30 minutes to ensure optimal performance."
      :href="{ name: 'overview' }"
    />
    <Content class="acr:p-4">
      <div class="acr:grid acr:md:grid-cols-3 acr:lg:grid-cols-4 acr:gap-4">
        <div
          class="acr:border acr:shadow acr:rounded-lg acr:p-4 acr:transition-shadow acr:hover:shadow-lg"
          v-for="block in blocks"
        >
          <p
            class="acr:flex! acr:items-center acr:gap-x-2 acr:text-muted-foreground! acr:text-sm! acr:my-0!"
          >
            <component :is="block.icon" />
            {{ block.title }}
          </p>
          <h2 class="acr:text-3xl! acr:font-bold! acr:my-4! acr:text-primary!">
            {{ block.value }}
          </h2>
          <Help>{{ block.help }}</Help>
        </div>
      </div>
    </Content>
  </AppLayout>
</template>
