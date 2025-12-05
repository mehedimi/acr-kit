<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p
    data-slot="field-description"
    :class="
      cn(
        'acr:text-muted-foreground acr:text-sm acr:leading-normal acr:font-normal acr:group-has-[[data-orientation=horizontal]]/field:text-balance',
        'acr:last:mt-0 acr:nth-last-2:-mt-1 acr:[[data-variant=legend]+&]:-mt-1.5',
        'acr:[&>a:hover]:text-primary acr:[&>a]:underline acr:[&>a]:underline-offset-4',
        props.class,
      )
    "
  >
    <slot />
  </p>
</template>
