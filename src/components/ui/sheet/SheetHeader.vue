<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    data-slot="sheet-header"
    :class="cn('acr:flex acr:flex-col acr:gap-1.5 acr:p-4', props.class)"
  >
    <slot />
  </div>
</template>
