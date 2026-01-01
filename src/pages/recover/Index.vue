<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { MailCheck, Cog, MessageSquareMoreIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import Heading from '@/pages/recover/components/Heading.vue'
import { RouterLink } from 'vue-router'
import Content from '@/components/Content.vue'

const options = [
  {
    title: 'Email Recovery',
    description:
      'Configure automated email notifications triggered when a cart is marked as abandoned.',
    icon: MailCheck,
    action: {
      to: { name: 'recovery.options.email' },
      icon: Cog,
      text: 'Configure',
    },
  },
  {
    title: 'Push Notification',
    description:
      'Send instant reminders to your customers right in their browser when they leave items in their cart. Set it up once, and your visitors will get friendly, timely alerts that encourage them to complete their purchase.',
    icon: MessageSquareMoreIcon,
    action: {
      to: { name: 'recovery.options.push-notification' },
      icon: Cog,
      text: 'Configure',
    },
  },
]
</script>

<template>
  <Heading />
  <Content class="acr:bg-transparent!">
    <Card
      class="acr:rounded-md acr:hover:shadow-lg acr:shadow acr:mb-4 acr:transition-shadow"
      v-for="option in options"
      :key="option.title"
    >
      <CardContent>
        <div class="acr:flex acr:gap-x-4 acr:items-center">
          <component :is="option.icon" class="acr:w-14 acr:h-14 acr:text-[#1F2E4C] acr:-mt-3" />
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
