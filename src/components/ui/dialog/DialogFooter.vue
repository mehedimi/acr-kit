<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    data-slot="dialog-footer"
    :class="
      cn('acr:flex acr:flex-col-reverse acr:gap-2 acr:sm:flex-row acr:sm:justify-end', props.class)
    "
  >
    <slot />
  </div>
</template>
