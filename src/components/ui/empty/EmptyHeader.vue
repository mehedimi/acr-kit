<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="empty-header"
    :class="
      cn(
        'acr:flex acr:max-w-sm acr:flex-col acr:items-center acr:gap-2 acr:text-center',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
