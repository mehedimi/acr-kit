<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ul
    data-slot="sidebar-menu"
    data-sidebar="menu"
    :class="cn('acr:flex acr:w-full acr:min-w-0 acr:flex-col acr:gap-1', props.class)"
  >
    <slot />
  </ul>
</template>
