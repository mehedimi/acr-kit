<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p
    data-slot="empty-description"
    :class="
      cn(
        'acr:text-muted-foreground acr:!my-0 acr:[&>a:hover]:text-primary acr:text-sm/relaxed acr:[&>a]:underline acr:[&>a]:underline-offset-4',
        $attrs.class ?? 'acr:',
      )
    "
  >
    <slot />
  </p>
</template>
