<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ul
    data-slot="sidebar-menu-sub"
    data-sidebar="menu-badge"
    :class="
      cn(
        'acr:border-sidebar-border acr:mx-3.5 acr:flex acr:min-w-0 acr:translate-x-px acr:flex-col acr:gap-1 acr:border-l acr:px-2.5 acr:py-0.5',
        'acr:group-data-[collapsible=icon]:hidden',
        props.class,
      )
    "
  >
    <slot />
  </ul>
</template>
