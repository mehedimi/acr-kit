<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import { formatPrice } from '@/lib/utils.ts'
import Content from '@/components/Content.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { Skeleton } from '@/components/ui/skeleton'
import Help from '@/pages/recover/components/Help.vue'
import { useOverviewStore } from '@/stores/useOverviewStore.ts'
import {
  ShoppingBagIcon,
  BadgeEuroIcon,
  ShoppingBasketIcon,
  MailCheckIcon,
  MessageSquareMoreIcon,
} from 'lucide-vue-next'

const store = useOverviewStore()
const blocks = ref<Array<{ title: string; icon: any; value: string | number; help: string }>>([])

store.fetch().then(() => {
  blocks.value = [
    {
      title: 'Abandoned Carts',
      icon: ShoppingBasketIcon,
      value: store.abandonedCarts,
      help: 'Total number of carts left incomplete with valid emails.',
    },
    {
      title: 'Potential Revenue',
      icon: BadgeEuroIcon,
      value: formatPrice(store.potentialRevenue, acrKitApp.currency),
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
    {
      title: 'Pushes Sent',
      icon: MessageSquareMoreIcon,
      value: store.pushesSent,
      help: 'Automated push notifications sent to recover abandoned carts.',
    },
  ]
})
</script>

<template>
  <AppLayout>
    <Header
      description="Monitor your cart recovery performance and key metrics, and its updates every 30 minutes to ensure optimal performance."
      :links="[{ title: 'Overview', href: { name: 'overview' } }]"
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
        <template v-if="blocks.length === 0">
          <Skeleton v-for="_i in 4" class="acr:h-36 acr:w-full acr:rounded-md!" />
        </template>
      </div>
    </Content>
  </AppLayout>
</template>
