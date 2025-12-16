<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="alert-title"
    :class="
      cn(
        'acr:col-start-2 acr:line-clamp-1 acr:min-h-4 acr:font-medium acr:tracking-tight',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
