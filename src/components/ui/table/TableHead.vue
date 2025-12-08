<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <th
    data-slot="table-head"
    :class="
      cn(
        'acr:text-foreground acr:h-10 acr:px-2 acr:text-left acr:align-middle acr:font-medium acr:whitespace-nowrap acr:[&:has([role=checkbox])]:pr-0 acr:[&>[role=checkbox]]:translate-y-[2px]',
        props.class,
      )
    "
  >
    <slot />
  </th>
</template>
