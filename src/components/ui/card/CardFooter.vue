<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="card-footer"
    :class="cn('acr:flex acr:items-center acr:px-6 acr:[.border-t]:pt-6', props.class)"
  >
    <slot />
  </div>
</template>
