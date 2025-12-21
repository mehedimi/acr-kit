<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import Header from '@/components/Header.vue'
import Content from '@/components/Content.vue'
import { BellRingIcon } from 'lucide-vue-next'
import LeftNav from '@/components/LeftNav.vue'

const links = [
  {
    to: { name: 'utilities.tab-notification' },
    label: 'Tab Notification',
    icon: BellRingIcon,
  },
]
</script>

<template>
  <AppLayout>
    <Header
      title="Utilities"
      description="Enhance your abandoned cart recovery by enabling subtle browser tab notifications. When customers switch away from your site tab (especially with items in their cart), dynamic changes to the tab title and favicon can grab their attention and encourage them to return. This feature helps reduce cart abandonment without being intrusive. Customize messages, animations, and triggers below to match your brand and optimize recovery rates."
      :href="{
        name: 'utilities.index',
      }"
      :links="[
        {
          title: 'Tab Notification',
          href: {
            name: 'utilities.tab-notification',
          },
        },
      ]"
    />
    <Content class="acr:flex acr:gap-x-10 acr:p-4">
      <LeftNav :links="links" />
      <RouterView class="acr:flex-1" />
    </Content>
  </AppLayout>
</template>
