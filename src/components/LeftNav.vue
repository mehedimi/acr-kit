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
  <nav class="acr:w-30 acr:md:w-50 acr:xl:w-64">
    <ul>
      <li v-for="link in links">
        <RouterLink
          :to="link.to"
          class="acr:flex acr:items-center acr:gap-2 acr:focus:ring-0! acr:border acr:py-2 acr:px-4 acr:rounded-xl"
          :class="
            route.name === link.to.name
              ? 'acr:bg-primary acr:text-white!'
              : 'acr:hover:bg-gray-100 acr:text-muted-foreground!'
          "
        >
          <component :is="link.icon" class="acr:w-5" />
          {{ link.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
