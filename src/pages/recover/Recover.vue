<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import { useRecoveryOptionStore } from '@/stores/useRecoveryOptionStore.ts'
import { RecoveryType } from '@/enum/recovery-type.ts'
import { Cog, MailCheck, MessageSquareMoreIcon } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Content from '@/components/Content.vue'
import { type RouteLocationRaw, RouterLink, useRoute } from 'vue-router'
import LeftNav from '@/components/LeftNav.vue'
import { computed } from 'vue'
import Header from '@/components/Header.vue'

const store = useRecoveryOptionStore()

const route = useRoute()

type EnableItems = Map<RecoveryType, number>

const options = [
  {
    title: 'Email Recovery',
    description:
      'Configure automated email notifications triggered when a cart is marked as abandoned.',
    icon: MailCheck,
    action: {
      to: {
        name: 'recovery.options.email',
      },
      icon: Cog,
      text: 'Configure',
    },
    badge(enableItems: EnableItems): string | number {
      return enableItems.get(RecoveryType.EMAIL) || 0
    },
  },
  {
    title: 'Push Notification',
    description:
      'Send instant reminders to your customers right in their browser when they leave items in their cart. Set it up once, and your visitors will get friendly, timely alerts that encourage them to complete their purchase.',
    icon: MessageSquareMoreIcon,
    action: {
      to: {
        name: 'recovery.options.push-notification',
      },
      icon: Cog,
      text: 'Configure',
    },
    badge(enableItems: EnableItems): string | number {
      return enableItems.get(RecoveryType.PUSH) || 0
    },
  },
] as const

const links = options.map((option) => {
  return {
    label: option.title,
    icon: option.icon,
    to: option.action.to,
  }
})

store.fetch()

const { enableItems } = storeToRefs(store)

const recoveryLink = {
  title: 'Recovery Options',
  href: {
    name: 'recovery.options',
  },
} as const

const headerProps = computed<{
  description: string
  links: Array<{ title: string; href: RouteLocationRaw }>
}>(() => {
  switch (route.name) {
    case options[0].action.to.name:
      return {
        description: options[0].description,
        links: [
          recoveryLink,
          {
            title: options[0].title,
            href: options[0].action.to,
          },
        ],
      }
    case options[1].action.to.name:
      return {
        description: options[1].description,
        links: [
          recoveryLink,
          {
            title: options[1].title,
            href: options[1].action.to,
          },
        ],
      }
    default:
      return {
        description:
          'Control when a cart becomes abandoned and define your recovery workflow to maximize conversions.',
        links: [recoveryLink],
      }
  }
})
</script>
<template>
  <AppLayout>
    <Header v-bind="headerProps" />
    <template v-if="route.name === 'recovery.options'">
      <Content class="acr:bg-transparent!">
        <Card
          class="acr:rounded-md acr:hover:shadow-lg acr:shadow acr:mb-4 acr:transition-shadow"
          v-for="option in options"
          :key="option.title"
        >
          <CardContent>
            <div class="acr:flex acr:gap-x-4 acr:items-center">
              <div class="acr:relative">
                <Badge v-if="store.isLoaded" class="acr:absolute acr:-left-2 acr:-top-1">{{
                  option.badge(enableItems)
                }}</Badge>
                <component :is="option.icon" class="acr:w-14 acr:h-14 acr:text-[#1F2E4C]" />
              </div>
              <div class="acr:flex-1">
                <h2 class="acr:my-0! acr:text-xl! acr:text-gray-700!">{{ option.title }}</h2>
                <p class="acr:mt-1! acr:text-xs! acr:text-muted-foreground acr:italic!">
                  {{ option.description }}
                </p>
              </div>
              <div>
                <Button size="lg" :as="RouterLink" :to="option.action.to" variant="outline"
                  ><component :is="option.action.icon" /> {{ option.action.text }}</Button
                >
              </div>
            </div>
          </CardContent>
        </Card>
      </Content>
    </template>
    <template v-else>
      <Content class="acr:flex acr:gap-x-4 acr:p-4">
        <LeftNav :links="links" />
        <div class="acr:flex-1">
          <RouterView />
        </div>
      </Content>
    </template>
  </AppLayout>
</template>
