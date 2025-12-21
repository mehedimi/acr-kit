<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import Content from '@/components/Content.vue'
import { AtSignIcon } from 'lucide-vue-next'
import Header from '@/components/Header.vue'
import LeftNav from '@/components/LeftNav.vue'
const links = [
  {
    to: { name: 'configurations.email' },
    label: 'Email Settings',
    icon: AtSignIcon,
  },
]
</script>

<template>
  <AppLayout>
    <Header
      title="Settings"
      description="Configure how your abandoned cart recovery emails appear to customers. Set the sender information, reply-to details, and the page customers are redirected to after unsubscribing. These settings ensure your emails look professional, maintain consistent branding, and handle replies correctly."
      :href="{ name: 'configurations' }"
      :links="[
        {
          title: 'Email Settings',
          href: { name: 'configurations.email' },
        },
      ]"
    />

    <Content class="acr:flex acr:gap-x-10 acr:p-4">
      <LeftNav :links="links" />
      <RouterView class="acr:flex-1" />
    </Content>
  </AppLayout>
</template>
