<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="empty-content"
    :class="
      cn(
        'acr:flex acr:w-full acr:min-w-0 acr:max-w-sm acr:flex-col acr:items-center acr:gap-4 acr:text-balance acr:text-sm',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
