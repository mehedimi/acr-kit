<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="alert-description"
    :class="
      cn(
        'acr:text-muted-foreground acr:col-start-2 acr:grid acr:justify-items-start acr:gap-1 acr:text-sm acr:[&_p]:leading-relaxed',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
