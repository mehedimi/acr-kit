<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import Header from '@/components/Header.vue'
import Content from '@/components/Content.vue'
import { BellRingIcon } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

const route = useRoute()

const links = [
  {
    name: 'utilities.tab-notification',
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
      <nav class="acr:w-64">
        <ul>
          <li v-for="link in links">
            <RouterLink
              :to="{ name: link.name }"
              class="acr:flex acr:items-center acr:gap-2 acr:border acr:p-2 acr:rounded-md"
              :class="
                route.name === link.name
                  ? 'acr:bg-primary acr:text-white!'
                  : 'acr:text-muted-foreground! acr:hover:bg-gray-100'
              "
            >
              <component :is="link.icon" class="acr:w-5" />
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>
      <RouterView class="acr:flex-1" />
    </Content>
  </AppLayout>
</template>
