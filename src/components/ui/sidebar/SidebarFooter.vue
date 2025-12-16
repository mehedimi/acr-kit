<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="sidebar-footer"
    data-sidebar="footer"
    :class="cn('acr:flex acr:flex-col acr:gap-2 acr:p-2', props.class)"
  >
    <slot />
  </div>
</template>
