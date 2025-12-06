<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="input-group"
    role="group"
    :class="
      cn(
        'acr:group/input-group acr:border-input acr:dark:bg-input/30 acr:relative acr:flex acr:w-full acr:items-center acr:rounded-md acr:border acr:shadow-xs acr:transition-[color,box-shadow] acr:outline-none',
        'acr:h-9 acr:min-w-0 acr:has-[>textarea]:h-auto',

        // Variants based on alignment.
        'acr:has-[>[data-align=inline-start]]:[&>input]:pl-2',
        'acr:has-[>[data-align=inline-end]]:[&>input]:pr-2',
        'acr:has-[>[data-align=block-start]]:h-auto acr:has-[>[data-align=block-start]]:flex-col acr:has-[>[data-align=block-start]]:[&>input]:pb-3',
        'acr:has-[>[data-align=block-end]]:h-auto acr:has-[>[data-align=block-end]]:flex-col acr:has-[>[data-align=block-end]]:[&>input]:pt-3',

        // Focus state.
        'acr:has-[[data-slot=input-group-control]:focus-visible]:border-ring acr:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 acr:has-[[data-slot=input-group-control]:focus-visible]:ring-[3px]',

        // Error state.
        'acr:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 acr:has-[[data-slot][aria-invalid=true]]:border-destructive acr:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40',

        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
