<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="field-group"
    :class="
      cn(
        'acr:group/field-group acr:@container/field-group acr:flex acr:w-full acr:flex-col acr:gap-7 acr:data-[slot=checkbox-group]:gap-3 acr:[&>[data-slot=field-group]]:gap-4',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
