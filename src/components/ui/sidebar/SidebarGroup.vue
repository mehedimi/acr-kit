<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="sidebar-group"
    data-sidebar="group"
    :class="cn('acr:relative acr:flex acr:w-full acr:min-w-0 acr:flex-col acr:p-2', props.class)"
  >
    <slot />
  </div>
</template>
