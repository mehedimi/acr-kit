<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p
    data-slot="item-description"
    :class="
      cn(
        'acr:!text-gray-400 acr:line-clamp-2 acr:text-sm acr:leading-normal acr:font-normal acr:text-balance',
        'acr:[&>a:hover]:text-primary acr:[&>a]:underline acr:[&>a]:underline-offset-4 acr:!m-0',
        props.class,
      )
    "
  >
    <slot />
  </p>
</template>
