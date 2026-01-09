<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import Header from '@/components/Header.vue'
import Content from '@/components/Content.vue'
import { BellRingIcon, CogIcon, CheckIcon } from 'lucide-vue-next'
import LeftNav from '@/components/LeftNav.vue'
import { computed, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useUtilitiesStore } from '@/stores/useUtilitiesStore.ts'

const route = useRoute()
const store = useUtilitiesStore()

const links = [
  {
    to: {
      name: 'utilities.tab-notification',
    },
    label: 'Tab Notification',
    icon: BellRingIcon,
  },
]

const utilities = [
  {
    key: 'tab',
    title: 'Tab Notification',
    description:
      'Bring customers back with subtle browser tab notifications. Dynamic tab title and icon changes help recover abandoned carts without disrupting the shopping experience.',
    icon: BellRingIcon,
    action: {
      to: {
        name: 'utilities.tab-notification',
      },
      text: 'Configure',
    },
  },
] as const

const baseLink = {
  title: 'Utilities',
  href: {
    name: 'utilities.index',
  },
}

const headerConfig = computed<{
  description: string
  links: Array<{
    title: string
    href: {
      name: string
    }
  }>
}>(() => {
  switch (route.name) {
    case 'utilities.tab-notification':
      return {
        description: utilities[0].description,
        links: [
          baseLink,
          {
            title: utilities[0].title,
            href: utilities[0].action.to,
          },
        ],
      }
    default:
      return {
        description:
          'Use these tools to capture shopper interest earlier, stay visible at key moments, and guide customers back to their carts more effectively. Each utility can be enabled or disabled independently, giving you full control over how and when it is used.',
        links: [baseLink],
      }
  }
})

watch(
  route,
  (r) => {
    if (r.name === baseLink.href.name) {
      store.fetch()
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <AppLayout>
    <Header :description="headerConfig.description" :links="headerConfig.links" />
    <Content v-if="route.name === baseLink.href.name" class="acr:bg-transparent!">
      <Card
        class="acr:rounded-md acr:hover:shadow-lg acr:shadow acr:mb-4 acr:transition-shadow"
        v-for="utility in utilities"
        :key="utility.title"
      >
        <CardContent>
          <div class="acr:flex acr:gap-x-6 acr:items-center">
            <div class="acr:relative">
              <Badge
                v-if="store.asKeyVal[utility.key]?.enabled"
                class="acr:absolute acr:-left-3 acr:-top-5"
              >
                <CheckIcon />
              </Badge>
              <component :is="utility.icon" class="acr:w-14 acr:h-14 acr:text-[#1F2E4C]" />
            </div>
            <div class="acr:flex-1">
              <h2 class="acr:my-0! acr:text-xl! acr:text-gray-700!">{{ utility.title }}</h2>
              <p class="acr:mt-1! acr:text-xs! acr:text-muted-foreground acr:italic!">
                {{ utility.description }}
              </p>
            </div>
            <div>
              <Button size="lg" :as="RouterLink" :to="utility.action.to" variant="outline">
                <CogIcon />
                {{ utility.action.text }}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Content>
    <Content v-else class="acr:flex acr:gap-x-10 acr:p-4">
      <LeftNav :links="links" />
      <RouterView class="acr:flex-1" />
    </Content>
  </AppLayout>
</template>
