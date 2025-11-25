<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    role="list"
    data-slot="item-group"
    :class="cn('acr:group/item-group acr:flex acr:flex-col', props.class)"
  >
    <slot />
  </div>
</template>
