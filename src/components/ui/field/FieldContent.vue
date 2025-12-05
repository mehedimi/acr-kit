<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="field-content"
    :class="
      cn(
        'acr:group/field-content acr:flex acr:flex-1 acr:flex-col acr:gap-1.5 acr:leading-snug',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
