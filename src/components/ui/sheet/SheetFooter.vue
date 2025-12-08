<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    data-slot="sheet-footer"
    :class="cn('acr:mt-auto acr:flex acr:flex-col acr:gap-2 acr:p-4', props.class)"
  >
    <slot />
  </div>
</template>
