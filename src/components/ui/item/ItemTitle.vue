<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="item-title"
    :class="
      cn(
        'acr:flex acr:w-fit acr:items-center acr:text-xl acr:gap-2 acr:leading-snug acr:font-medium',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
