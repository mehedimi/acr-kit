<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <li
    data-slot="breadcrumb-item"
    :class="cn('acr:inline-flex acr:items-center acr:gap-1.5', props.class)"
  >
    <slot />
  </li>
</template>
