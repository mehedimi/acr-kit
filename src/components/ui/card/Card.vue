<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="card"
    :class="
      cn(
        'acr:bg-card acr:text-card-foreground acr:flex acr:flex-col acr:gap-6 acr:rounded-xl acr:border acr:py-6 acr:shadow-sm',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
