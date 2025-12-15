<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import Content from '@/components/Content.vue'
import { AtSignIcon } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
const route = useRoute()
const links = [
  {
    name: 'configurations.email',
    label: 'Email Settings',
    icon: AtSignIcon,
  },
]
</script>

<template>
  <AppLayout>
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
