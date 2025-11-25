<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="empty"
    :class="
      cn(
        'acr:flex acr:min-w-0 acr:flex-1 acr:flex-col acr:items-center acr:justify-center acr:gap-6 acr:text-balance acr:rounded-lg acr:border-dashed acr:p-6 acr:text-center acr:md:p-12',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
