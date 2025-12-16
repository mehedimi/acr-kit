<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="sidebar-menu-badge"
    data-sidebar="menu-badge"
    :class="
      cn(
        'acr:text-sidebar-foreground acr:pointer-events-none acr:absolute acr:right-1 acr:flex acr:h-5 acr:min-w-5 acr:items-center acr:justify-center acr:rounded-md acr:px-1 acr:text-xs acr:font-medium acr:tabular-nums acr:select-none',
        'acr:peer-hover/menu-button:text-sidebar-accent-foreground acr:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
        'acr:peer-data-[size=sm]/menu-button:top-1',
        'acr:peer-data-[size=default]/menu-button:top-1.5',
        'acr:peer-data-[size=lg]/menu-button:top-2.5',
        'acr:group-data-[collapsible=icon]:hidden',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
