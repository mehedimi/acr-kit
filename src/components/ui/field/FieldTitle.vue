<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="field-label"
    :class="
      cn(
        'acr:flex acr:w-fit acr:items-center acr:gap-2 acr:text-sm acr:leading-snug acr:font-medium acr:group-data-[disabled=true]/field:opacity-50',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
