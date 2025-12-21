<script setup lang="ts">
import { type RouteLocationRaw, useRoute } from 'vue-router'

defineProps<{
  links: Array<{
    label: string
    icon: any
    to: RouteLocationRaw & { name: string }
  }>
}>()

const route = useRoute()
</script>

<template>
  <nav class="acr:w-64">
    <ul>
      <li v-for="link in links">
        <RouterLink
          :to="link.to"
          class="acr:flex acr:text-muted-foreground! acr:items-center acr:gap-2 acr:border acr:py-2 acr:px-4 acr:rounded-full"
          :class="route.name === link.to.name ? 'acr:bg-muted' : 'acr:hover:bg-gray-100'"
        >
          <component :is="link.icon" class="acr:w-5" />
          {{ link.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
