<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ol
    data-slot="breadcrumb-list"
    :class="
      cn(
        'acr:text-muted-foreground acr:!list-none acr:flex acr:flex-wrap acr:items-center acr:gap-1.5 acr:text-sm acr:break-words acr:sm:gap-2.5',
        props.class,
      )
    "
  >
    <slot />
  </ol>
</template>
