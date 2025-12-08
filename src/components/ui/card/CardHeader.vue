<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="card-header"
    :class="
      cn(
        'acr:@container/card-header acr:grid acr:auto-rows-min acr:grid-rows-[auto_auto] acr:items-start acr:gap-1.5 acr:px-6 acr:has-data-[slot=card-action]:grid-cols-[1fr_auto] acr:[.border-b]:pb-6',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
